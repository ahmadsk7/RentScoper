import { View, Text, StyleSheet, FlatList } from 'react-native';

// Load the rental data
const rentalData = require('../data/rentals.json');

export default function HomeScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.listingItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.location}>{item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={rentalData}
        renderItem={renderItem}
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
  listingItem: {
    backgroundColor: 'white',
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#2ecc71',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
});
