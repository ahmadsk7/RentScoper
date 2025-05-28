import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AverageRentChart from '../components/AverageRentChart';
import { aggregatePrices } from '../utils/helpers';
import * as FileSystem from 'expo-file-system';

export default function RentPrices() {
  const [aggregatedData, setAggregatedData] = React.useState([]);

  React.useEffect(() => {
    const loadListings = async () => {
      try {
        // Load the JSON file directly from the project directory
        const data = require('../data/rentals.json');
        console.log('Loaded data length:', data.length);
        
        const aggregatedData = aggregatePrices(data);
        console.log('Aggregated data:', aggregatedData);
        
        setAggregatedData(aggregatedData);
      } catch (err) {
        console.error('Error loading listings:', err);
      }
    };

    loadListings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rent Price Trends</Text>
      <AverageRentChart data={aggregatedData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
}); 