/**
 * Crypto Trading Rules Implementation
 * 
 * This module provides functions to establish trading rules across different
 * cryptocurrency markets (BTC, ETH, LTC, NEO, etc.) for market making activities.
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
    decimals = null,
    side = null
  } = options;

  console.log('calculatePushLimits side', side);
  console.log('calculatePushLimits minPushAmount', minPushAmount);
  console.log('calculatePushLimits maxPushAmount', maxPushAmount);
  // Validate current price
  if (currentPrice <= 0) {
    throw new Error('Current price must be positive');
  }

  let minPushPrice, maxPushPrice;

  // Use absolute amounts if provided, otherwise use percentages
  if (minPushAmount !== null && maxPushAmount !== null) {
    minPushPrice = currentPrice + minPushAmount;
    maxPushPrice = currentPrice + maxPushAmount;

    if (side == 'bid') {
    	minPushPrice = currentPrice + minPushAmount;
    	maxPushPrice = currentPrice + maxPushAmount;
    }
    if (side == 'ask') {
    	minPushPrice = currentPrice - minPushAmount;
    	maxPushPrice = currentPrice - maxPushAmount;
    }
    // Validate min/max relationship
    /*if (minPushPrice > maxPushPrice) {
      console.log('Min push price must be less than max push price', minPushPrice, maxPushPrice);
      throw new Error('Min push price must be less than max push price', minPushPrice, maxPushPrice);
    }
    */
  } else {
    // Fallback to percentage-based calculation
    if (minPushPercentage > maxPushPercentage) {
      console.error('Min push percentage must be less than max push percentage', minPushPercentage, maxPushPercentage);
      throw new Error('Min push percentage must be less than max push percentage',minPushPercentage, maxPushPercentage);
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
      precision = 2;
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
 * Adjusts price based on market trend
 * 
 * @param {number} price - Base price to adjust
 * @param {string} trend - Market trend ('neutral', 'above', 'below', 'strong_above', 'strong_below')
 * @param {number} adjustmentFactor - Percentage to adjust by (default: 0.2%)
 * @returns {number} Adjusted price
 */
function adjustPriceForTrend(price, trend, adjustmentFactor = 0.2) {
  switch (trend) {
    case 'above':
      //return price * (1 + adjustmentFactor / 100);
      return price * (1 + (adjustmentFactor * 1.5) / 100);
    case 'below':
      //return price * (1 - adjustmentFactor / 100);
      return price * (1 - (adjustmentFactor * 1.5) / 100);
    case 'strong_above':
      return price * (1 + (adjustmentFactor * 2) / 100);
    case 'strong_below':
      return price * (1 - (adjustmentFactor * 2) / 100);
    case 'neutral':
    default:
      return price;
  }
}

1.1 * (1 + (0.2 * 1.1) / 100)
/**
* Calculate bid and ask prices for market making with enhanced trend support
*
* @param {number} midPrice - Mid-market price
* @param {Object} options - Configuration options
* @param {number} options.spreadPercentage - Bid-ask spread as percentage (default: 0.5%)
* @param {string} options.marketTrend - Overall market trend (extended options for bullish/bearish)
* @param {string} options.bidTrend - Specific trend for bid price (extended options)
* @param {string} options.askTrend - Specific trend for ask price (extended options)
* @param {number} options.trendAdjustment - Base adjustment percentage for trends (default: 0.2%)
* @param {number} options.spreadBiasPercentage - How much to skew the spread in trend direction (default: 30%)
* @param {number|null} options.decimals - Custom decimal precision
* @returns {Object} Bid and ask prices with spread information
*/
function calculateBidAskPrices(midPrice, options = {}) {
  const {
    spreadPercentage = 0.5,
    marketTrend = 'neutral',
    bidTrend = 'neutral',
    askTrend = 'neutral',
    trendAdjustment = 0.2,
    spreadBiasPercentage = 30,
    decimals = null
  } = options;

  console.log('calculateBidAskPrices options:', options);
 
  // Calculate half spread
  const halfSpreadBase = spreadPercentage / 200;
 
  // Adjust spread bias based on market trend
  let bidSpreadMultiplier = 1;
  let askSpreadMultiplier = 1;
 
  // Apply spread bias based on market trend (0-100%)
  const biasAmount = spreadBiasPercentage / 100;
 
  // Enhanced market trend handling
  switch (marketTrend) {
    // Original trends
    case 'bullish':
      bidSpreadMultiplier = 1 - (biasAmount * 0.5);
      askSpreadMultiplier = 1 + (biasAmount * 0.5);
      break;
    case 'bearish':
      bidSpreadMultiplier = 1 + (biasAmount * 0.5);
      askSpreadMultiplier = 1 - (biasAmount * 0.5);
      break;
    case 'strong_bullish':
      bidSpreadMultiplier = 1 - biasAmount;
      askSpreadMultiplier = 1 + biasAmount;
      break;
    case 'strong_bearish':
      bidSpreadMultiplier = 1 + biasAmount;
      askSpreadMultiplier = 1 - biasAmount;
      break;
     
    // New bullish trend levels
    case 'rising_bullish':
      bidSpreadMultiplier = 1 - (biasAmount * 0.7);
      askSpreadMultiplier = 1 + (biasAmount * 0.7);
      break;
    case 'surging_bullish':
      bidSpreadMultiplier = 1 - (biasAmount * 1.2);
      askSpreadMultiplier = 1 + (biasAmount * 1.2);
      break;
    case 'breakout_bullish':
      bidSpreadMultiplier = 1 - (biasAmount * 1.5);
      askSpreadMultiplier = 1 + (biasAmount * 1.5);
      break;
    case 'extreme_bullish':
      bidSpreadMultiplier = 1 - (biasAmount * 2);
      askSpreadMultiplier = 1 + (biasAmount * 2);
      break;
     
    // New bearish trend levels
    case 'falling_bearish':
      bidSpreadMultiplier = 1 + (biasAmount * 0.7);
      askSpreadMultiplier = 1 - (biasAmount * 0.7);
      break;
    case 'dropping_bearish':
      bidSpreadMultiplier = 1 + (biasAmount * 1.2);
      askSpreadMultiplier = 1 - (biasAmount * 1.2);
      break;
    case 'breakdown_bearish':
      bidSpreadMultiplier = 1 + (biasAmount * 1.5);
      askSpreadMultiplier = 1 - (biasAmount * 1.5);
      break;
    case 'extreme_bearish':
      bidSpreadMultiplier = 1 + (biasAmount * 2);
      askSpreadMultiplier = 1 - (biasAmount * 2);
      break;
     
    case 'neutral':
    default:
      // Keep the spread balanced
      break;
  }
 
  // Apply adjusted spread multipliers
  const bidHalfSpread = halfSpreadBase * bidSpreadMultiplier;
  const askHalfSpread = halfSpreadBase * askSpreadMultiplier;
 
  // Calculate base bid and ask with adjusted spread
  let bidPrice = midPrice * (1 - bidHalfSpread);
  let askPrice = midPrice * (1 + askHalfSpread);
 //let bidPrice = midPrice;
 //let askPrice = midPrice;
 
  // Apply additional trend adjustments for fine-tuning

  console.log('midPrice: ', midPrice);
  console.log('bidPrice: ', bidPrice);
  console.log('askPrice: ', askPrice);
  console.log('bidHalfSpread: ', bidHalfSpread);
  console.log('askHalfSpread: ', askHalfSpread);
  
  bidPrice = adjustPriceForTrend(bidPrice, bidTrend, trendAdjustment);
  askPrice = adjustPriceForTrend(askPrice, askTrend, trendAdjustment);
 	
 	console.log('bidPrice: ', bidPrice);
  console.log('askPrice: ', askPrice);
 	//bidPrice = midPrice * (1 - bidHalfSpread);
  //askPrice = midPrice * (1 + askHalfSpread);
 
 console.log('=bidPrice: ', bidPrice);
  console.log('=askPrice: ', askPrice);

  // Calculate actual spread and percentage after all adjustments
  const finalSpread = askPrice - bidPrice;
  const finalSpreadPercentage = (finalSpread / midPrice) * 100;
 
  // Format to appropriate precision
  return {
    bidPrice: formatPriceForMarket(bidPrice, midPrice, decimals),
    askPrice: formatPriceForMarket(askPrice, midPrice, decimals),
    spread: formatPriceForMarket(finalSpread, midPrice, decimals),
    spreadPercentage: formatPriceForMarket(finalSpreadPercentage, midPrice, 2),
    spreadBias: marketTrend !== 'neutral' ? marketTrend : 'none'
  };
}

/**
 * Generate a complete market making rule set with improved push limits
 * 
 * @param {number} midPrice - Mid-market price
 * @param {Object} options - Configuration options
 * @param {number} options.spreadPercentage - Bid-ask spread percentage (default: 0.5%)
 * @param {string} options.marketTrend - Overall market trend
 * @param {string} options.bidTrend - Trend for bid side ('neutral', 'above', 'below')
 * @param {string} options.askTrend - Trend for ask side ('neutral', 'above', 'below')
 * @param {number} options.trendAdjustment - Adjustment factor for trends (default: 0.2%)
 * @param {number} options.minPushPercentage - Min push percentage for ticks (default: 0.1%)
 * @param {number} options.maxPushPercentage - Max push percentage for ticks (default: 0.5%)
 * @param {number|null} options.minPushAmount - Absolute min push amount (overrides percentage)
 * @param {number|null} options.maxPushAmount - Absolute max push amount (overrides percentage)
 * @param {number} options.bidTicks - Number of bid ticks to generate (default: 3)
 * @param {number} options.askTicks - Number of ask ticks to generate (default: 3)
 * @param {number|null} options.decimals - Custom decimal precision
 * @returns {Object} Complete market making rule set
 */
function generateMarketMakingRules(midPrice, options = {}) {
  let {
    spreadPercentage = 0.5,
    marketTrend = 'neutral',
    bidTrend = 'neutral',
    askTrend = 'neutral',
    trendAdjustment = 0.2,
    minPushPercentage = 0.1,
    maxPushPercentage = 0.5,
    minPushAmount = null,
    maxPushAmount = null,
    
    minBidPushAmount = null,
    maxBidPushAmount = null,
    minAskPushAmount = null,
    maxAskPushAmount = null,

    bidTicks = 3,
    askTicks = 3,
    decimals = null
  } = options;

  //Set default bid ask 
  minBidPushAmount = minBidPushAmount ? minBidPushAmount : minPushAmount;
	maxBidPushAmount = maxBidPushAmount ? maxBidPushAmount : maxPushAmount;

	minAskPushAmount = minAskPushAmount ? minAskPushAmount : minPushAmount;
	maxAskPushAmount = maxAskPushAmount ? maxAskPushAmount : maxPushAmount;

	console.log('minBidPushAmount: ', minBidPushAmount);
	console.log('maxBidPushAmount: ', maxBidPushAmount);
	console.log('minAskPushAmount: ', minAskPushAmount);
	console.log('maxAskPushAmount: ', maxAskPushAmount);

  // Calculate primary bid and ask prices
  const { bidPrice, askPrice, spread, spreadPercentage: calculatedSpread } = 
    calculateBidAskPrices(midPrice, {
      spreadPercentage,
      marketTrend,
      bidTrend,
      askTrend,
      trendAdjustment,
      decimals
    });

  // Generate bid ticks (descending from bid price)
  const bidTickPrices = [];
  if (bidTicks > 0) {/*
    // For bid side, calculate push limits differently since we want prices below bid
    // We'll calculate the actual prices directly rather than using negative values
    let minBidPrice, maxBidPrice;
    
    if (minPushAmount !== null && maxPushAmount !== null) {
      // Using absolute amounts - for bids, we subtract from the price
      // Smaller push (min) results in a higher price
      // Larger push (max) results in a lower price
      minBidPrice = bidPrice - minPushAmount;  // Higher price boundary (closer to bid)
      maxBidPrice = bidPrice - maxPushAmount;  // Lower price boundary (further from bid)
      
      // Make sure min is greater than max for bid side (since prices decrease)
      if (minBidPrice <= maxBidPrice) {
        throw new Error('For bid side, min push amount must create a higher price than max push amount');
      }
    } else {
      // Using percentages
      // For bids, percentage represents how far below the bid price
      minBidPrice = bidPrice * (1 - minPushPercentage / 100);  // Higher boundary
      maxBidPrice = bidPrice * (1 - maxPushPercentage / 100);  // Lower boundary
      
      // Make sure min is greater than max for bid side (since prices decrease)
      if (minBidPrice <= maxBidPrice) {
        throw new Error('For bid side, min push percentage must be less than max push percentage');
      }
    }
    
    // Format prices according to market standards
    minBidPrice = formatPriceForMarket(minBidPrice, bidPrice, decimals);
    maxBidPrice = formatPriceForMarket(maxBidPrice, bidPrice, decimals);
    
    console.log('bidPrice: ', bidPrice);
    console.log('minBidPrice: ', minBidPrice);
    console.log('maxBidPrice: ', maxBidPrice);
    // Generate ticks between min and max bid prices (note order is reversed for bids)
    const ticks = generateTickPrices(
      maxBidPrice,  // Start from lower price 
      minBidPrice,  // End at higher price
      bidTicks, 
      midPrice, 
      decimals
    );
    
    bidTickPrices.push(...ticks);
    */

   // For ask side, we can use calculatePushLimits as intended
    const bidPushOptions = {
      'minPushAmount': minBidPushAmount,
      'maxPushAmount': maxBidPushAmount,
      minPushPercentage,
      maxPushPercentage,
      side: 'bid',
      decimals,
    };
    
    const bidPushLimits = calculatePushLimits(bidPrice, bidPushOptions);
    
    // Generate ticks between min and max push limits
    const ticks = generateTickPrices(
      bidPushLimits.minPushPrice, 
      bidPushLimits.maxPushPrice, 
      askTicks, 
      midPrice,
      decimals
    );
    
    bidTickPrices.push(...ticks);

  }

  // Generate ask ticks (ascending from ask price)
  const askTickPrices = [];
  if (askTicks > 0) {
    // For ask side, we can use calculatePushLimits as intended
    const askPushOptions = {
      'minPushAmount': minAskPushAmount,
      'maxPushAmount': maxAskPushAmount,
      minPushPercentage: minPushPercentage,
      maxPushPercentage: maxPushPercentage,
      side: 'ask',
      decimals: decimals,
    };
    
    const askPushLimits = calculatePushLimits(askPrice, askPushOptions);
    
    // Generate ticks between min and max push limits
    const ticks = generateTickPrices(
      askPushLimits.minPushPrice,
      askPushLimits.maxPushPrice,
      askTicks,
      midPrice,
      decimals
    );
    
    askTickPrices.push(...ticks);
  }

  return {
    midPrice: formatPriceForMarket(midPrice, midPrice, decimals),
    bidPrice,
    askPrice,
    spread,
    spreadPercentage: calculatedSpread,
    bidTrend,
    askTrend,
    bidTickPrices,
    askTickPrices,
    marketStatus: {
      bidTicksCount: bidTickPrices.length,
      askTicksCount: askTickPrices.length,
      totalOrderCount: 2 + bidTickPrices.length + askTickPrices.length
    },
    pushLimitMode: (minPushAmount || minBidPushAmount || minAskPushAmount) ? 'absolute' : 'percentage',
    decimalPrecision: decimals !== null ? decimals : getDefaultPrecision(midPrice)
  };
}

/**
 * Calculate prices for layered ladder orders
 * 
 * @param {number} basePrice - Base price (bid or ask)
 * @param {string} side - Order side ('bid' or 'ask')
 * @param {number} layers - Number of order layers to create
 * @param {number} increment - Price increment percentage between layers
 * @param {number|null} decimals - Custom decimal precision
 * @returns {Array<Object>} Array of prices and quantities for ladder orders
 */
function generateLadderOrders(basePrice, side, layers = 5, increment = 0.2, decimals = null) {
  const orders = [];
  const isAsk = side.toLowerCase() === 'ask';
  const direction = isAsk ? 1 : -1;

  // Common quantity distribution patterns (can be customized)
  const quantityMultipliers = [1, 0.8, 0.65, 0.5, 0.4, 0.3, 0.25, 0.2];

  for (let i = 0; i < layers; i++) {
    // Price increases or decreases by increment percentage with each step
    const priceMultiplier = 1 + (direction * increment * i) / 100;
    const price = formatPriceForMarket(basePrice * priceMultiplier, basePrice, decimals);

    // Quantity decreases as we move away from the base price
    const qtyMultiplier = i < quantityMultipliers.length ? quantityMultipliers[i] : 0.1;

    orders.push({
      price,
      quantityMultiplier: qtyMultiplier,
      level: i + 1
    });
  }

  return orders;
}

/**
 * Helper function to get the default precision based on price
 * 
 * @param {number} price - Price to determine precision for
 * @returns {number} Default precision for the given price
 */
function getDefaultPrecision(price) {
  if (price >= 10000) return 2;
  if (price >= 1000) return 2;
  if (price >= 100) return 3;
  if (price >= 10) return 5;
  if (price >= 1) return 6;
  if (price >= 0.1) return 8;
  return 8;
}

/**
 * Example usage for market making
 */
function exampleMarketMakingUsage() {
  // BTC/USDT example with balanced market
  console.log("\n=== BTC/USDT Market Making (Neutral) ===");
  const btcNeutralRules = generateMarketMakingRules(60123.45);
  console.log(btcNeutralRules);

  // ETH/USDT example with bullish trend
  console.log("\n=== ETH/USDT Market Making (Bullish) ===");
  const ethBullishRules = generateMarketMakingRules(3245.67, {
    bidTrend: 'above',
    askTrend: 'strong_above',
    decimals: 2
  });
  console.log(ethBullishRules);

  // LTC/USDT example with bearish trend
  console.log("\n=== LTC/USDT Market Making (Bearish) ===");
  const ltcBearishRules = generateMarketMakingRules(83.25, {
    bidTrend: 'strong_below',
    askTrend: 'below',
    spreadPercentage: 0.8
  });
  console.log(ltcBearishRules);

  // Ladder order example
  console.log("\n=== Order Ladder Example ===");
  const bidLadder = generateLadderOrders(60000, 'bid', 4, 0.3, 1);
  const askLadder = generateLadderOrders(60300, 'ask', 4, 0.3, 1);
  console.log("Bid Ladder:", bidLadder);
  console.log("Ask Ladder:", askLadder);
}


function exampleMarketMakingUsage() {
  // BTC/USDT example with balanced market
  console.log("\n=== BTC/USDT Market Making (Neutral) ===");
  const btcNeutralRules = generateMarketMakingRules(60123.45);
  console.log(btcNeutralRules);

  // ETH/USDT example with bullish trend
  console.log("\n=== ETH/USDT Market Making (Bullish) ===");
  const ethBullishRules = generateMarketMakingRules(3245.67, {
    bidTrend: 'above',
    askTrend: 'strong_above',
    decimals: 2
  });
  console.log(ethBullishRules);

  // LTC/USDT example with bearish trend
  console.log("\n=== LTC/USDT Market Making (Bearish) ===");
  const ltcBearishRules = generateMarketMakingRules(83.25, {
    bidTrend: 'strong_below',
    askTrend: 'below',
    spreadPercentage: 0.8
  });
  console.log(ltcBearishRules);


  // BAYR/BAY example with bearish trend
  console.log("\n=== BAYR/BAY Market Making (Bearish) ===");
  const bayrBearishRules = generateMarketMakingRules(1.071234814, {
    bidTrend: 'strong_below',
    askTrend: 'below',
    spreadPercentage: 0.8
  });
  console.log(bayrBearishRules);

    // BAYR/BAY example with bearish trend
  console.log("\n=== BAYR/BAY Market Making (Bearish) ===");
  const bayrBearishRules2 = generateMarketMakingRules(1.071234814, {
    bidTrend: 'strong_below',
    askTrend: 'strong_below',
    spreadPercentage: 0.8
  });
  console.log(bayrBearishRules2);

  // BAYR/BAY example with bearish trend
  console.log("\n=== BAYR/BAY Market Making (Bullish) ===");
  const bayrBullishRules = generateMarketMakingRules(1.071234814, {
    bidTrend: 'above',
    askTrend: 'strong_above',
    spreadPercentage: 0.8
  });
  console.log(bayrBullishRules);



  // Ladder order example
  console.log("\n=== Order Ladder Example ===");
  const bidLadder = generateLadderOrders(60000, 'bid', 4, 0.3, 1);
  const askLadder = generateLadderOrders(60300, 'ask', 4, 0.3, 1);
  console.log("Bid Ladder:", bidLadder);
  console.log("Ask Ladder:", askLadder);
}


/**
 * Example usage demonstrating calculatePushLimits integration
 */
function exampleMarketMakingWithPushLimits() {
  console.log("\n=== BTC/USDT Market Making with Push Limits (Percentage) ===");
  const btcRules = generateMarketMakingRules(60123.45, {
    minPushPercentage: 0.2,
    maxPushPercentage: 0.8,
    bidTicks: 4,
    askTicks: 4
  });
  console.log(btcRules);

  console.log("\n=== ETH/USDT Market Making with Push Limits (Absolute) ===");
  const ethRules = generateMarketMakingRules(3245.67, {
    minPushAmount: 2,      // $2 minimum push
    maxPushAmount: 10,     // $10 maximum push
    bidTrend: 'above',
    askTrend: 'strong_above',
    decimals: 2
  });
  console.log(ethRules);
  
  // Example with very low-value coin using percentage push
  console.log("\n=== DOGE/USDT Market Making with Push Limits (Low Value) ===");
  const dogeRules = generateMarketMakingRules(0.095, {
    minPushPercentage: 0.5,
    maxPushPercentage: 2.0,
    spreadPercentage: 1.0,
    bidTicks: 5,
    askTicks: 5
  });
  console.log(dogeRules);


  console.log("\n=== BAYR/BAY Market Making with Push Limits (Absolute) ===");
  var bayrRules = generateMarketMakingRules(1.071234814, {
    minPushAmount: 0.00000100,      // $2 minimum push
    maxPushAmount: 0.00001000,     // $10 maximum push
    bidTrend: 'strong_above',
    askTrend: 'above',
    decimals: 6
  });
  console.log(bayrRules);



  console.log("\n=== BAYR/BAY Market Making with Push Limits (Absolute) ===");
  var bayrRules = generateMarketMakingRules(1.071234814, {
    minPushAmount: 0.00000100,      // 100sat minimum push
    maxPushAmount: 0.00001000,     // 1000sat maximum push
    bidTrend: 'strong_above',
    askTrend: 'neutral',
    decimals: 6
  });
  console.log(bayrRules);


  console.log("\n=== BAYR/BAY Market Making with Push Limits (Absolute) ===");
  var bayrRules = generateMarketMakingRules(1.071, {
    minPushAmount: 0.00000100,      // 100sat minimum push
    maxPushAmount: 0.00001000,     // 1000sat maximum push
    bidTrend: 'strong_above',
    askTrend: 'neutral',
    decimals: 6
  });
  console.log(bayrRules);



  console.log("\n=== BAY/DAI Market Making with Push Limits (Absolute) ===");
  var bayDaiRules = generateMarketMakingRules(1.1, {
    minPushAmount: 0.00001000,      // 100sat minimum push
    maxPushAmount: 0.00002000,     // 1000sat maximum push
    bidTrend: 'strong_above',
    askTrend: 'neutral',
    decimals: 6
  });
  console.log(bayDaiRules);

  console.log("\n=== BAY/DAI Market Making with Push Limits (Absolute) ===");
  var bayDaiRules = generateMarketMakingRules(1.1, {
    minPushAmount: 0.00001000,      // 100sat minimum push
    maxPushAmount: 0.00002000,     // 1000sat maximum push
    bidTrend: 'strong_above',
    askTrend: 'strong_below',
    decimals: 6
  });
  console.log(bayDaiRules);


  console.log("\n=== BAY/DAI Market Making with Push Limits (Absolute) ===");
  var bayDaiRules = generateMarketMakingRules(1.1, {
    minPushAmount: 0.00001000,      // 100sat minimum push
    maxPushAmount: 0.00002000,     // 1000sat maximum push
    bidTrend: 'strong_above',
    askTrend: 'above',
    decimals: 6
  });
  console.log(bayDaiRules);


  console.log("\n=== BAY/DAI Market Making with Push Limits (Absolute) ===");
  var bayDaiRules = generateMarketMakingRules(1.1, {
    minPushAmount: 0.00001000,      // 100sat minimum push
    maxPushAmount: 0.00002000,     // 1000sat maximum push
    marketTrend: 'bullish',
    bidTrend: 'above',
    askTrend: 'below',
    decimals: 6
  });
  console.log(bayDaiRules);



  console.log("\n=== BAY/DAI Market Making with Push Limits (Absolute) ===");
  var bayDaiRules = generateMarketMakingRules(1.1, {
    minPushAmount: 0.1000,      // 100sat minimum push
    maxPushAmount: 0.2000,     // 1000sat maximum push
    marketTrend: 'bullish',
    bidTrend: 'above',
    askTrend: 'below',
    decimals: 6
  });
  console.log(bayDaiRules);

  console.log("\n=== BAY/DAI Order Ladder Example ===");
  var bayDaiBidLadder = generateLadderOrders(1.1, 'bid', 10, 0.3, 6);
  var bayDaiAskLadder = generateLadderOrders(1.1, 'ask', 10, 0.3, 6);
  console.log("Bid Ladder:", bayDaiBidLadder);
  console.log("Ask Ladder:", bayDaiAskLadder);


}

exampleMarketMakingUsage();

exampleMarketMakingWithPushLimits();
/*
// Export the functions for use in trading systems
module.exports = {
  calculatePushLimits,
  formatPriceForMarket,
  generateTickPrices,
  adjustPriceForTrend,
  calculateBidAskPrices,
  generateMarketMakingRules,
  generateLadderOrders,
  getDefaultPrecision
};
*/