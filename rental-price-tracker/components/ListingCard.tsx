import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useState, useCallback } from 'react';
import { saveListing, SavedListing } from '../utils/storage';

type ListingCardProps = {
  title: string;
  price: string;
  location: string;
  image: string;
  url: string;
  date: string;
  onSave: () => void;
};

export default function ListingCard({ title, price, location, image, url, date, onSave }: ListingCardProps) {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (isSaving) return; // Prevent double-save
    
    console.log('Save button pressed for:', title);
    setIsSaving(true);
    
    try {
      const listing: SavedListing = {
        title,
        price,
        location,
        image,
        url,
        date
      };
      console.log('Attempting to save listing:', listing);
      await saveListing(listing);
      console.log('Save completed for:', title);
      onSave();
    } catch (error) {
      console.error('Error saving listing:', error);
    } finally {
      setIsSaving(false);
    }
  }, [isSaving, title, price, location, image, url, date, onSave]);

  return (
    <View style={styles.card}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
      <TouchableOpacity 
        style={[
          styles.saveButton, 
          isSaving && styles.savingButton
        ]} 
        onPress={handleSave}
        disabled={isSaving}
      >
        <Text style={styles.saveButtonText}>
          {isSaving ? 'Saving...' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  content: {
    padding: 16,
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
  saveButton: {
    backgroundColor: '#3498db',
    padding: 12,
    alignItems: 'center',
  },
  savingButton: {
    backgroundColor: '#95a5a6',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
}); 