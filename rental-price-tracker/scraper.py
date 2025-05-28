#!/usr/bin/env python3

import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime
import os
import re
import time
import random

# Constants
BASE_URL = "https://annarbor.craigslist.org/search/apa"
OUTPUT_FILE = "data/rentals.json"

def get_random_user_agent():
    user_agents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15'
    ]
    return random.choice(user_agents)

def fetch_listings():
    try:
        # Add headers to mimic a browser
        headers = {
            'User-Agent': get_random_user_agent(),
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'Cache-Control': 'max-age=0',
            'TE': 'Trailers',
        }
        
        # Create a session to maintain cookies
        session = requests.Session()
        
        # First make a request to the main page
        response = session.get(BASE_URL, headers=headers)
        response.raise_for_status()
        
        # Add a small delay
        time.sleep(random.uniform(1, 2))
        
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return None

def get_image_url(data_ids):
    """Extract and construct image URL from Craigslist's data-ids attribute."""
    if not data_ids:
        return None
        
    # Split the data-ids string and get the first image ID
    # Format is typically "1:00p0p_abc123,1:00a0a_def456"
    try:
        first_image = data_ids.split(',')[0]
        # Remove the "1:" prefix if present
        image_id = first_image.split(':')[-1]
        # Construct the full URL
        return f"https://images.craigslist.org/{image_id}_600x450.jpg"
    except Exception as e:
        print(f"Error parsing image ID: {e}")
        return None

def parse_listings(html_content):
    if not html_content:
        return []
    
    soup = BeautifulSoup(html_content, 'html.parser')
    listings = []
    
    # Find all listing elements
    for listing in soup.find_all('li', class_='cl-static-search-result'):
        try:
            # Extract title and URL
            title_elem = listing.find('div', class_='title')
            if not title_elem:
                continue
                
            title = title_elem.text.strip()
            
            # Extract URL from the parent link
            url_elem = listing.find_parent('a')
            url = url_elem['href'] if url_elem else None
            
            # Extract price
            price_elem = listing.find('div', class_='price')
            price = price_elem.text.strip() if price_elem else "Price not listed"
            
            # Extract location
            location_elem = listing.find('div', class_='location')
            location = location_elem.text.strip() if location_elem else "Location not listed"
            
            # Get image URL from data-ids attribute
            image = None
            image_link = listing.find('a', class_='result-image')
            if image_link and 'data-ids' in image_link.attrs:
                image = get_image_url(image_link['data-ids'])
            
            # Debug print
            print(f"\nProcessing listing: {title}")
            print(f"Image URL: {image}")
            
            if url:  # Only add listings with valid URLs
                listings.append({
                    'title': title,
                    'price': price,
                    'location': location,
                    'url': url,
                    'image': image,
                    'date': datetime.now().strftime('%Y-%m-%d')
                })
            
            # Add a small random delay
            time.sleep(random.uniform(0.1, 0.3))
            
        except Exception as e:
            print(f"Error parsing listing: {e}")
            continue
    
    print(f"Found {len(listings)} total listings")
    return listings

def save_to_json(listings):
    try:
        # Create data directory if it doesn't exist
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        
        # Save listings to JSON file
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(listings, f, indent=2, ensure_ascii=False)
        
        print(f"Successfully saved {len(listings)} listings to {OUTPUT_FILE}")
        return True
    except Exception as e:
        print(f"Error saving to JSON: {e}")
        return False

def main():
    print("Scraper ready")
    print(f"Target URL: {BASE_URL}")
    print(f"Output file: {OUTPUT_FILE}")
    
    # Fetch the listings
    html_content = fetch_listings()
    if html_content:
        print("HTML content received successfully")
        # Parse the listings
        listings = parse_listings(html_content)
        print(f"Successfully parsed {len(listings)} listings")
        
        # Save to JSON
        if listings:
            save_to_json(listings)
    else:
        print("Failed to fetch HTML content")

if __name__ == "__main__":
    main() 