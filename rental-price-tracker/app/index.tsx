import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useState } from 'react';
import ListingCard from '../components/ListingCard';
import { sortByPrice } from '../utils/helpers';

// Load the rental data
const rentalData = require('../data/rentals.json');

export default function HomeScreen() {
  const [listings, setListings] = useState(rentalData);
  const [sortAscending, setSortAscending] = useState(true);

  const handleSort = () => {
    const sortedListings = sortByPrice(listings, sortAscending);
    setListings(sortedListings);
    setSortAscending(!sortAscending);
  };

  const handleSave = (url: string) => {
    console.log('HomeScreen: Save callback received for URL:', url);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
        <Text style={styles.sortButtonText}>
          Sort by Price {sortAscending ? '↑' : '↓'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={listings}
        renderItem={({ item }) => (
          <ListingCard
            title={item.title}
            price={item.price}
            location={item.location}
            image={item.image}
            url={item.url}
            date={item.date}
            onSave={() => handleSave(item.url)}
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
  },
  listContainer: {
    padding: 16,
  },
  sortButton: {
    backgroundColor: '#3498db',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  sortButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
