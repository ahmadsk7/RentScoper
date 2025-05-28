import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import AverageRentChart from '../components/AverageRentChart';
import { aggregatePrices } from '../utils/helpers';
import * as FileSystem from 'expo-file-system';

const RentTrendsScreen = () => {
  const [aggregatedData, setAggregatedData] = useState([]);

  useEffect(() => {
    const loadListings = async () => {
      try {
        const filePath = `${FileSystem.documentDirectory}data/rentals.json`;
        const fileInfo = await FileSystem.getInfoAsync(filePath);
        
        if (!fileInfo.exists) {
          console.error('No listings found. Please run the scraper first.');
          return;
        }

        const content = await FileSystem.readAsStringAsync(filePath);
        const data = JSON.parse(content);
        const aggregatedData = aggregatePrices(data);
        setAggregatedData(aggregatedData);
      } catch (err) {
        console.error('Error loading listings:', err);
      }
    };

    loadListings();
  }, []);

  return (
    <View style={styles.container}>
      <AverageRentChart data={aggregatedData} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default RentTrendsScreen; 