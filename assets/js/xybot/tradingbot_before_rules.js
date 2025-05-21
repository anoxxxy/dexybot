"use strict";
class BotManager {
  constructor() {
    this.bots = new Map(); // Use a Map to store bot instances by botId
  }

  // Method to create a new bot instance
  createBot(config) {
  	const botId = config.botId;
    if (this.bots.has(botId)) {
    	return;
      //throw new Error(`Bot with ID "${botId}" already exists.`);
    }
    
    const bot = new tradingbot();
    bot.config(config); // Configure the bot with the provided settings
    this.bots.set(botId, bot);

    // Attach event listeners
    bot.on('botTimeError', (data) => {
    	console.log('bot.botTimeError- data: ', data);
	  	iziToast.error({
	        icon: 'ti ti-alert-circle',
	        title: 'Error',
	        message: data.message,
	      });

	    //update bot list
	    xybot.renderBotList();
    });


    bot.on('error', (data) => {
    	console.log('bot.error- data: ', data);
    	xybot.renderBotList()
    });
    bot.on('emptyBalance', (data) => {
    	console.log('bot.emptyBalance- data: ', data);
	  	iziToast.error({
	        icon: 'ti ti-alert-circle',
	        title: 'Error',
	        message: `Insufficient balance for botId: ${data.botId}`,
	      });

	    //update bot list
	    xybot.renderBotList();
    });



    bot.on('start', (data) => {
    	console.log('bot.start- data: ', data);
    	xybot.renderBotList()
    });
    bot.on('stop', (data) => {
    	console.log('bot.stop- data: ', data);
    	xybot.renderBotList()
    });
    bot.on('orderPlace', (data) => {
    	console.log('bot.orderPlace- data: ', data);
    	xybot.renderBotList()
    });
;


    console.log(`Bot "${botId}" created.`);
    xybot.renderBotList()
    return bot;
  }

  // Method to retrieve a bot instance by botId
  getBot(botId) {
    const bot = this.bots.get(botId);
    if (!bot) {
      throw new Error(`Bot with ID "${botId}" does not exist.`);
    }
    return bot;
  }

  // Method to start a specific bot
  async startBot(botId) {
    const bot = this.getBot(botId);
    await bot.start();
    console.log(`Bot "${botId}" started.`);
  }

  // Method to stop a specific bot
  async stopBot(botId) {
    const bot = this.getBot(botId);
    await bot.stop();
    console.log(`Bot "${botId}" stopped.`);
    xybot.renderBotList()
  }

  // Method to load a bot from localStorage
  async loadBot(botId) {
    const bot = new tradingbot();
    const loaded = await bot.load(botId);
    if (loaded) {
      this.bots.set(botId, bot);
      console.log(`Bot "${botId}" loaded.`);
    } else {
      console.log(`Bot "${botId}" failed to load.`);
    }
  }

  // Method to list all active bots
  listBots() {
    return Array.from(this.bots.keys());
  }
  isRunning(botId) {
    const bot = this.bots[botId];
    if (!bot) {
      console.error(`🚨 Error: Bot ${botId} not found.`);
      return;
    }

    console.log(`⏹ Bot Status ${botId}: ${bot.isMarketMaking}`);
    console.log('⏹ Bot Status ', bot.isMarketMaking);

    return bot.isMarketMaking;
  }
  // Method to delete a bot instance
  async deleteBot(botId) {
    const bot = this.bots.get(botId);
    if (!bot) {
    	return;
      //throw new Error(`Bot with ID "${botId}" does not exist.`);
    }

    // Stop the bot if it is running
    if (bot.isRunning()) {
      console.log(`Stopping bot "${botId}" before deletion...`);
      await bot.stop();
    }

    // Remove the bot instance from the Map
    this.bots.delete(botId);

    // Remove the bot's data from localStorage
    const xybotData = storage_l.get("xybot") || {};
    if (xybotData.bots && xybotData.bots[`tradingbot_${botId}`]) {
      delete xybotData.bots[`tradingbot_${botId}`];
      storage_l.set("xybot", xybotData);
      console.log(`Bot "${botId}" data removed from localStorage.`);
    }

    console.log(`Bot "${botId}" deleted successfully.`);
    xybot.renderBotList()
  }

}

const botManager = new BotManager();

const bbotManagerOld = {
  bots: {}, // Store all running bots

  // Create and initialize a bot
  createBot(botConfig) {
    if (this.bots[botConfig.botId]) {
      console.warn(`⚠️ Bot ${botConfig.botId} exists.`);
      return this.bots[botConfig.botId]; // Return if already exists
    }

    const bot = new tradingbot();
    bot.config(botConfig);

    this.bots[botConfig.botId] = bot; // Store the bot
    console.log(`✅ Bot ${botConfig.botId} created and ready.`);

    // Register event listeners per bot
    bot.on('botTimeError', (data) => console.error(`⏳ [Bot ${bot.botId}] Time Error:`, data));
    bot.on('error', (data) => console.error(`❌ [Bot ${bot.botId}] Error:`, data));
    bot.on('start', (data) => xybot.renderBotList());
    bot.on('stop', (data) => xybot.renderBotList());

    return bot;
  },

  // Start a bot by botId
  startBot(botId) {
    const bot = this.bots[botId];
    if (!bot) {
      console.error(`🚨 Cannot start: Bot ${botId} not found.`);
      return;
    }

    console.log(`▶️ Starting bot ${botId}...`);
    //bot.trigger('start'); // Trigger start event
    bot.start(botId);
  },

  // Stop a bot by botId
  stopBot(botId) {
    const bot = this.bots[botId];
    if (!bot) {
      console.error(`🚨 Cannot stop: Bot ${botId} not found.`);
      return;
    }

    console.log(`⏹ Stopping bot ${botId}...`);
    bot.trigger('stop'); // Trigger stop event
    bot.stop(botId);
  },

  // Stop a bot by botId
  isRunning(botId) {
    const bot = this.bots[botId];
    if (!bot) {
      console.error(`🚨 Error: Bot ${botId} not found.`);
      return;
    }

    console.log(`⏹ Bot Status ${botId}: ${bot.isMarketMaking}`);
    console.log('⏹ Bot Status ', bot.isMarketMaking);

    return bot.isMarketMaking;
  },

  // List all active bots
  listBots() {
    return Object.keys(this.bots);
  }
};
/*
//  Example Usage
botManager.createBot({
  botId: "bot123",
  tradingPair: "BTC/USD",
  buyBalance: 1.0,
  sellBalance: 1.0,
  minimalSpread: 0.01,
  intervalPeriod: [],
  maxOrderCost: 0.00005,
  minOrderCost: 0.000025,
  maxOpenOrders: { bid: 3, ask: 3 },
  waitTimeRange: { min: 10, max: 20 },
  cancelOrdersOnStop: { cancelBuyOrders: true, cancelSellOrders: true },
  orderType: "both",
  bidSettings: {},
  askSettings: {},
  useLiquidity: false,
});

botManager.startBot("bot123"); // ▶️ Start bot
botManager.stopBot("bot123");  // ⏹ Stop bot

console.log("🔥 Active bots:", botManager.listBots());

*/
class tradingbot {
  constructor() {
    
    this.eventHandlers = {
      start: [],
      stop: [],
      botCreated: [],
      botCreateError: [],
      botLoadSuccess: [],
      botLoadError: [],
      intervalChange: [],
      intervalDelay: [],
      intervalError: [],
      botTimeError: [],
      orderCancel: [],
      orderPlace: [],
      orderMatch: [],
      emptyBalance: [],
      error: [],
    };
    
  }

