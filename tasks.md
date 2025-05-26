# ✅ MVP Build Plan – Rental Price Tracker (Step-by-Step Tasks)

Each task below is granular, testable, and focused on a single concern. Tasks should be executed in order and verified independently.

---

## 📦 SETUP

### 1. Initialize React Native App with Expo
- **Start**: Run `npx create-expo-app rental-price-tracker`
- **End**: App runs with default Expo welcome screen

### 2. Set Up Folder Structure
- **Start**: Inside `/rental-price-tracker`
- **End**: Create `/components`, `/screens`, `/utils`, `/data`, `/assets` folders

### 3. Add Navigation
- **Start**: Install `@react-navigation/native`, stack or tabs
- **End**: `App.js` displays two navigable screens: "Home" and "Saved"

---

## 📄 STATIC DATA INTEGRATION

### 4. Create Sample `rentals.json`
- **Start**: In `/data`, create a JSON file with 2–3 sample listings
- **End**: File contains valid data:
```json
[
  {
    "title": "1BR Apartment",
    "price": "$900",
    "location": "Austin, TX",
    "date": "2025-05-26",
    "url": "https://...",
    "image": "https://..."
  }
]
5. Load JSON into App State
Start: Read and parse rentals.json in App.js using require()

End: Listings are loaded into a state variable (listings)

🧱 HOME SCREEN
6. Create HomeScreen Component
Start: Create HomeScreen.js in /screens

End: Displays static text "Home" when navigated

7. Pass Listings to HomeScreen
Start: Pass listings from App.js to HomeScreen via props

End: Log listings in HomeScreen

8. Render Listings as FlatList
Start: Use FlatList to display each item

End: List shows title, price, and location for each item

9. Build Reusable ListingCard Component
Start: Create ListingCard.js in /components

End: Displays image, title, price, location, and "Save" button

10. Use ListingCard in HomeScreen
Start: Replace inline list render with ListingCard

End: Listings render with full card layout

💾 SAVED LISTINGS
11. Set Up AsyncStorage
Start: Install @react-native-async-storage/async-storage

End: Able to setItem and getItem manually

12. Create storage.js Utils
Start: In /utils, add:

saveListing(listing)

removeListing(id)

getSavedListings()

End: Functions work in isolation with test keys

13. Save Listing from HomeScreen
Start: Add "Save" button to each ListingCard

End: Pressing it stores the item in AsyncStorage

14. Build SavedScreen
Start: Create SavedScreen.js in /screens

End: Static "Saved" label shows on screen

15. Load Saved Listings in SavedScreen
Start: Use getSavedListings() from AsyncStorage

End: Render a FlatList of saved cards using ListingCard

🛠 UTILITIES
16. Create helpers.js
Start: Add a function formatPrice(str) to remove $ and ,

End: formatPrice("$1,200") returns 1200 as a number

🐍 SCRAPER (FULLY FUNCTIONAL)
17. Create scraper.py
Start: Create file scraper.py in root

End: Script runs with a print("Scraper ready")

18. Install Python Libraries
Start: Use pip to install:

bash
Copy
Edit
pip install requests beautifulsoup4
End: Both libraries installed and importable

19. Define Constants and Imports
Start: Add:

python
Copy
Edit
import requests
from bs4 import BeautifulSoup
import json

BASE_URL = "https://monroe.craigslist.org/search/apa"
End: File runs with no syntax errors

20. Fetch Craigslist HTML
Start: Send GET request to BASE_URL

End: Response received with status 200 and HTML content

21. Parse HTML with BeautifulSoup
Start: Parse HTML into soup = BeautifulSoup(res.text, "html.parser")

End: Able to select .result-info elements from the page

22. Extract Listing Info
Start: Loop through listing elements and extract:

Title

Price

Date

URL

Location

Image (if present)

End: Append valid listings into a Python list of dicts

23. Handle Missing Fields Gracefully
Start: Use .get() or conditional logic to avoid crashes

End: Script handles missing price, image, or location safely

24. Write to /data/rentals.json
Start: Use json.dump() to write list to file

End: File exists with valid JSON structure readable by the app

25. Add Logging and Print Summary
Start: Print count of listings saved and file path

End: Output:

pgsql
Copy
Edit
✅ Scraped 22 listings from Craigslist
💾 Saved to /data/rentals.json
26. Wrap Logic in main() and CLI Entry
Start: Add:

python
Copy
Edit
if __name__ == "__main__":
    main()
End: Running python scraper.py executes full script

27. Manual End-to-End Test
Start: Run scraper → open app → view new listings

End: Listings appear correctly in HomeScreen

