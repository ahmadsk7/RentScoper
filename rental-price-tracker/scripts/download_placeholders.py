import os
import requests
from PIL import Image
from io import BytesIO

# Create placeholders directory if it doesn't exist
os.makedirs('../assets/placeholders', exist_ok=True)

# List of image URLs from Ann Arbor properties
image_urls = [
    # Modern apartment building in Ann Arbor
    'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
    # Traditional Ann Arbor house
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
    # Downtown Ann Arbor apartment
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
    # Student housing area
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    # Suburban Ann Arbor home
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
]

def download_and_save_image(url, index):
    try:
        response = requests.get(url)
        if response.status_code == 200:
            # Open the image
            img = Image.open(BytesIO(response.content))
            
            # Resize to a consistent size (800x600)
            img = img.resize((800, 600), Image.Resampling.LANCZOS)
            
            # Save the image
            output_path = f'../assets/placeholders/placeholder{index + 1}.jpg'
            img.save(output_path, 'JPEG', quality=85)
            print(f'Successfully saved {output_path}')
        else:
            print(f'Failed to download image from {url}')
    except Exception as e:
        print(f'Error processing {url}: {str(e)}')

def main():
    print('Downloading placeholder images...')
    for i, url in enumerate(image_urls):
        download_and_save_image(url, i)
    print('Done!')

if __name__ == '__main__':
    main() 