  // Method to configure the bot properties
  config({botId, tradingPair, buyBalance = 0, sellBalance = 0, minimalSpread, minOrderCost = 0.00002500, maxOrderCost = 0.00005000, maxOpenOrders = {bid: 50, ask: 50}, botDuration= 1440, intervalPeriod = [], useLiquidity = false, waitTimeRange = {min: 10, max: 20}, cancelOrdersOnStop = { cancelBuyOrders: false, cancelSellOrders: false }, orderType = 'both', bidSettings, askSettings}) {
    if (!['buy', 'sell', 'both'].includes(orderType)) {
      this.trigger('error', {'message': 'Invalid orderType. Valid options are "buy", "sell", or "both"'});
      throw new Error('DexyBot Error - Invalid orderType. Valid options are "buy", "sell", or "both".');
    }

    const { min, max } = waitTimeRange;
    if (min < 1) {
      this.trigger('error', {'message': 'Invalid waitTimeRange. Minimum value should be 1 second.'});
      throw new Error('DexyBot Error - Invalid waitTimeRange. Minimum value should be 1 second.');
    }



    this.orderType = orderType;
    this.bidSettings = bidSettings;
    this.askSettings = askSettings;
    this.maintenance = false;
    this.botId = botId;
    this.tradingPair = tradingPair;
    this.buyBalance = parseFloat(buyBalance);
    this.sellBalance = parseFloat(sellBalance);
    this.minOrderCost = parseFloat(minOrderCost);
    this.maxOrderCost = parseFloat(maxOrderCost);
    this.minimalSpread = minimalSpread;
    this.maxOpenBidOrders = Math.max(parseInt(maxOpenOrders.bid), 10); // Enforce minimum value of 10
    this.maxOpenAskOrders = Math.max(parseInt(maxOpenOrders.ask), 10); // Enforce minimum value of 10
    this.openBidOrders = [];
    this.openAskOrders = [];
    this.closedBidOrders = [];
    this.closedAskOrders = [];
    this.isMarketMaking = false;
    
    this.botDuration = botDuration;
    // Set default intervalPeriod if not passed
    
    const now = new Date();
    if (!intervalPeriod.length) {
      const startTime = new Date(now.getTime() + 1 * 10000); // Current time + 10 seconds
      const endTime = new Date(now.getTime() + 30 * 60000); // Current time + 30 minutes

      this.intervalPeriod = [{ start: startTime, end: endTime }];
    } else 
      this.intervalPeriod = intervalPeriod;
      


    this.currentIntervalIndex = -1;
    this.useLiquidity = useLiquidity;
    this.decimals = 8;
    this.bidPrice = 0;
    this.askPrice = 0;
    this.waitTimeRange = {
      min: Number(waitTimeRange.min),
      max: Number(waitTimeRange.max),

      //min: Math.max(waitTimeRange.min, 10), // Enforce minimum value of 10
      //max: Math.max(waitTimeRange.max, 20), // Enforce minimum value of 20
    };
    this.waitUntilTrade = 0;
    this.cancelOrdersOnStop = cancelOrdersOnStop;

    
    this.tradingPairData = {bid: {}, ask: {}};
    this.coina = "";
    this.coinb = "";

  };

  // Method to attach event handlers to custom events
  /*on(eventName, handler) {
    this.eventHandlers[eventName].push(handler);
  }

  // Method to trigger custom events
  trigger(eventName, ...args) {
    const handlers = this.eventHandlers[eventName];
    console.log('trigger event: ', eventName);

    handlers.forEach((handler) => {
      handler(...args);
      
    });
  }
  */
on(eventName, handler) {
  if (typeof handler !== 'function') {
    console.error(`❌ Attempted to register a non-function handler for event: ${eventName}`, handler);
    console.trace(); // Helps find where the invalid handler is added
    return;
  }

  if (!this.eventHandlers[eventName]) {
    this.eventHandlers[eventName] = [];
  }

  console.log(`✅ Adding handler for event: ${eventName}`, handler);
  this.eventHandlers[eventName].push(handler);
}
trigger(eventName, ...args) {
  const handlers = this.eventHandlers[eventName];

  console.log(`🔔 Triggering event: ${eventName}, Handlers:`, handlers);

  if (!Array.isArray(handlers) || handlers.length === 0) {
    console.warn(`⚠️ No valid handlers for event: ${eventName}`);
    return;
  }

  
  // Ensure botId is added to the event args if it's not already there
  /*args.forEach(arg => {
    if (arg && !arg.botId) {
      arg.botId = this.botId; // Add botId to the argument if it's not present
    }
  });
  */

   // Ensure args[0] is an object, then add botId to it.
  if (args.length > 0 && typeof args[0] === 'object') {
    args[0].botId = this.botId; // Add botId to the first object in the arguments
  } else {
    args.unshift({ botId: this.botId }); // If no object is present, create a new one with botId
  }



  handlers
    .filter((handler) => typeof handler === 'function') // Remove null/undefined/non-functions
    .forEach((handler, index) => {
      try {
        console.log(`🚀 Executing handler at index ${index}`);
        handler(...args);
      } catch (error) {
        console.error(`🔥 Error in handler at index ${index}:`, error);
      }
    });
}



  //setTimeout is synchronous in nature. Its callback get registered by event loop in timer phase which will be executed as an asynchronous manner.
  //nonBlockTick = (fn) => new Promise((resolve) => setTimeout(() => resolve(fn), 5));
  //wally_fn.timeout = ms => new Promise(resolve => window.setTimeout(resolve, ms));  //ES6-style
  //timeoutTick = function(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)) };

  timeoutTick = async function(ms) { return new Promise(resolve => window.setTimeout(resolve, ms)) };

