import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const AverageRentChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No data available</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {data.map((item, index) => (
        <View key={index} style={styles.chartItem}>
          <Text style={styles.zipCode}>{item.zip}</Text>
          <View style={styles.barContainer}>
            <View 
              style={[
                styles.bar, 
                { width: `${Math.min((item.avgPrice / 2000) * 100, 100)}%` }
              ]} 
            />
          </View>
          <Text style={styles.price}>${item.avgPrice}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
  },
  chartItem: {
    marginBottom: 20,
  },
  zipCode: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barContainer: {
    height: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#2ecc71',
    borderRadius: 10,
  },
  price: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
  },
});

export default AverageRentChart; 