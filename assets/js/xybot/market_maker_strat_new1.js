/**
* Adjusts price based on extended market trend categories
*
* @param {number} price - Base price to adjust
* @param {string} trend - Market trend (various levels of intensity for up/down)
* @param {number} adjustmentFactor - Base percentage to adjust by (default: 0.2%)
* @returns {number} Adjusted price
*/
function adjustPriceForTrend(price, trend, adjustmentFactor = 0.2) {
  // Upward price trends (increasing strength)
  switch (trend) {
    // Original upward trends
    case 'above':
      return price * (1 + adjustmentFactor / 100);
    case 'strong_above':
      return price * (1 + (adjustmentFactor * 2) / 100);
     
    // New upward trends with increasing intensity
    case 'rising':
      return price * (1 + (adjustmentFactor * 1.5) / 100);
    case 'surging':
      return price * (1 + (adjustmentFactor * 2.5) / 100);
    case 'breakout':
      return price * (1 + (adjustmentFactor * 3) / 100);
    case 'extreme_bullish':
      return price * (1 + (adjustmentFactor * 4) / 100);
     
    // Original downward trends
    case 'below':
      return price * (1 - adjustmentFactor / 100);
    case 'strong_below':
      return price * (1 - (adjustmentFactor * 2) / 100);
     
    // New downward trends with increasing intensity
    case 'falling':
      return price * (1 - (adjustmentFactor * 1.5) / 100);
    case 'dropping':
      return price * (1 - (adjustmentFactor * 2.5) / 100);
    case 'breakdown':
      return price * (1 - (adjustmentFactor * 3) / 100);
    case 'extreme_bearish':
      return price * (1 - (adjustmentFactor * 4) / 100);
     
    case 'neutral':
    default:
      return price;
  }
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
 
  // Apply additional trend adjustments for fine-tuning
  bidPrice = adjustPriceForTrend(bidPrice, bidTrend, trendAdjustment);
  askPrice = adjustPriceForTrend(askPrice, askTrend, trendAdjustment);
 
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
* Example usage demonstrating the enhanced trend adjustments
*/
function exampleEnhancedTrendUsage() {
  const midPrice = 50000;
 
  console.log("\n=== Enhanced Upward Trends ===");
  console.log("Above:", adjustPriceForTrend(midPrice, 'above'));
  console.log("Rising:", adjustPriceForTrend(midPrice, 'rising'));
  console.log("Strong Above:", adjustPriceForTrend(midPrice, 'strong_above'));
  console.log("Surging:", adjustPriceForTrend(midPrice, 'surging'));
  console.log("Breakout:", adjustPriceForTrend(midPrice, 'breakout'));
  console.log("Extreme Bullish:", adjustPriceForTrend(midPrice, 'extreme_bullish'));
 
  console.log("\n=== Enhanced Downward Trends ===");
  console.log("Below:", adjustPriceForTrend(midPrice, 'below'));
  console.log("Falling:", adjustPriceForTrend(midPrice, 'falling'));
  console.log("Strong Below:", adjustPriceForTrend(midPrice, 'strong_below'));
  console.log("Dropping:", adjustPriceForTrend(midPrice, 'dropping'));
  console.log("Breakdown:", adjustPriceForTrend(midPrice, 'breakdown'));
  console.log("Extreme Bearish:", adjustPriceForTrend(midPrice, 'extreme_bearish'));
 
  console.log("\n=== Market Trend Examples ===");
  console.log("Neutral Market:", calculateBidAskPrices(midPrice));
  console.log("Surging Bullish Market:", calculateBidAskPrices(midPrice, { marketTrend: 'surging_bullish' }));
  console.log("Breakdown Bearish Market:", calculateBidAskPrices(midPrice, { marketTrend: 'breakdown_bearish' }));
}



////






/**
* Example usage demonstrating the enhanced trend adjustments
*/
function exampleEnhancedTrendUsage() {
  
  const midPrice = 50000;
  const midPrice = 0.01067004;
 
  console.log("\n=== Enhanced Upward Trends ===");
  console.log("Above:", adjustPriceForTrend(midPrice, 'above'));
  console.log("Rising:", adjustPriceForTrend(midPrice, 'rising'));
  console.log("Strong Above:", adjustPriceForTrend(midPrice, 'strong_above'));
  console.log("Surging:", adjustPriceForTrend(midPrice, 'surging'));
  console.log("Breakout:", adjustPriceForTrend(midPrice, 'breakout'));
  console.log("Extreme Bullish:", adjustPriceForTrend(midPrice, 'extreme_bullish'));
 
  console.log("\n=== Enhanced Downward Trends ===");
  console.log("Below:", adjustPriceForTrend(midPrice, 'below'));
  console.log("Falling:", adjustPriceForTrend(midPrice, 'falling'));
  console.log("Strong Below:", adjustPriceForTrend(midPrice, 'strong_below'));
  console.log("Dropping:", adjustPriceForTrend(midPrice, 'dropping'));
  console.log("Breakdown:", adjustPriceForTrend(midPrice, 'breakdown'));
  console.log("Extreme Bearish:", adjustPriceForTrend(midPrice, 'extreme_bearish'));
 
  console.log("\n=== Market Trend Examples ===");
  console.log("Neutral Market:", calculateBidAskPrices(midPrice));
  console.log("Surging Bullish Market:", calculateBidAskPrices(midPrice, { marketTrend: 'surging_bullish' }));
  console.log("Breakdown Bearish Market:", calculateBidAskPrices(midPrice, { marketTrend: 'breakdown_bearish' }));
} 