  getMarketData = () => {
    if (!ych.data.markets[this.tradingPair] || ych.data.markets[this.tradingPair].service) {
      this.maintenance = true;
      console.log(`DexyBot (${this.botId}) stopped. TradingPair: ${this.tradingPair} doesn't exist or is in maintenance mode!`);
      return;
    }

    const marketPair = this.tradingPair.split('-');

    //Used for order Cancel and Balance
    this.coina = marketPair[0];
    this.coinb = marketPair[1];

    //Set tradingPair Data, like minOrderAmount, minOrderCost
    this.tradingPairData.bid = {
      minOrderCost: Number( (Number(ych.data.coininfos[this.coinb].fee.minorder) / 1e8).toFixed(this.decimals)),
      minOrderAmount: Number( (Number(ych.data.coininfos[this.coinb].fee.minamount) / 1e8).toFixed(this.decimals)),
    };
    this.tradingPairData.ask = {
      minOrderCost: Number( (Number(ych.data.coininfos[this.coina].fee.minorder) / 1e8).toFixed(this.decimals)),
      minOrderAmount: Number( (Number(ych.data.coininfos[this.coina].fee.minamount) / 1e8).toFixed(this.decimals)),
    };

    
    // Function to validate and adjust trend settings for bid and ask actions
    const validateTrendSettings = (settings) => {
        // Ensure minimum price is at least 1
        settings.action.minPrice = Math.max(1, settings.action.minPrice);
        settings.action.minPrice = (settings.action.minPrice / 1e8);
        //settings.action.minPrice = parseFloat(settings.action.minPrice).toFixed(8);

        // Adjust maximum price if lower than or equal to minimum, ensuring it's at least 1 higher
        settings.action.maxPrice = Math.max(settings.action.minPrice + 1, settings.action.maxPrice);
        settings.action.maxPrice = (settings.action.maxPrice / 1e8);
        //settings.action.maxPrice = parseFloat(settings.action.maxPrice).toFixed(8);


        // Ensure minimum quantity aligns with minimum order cost
        settings.action.minQty = Math.max(settings.action.minQty, this.tradingPairData.bid.minOrderCost);

        // Align maximum quantity with minimum quantity
        settings.action.maxQty = Math.max(settings.action.minQty, settings.action.maxQty);
    };

    // Validate trend settings for bid and ask trend actions
    if (['above', 'below', 'none'].includes(this.bidSettings.action.trend)) {
        validateTrendSettings(this.bidSettings);
    }

    if (['above', 'below', 'none'].includes(this.askSettings.action.trend)) {
        validateTrendSettings(this.askSettings);
    }

    //set balance
    this.fetchBalance();

    this.fetchBidAndAskPrices();



    

  };

/**
 * Generates an interval period based on the current time and specified duration.
 * 
 * @param {number} botDuration - Duration in minutes for the interval
 * @returns {Object} An object containing start and end times for the interval
 */
generateDurationTime = () => {

				var currentDate = new Date();

				var startYear = currentDate.getFullYear();
				var startMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
				var startDay = String(currentDate.getDate()).padStart(2, '0');
				var startHours = String(currentDate.getHours()).padStart(2, '0');
				var startMinutes = String(currentDate.getMinutes()).padStart(2, '0');

				var startDate = startYear + '-' + startMonth + '-' + startDay + ' ' + startHours + ':' + startMinutes;

				// Calculate end date and time
				var endDateTime = new Date(currentDate.getTime() + this.botDuration * 60000);

				// Get end date components
				var endYear = endDateTime.getFullYear();
				var endMonth = String(endDateTime.getMonth() + 1).padStart(2, '0');
				var endDay = String(endDateTime.getDate()).padStart(2, '0');
				var endHours = String(endDateTime.getHours()).padStart(2, '0');
				var endMinutes = String(endDateTime.getMinutes()).padStart(2, '0');

				var endDate = endYear + '-' + endMonth + '-' + endDay + ' ' + endHours + ':' + endMinutes;

				this.intervalPeriod = [{ start: startDate, end: endDate }];
}

create = async () => {
	try {
		this.saveToLocalStorage();
		this.trigger('botCreated', {'message': `Bot "${this.botId}" Created`});
		console.log(`DexyBot (${this.botId}) created...`);
	  return;
	 } catch (error) {
		this.trigger('botCreateError', {'message': `Unable to create Bot "${botId}"`});
	}
  
}

load = async(botId) => {
	try {
		if (this.loadFromLocalStorage(botId))
			console.log('bot loaded');
		else
			console.log('bot NOT loaded');

		this.trigger('botLoadSuccess', {'message': `Bot "${botId}"" Loaded`});
	} catch (error) {
		this.trigger('botLoadError', {'message': `Bot "${botId}"" Loaded`});
	}
}
  
  // Start the trading process
start = async () => {
  if (this.isRunning()) {
    console.log(`DexyBot (${this.botId}) is running...`);
    return;
  }

  if (this.orderType === 'buy' && this.buyBalance <= 0) {
    await this.stop();
    return;
  }
  
  if (this.orderType === 'sell' && this.sellBalance <= 0) {
    await this.stop();
    return;
  }
  
  if (this.orderType === 'both' && (this.buyBalance <= 0 || this.sellBalance <= 0)) {
    await this.stop();
    return;
  }
  

  //re-configure start time and end time upon every start, depending on botDuration
  this.generateDurationTime();

  try {


  
  //init and validate intervals
  const intervals = await this.generateIntervals();
  let i = 0;

  if (intervals === null) {  //intervals is misconfigured
    this.trigger('error', {'message': `Invalid Time interval`});
    return ;
  }

  //all good, proceed
  this.getMarketData(); //load market data and set user data

  if (this.maintenance) {
    this.trigger('error', {'message': `TradingPair in maintenance mode!`});
    return ;
  }
  this.isMarketMaking = true; //init bot start
  
  this.trigger('start', {});  // Trigger the 'start' event
  console.log(`DexyBot (${this.botId}) started.`);

  this.saveToLocalStorage();  //save to localStorage, for users to track bot trades

  const checkIntervalForTrading = async () => {

    
      if (!(this.isRunning()))    //No more intervals left, stop trading
        return;
      
      console.log(`DexyBot (${this.botId}) - intervals to run:`, intervals);

      //this.nonBlockTick();

      const interval = intervals[i];
      const currentTime = new Date().getTime();
      this.currentIntervalIndex = i;

      this.trigger('intervalChange', {'intervalId': this.currentIntervalIndex, 'interval': this.intervalPeriod[i]});   //Trigger the intervalChange



      if (interval.start <= currentTime && currentTime < interval.end) {
        console.log(`DexyBot (${this.botId}) - Performing trading check for interval:  ${new Date(interval.start)} - ${new Date(interval.end)}, intervalId: ${i}`);

        const endTime = interval.end;
        let tradingCheckTime = new Date().getTime();
        
        

        while (tradingCheckTime < endTime) {

          if (!(this.isRunning()))
            break; // Exit the loop if the bot is no longer running

          const waitTime = await this.getRandomNumber(this.waitTimeRange.min, this.waitTimeRange.max, true);
          this.waitUntilTrade = waitTime;
          console.log(`DexyBot (${this.botId}) - waitTime for next trade: ${parseInt(waitTime / 1000)} seconds`);

          await this.performTradingCheck();
          tradingCheckTime = new Date().getTime();
          console.log(`DexyBot (${this.botId}) - Active interval-time remaining: ${parseInt((endTime - tradingCheckTime) / 1000)} seconds`);
          

          

          this.saveToLocalStorage();  // Save bot data to localStorage

          //this.nonBlockTick();
          await new Promise((resolve) => setTimeout(resolve, waitTime)); // wait before the next (trade) action/process
        }

        if (!(this.isRunning()))  //Bot is already stopped, just return!
            return ;

        i++;
        if (i >= intervals.length) {  //No more intervals
            await this.stop(); 
        } else {
          scheduleNextTradingInterval();
        }
      } else {
        const waitTime = interval.start - currentTime;
        // if waitTime is negative, there is no intervals left, quit 
        if (waitTime <= 0)
        	await this.stop();

        console.log(`DexyBot (${this.botId}) - Delay until next interval: ${parseInt(waitTime / 1000)} seconds`);

        setTimeout(checkIntervalForTrading, waitTime);
      }
    };

    const scheduleNextTradingInterval = () => {
      const interval = intervals[i].start;
      const currentTime = new Date().getTime();
      const waitTimeSchedule = Math.max(interval - currentTime, 0);

      this.trigger('intervalDelay', {'intervalId': this.currentIntervalIndex, 'interval': this.intervalPeriod[i]});   //Trigger the intervalDelay
      console.log(`DexyBot (${this.botId}) - scheduleNextTradingInterval: Waiting for next interval. Waiting time: ${parseInt(waitTimeSchedule / 1000)} seconds.`);
      setTimeout(checkIntervalForTrading, waitTimeSchedule);
    };

    if (this.isRunning()) 
      scheduleNextTradingInterval();
  } catch (error) {
    console.error(`DexyBot (${this.botId}) - Failed: An error occurred during trading:`, error);
    this.trigger('error', {'message': `Failed: An error occurred during trading`, 'error': error});
    await this.stop();
  }
};

  
  getRandomNumber = async (min = 10, max = 25, ms = true) => {
  const range = max - min;
  const randomNumber = Math.random() * range + min;
  const roundedNumber = Math.floor(randomNumber);
  return ms ? roundedNumber * 1000 : roundedNumber;
};

  getDecimalInRange = async (min, max) => {
    var randomDecimal = Math.random() * (max - min) + min;
    var factor = Math.pow(10, this.decimals);
    return Math.round(randomDecimal * factor) / factor;
  };



