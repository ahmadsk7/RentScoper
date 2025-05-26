# 🏡 Rental Price Tracker – Project Architecture

A lightweight mobile app built with React Native that displays rental listings scraped manually and stored locally — no backend, no database.

---

## 📁 File & Folder Structure

rental-price-tracker/
├── App.js
├── /assets/
│ └── icon.png
├── /components/
│ ├── ListingCard.js
│ └── Header.js
├── /data/
│ └── rentals.json
├── /screens/
│ ├── HomeScreen.js
│ └── SavedScreen.js
├── /utils/
│ ├── storage.js
│ └── helpers.js
├── scraper.py
└── README.md

markdown
Copy
Edit

---

## 🧩 What Each Part Does

### `App.js`
- Root of the application
- Loads rental data from `rentals.json`
- Initializes state for listings and saved listings
- Sets up navigation between screens

### `/assets/icon.png`
- Icon or other static images used in the app

### `/components/ListingCard.js`
- Reusable card component to display rental listing details: title, price, location, image, save button

### `/components/Header.js`
- Optional shared header for navigation or branding

### `/data/rentals.json`
- Static JSON file storing scraped rental listings in array format
- Used as the app’s local data source

### `/screens/HomeScreen.js`
- Main screen showing listings loaded from `rentals.json`
- Includes filters or sorting options
- Allows user to save listings

### `/screens/SavedScreen.js`
- Displays saved listings
- Reads from local AsyncStorage

### `/utils/storage.js`
- AsyncStorage helper functions:
  - `saveListing()`
  - `removeListing()`
  - `getSavedListings()`

### `/utils/helpers.js`
- Utility functions for formatting and sorting:
  - `formatPrice()`
  - `sortByPrice()`

### `scraper.py`
- Python script using BeautifulSoup
- Scrapes rental listings from a target website
- Outputs `rentals.json` with cleaned rental data

---

## 🧠 Where State Lives

- `App.js` holds the main state:
  - `listings`: loaded from `rentals.json`
  - `savedListings`: loaded from AsyncStorage
- `useEffect()` is used to load listings on mount
- State is passed to screens via props or React Navigation context

---

## 🔗 How Services Connect

scraper.py → /data/rentals.json → App.js → Screens → Components
↘ AsyncStorage for saved listings

yaml
Copy
Edit

- `scraper.py` manually creates/updates the JSON data
- React Native reads `rentals.json` into state
- AsyncStorage manages saved listings
- UI components render listings from state

---







