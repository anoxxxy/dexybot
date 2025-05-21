/**
 * Crypto Trading Rules Implementation
 * 
 * This module provides functions to establish trading rules across different
 * cryptocurrency markets (BTC, ETH, LTC, NEO, etc.) regardless of whether
 * they trade in USDT, BTC (satoshi), or other base currencies.
 */

/**
 * Calculate minimum and maximum push prices based on current market price
 * Can use either absolute price values or percentages
 * 
 * @param {number} currentPrice - Current price of the cryptocurrency
 * @param {Object} options - Configuration options
 * @param {number|null} options.minPushAmount - Minimum price movement as absolute amount (overrides percentage)
 * @param {number|null} options.maxPushAmount - Maximum price movement as absolute amount (overrides percentage)
 * @param {number} options.minPushPercentage - Minimum price movement percentage (default: 0.5%)
 * @param {number} options.maxPushPercentage - Maximum price movement percentage (default: 2.5%)
 * @param {number|null} options.decimals - Custom decimal precision (overrides automatic precision)
 * @returns {Object} Object containing min and max push prices
 */
function calculatePushLimits(currentPrice, options = {}) {
  // Set defaults and extract options
  const {
    minPushAmount = null,
    maxPushAmount = null,
    minPushPercentage = 0.5,
    maxPushPercentage = 2.5,
    decimals = null
  } = options;
  
  // Validate current price
  if (currentPrice <= 0) {
    throw new Error('Current price must be positive');
  }
  
  let minPushPrice, maxPushPrice;
  
  // Use absolute amounts if provided, otherwise use percentages
  if (minPushAmount !== null && maxPushAmount !== null) {
    minPushPrice = currentPrice + minPushAmount;
    maxPushPrice = currentPrice + maxPushAmount;
    
    // Validate min/max relationship
    if (minPushPrice >= maxPushPrice) {
      throw new Error('Min push price must be less than max push price');
    }
  } else {
    // Fallback to percentage-based calculation
    if (minPushPercentage >= maxPushPercentage) {
      throw new Error('Min push percentage must be less than max push percentage');
    }
    
    // Calculate min and max push based on percentages of current price
    minPushPrice = currentPrice * (1 + minPushPercentage / 100);
    maxPushPrice = currentPrice * (1 + maxPushPercentage / 100);
  }
  
  return {
    minPushPrice: formatPriceForMarket(minPushPrice, currentPrice, decimals),
    maxPushPrice: formatPriceForMarket(maxPushPrice, currentPrice, decimals),
    // Include mode info for clarity
    mode: minPushAmount !== null ? 'absolute' : 'percentage'
  };
}

/**
 * Format price according to the market's typical precision
 * 
 * @param {number} price - Price to format
 * @param {number} referencePrice - Reference price to determine precision
 * @param {number|null} decimals - Optional custom decimal precision
 * @returns {number} Formatted price with appropriate precision
 */
function formatPriceForMarket(price, referencePrice, decimals = null) {
  // Use custom decimal precision if provided
  let precision;
  
  if (decimals !== null && Number.isInteger(decimals) && decimals >= 0) {
    precision = decimals;
  } else {
    // Determine appropriate decimal precision based on price magnitude
    if (referencePrice >= 10000) {         // BTC/USDT range
      precision = 1;
    } else if (referencePrice >= 1000) {   // High-value coins
      precision = 2;
    } else if (referencePrice >= 100) {    // Mid-value coins
      precision = 3;
    } else if (referencePrice >= 10) {     // Lower-value coins
      precision = 4;
    } else if (referencePrice >= 1) {      // Very low-value coins
      precision = 5;
    } else if (referencePrice >= 0.1) {    // Micro-value coins
      precision = 6;
    } else {                               // Ultra micro-value coins
      precision = 8;
    }
  }
  
  // Format the price to the appropriate precision
  const multiplier = Math.pow(10, precision);
  return Math.round(price * multiplier) / multiplier;
}

/**
 * Generate random tick prices between min and max push prices
 * 
 * @param {number} minPushPrice - Minimum push price
 * @param {number} maxPushPrice - Maximum push price
 * @param {number} numTicks - Number of ticks to generate (default: 5)
 * @param {number} currentPrice - Current price for reference
 * @param {number|null} decimals - Optional custom decimal precision
 * @returns {Array<number>} Array of tick prices sorted from lowest to highest
 */
