import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useEffect, useState } from 'react';
import { getSavedListings, SavedListing } from '../utils/storage';
import ListingCard from '../components/ListingCard';

export default function SavedScreen() {
  const [savedListings, setSavedListings] = useState<SavedListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSavedListings();
  }, []);

  const loadSavedListings = async () => {
    try {
      const listings = await getSavedListings();
      setSavedListings(listings);
    } catch (error) {
      console.error('Error loading saved listings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    // Refresh the list after a save
    loadSavedListings();
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading saved listings...</Text>
      </View>
    );
  }

  if (savedListings.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No saved listings yet</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedListings}
        renderItem={({ item }) => (
          <ListingCard
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            url={item.url}
            date={item.date}
            onSave={handleSave}
          />
        )}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 