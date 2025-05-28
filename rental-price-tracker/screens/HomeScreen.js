import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native';
import { useState, useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function HomeScreen() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Read the JSON file
      const filePath = `${FileSystem.documentDirectory}data/rentals.json`;
      const fileInfo = await FileSystem.getInfoAsync(filePath);
      
      if (!fileInfo.exists) {
        setError('No listings found. Please run the scraper first.');
        setListings([]);
        return;
      }

      const content = await FileSystem.readAsStringAsync(filePath);
      const data = JSON.parse(content);
      console.log('Loaded listings:', data.slice(0, 2)); // Log first two listings
      setListings(data);
    } catch (err) {
      setError('Failed to load listings. Please try again.');
      console.error('Error loading listings:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadListings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    loadListings();
  };

  const renderItem = ({ item }) => {
    console.log('Rendering item:', item.title, 'Image URL:', item.image); // Log each item being rendered
    return (
      <View style={styles.listingItem}>
        <View style={styles.imageContainer}>
          {item.image ? (
            <Image
              source={{ uri: item.image }}
              style={styles.image}
              resizeMode="cover"
              onError={(e) => console.log('Image loading error for', item.title, ':', e.nativeEvent.error)}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
        </View>
        <View style={styles.listingContent}>
          <Text style={styles.title} numberOfLines={2}>{item.title}</Text>
          <Text style={styles.price}>{item.price}</Text>
          <Text style={styles.location}>{item.location}</Text>
          <Text style={styles.date}>Posted: {item.date}</Text>
        </View>
      </View>
    );
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2ecc71" />
        <Text style={styles.loadingText}>Loading listings...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listings}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#2ecc71']}
          />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>No listings available</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  listingItem: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  listingContent: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#2c3e50',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
}); 