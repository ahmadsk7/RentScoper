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
HISTORY_FILE = "data/rentals_history.json"

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
        
        session = requests.Session()
        response = session.get(BASE_URL, headers=headers)
        response.raise_for_status()
        time.sleep(random.uniform(1, 2))
        return response.text
    except requests.RequestException as e:
        print(f"Error fetching page: {e}")
        return None

def get_image_url(data_ids):
    if not data_ids:
        return None
    try:
        first_image = data_ids.split(',')[0]
        image_id = first_image.split(':')[-1]
        return f"https://images.craigslist.org/{image_id}_600x450.jpg"
    except Exception as e:
        print(f"Error parsing image ID: {e}")
        return None

def parse_listings(html_content):
    if not html_content:
        return []
    
    soup = BeautifulSoup(html_content, 'html.parser')
    listings = []
    
    for listing in soup.find_all('li', class_='cl-static-search-result'):
        try:
            title_elem = listing.find('div', class_='title')
            if not title_elem:
                continue
                
            title = title_elem.text.strip()
            url_elem = listing.find_parent('a')
            url = url_elem['href'] if url_elem else None
            
            price_elem = listing.find('div', class_='price')
            price = price_elem.text.strip() if price_elem else "Price not listed"
            
            location_elem = listing.find('div', class_='location')
            location = location_elem.text.strip() if location_elem else "Location not listed"
            
            image = None
            image_link = listing.find('a', class_='result-image')
            if image_link and 'data-ids' in image_link.attrs:
                image = get_image_url(image_link['data-ids'])
            
            if url:
                listings.append({
                    'title': title,
                    'price': price,
                    'location': location,
                    'url': url,
                    'image': image,
                    'date': datetime.now().strftime('%Y-%m-%d'),
                    'scraped_at': datetime.now().strftime('%Y-%m-%d %H:%M:%S')
                })
            
            time.sleep(random.uniform(0.1, 0.3))
            
        except Exception as e:
            print(f"Error parsing listing: {e}")
            continue
    
    return listings

def save_to_json(listings):
    try:
        os.makedirs(os.path.dirname(OUTPUT_FILE), exist_ok=True)
        with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
            json.dump(listings, f, indent=2, ensure_ascii=False)
        print(f"Successfully saved {len(listings)} listings to {OUTPUT_FILE}")
        return True
    except Exception as e:
        print(f"Error saving to JSON: {e}")
        return False

def append_to_history(listings):
    try:
        os.makedirs(os.path.dirname(HISTORY_FILE), exist_ok=True)
        if os.path.exists(HISTORY_FILE):
            with open(HISTORY_FILE, 'r', encoding='utf-8') as f:
                history = json.load(f)
        else:
            history = []
        
        history.extend(listings)
        
        with open(HISTORY_FILE, 'w', encoding='utf-8') as f:
            json.dump(history, f, indent=2, ensure_ascii=False)
        print(f"Successfully appended {len(listings)} listings to {HISTORY_FILE}")
        return True
    except Exception as e:
        print(f"Error appending to history: {e}")
        return False

def main():
    print("Scraper ready")
    print(f"Target URL: {BASE_URL}")
    print(f"Output file: {OUTPUT_FILE}")
    print(f"History file: {HISTORY_FILE}")
    
    html_content = fetch_listings()
    if html_content:
        listings = parse_listings(html_content)
        if listings:
            save_to_json(listings)
            append_to_history(listings)
    else:
        print("Failed to fetch HTML content")

if __name__ == "__main__":
    main() 