function generateTickPrices(minPushPrice, maxPushPrice, numTicks = 5, currentPrice, decimals = null) {
  if (numTicks < 1) {
    return [];
  }
  
  const ticks = [];
  
  // Generate random ticks
  for (let i = 0; i < numTicks; i++) {
    const randomFactor = Math.random();
    const tickPrice = minPushPrice + (maxPushPrice - minPushPrice) * randomFactor;
    ticks.push(formatPriceForMarket(tickPrice, currentPrice, decimals));
  }
  
  // Sort ticks from lowest to highest
  return ticks.sort((a, b) => a - b);
}

/**
 * Generate a complete trading rule set based on current market conditions
 * 
 * @param {number} currentPrice - Current price of the cryptocurrency
 * @param {Object} options - Optional configuration parameters
 * @param {number|null} options.minPushAmount - Absolute min price increase (overrides percentage)
 * @param {number|null} options.maxPushAmount - Absolute max price increase (overrides percentage)
 * @param {number} options.minPushPercentage - Min price increase percentage (default: 0.5%)
 * @param {number} options.maxPushPercentage - Max price increase percentage (default: 2.5%)
 * @param {number} options.numTicks - Number of tick prices to generate (default: 5)
 * @param {number|null} options.decimals - Custom decimal precision (overrides automatic precision)
 * @returns {Object} Complete trading rule set
 */
function generateTradingRules(currentPrice, options = {}) {
  const {
    minPushAmount = null,
    maxPushAmount = null,
    minPushPercentage = 0.5,
    maxPushPercentage = 2.5,
    numTicks = 5,
    decimals = null
  } = options;
  
  // Calculate push limits with support for both absolute and percentage modes
  const { minPushPrice, maxPushPrice, mode } = calculatePushLimits(currentPrice, {
    minPushAmount,
    maxPushAmount,
    minPushPercentage,
    maxPushPercentage,
    decimals
  });
  
  // Generate tick prices
  const tickPrices = generateTickPrices(minPushPrice, maxPushPrice, numTicks, currentPrice, decimals);
  
  return {
    currentPrice: formatPriceForMarket(currentPrice, currentPrice, decimals),
    minPushPrice,
    maxPushPrice,
    tickPrices,
    ticksCount: tickPrices.length,
    pushMode: mode, // Indicate which mode was used (absolute or percentage)
    // Include the raw push values for reference
    pushValues: mode === 'absolute' 
      ? { minPushAmount, maxPushAmount } 
      : { minPushPercentage, maxPushPercentage },
    // Include the decimal precision that was used
    decimalPrecision: decimals !== null ? decimals : getDefaultPrecision(currentPrice)
  };
}

/**
 * Helper function to get the default precision based on price
 * 
 * @param {number} price - Price to determine precision for
 * @returns {number} Default precision for the given price
 */
function getDefaultPrecision(price) {
  if (price >= 10000) return 1;
  if (price >= 1000) return 2;
  if (price >= 100) return 3;
  if (price >= 10) return 4;
  if (price >= 1) return 5;
  if (price >= 0.1) return 6;
  return 8;
}

/**
 * Example usage for different cryptocurrencies
 */
function exampleUsage() {
  // BTC/USDT example (high value)
  const btcRules = generateTradingRules(60123.45);
  console.log("BTC/USDT Rules:", btcRules);
  
  // ETH/USDT example (medium-high value) with custom 3 decimals
  const ethRules = generateTradingRules(3245.67, { decimals: 3 });
  console.log("ETH/USDT Rules with custom 3 decimals:", ethRules);
  
  // LTC/USDT example (medium value)
  const ltcRules = generateTradingRules(83.25);
  console.log("LTC/USDT Rules:", ltcRules);
  
  // NEO/USDT example (lower value) with custom 6 decimals
  const neoRules = generateTradingRules(12.34, { decimals: 6 });
  console.log("NEO/USDT Rules with custom 6 decimals:", neoRules);
  
  // Altcoin/BTC example (expressed in satoshi)
  const altcoinSatoshi = 0.00004523; // Low-value altcoin priced in BTC
  const altcoinRules = generateTradingRules(altcoinSatoshi);
  console.log("Altcoin/BTC Rules:", altcoinRules);

  // BAYR/BAY example (expressed in satoshi)
  var bayrSatoshi = 0.01067004; // Low-value altcoin priced in BTC
  var bayrRules1 = generateTradingRules(bayrSatoshi, {
  	minPushAmount: 0.000001,
  	maxPushAmount: 0.000005,
  });
  console.log("BAYR/BAY Rules:", bayrRules1);
}

// Export the functions for use in trading systems
module.exports = {
  calculatePushLimits,
  formatPriceForMarket,
  generateTickPrices,
  generateTradingRules,
  getDefaultPrecision
};