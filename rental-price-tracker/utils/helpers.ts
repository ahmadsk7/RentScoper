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