// Function to format price string to number
export const formatPrice = (str) => {
  return parseInt(str.replace(/[$,]/g, ''), 10);
};

// Function to extract location name from address
const extractLocation = (location) => {
  // If it's just a city name
  if (location.includes('Ann Arbor')) return 'Ann Arbor';
  if (location.includes('Ypsilanti')) return 'Ypsilanti';
  
  // If it's an address, try to get the city
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[1].trim();
  }
  
  // If it's just a neighborhood or area
  return location.trim();
};

// Function to aggregate prices by location
export const aggregatePrices = (listings) => {
  const aggregated = {};

  listings.forEach(listing => {
    const { location, price } = listing;
    const locationName = extractLocation(location);
    const priceNum = formatPrice(price);

    if (!aggregated[locationName]) {
      aggregated[locationName] = {
        totalPrice: 0,
        count: 0
      };
    }

    aggregated[locationName].totalPrice += priceNum;
    aggregated[locationName].count += 1;
  });

  return Object.entries(aggregated)
    .map(([location, data]) => ({
      zip: location,
      avgPrice: Math.round(data.totalPrice / data.count)
    }))
    .sort((a, b) => b.avgPrice - a.avgPrice); // Sort by price descending
}; 