  // Stop the trading process
  stop = async (botId) => {
    if (!(this.isRunning())) {
      console.log(`DexyBot (${this.botId}) is already stopped.`);
      return;
    }

    console.log(`DexyBot (${this.botId}) stopped. No more intervals left!`);

    //stop Bot running flag
    this.isMarketMaking = false;
    this.currentIntervalIndex = -1;

    // Save bot data to localStorage
    this.saveToLocalStorage();

    //Cancel orders on Stop?
    if (this.cancelOrdersOnStop.cancelBuyOrders) {
      await this.cancelAllBidOrders();
    }

    if (this.cancelOrdersOnStop.cancelSellOrders) {
      await this.cancelAllAskOrders();
    }

    console.log(`DexyBot (${this.botId}) - Total buy orders created:`, this.openBidOrders.length);
    console.log(`DexyBot (${this.botId}) - Total sell orders created:`, this.openAskOrders.length);
    console.log(`DexyBot (${this.botId}) - Total buy orders canceled:`, this.closedBidOrders.length);
    console.log(`DexyBot (${this.botId}) - Total sell orders canceled:`, this.closedAskOrders.length);

    // Save bot data to localStorage
    // This is needed after cancellation of orders
    this.saveToLocalStorage();

    this.trigger('stop', {});  // Trigger the 'stop' event

  };

  cancelAllBidOrders = async () => {
    console.log(`DexyBot (${this.botId}) - cancelAllBidOrders: ${this.cancelOrdersOnStop.cancelBuyOrders}`);
    for (let i = 0; i < this.openBidOrders.length; i++) {
      const bidOrder = this.openBidOrders[i];
      await this.cancelBidOrder(bidOrder.id, i);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait before the next (trade cancel) action, 5sec
    }
  };

  cancelAllAskOrders = async () => {
    console.log(`DexyBot (${this.botId}) - cancelAllAskOrders: ${this.cancelOrdersOnStop.cancelBuyOrders}`);
    for (let i = 0; i < this.openAskOrders.length; i++) {
      const askOrder = this.openAskOrders[i];
      await this.cancelAskOrder(askOrder.id, i);
      await new Promise((resolve) => setTimeout(resolve, 5000)); // wait before the next (trade cancel) action, 5sec
    }
  };

cancelBidOrder = async (orderId, index) => {
  try {
    const cancelCall = await xybot.part.nobuy_call(orderId, this.coina, this.coinb);
  
    // Get the canceled order from openBidOrders
    let canceledOrder = this.openBidOrders[index];

    // Check if the cancel order was successful
    const isSuccess = cancelCall.ok;

    if (isSuccess) {
      console.log(`DexyBot (${this.botId}) - cancelBidOrder Success: Canceled bidOrder (${orderId})`);
      this.openBidOrders.splice(index, 1); // Remove the order from openBidOrders
      this.closedBidOrders.push(canceledOrder); // Push the canceledOrder object to closedBidOrders      

      this.buyBalance += (canceledOrder.cost); // Restore the buyBalance
    } else {
      console.log(`DexyBot (${this.botId}) - cancelBidOrder Failed: to cancel bidOrder (${orderId})`);
    }
    this.trigger('orderCancel', {'orderType': 'buy', 'order': canceledOrder, 'success': isSuccess, 'error': (cancelCall.error || '') });

  } catch (error) {
    console.log(`DexyBot (${this.botId}) - cancelBidOrder Error Catch:`, error);
  }
};

cancelAskOrder = async (orderId, index) => {
  try {
    const cancelCall = await xybot.part.nosell_call(orderId, this.coina, this.coinb);

    // Get the canceled order from openBidOrders
    let canceledOrder = this.openAskOrders[index];

    // Check if the cancel order was successful
    const isSuccess = cancelCall.ok;

    if (isSuccess) {
      console.log(`DexyBot (${this.botId}) - cancelAskOrder Success: Canceled askOrder (${orderId})`);
      this.openAskOrders.splice(index, 1); // Remove the order from openAskOrders
      this.closedAskOrders.push(canceledOrder); // Push the canceledOrder object to closedAskOrders

      this.sellBalance += canceledOrder.amount; // Restore the sellBalance
    } else {
      console.log(`DexyBot (${this.botId}) - cancelAskOrder Failed: to cancel askOrder (${orderId})`);
    }
    this.trigger('orderCancel', {'orderType': 'sell', 'order': canceledOrder, 'success': isSuccess, 'error': (cancelCall.error || '')});

  } catch (error) {
    console.log(`DexyBot (${this.botId}) - cancelAskOrder Error Catch:`, error);
  }
};

  // Delays the next action by a random time interval within a specified range, if applicable
  waitForNextProcess = async () => {
    let randomWaitTime = 0;

    // Set a random number between 0 and this.waitUntilTrade if this.waitUntilTrade is >= 10000ms
    console.log(`DexyBot (${this.botId}) - waitForNextProcess: waitUntilTrade ${parseInt(this.waitUntilTrade/1000)} s`);
    if (this.waitUntilTrade >= 15000) {
        //randomWaitTime = await this.getRandomNumber(1000, this.waitUntilTrade - 10000, true);
        randomWaitTime = await this.getRandomNumber(2, parseInt((this.waitUntilTrade-15000) /1000), true);
    } else
      randomWaitTime = await this.getRandomNumber(1, 10, true);

    console.log(`DexyBot (${this.botId}) - waitForNextProcess: Scheduled in ${parseInt(randomWaitTime / 1000)} s`);

    // Use await this.timeoutTick() to delay the next action
    await this.timeoutTick(randomWaitTime);
  }

  // Check the spread and perform market making if applicable
  performTradingCheck = async () => {
    //console.log('performTradingCheck is running');
    const { bidPrice, askPrice } = this.fetchBidAndAskPrices();
    //console.log('----bidPrice: ', bidPrice, ', askPrice: ', askPrice);
    const spread = askPrice - bidPrice;

    if (this.useLiquidity) {
      console.log(`DexyBot (${this.botId}) - performMarketMakingLiquidity()`);
      await this.performMarketMakingLiquidity(bidPrice, askPrice);
    } else if (spread >= this.minimalSpread) {
      console.log(`DexyBot (${this.botId}) - performMarketMakingSpread()`);
      await this.performMarketMakingSpread(bidPrice, bidPrice);
    } else {
      console.log(`DexyBot (${this.botId}) - Spread(${spread}) is below minimal. Stopped Market Spread making.`);
    }

    // Save bot data to localStorage
    this.saveToLocalStorage();
  };

  // Perform market making using liquidity strategy
  performMarketMakingLiquidity = async (bidPrice, askPrice) => {

    let price, amount, cost;

    if (this.orderType === 'buy' || this.orderType === 'both') {
      if (this.openBidOrders.length < this.maxOpenBidOrders) {

        if (['above', 'below', 'none'].includes(this.bidSettings.action.trend))
          [price, amount, cost] = await this.computeRandomBidOrderFromTrend(bidPrice, this.bidSettings.action.trend);
        else
          [price, amount, cost] = await this.calculateBidOrder(askPrice);

        await this.placeBidOrder(price, amount, cost);
      }

      if (this.openBidOrders.length >= this.maxOpenBidOrders) {
        await this.closeRandomBidOrder();
      }
    }

    if (this.orderType === 'both')
      await this.waitForNextProcess();
    

    if (this.orderType === 'sell' || this.orderType === 'both') {
      if (this.openAskOrders.length < this.maxOpenAskOrders) {
        
        if (bidPrice <= 0) {  //if no bid price is set, dont put any trades
          console.log('bidPrice <= 0: ', bidPrice);
          return;
        }

        if (['above', 'below', 'none'].includes(this.bidSettings.action.trend))
          [price, amount, cost] = await this.computeRandomAskOrderFromTrend(askPrice, this.askSettings.action.trend);
        else
          [price, amount, cost] = await this.calculateAskOrder(bidPrice);

        await this.placeAskOrder(price, amount, cost);
      }

      if (this.openAskOrders.length >= this.maxOpenAskOrders) {
        await this.closeRandomAskOrder();
      }
    }


    
  };

