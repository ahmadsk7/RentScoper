import { View, StyleSheet, FlatList } from 'react-native';
import ListingCard from '../components/ListingCard';

// Load the rental data
const rentalData = require('../data/rentals.json');

export default function HomeScreen() {
  const handleSave = (item: any) => {
    // We'll implement saving functionality later
    console.log('Saving listing:', item.title);
  };

  const renderItem = ({ item }) => (
    <ListingCard
      title={item.title}
      price={item.price}
      location={item.location}
      image={item.image}
      onSave={() => handleSave(item)}
    />
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
});
