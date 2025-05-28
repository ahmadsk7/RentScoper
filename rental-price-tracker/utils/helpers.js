// Function to format price string to number
export const formatPrice = (str) => {
  return parseInt(str.replace(/[$,]/g, ''), 10);
};

// Function to aggregate prices by ZIP or neighborhood
export const aggregatePrices = (listings) => {
  const aggregated = {};

  listings.forEach(listing => {
    const { location, price, date } = listing;
    const zip = location.split(',')[1]?.trim() || 'Unknown';
    const priceNum = formatPrice(price);

    if (!aggregated[zip]) {
      aggregated[zip] = {
        totalPrice: 0,
        count: 0,
        dates: new Set()
      };
    }

    aggregated[zip].totalPrice += priceNum;
    aggregated[zip].count += 1;
    aggregated[zip].dates.add(date);
  });

  return Object.entries(aggregated).map(([zip, data]) => ({
    zip,
    avgPrice: Math.round(data.totalPrice / data.count),
    date: Array.from(data.dates)[0] // Using the first date for simplicity
  }));
}; 