  performMarketMakingSpread = async (bidPrice, askPrice) => {

  if (this.orderType === 'buy' || this.orderType === 'both') {
    if (bidPrice <= 0)  //if no ask price is set, dont put any trades
        return;

    if (bidPrice < askPrice && this.openBidOrders.length < this.maxOpenBidOrders) {
      const [price, amount, cost] = await this.calculateBidOrder(bidPrice);
      await this.placeBidOrder(price, amount, cost);
    }
    if (this.openBidOrders.length >= this.maxOpenBidOrders) {
      await this.closeRandomBidOrder();
    }
  }

  if (this.orderType === 'both')
    await this.waitForNextProcess();

  if (this.orderType === 'sell' || this.orderType === 'both') {
    if (askPrice <= 0)  //if no ask price is set, dont put any trades
        return;

    if (askPrice > bidPrice && this.openAskOrders.length < this.maxOpenAskOrders) {
      
      const [price, amount, cost] = await this.calculateAskOrder(askPrice);
      await this.placeAskOrder(price, amount, cost);
    }
    if (this.openAskOrders.length >= this.maxOpenAskOrders) {
      await this.closeRandomAskOrder();
    }
  }
};



  //generates random decimal numbers within the specified range, excluding both the minimum and maximum values, and each number is limited to 8 decimal places.
  /*getRandomPriceInRange = (min, max) => {
    console.log('min:'+ typeof min+ ', max: '+ typeof  max);

    const range = max - min;
    console.log('range:'+ typeof range); 

    const randomDecimal = Math.random() * (range - 2 / Math.pow(10, this.decimals)) + min + 1 / Math.pow(10, this.decimals);
    const roundedDecimal = Math.floor(randomDecimal * Math.pow(10, this.decimals)) / Math.pow(10, this.decimals);
    console.log('getRandomPriceInRange:', roundedDecimal, typeof roundedDecimal);
    console.log('min:'+ min+ ', max: '+ max);
    return roundedDecimal;
  }
  */

  

  

  generateRandomPrice = async (basePrice) => {
    let addingPrice;
    if (basePrice === 0) {
      addingPrice = Math.floor(Math.random() * 21); // Random deviation between 0 to +20 satoshis
    } else {
      addingPrice = Math.floor(Math.random() * 21) - 10; // Random deviation between -10 to +10 satoshis
    }
    return parseFloat((basePrice + addingPrice / 100000000).toFixed(this.decimals)); // Convert satoshis to decimal
  };





// Function to compute random order based on trend
computeRandomBidOrderFromTrend = async (bidPrice, trend) => {
    const settings = this.bidSettings;

    // Generate random price between min and max
    const randomPrice = parseFloat(Math.random() * (settings.action.maxPrice - settings.action.minPrice) + settings.action.minPrice);
    
    const bidPriceOrg = bidPrice;

    // Config trendbased price
    if (trend == 'above')
      bidPrice = parseFloat(bidPrice+randomPrice);
    else if (trend == 'below')
      bidPrice = parseFloat(bidPrice-randomPrice);
    else {
      bidPrice = parseFloat(bidPrice-randomPrice);
    }

    // Generate random quantity between min and max
    const quantity = parseFloat(Math.random() * (settings.action.maxQty - settings.action.minQty) + settings.action.minQty);

    // Calculate cost
    const cost = bidPrice * quantity;

    console.log(`DexyBot (${this.botId}) - computeRandomBidOrderFromTrend: bidPriceOrg: ${bidPriceOrg}, trendPrice: ${bidPrice.toFixed(8)}, trendQty: ${quantity}, trendCost: ${cost}, , randomPrice: ${randomPrice}`);

    // Return an array containing [price, quantity, cost]
    return [bidPrice, quantity, cost];
};
computeRandomAskOrderFromTrend = async (askPrice, trend) => {
    const settings = this.askSettings;

    // Generate random price between min and max
    const randomPrice = parseFloat(Math.random() * (settings.action.maxPrice - settings.action.minPrice) + settings.action.minPrice);
    const askPriceOrg = askPrice;

    // Config trendbased price
    if (trend == 'above')
      askPrice = parseFloat(askPrice + randomPrice);
    else if (trend == 'below')
      askPrice = parseFloat(askPrice - randomPrice);
    else {
      askPrice = parseFloat(askPrice + randomPrice);
    }

    
    // Generate random quantity between min and max
    const quantity = parseFloat(Math.random() * (settings.action.maxQty - settings.action.minQty) + settings.action.minQty);

    // Calculate cost
    const cost = askPrice * quantity;

    console.log(`DexyBot (${this.botId}) - computeRandomAskOrderFromTrend: askPriceOrg: ${askPriceOrg}, trendPrice: ${askPrice.toFixed(8)}, trendQty: ${quantity}, trendCost: ${cost}, , randomPrice: ${randomPrice}`);

    // Return an array containing [price, quantity, cost]
    return [askPrice, quantity, cost];
};

calculateBidOrder = async (bidPrice) => {
  bidPrice = bidPrice || 0.00000010;  //minimum 10 satoshi
  let generatedPrice = await this.generateRandomPrice(bidPrice, 'bid');

  // Generate a random cost within the desired range
  let randomCost = parseFloat((Math.random() * (this.maxOrderCost - this.minOrderCost) + this.minOrderCost).toFixed(8));

  // Calculate the corresponding amount based on the generated price and the random cost
  let amount = parseFloat((randomCost / generatedPrice).toFixed(8));
  

  console.log(`DexyBot (${this.botId}) - calculateBidOrder: bidPrice: ${bidPrice}, generatedPrice: ${generatedPrice}, amount: ${amount}, cost: ${randomCost}`);

  //set amount to min (and max cost intervall) since amount is too low
  if (amount < this.minOrderCost) {

    const randomAmount = parseFloat((Math.random() * (this.maxOrderCost - this.minOrderCost) + this.minOrderCost).toFixed(8));
    amount = randomAmount;
    
    randomCost = amount * generatedPrice; // Adjust randomCost to fulfill the minOrderAmount requirement

    console.log(`DexyBot (${this.botId}) - calculateBidOrder: adjusted amount: ${amount}, adjusted randomCost: ${randomCost}`);
  }
  
  //this.tradingPairData.bid.minOrderAmount

  return [generatedPrice, amount, randomCost];
};


calculateAskOrder = async (askPrice) => {
  askPrice = askPrice || 0.00000010;  //minimum 10 satoshi
  let generatedPrice = await this.generateRandomPrice(askPrice, 'ask');

  // Generate a random cost within the desired range
  let randomCost = parseFloat((Math.random() * (this.maxOrderCost - this.minOrderCost) + this.minOrderCost).toFixed(8));

  // Calculate the corresponding amount based on the generated price and the random cost
  let amount = parseFloat((randomCost / generatedPrice).toFixed(8));


  console.log(`DexyBot (${this.botId}) - calculateAskOrder: askPrice: ${askPrice}, generatedPrice: ${generatedPrice}, amount: ${amount}, cost: ${randomCost}`);

  //set amount to min (and max cost intervall) since amount is too low
  if (amount < this.minOrderCost) {

    const randomAmount = parseFloat((Math.random() * (this.maxOrderCost - this.minOrderCost) + this.minOrderCost).toFixed(8));
    amount = randomAmount;
    
    randomCost = amount * generatedPrice; // Adjust randomCost to fulfill the minOrderAmount requirement

    console.log(`DexyBot (${this.botId}) - calculateAskOrder: adjusted amount: ${amount}, adjusted randomCost: ${randomCost}`);
  }

  
  //this.tradingPairData.ask.minOrderAmount
  
  return [generatedPrice, amount, randomCost];
};


handleEmptyBalance = async (orderType, cost) => {
  const balance = orderType === 'buy' ? this.buyBalance : this.sellBalance;
  
  if (balance < cost) {

    console.log(`handleEmptyBalance Insufficient ${orderType} balance to place the ${orderType === 'buy' ? 'bid' : 'ask'} order.`);
    console.log('handleEmptyBalance if (balance < cost) : '+ balance + ' < '+ cost);
    this.trigger('emptyBalance', { 'balance': { 'buy': this.buyBalance, 'sell': this.sellBalance }, 'order': this });
    await this.stop();
    this.trigger('error', {'message': `Insufficient ${orderType} balance`});
    throw new Error(`DexyBot (${this.botId}) - handleEmptyBalance(): Insufficient ${orderType} balance.`);
  }
};


