import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_LISTINGS_KEY = '@saved_listings';

export type SavedListing = {
  title: string;
  price: string;
  location: string;
  image: string;
  url: string;
  date: string;
};

export async function saveListing(listing: SavedListing): Promise<void> {
  try {
    console.log('Storage: Getting existing saved listings');
    // Get existing saved listings
    const savedListings = await getSavedListings();
    console.log('Storage: Current saved listings:', savedListings);
    
    // Add new listing if it's not already saved
    if (!savedListings.some(item => item.url === listing.url)) {
      console.log('Storage: Adding new listing');
      savedListings.push(listing);
      await AsyncStorage.setItem(SAVED_LISTINGS_KEY, JSON.stringify(savedListings));
      console.log('Storage: Successfully saved listing');
    } else {
      console.log('Storage: Listing already exists');
    }
  } catch (error) {
    console.error('Storage: Error saving listing:', error);
  }
}

export async function removeListing(url: string): Promise<void> {
  try {
    const savedListings = await getSavedListings();
    const updatedListings = savedListings.filter(listing => listing.url !== url);
    await AsyncStorage.setItem(SAVED_LISTINGS_KEY, JSON.stringify(updatedListings));
  } catch (error) {
    console.error('Error removing listing:', error);
  }
}

export async function getSavedListings(): Promise<SavedListing[]> {
  try {
    const savedListings = await AsyncStorage.getItem(SAVED_LISTINGS_KEY);
    return savedListings ? JSON.parse(savedListings) : [];
  } catch (error) {
    console.error('Error getting saved listings:', error);
    return [];
  }
} 