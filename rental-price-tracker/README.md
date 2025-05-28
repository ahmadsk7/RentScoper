# Rental Price Tracker

A React Native application that tracks and visualizes rental prices in Ann Arbor, helping users understand the rental market trends.

## Features

### 1. Rental Listings

- Scrapes rental listings from Craigslist
- Displays listings with key information:
  - Price
  - Location
  - Title
  - Date posted
  - URL

### 2. Price Trends Visualization

- Interactive bar chart showing average rent prices by area
- Color-coded bars indicating price ranges
- Real-time price updates
- Easy-to-read location labels and price tags

### 3. Data Management

- Automatic data collection through web scraping
- Historical price tracking
- Data aggregation by location
- JSON storage for easy data access

## Tech Stack

### Frontend

- **React Native** with Expo for cross-platform mobile development
- **TypeScript** for type safety and better development experience
- **Victory Native** for data visualization
- **React Navigation** for screen navigation

### Backend/Data Collection

- **Python** for web scraping
- **BeautifulSoup4** for HTML parsing
- **Requests** for HTTP requests

### Data Storage

- JSON files for data persistence
- AsyncStorage for local data caching

## Project Structure

```
rental-price-tracker/
├── app/                    # Main application screens
│   ├── rent-prices.tsx    # Price trends visualization
│   └── _layout.tsx        # Navigation layout
├── components/            # Reusable UI components
│   ├── ListingCard.tsx   # Individual listing display
│   └── AverageRentChart.tsx # Price visualization
├── utils/                # Utility functions
│   └── helpers.ts        # Data processing helpers
├── data/                 # Data storage
│   ├── rentals.json     # Current listings
│   └── rentals_history.json # Historical data
└── scraper.py           # Web scraping script
```

## Setup and Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the scraper to collect data:
   ```bash
   python scraper.py
   ```
5. Start the Expo development server:
   ```bash
   npx expo start
   ```

## How It Works

1. **Data Collection**

   - The Python scraper collects rental listings from Craigslist
   - Data is saved to JSON files with timestamps
   - Historical data is maintained for trend analysis

2. **Data Processing**

   - Listings are aggregated by location
   - Average prices are calculated
   - Data is formatted for visualization

3. **Visualization**
   - Interactive bar chart shows price trends
   - Color intensity indicates price ranges
   - Easy-to-read labels and price tags

## Future Enhancements

- Price drop alerts
- Filtering by price range and location
- More detailed property information
- User favorites and saved searches
- Push notifications for new listings

## Contributing

Feel free to submit issues and enhancement requests!

# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