  // Place a bid order at the given price
placeBidOrder = async (price, amount, cost) => {

  try {
    console.log(`DexyBot (${this.botId}) Bid - Amount: ${amount}, Price: ${price}, Cost: ${cost}`);

    await this.handleEmptyBalance('buy', cost);

    const placeOrderCall = await xybot.part.buy_call(price, amount, this.tradingPair);
    console.log('placeOrderCall icee: ', placeOrderCall);
    // Check if the cancel order was successful
    const isSuccess = placeOrderCall.ok;
    let newOrder = { 'id': 0, 'price': price, 'amount': amount, 'cost': cost, 'timestamp': Date.now() };

    if (isSuccess) {
      newOrder.id = placeOrderCall.index;
      this.openBidOrders.push({
      	...newOrder,
      	success: isSuccess,
      	error: placeOrderCall.error || ''
      });
      this.buyBalance -= cost;
    } else {
      console.log(`DexyBot (${this.botId}) - placeBidOrder Rejected: `, placeOrderCall);
    }
    this.trigger('orderPlace', { 'orderType': 'buy', 'order': newOrder, 'success': isSuccess, 'error': (placeOrderCall.error || '') });
  } catch (error) {
    console.log(`DexyBot (${this.botId}) - placeBidOrder Error Catch: `, error);
  }

  //await this.timeoutTick(4000);
};

// Place an ask order at the given price
placeAskOrder = async (price, amount, cost) => {

  try {
    console.log(`DexyBot (${this.botId}) Ask - Amount: ${amount}, Price: ${price}, Cost: ${cost}`);
    await this.handleEmptyBalance('sell', amount);

    const placeOrderCall = await xybot.part.sell_call(price, amount, this.tradingPair);
    const isSuccess = placeOrderCall.ok;
    let newOrder = { 'id': 0, 'price': price, 'amount': amount, 'cost': cost, 'timestamp': Date.now() };

    if (isSuccess) {
      newOrder.id = placeOrderCall.index;
      this.openAskOrders.push({
      	...newOrder,
      	success: isSuccess,
      	error: placeOrderCall.error || ''
      });
      this.sellBalance -= amount;

    } else {
      console.log(`DexyBot (${this.botId}) - placeAskOrder Failed: `, placeOrderCall);
    }
    this.trigger('orderPlace', { 'orderType': 'sell', 'order': newOrder, 'success': isSuccess, 'error': (placeOrderCall.error || '') });
  } catch (error) {
    console.log(`DexyBot (${this.botId}) - placeAskOrder Error Catch: `, error);
  }
  //await this.timeoutTick(4000);
};



  // Close a random bid order
  closeRandomBidOrder = async () => {
    if (this.openBidOrders.length === 0) {
      console.log(`DexyBot (${this.botId}) - closeRandomBidOrder: No bid orders to close.`);
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.openBidOrders.length);
    const bidOrder = this.openBidOrders[randomIndex];

    await this.cancelBidOrder(bidOrder.id, randomIndex);
  };

  // Close a random ask order
  closeRandomAskOrder = async () => {
    if (this.openAskOrders.length === 0) {
      console.log(`DexyBot (${this.botId}) - closeRandomAskOrder: No ask orders to close.`);
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.openAskOrders.length);
    const askOrder = this.openAskOrders[randomIndex];

    await this.cancelAskOrder(askOrder.id, randomIndex);
  };

  // Check if the bot is running
  isRunning = () => {
    return this.isMarketMaking;
  }

  

  // Generate the start times between the specified dates with the given hour and minute
  generateIntervals = async () => {
	  const intervals = [];
	  const currentTime = new Date();

	  // Function to strip out the seconds from the date
	  const stripSeconds = (date) => {
	    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes());
	  };

	  console.log('this.intervalPeriod: ', this.intervalPeriod);

	  for (let i = 0; i < this.intervalPeriod.length; i++) {
	    const start = stripSeconds(new Date(this.intervalPeriod[i].start)).getTime();
	    const end = stripSeconds(new Date(this.intervalPeriod[i].end)).getTime();
	    const currentTimeStripped = stripSeconds(currentTime).getTime();

	    if (start > currentTimeStripped) {
	    	this.trigger('botTimeError', {'message': `Invalid interval. Current time is in the past. Interval: ${new Date(start)}, current time: ${currentTime}`});
	      console.log(`DexyBot (${this.botId}) - ERROR: Invalid interval. Start time is in the past. Interval: ${new Date(start)}, current time: ${currentTime}`);
	      //await this.stop();
	      return null; // Stop generating intervals and return null
	    }

	    if (start <= end) {
	      intervals.push({ start, end });
	    } else {
	      console.log(`DexyBot (${this.botId}) - ERROR: Invalid interval. Start time is after end time. Interval: ${new Date(start)} - ${new Date(end)},  start: ${start}, end: ${end}`);
	      this.trigger('botTimeError', {'message': `Invalid interval. Start time is after end time. Interval: ${new Date(start)} - ${new Date(end)},  start: ${start}, end: ${end}`});

	      //await this.stop();
	      return null; // Stop generating intervals and return null
	    }
	  }

	  return intervals;
	};
	


  // Fetch the bid and ask prices from the exchange for the trading pair
  fetchBidAndAskPrices = () => {
    // Get the bid/ask price from the exchange API

    // Set bid and ask prices
    let bidPrice = ych.data.buys[this.tradingPair]?.[0]?.price || 0;
    let askPrice = ych.data.sells[this.tradingPair]?.[0]?.price || 0;
    bidPrice = (Number(bidPrice) / 1e8);
    askPrice = (Number(askPrice) / 1e8);

    this.bidPrice = bidPrice;
    this.askPrice = askPrice;

    console.log(`DexyBot (${this.botId}) - fetchBidAndAskPrices: bidPrice:  ${bidPrice}, askPrice: ${askPrice}`);
    return { 'bidPrice': bidPrice, 'askPrice': askPrice };
  };

