import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AverageRentChart from '../components/AverageRentChart';
import { aggregatePrices } from '../utils/helpers';

export default function RentPrices() {
  const [aggregatedData, setAggregatedData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const loadListings = async () => {
      try {
        console.log('Attempting to load data...');
        
        // Try to load the data
        const data = require('../data/rentals.json');
        console.log('Data loaded successfully, length:', data.length);
        
        if (!data || data.length === 0) {
          console.log('No data found in rentals.json');
          setError('No rental data available');
          return;
        }

        // Log the first item to verify structure
        console.log('First item:', data[0]);
        
        // Try to aggregate the data
        const aggregated = aggregatePrices(data);
        console.log('Aggregated data:', aggregated);
        
        if (!aggregated || aggregated.length === 0) {
          console.log('No aggregated data produced');
          setError('Could not process rental data');
          return;
        }

        setAggregatedData(aggregated);
        setError(null);
      } catch (err: any) {
        console.error('Error in loadListings:', err);
        setError(err.message || 'Failed to load data');
      }
    };

    loadListings();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average Rent Price In Each Area of Ann Arbor</Text>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <AverageRentChart data={aggregatedData} />
      )}
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
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
}); 