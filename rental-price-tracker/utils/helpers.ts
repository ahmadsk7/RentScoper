/**
 * Converts a price string (e.g., "$1,200") to a number (1200)
 * @param priceStr - The price string to format
 * @returns The price as a number
 */
export function formatPrice(priceStr: string): number {
  // Remove $ and , from the string
  const cleanStr = priceStr.replace(/[$,]/g, '');
  // Convert to number
  return Number(cleanStr);
}

/**
 * Sorts an array of listings by price
 * @param listings - Array of listings to sort
 * @param ascending - Whether to sort in ascending order (default: true)
 * @returns Sorted array of listings
 */
export function sortByPrice(listings: any[], ascending: boolean = true): any[] {
  return [...listings].sort((a, b) => {
    const priceA = formatPrice(a.price);
    const priceB = formatPrice(b.price);
    return ascending ? priceA - priceB : priceB - priceA;
  });
}

interface Listing {
  location: string;
  price: string;
}

interface AggregatedData {
  zip: string;
  avgPrice: number;
}

const extractLocation = (location: string): string => {
  if (location.includes('Ann Arbor')) return 'Ann Arbor';
  if (location.includes('Ypsilanti')) return 'Ypsilanti';
  
  const parts = location.split(',');
  if (parts.length > 1) {
    return parts[1].trim();
  }
  
  return location.trim();
};

export const aggregatePrices = (listings: Listing[]): AggregatedData[] => {
  const aggregated: { [key: string]: { totalPrice: number; count: number } } = {};

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
    .sort((a, b) => b.avgPrice - a.avgPrice);
}; 