// Retrieve the buy and sell balance
  fetchBalance = () => {
    
    // Retrieve the buy balance and store it in the buyBalance variable
    //const defaultBuyBalance = ((parseFloat(ych.data.profile.balances[this.coinb].free) / 1e8) * percentageBalanceToUse).toFixed(this.decimals);
    //const maxBuyBalance = parseFloat(((parseFloat(ych.data.profile.balances[this.coinb].free) / 1e8)).toFixed(this.decimals));
    //this.buyBalance = Math.min(maxBuyBalance, buyBalance); // Enforce minimum value of maxBalance

    console.log('this.buyBalance: ', this.buyBalance, typeof this.buyBalance);
    this.buyBalance = parseFloat(this.buyBalance.toFixed(8));

    

    // Retrieve the sell balance and store it in the sellBalance variable
    //const maxSellBalance = parseFloat(((parseFloat(ych.data.profile.balances[this.coina].free) / 1e8)).toFixed(this.decimals));
    //this.sellBalance = Math.min(maxSellBalance, maxSellBalance); // Enforce minimum value of maxBalance
    this.sellBalance = parseFloat(this.sellBalance.toFixed(8));

    
  };

  async saveToLocalStorage() {
    /*const botData = {
      ...this,    //create a shallow copy of `this`
      intervalPeriod: this.intervalPeriod.map(String),
    };
    */
    const botData = this; ////create a shallow copy of `this`

    let xybotData = storage_l.get("xybot") || {}; // Get xybot or initialize it
		xybotData.bots = xybotData.bots || {}; // Ensure "bots" property exists

		// Assume `this.botId` and `botData` are defined in your context
		let botId = `tradingbot_${this.botId}`; // Create bot key dynamically
		//delete botData.eventHandlers;
		xybotData.bots[botId] = botData; // Store bot data inside `xybot.bots`

		storage_l.set("xybot", xybotData);

  }

  async loadFromLocalStorage(botId) {
    const botData = storage_l.get("xybot")?.bots?.[`tradingbot_${botId}`] || null;

    console.log('loadFromLocalStorage: loading bot : '+ botId);

    if (botData) {
    	delete botData.eventHandlers;
      Object.assign(this, botData);
      console.log('loadFromLocalStorage: bot assigned; : '+ botId);
      return true;
    }
    return false;
  }
}

//The code is now split into separate methods for better organization and structure. Each method has a specific responsibility and performs a single task. This improves code readability and maintainability.


// Create instances of tradingbot
/*
const bot1 = new tradingbot("bot1", "TETH1-TDAI", 0.5, 0.001, 872, 2100, 5, 5, 1800, ["07:08", "07:09", "07:10"], false);
const bot2 = new tradingbot("bot2", "ETH/BTC", 0.3, 0.002, 3, 3, 1800, ["10:00", "14:00", "18:00"], false);
const bot3 = new tradingbot("bot3", "BTC/USDT", 0.8, 0.0015, 4, 4, 2400, ["11:00", "15:00", "19:00"], true);
const bot4 = new tradingbot("bot4", "ETH/USDT", 0.4, 0.0025, 2, 2, 1200, ["12:00", "16:00", "20:00"], false);
const bot5 = new tradingbot("bot5", "LTC/BTC", 0.6, 0.0018, 6, 6, 3000, ["08:00", "14:30", "21:30"], true);

const bot1 = new tradingbot("bot1", "TETH1-TDAI", 0.5, 0.001, 872, 2100, 5, 5, 30, ["07:08", "07:09", "07:10"], false);
bot1.start();

// Check the running status of each bot
console.log("Bot 1 - Running:", bot1.isRunning());
console.log("Bot 2 - Running:", bot2.isRunning());
console.log("Bot 3 - Running:", bot3.isRunning());
console.log("Bot 4 - Running:", bot4.isRunning());
console.log("Bot 5 - Running:", bot5.isRunning());

// Get the current interval of each bot
console.log("Bot 1 - Current Interval:", bot1.getCurrentInterval());
console.log("Bot 2 - Current Interval:", bot2.getCurrentInterval());
console.log("Bot 3 - Current Interval:", bot3.getCurrentInterval());
console.log("Bot 4 - Current Interval:", bot4.getCurrentInterval());
console.log("Bot 5 - Current Interval:", bot5.getCurrentInterval());

// Get the upcoming intervals of each bot
console.log("Bot 1 - Upcoming Intervals:", bot1.getUpcomingIntervals());
console.log("Bot 2 - Upcoming Intervals:", bot2.getUpcomingIntervals());
console.log("Bot 3 - Upcoming Intervals:", bot3.getUpcomingIntervals());
console.log("Bot 4 - Upcoming Intervals:", bot4.getUpcomingIntervals());
console.log("Bot 5 - Upcoming Intervals:", bot5.getUpcomingIntervals());
*/

/*
Here's a description of the tradingbot class and its methods:

Class: tradingbot

The tradingbot class represents a market-making bot for cryptocurrency trading. It allows users to create multiple instances of the bot with different configurations.

Constructor Parameters:

    botId (string): Unique identifier for the bot instance.
    tradingPair (string): The trading pair the bot will operate on.
    useBalancePercent (number): The percentage of available funds to use for buying.
    minimalSpread (number): The minimum acceptable spread between bid and ask prices.
    maxOpenBidOrders (number): The maximum number of open bid orders allowed.
    maxOpenAskOrders (number): The maximum number of open ask orders allowed.
    intervalDuration (number): The duration in seconds for which the bot will run.
    intervalPeriod (array of strings): An array of start times in "HH:MM" format when the bot should begin trading.
    useLiquidity (boolean): Indicates whether the bot should use liquidity strategy or spread strategy.

Methods:

    start(): Starts the trading process for the bot instance. It generates start times between the specified dates and schedules the trading based on those start times.
    stop(): Stops the trading process for the bot instance. It cancels any active trading and performs cleanup or finalization steps.
    performTradingCheck(): Checks the bid and ask prices from the exchange for the trading pair and determines whether market making should be performed based on the spread.
    performMarketMakingLiquidity(bidPrice, askPrice): Performs market making using the liquidity strategy. Places bid and ask orders at calculated prices based on the liquidity strategy.
    performMarketMakingSpread(bidPrice, askPrice): Performs market making using the spread strategy. Places bid and ask orders at calculated prices based on the spread strategy.
    closeRandomBidOrder(): Closes a randomly selected open bid order.
    closeRandomAskOrder(): Closes a randomly selected open ask order.
    isRunning(): Checks whether the bot is currently running.
    getCurrentInterval(): Retrieves the index of the current interval the bot is in, based on the start times.
    getUpcomingIntervals(): Retrieves an array of upcoming intervals (start times) for the bot.

Note: The class also includes saveToLocalStorage() and loadFromLocalStorage() methods for saving and loading bot data from local storage. These methods are used to persist the bot's state between sessions.

These methods provide functionality for managing the bot's lifecycle, performing market making actions, checking status, and retrieving interval information.
---------------------------------------
The tradingbot class represents a trading bot that performs market making on a specific trading pair. Here is a breakdown of its main properties and methods:

Properties:

    botId: Identifier for the trading bot.
    tradingPair: The trading pair the bot operates on.
    useBalancePercent: Percentage of the available balance to use for trading.
    buyBalance: The balance available for buying the base currency.
    sellBalance: The balance available for selling the base currency.
    minimalSpread: The minimum spread required to perform market making.
    maxOpenBidOrders: The maximum number of open bid orders allowed.
    maxOpenAskOrders: The maximum number of open ask orders allowed.
    openBidOrders: An array to store the open bid orders.
    openAskOrders: An array to store the open ask orders.
    closedBidOrders: The count of closed bid orders.
    closedAskOrders: The count of closed ask orders.
    isMarketMaking: A flag to indicate whether the bot is currently performing market making.
    intervalPeriod: The time interval for trading checks.
    intervalId: The ID of the current trading interval.
    currentIntervalIndex: The index of the current interval being processed.
    useLiquidity: A flag to indicate whether to use a liquidity strategy for market making.
    decimals: The number of decimal places for price calculations.
    bidPrice: The current highest bid price for the trading pair.
    askPrice: The current lowest ask price for the trading pair.
    waitTimeRange: An object specifying the minimum and maximum wait time between trade actions.
    Other methods related to localStorage and fetching market data.

Methods:

    start(): Starts the trading process by generating intervals and scheduling trading checks.
    stop(): Stops the trading process and displays information about the bot's performance.
    performTradingCheck(): Checks the spread and performs market making if applicable.
    performMarketMakingLiquidity(bidPrice, askPrice): Performs market making using a liquidity strategy.
    performMarketMakingSpread(bidPrice, askPrice): Performs market making using a spread strategy.
    placeBidOrder(price, amount): Places a bid order at the given price and amount.
    placeAskOrder(price, amount): Places an ask order at the given price and amount.
    closeRandomBidOrder(): Closes a random bid order.
    closeRandomAskOrder(): Closes a random ask order.
    Other helper methods for generating random wait times and random prices within a range.
---------------------------------------


$(document).ready(() => {
  let bot = null;

  $('#botSettingsForm').on('submit', (e) => {
    e.preventDefault();

    // ... previous code

    // Create a new instance of the bot
    bot = new DexyBot(botId, { min: waitTimeRangeMin, max: waitTimeRangeMax }, intervals);

    // Attach event handlers to custom events
    bot.on('intervalChange', updateUIWithIntervals);
    bot.on('start', () => {
      // Code to handle the start event
    });
    bot.on('stop', () => {
      // Code to handle the stop event
    });

    // ... rest of the code
  });

  // ... rest of the code
});

Using EventEmitter simplifies the event handling process by providing a clean API for managing events and listeners. It allows you to emit events with data, attach multiple listeners to the same event, and provides additional features like error handling and event namespaces. This approach enhances the modularity and maintainability of your code while keeping the event handling logic separate and reusable.
User
Can I use eventemitter with without installing anything?
ChatGPT

No, the EventEmitter module is not built-in with JavaScript by default. It is part of the Node.js standard library, so you can use it in Node.js applications without installing any additional packages. However, if you're working with JavaScript in a browser environment, the EventEmitter module is not available natively.

In a browser environment, you would typically use a third-party library like EventEmitter2, eventemitter3, or similar packages to add event emitter functionality to your code. These libraries provide similar capabilities to the Node.js EventEmitter module and can be included in your project by installing them using npm or including their script files in your HTML file.

Here's an example using the EventEmitter2 library in a browser environment:

    Include the EventEmitter2 script in your HTML file:

html

<script src="https://unpkg.com/eventemitter2@7.0.3/dist/eventemitter2.js"></script>

    Update the DexyBot class to extend the EventEmitter2 class:

javascript

class DexyBot extends EventEmitter2 {
  constructor(botId, waitTimeRange, intervals) {
    super();
    this.botId = botId;
    this.waitTimeRange = waitTimeRange;
    this.intervals = intervals;
    // ... rest of the constructor code
  }

  // ... rest of the DexyBot class methods
}

    Attach event listeners to the bot instance:

javascript

$(document).ready(() => {
  let bot = null;

  $('#botSettingsForm').on('submit', (e) => {
    e.preventDefault();

    // ... previous code

    // Create a new instance of the bot
    bot = new DexyBot(botId, { min: waitTimeRangeMin, max: waitTimeRangeMax }, intervals);

    // Attach event listeners
    bot.on('intervalChange', updateUIWithIntervals);
    bot.on('start', () => {
      // Code to handle the start event
    });
    bot.on('stop', () => {
      // Code to handle the stop event
    });

    // ... rest of the code
  });

  // ... rest of the code
});

Using a third-party event emitter library allows you to achieve similar functionality to EventEmitter in Node.js but in a browser environment.
User
Ok, no thanks vanilla is the way to go 
ChatGPT

Certainly! If you prefer to stick with vanilla JavaScript without using any third-party libraries, you can implement a simple custom event system to handle events in your code. Here's an example of how you can achieve that:

javascript

class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }

  emit(eventName, ...args) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((callback) => {
        callback(...args);
      });
    }
  }

  off(eventName, callback) {
    if (this.events[eventName]) {
      if (callback) {
        this.events[eventName] = this.events[eventName].filter((cb) => cb !== callback);
      } else {
        delete this.events[eventName];
      }
    }
  }
}

With this custom EventEmitter class, you can now use it in your DexyBot class to handle events:

javascript

class DexyBot {
  constructor(botId, waitTimeRange, intervals) {
    this.botId = botId;
    this.waitTimeRange = waitTimeRange;
    this.intervals = intervals;
    this.eventEmitter = new EventEmitter();
  }

  on(eventName, callback) {
    this.eventEmitter.on(eventName, callback);
  }

  start() {
    // Code for starting the trading process

    // Emit the 'start' event
    this.eventEmitter.emit('start');
  }

  stop() {
    // Code for stopping the trading process

    // Emit the 'stop' event
    this.eventEmitter.emit('stop');
  }

  // Other methods...

}

Then, you can attach event listeners and handle events like this:

javascript

const bot = new DexyBot(botId, waitTimeRange, intervals);

bot.on('start', () => {
  // Code to handle the start event
});

bot.on('stop', () => {
  // Code to handle the stop event
});

bot.start();

This approach allows you to create a simple event system using vanilla JavaScript without any external dependencies. You can customize it further based on your specific requirements and add more event types as needed.


------------------------------------------


https://lucymarmitchell.medium.com/using-then-catch-finally-to-handle-errors-in-javascript-promises-6de92bce3afc

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch
https://www.freecodecamp.org/news/javascript-promise-methods/
https://dmitripavlutin.com/javascript-promises-then-vs-then-catch/

https://javascript.info/promise-error-handling

new Promise(
  xybot.part.sell_call(999, 0.002345678)
  ).then(data) ({
    console.log('part_sell promise success: ', data);
  }).catch(data)({
    console.log('part_sell promise error: ', data);
  })


var ret;
var ice2 = new Promise(res => xybot.part.sell_call(999, 0.012345678), async () => {console.log('miauuu', res)});

console.log('ice2: ', ice2);
console.log('ice2: ', ice2.ok);
console.log('ret: ', ret);


var bidden = await (async function() {return xybot.part.nobuy_call(49)})();
console.log('bidden: ', bidden);


var uuu = async () => { 
var ice= await xybot.part.sell_call(999, 0.012345678);

if (ice.ok)
  console.log('atanns bananer');
else
  console.log('helvete');
};
uuu();






// Example usage
const intervalPeriod = [
  { "startTime": "09:00:00", "endTime": "10:00:00" },
  { "startTime": "10:30:00", "endTime": "11:30:00" },
  { "startTime": "13:00:00", "endTime": "14:30:00" }
];



---------------

//init the bot
var bot = new tradingbot();

//configure the bot
bot.config({
  botId: "Bot1_31928",
  tradingPair:  "TBLK-TBTC",
  buyBalance: 0.0173894,  //coinb
  sellBalance: 5000,      //coina
  minimalSpread: 0.00000100,
  minOrderCost: 0.00002500,
  maxOrderCost: 0.00005000,
  maxOpenOrders: { bid: 5, ask: 5 },
  intervalPeriod: [
    {start: "2023-06-28 13:07", end: "2023-06-28 13:51"},
    {start: "2023-06-28 13:52", end: "2023-06-28 18:51"},
  ],
  useLiquidity: true,
  waitTimeRange: {min: 10, max: 20}, 
  cancelOrdersOnStop: { cancelBuyOrders: false, cancelSellOrders: false },
  orderType: 'both'
});

// Start the bot
bot.start();

*/


