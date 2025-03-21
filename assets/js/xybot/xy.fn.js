'use strict';


/*loader/spinner*/
$(window).on('load', function() {
  setTimeout(function() {
    $('#preloader').velocity({
      opacity: 0.1,
      translateY: "-80px"
    }, {
      duration: 400,
      complete: function() {
        $('#hola').velocity({
          translateY: "-100%"
        }, {
          duration: 1000,
          easing: [0.7, 0, 0.3, 1],
          complete: function() {
            $('.page-wrapper').addClass('animate-border divide');
            $('#hola').remove();
          }
        })
      }
    })
  }, 1000)
});




let xy_fn = {};

$(function() {

/**
 * Truncates a string by showing a specified number of characters at the beginning and end.
 *
 * @param {string} inputString - The input string.
 * @param {number} startChars - The number of characters to show at the beginning.
 * @param {number} endChars - The number of characters to show at the end.
 * @returns {string} - The truncated string.
 */
 xy_fn.truncateString = function(inputString, startChars = 4, endChars = 4) {
  if (typeof inputString !== 'string' || !Number.isInteger(startChars) || !Number.isInteger(endChars)) {
    // Handle invalid input
    return 'Invalid input';
  }

  if (startChars < 0 || endChars < 0) {
    // Handle negative values
    return 'Negative values are not allowed';
  }

  const length = inputString.length;

  if (length <= startChars + endChars) {
    // Handle cases where the total length is less than or equal to the sum of startChars and endChars
    return inputString;
  }

  const prefix = inputString.substring(0, startChars);
  const suffix = inputString.substring(length - endChars);

  return `${prefix}...${suffix}`;
}

// Example usage
//const exampleString = "ThisIsAnExampleString123";
//const truncatedString = xy_fn.truncateString(exampleString, 6, 5);
//console.log(truncatedString);



xy_fn.formatDate = (timestamp, format = 'HH:mm:ss') => {
    const date = new Date(timestamp);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    
    if (format === 'HH:mm:ss') {
        return `${hours}:${minutes}:${seconds}`;
    } 
    // Add more formats here if needed
    
    // Default to HH:mm:ss if invalid format is provided
    return `${hours}:${minutes}:${seconds}`;
};

  /**
   * Converts a timestamp to a date in the YYYY-MM-DD HH:mm:ss format.
   *
   * @param {number} timestamp The timestamp to convert.
   * @returns {string} The formatted date.
   */
  xy_fn.convertTimestampToDate = function(timestamp) {
    const date = new Date(timestamp * 1000);
    let formattedDate = date.toLocaleString('en-US', {
      //timeZone: 'UTC',
      format: 'YYYY-MM-DD HH:mm:ss',
    });

    return formattedDate;
  }

	//init the bot
  	xybot.dexyBot = new tradingbot();
  	xybot.buftextBot = '';  //for debugging of errors while trading



  /* //START DexyBot */


  // Function to compare start time and end time for Interval Periods
function compareTime(startInput, endInput) {
  const startTimeValue = $(startInput).val();
  const endTimeValue = $(endInput).val();

  const startTime = new Date(`2000-01-01 ${startTimeValue}`);
  const endTime = new Date(`2000-01-01 ${endTimeValue}`);

  const isInRange = startTimeValue && endTimeValue &&
    startTime < endTime &&
    startTime.getHours() * 60 + startTime.getMinutes() >= new Date().getHours() * 60 + new Date().getMinutes();

  const $inputs = $(startInput).add(endInput);
  const $tooltip = $inputs.next('.invalid-tooltip');

  $inputs.removeClass('border-danger border-success')
    .addClass(isInRange ? 'border-success' : 'border-danger');
  $tooltip.css('display', isInRange ? 'none' : 'block');

  console.log ('compareTime isInRange: ', isInRange);
  return isInRange;
}


  //Bot - check changes and apply UI interactions
  const botOrderType = $('#tradingbot input:radio[name="botOrderType-radio"]');

  const botBidPriceAction = $('#tradingbot input:radio[name="botBidPriceAction-radio"]');
  const botBidRandomMinPrice = $('#tradingbot input[data-bot="minRandomTradeBidPrice"]');
  const botBidRandomMaxPrice = $('#tradingbot input[data-bot="maxRandomTradeBidPrice"]');
  const botBidRandomMinQty = $('#tradingbot input[data-bot="minRandomTradeBidQty"]');
  const botBidRandomMaxQty = $('#tradingbot input[data-bot="maxRandomTradeBidQty"]');  

  const botAskPriceAction = $('#tradingbot input:radio[name="botAskPriceAction-radio"]');
  const botAskRandomMinPrice = $('#tradingbot input[data-bot="minRandomTradeAskPrice"]');
  const botAskRandomMaxPrice = $('#tradingbot input[data-bot="maxRandomTradeAskPrice"]');
  const botAskRandomMinQty = $('#tradingbot input[data-bot="minRandomTradeAskQty"]');
  const botAskRandomMaxQty = $('#tradingbot input[data-bot="maxRandomTradeAskQty"]');

// Define functions to enable/disable random inputs
function enableRandomInputs(input) {
    $(input).prop('disabled', false);
}

function disableRandomInputs(input) {
    $(input).prop('disabled', true);
}

$(botOrderType).on('input', function() {
  const value = this.value;

  // Enable/disable elements based on value
  botBidPriceAction.prop('disabled', (value !== "buy" && value !== "both") ) ;
  botAskPriceAction.prop('disabled', (value !== "sell" && value !== "both") );
  botBidRandomMinPrice.prop('disabled', (value !== "buy" && value !== "both") );
  botBidRandomMaxPrice.prop('disabled', (value !== "buy" && value !== "both") );
  botBidRandomMinQty.prop('disabled', (value !== "buy" && value !== "both") );
  botBidRandomMaxQty.prop('disabled', (value !== "buy" && value !== "both") );
  botAskRandomMinPrice.prop('disabled', (value !== "sell" && value !== "both") );
  botAskRandomMaxPrice.prop('disabled', (value !== "sell" && value !== "both") );
  botAskRandomMinQty.prop('disabled', (value !== "sell" && value !== "both") );
  botAskRandomMaxQty.prop('disabled', (value !== "sell" && value !== "both") );

  if (value === 'buy') {
  	$('.botBidPriceBox').removeClass('hidden')
  	$('.botAskPriceBox').addClass('hidden')
  }
  if (value === 'sell') {
  	$('.botBidPriceBox').addClass('hidden')
  	$('.botAskPriceBox').removeClass('hidden')
  }
  if (value === 'both') {
  	$('.botBidPriceBox').removeClass('hidden')
  	$('.botAskPriceBox').removeClass('hidden')
  }
  // Uncheck unchecked checkboxes
  //if (value !== "buy" && value !== "both") botBidPriceAction.prop('checked', false);
  //if (value !== "sell" && value !== "both") botAskPriceAction.prop('checked', false);

});


  $('#botButton').on('click', function(e) {
    e.preventDefault();

    //check if privkey is set in sessionstorage
    if (!xybot.checkPrivKey())
      return;

    console.log('botButton: clicked');    
    let botStatus = $(this).attr('data-bot');

    if (botStatus == 'start') {

      let startBot = true;
      // Remove existing red borders
      //$("#intervalPeriod .datetime").removeClass("border border-danger border-success");

      // Iterate through each interval
      $('#intervalPeriod .row').each(function() {
        var startInput = $(this).find("input[data-bot='intervalStart']");
        var endInput = $(this).find("input[data-bot='intervalEnd']");

        if (!compareTime(startInput, endInput)) {
          startBot = false;
          console.log('compareTime error');
        }
      });

      if (!startBot)
        return;




      //$('#tradingbot [data-bot="options"]').velocity('slideUp', { duration: 300 });
      //$('#tradingbot [data-bot="options"]').velocity('slideUp').velocity("scroll", { duration: 500, easing: "spring" })
      //show tradingbot active elements
      //$('#tradingbot [data-bot="active"]').velocity('slideDown', { duration: 300 });

      //get form configuration for bot
      const OrderType = $(botOrderType).filter(':checked').val();
      

      

      const tradingPair = $('#tradingbot select.select-market').attr('data-market-pair');
      const maxOpenBidOrders = $('#tradingbot input[data-bot="maxOpenBidOrders"]').val();
      const maxOpenAskOrders = $('#tradingbot input[data-bot="maxOpenAskOrders"]').val();
      const minOrderCost = $('#tradingbot input[data-bot="minOrderCost"]').val();
      const maxOrderCost = $('#tradingbot input[data-bot="maxOrderCost"]').val();
      const buyBalance = $('#tradingbot input[data-bot="buyBalance"]').val();
      const sellBalance = $('#tradingbot input[data-bot="sellBalance"]').val();
      const minRandomTradeTime = $('#tradingbot input[data-bot="minRandomTradeTime"]').val();
      const maxRandomTradeTime = $('#tradingbot input[data-bot="maxRandomTradeTime"]').val();

      const useLiqudity = $('#tradingbot input[data-bot="useLiquidity"]').prop('checked');

      //get Price Action Settings
        //Bid settings
      let bidPriceAction = $('#tradingbot input:radio[name="botBidPriceAction-radio"]:checked').val();
      const bidRandomMinPrice = $('#tradingbot input[data-bot="minRandomTradeBidPrice"]').val();
      const bidRandomMaxPrice = $('#tradingbot input[data-bot="maxRandomTradeBidPrice"]').val();
      const bidRandomMinQty = $('#tradingbot input[data-bot="minRandomTradeBidQty"]').val();
      const bidRandomMaxQty = $('#tradingbot input[data-bot="maxRandomTradeBidQty"]').val();
        // Set priceAction to none if it doesn't contain none, above, or below
      bidPriceAction = ['none', 'above', 'below'].includes(bidPriceAction) ? bidPriceAction : 'none';


        //ask settings
      let askPriceAction = $('#tradingbot input:radio[name="botAskPriceAction-radio"]:checked').val();
      const askRandomMinPrice = $('#tradingbot input[data-bot="minRandomTradeAskPrice"]').val();
      const askRandomMaxPrice = $('#tradingbot input[data-bot="maxRandomTradeAskPrice"]').val();
      const askRandomMinQty = $('#tradingbot input[data-bot="minRandomTradeAskQty"]').val();
      const askRandomMaxQty = $('#tradingbot input[data-bot="maxRandomTradeAskQty"]').val();
        // Set priceAction to none if it doesn't contain none, above, or below
      askPriceAction = ['none', 'above', 'below'].includes(askPriceAction) ? askPriceAction : 'none';


      // Define the mapping for the checked values of cancelOrdersonStop
      const cancelOrdersonStopMapping = {
        'both': {
          cancelBuyOrders: true,
          cancelSellOrders: true
        },
        'sell': {
          cancelBuyOrders: false,
          cancelSellOrders: true
        },
        'buy': {
          cancelBuyOrders: true,
          cancelSellOrders: false
        },
        'none': {
          cancelBuyOrders: false,
          cancelSellOrders: false
        },
      };
      const cancelOrdersonStopValue = $('#tradingbot input:radio[name="botcancelOrdersonStop-radio"]:checked').val();
      // Create the cancelOrdersOnStop object using the mapping
      const cancelOrdersOnStop = cancelOrdersonStopMapping[cancelOrdersonStopValue];


      let intervalPeriods = [];
      $('#tradingbot #intervalPeriod .row').each(function() {
        var start = $(this).find('input[data-bot="intervalStart"]').val();
        var end = $(this).find('input[data-bot="intervalEnd"]').val();

        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        var currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
        var currentDay = String(currentDate.getDate()).padStart(2, '0');

        var startDate = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + start;
        var endDate = currentYear + '-' + currentMonth + '-' + currentDay + ' ' + end;

        intervalPeriods.push({
          'start': startDate,
          'end': endDate
        });
      });

      //console.log('intervalPeriods: ', intervalPeriods)

      //configure tradingbot
      xybot.dexyBot.config({
        'botId': "Bot_" + tradingPair, //botId 
        'tradingPair': tradingPair,
        'buyBalance': buyBalance,
        'sellBalance': sellBalance, //coina
        'minimalSpread': 0.00000100,
        'minOrderCost': minOrderCost,
        'maxOrderCost': maxOrderCost,
        'maxOpenOrders': {
          'bid': maxOpenBidOrders,
          'ask': maxOpenAskOrders
        },
        'intervalPeriod': intervalPeriods,
        'useLiquidity': useLiqudity,
        'waitTimeRange': {
          'min': minRandomTradeTime,
          'max': maxRandomTradeTime
        },
        'cancelOrdersOnStop': cancelOrdersOnStop,
        'orderType': OrderType,
        // Bid price action settings
        'bidSettings': {
          'action': {
            'trend': bidPriceAction,
            'minPrice': bidRandomMinPrice,
            'maxPrice': bidRandomMaxPrice,
            'minQty': bidRandomMinQty,
            'maxQty': bidRandomMaxQty
          },
        },
        // Ask price action settings
        'askSettings': {
          'action': {
            'trend': askPriceAction,
            'minPrice': askRandomMinPrice,
            'maxPrice': askRandomMaxPrice,
            'minQty': askRandomMinQty,
            'maxQty': askRandomMaxQty
          },
        }

      });

      //start dexyBot!
      xybot.dexyBot.start();

      //console.log('xybot.dexyBot: ', xybot.dexyBot);



    } else {

      //$('#tradingbot [data-bot="options"]').velocity('slideDown', { duration: 300 });

      //show tradingbot active elements
      $('#tradingbot [data-bot="active"]').velocity('fadeIn', {
        duration: 300
      });

      //stop dexyBot
      xybot.dexyBot.stop();

    }

  });
  
  /*
    DexyBot Log
    
  remaining trigger events to add : emptyBalance, orderMatch, orderCancel..
    
  */
  // Cache frequently accessed elements
  const botButton = $('#botButton');
  const botButtonText = botButton.children(':last');
  const botButtonSpinner = botButton.children(':first');
  const botLog = $("#data_bot_log tbody"); // Bot log container element
  const botLogInterval = $('#data_bot_log [data-bot="interval"]');

  const botTradingPair = $('#data_bot_log [data-bot="tradingPair"]');
  const botStatus = $('#tradingbot [data-bot="status"]');
  const botTradingOptions = $('#tradingbot [data-bot="options"] input');
  const botIntervalPeriodButtons = $('#intervalPeriod button');
  const botOverlay = $('#tradingbot .overlay_message');

  // Initialize predefined rows for bot logs
  const botLogRows = []; // Array of bot log rows
  const maxBotLogRows = 18; // Maximum number of rows in the bot log
  let currentBotLogRowIndex = 0; // Index to keep track of the current row position

  // Init/Create 18 predefined bot log rows
  for (let i = 0; i < maxBotLogRows; i++) {
    const row = document.createElement('tr');
    botLogRows.push(row);
  }

  function addBotLogRow(newRow) {
    const targetRow = botLogRows[currentBotLogRowIndex];
    targetRow.innerHTML = newRow;

    // Move the target row to the first row position
    botLog.prepend(targetRow, botLog.firstChild);

    // Slide down the newly added row
    $(targetRow).find('div').velocity('slideDown', {
      duration: 300
    });

    // Batch the DOM updates for better performance
    /*requestAnimationFrame(function () {
      // Slide down the newly added row
      const rowDiv = targetRow.querySelector('div');
      rowDiv.style.display = 'none';
      rowDiv.style.opacity = '0';
      rowDiv.style.transition = 'opacity 300ms';
      setTimeout(function () {
        rowDiv.style.display = '';
        requestAnimationFrame(function () {
          rowDiv.style.opacity = '1';
        });
      }, 0);
    });
    */

    // Update currentBotLogRowIndex for the next event
    currentBotLogRowIndex = (currentBotLogRowIndex + 1) % maxBotLogRows;
  }

  xybot.dexyBot.on('start', function(data) {

    //hide the trading options and scroll to top of the edge of element
    $('#tradingbot [data-bot="options"]').velocity('slideUp').velocity("scroll", {
      duration: 500,
      easing: "spring"
    })

    // Update elements related to "start bot"
    botButton.attr('data-bot', 'stop').removeClass('btn-lime').addClass('btn-red');
    botButtonText.text('Stop Bot');
    botButtonSpinner.removeClass('hidden');
    botTradingPair.text(xybot.dexyBot.botId);
    botStatus.removeClass('bg-red-lt').addClass('bg-green-lt').text('Bot is active');
    botOverlay.removeClass('d-none');

    // Disable trading bot options and interval period buttons
    botTradingOptions.prop('disabled', true);
    botIntervalPeriodButtons.prop('disabled', true);

    // Empty bot log
    botLog.empty();

    let newRow = `<tr>
    <td colspan="5" class="text-muted">
      <div><span class="badge bg-lime-lt">Bot Started ...</span></div>
    </td>
  </tr>`;

    // Empty bot log header about current interval
    botLogInterval.text('-');

    addBotLogRow(newRow);
  });

  xybot.dexyBot.on('stop', function(data) {

    //show the trading options and scroll to top of the edge of element
    $('#tradingbot [data-bot="options"]').velocity('slideDown').velocity("scroll", {
      duration: 500,
      easing: "spring"
    })

    // Update elements related to "stop bot"
    botButton.attr('data-bot', 'start').removeClass('btn-red').addClass('btn-lime');
    botButtonText.text('Start Bot');
    botButtonSpinner.addClass('hidden');
    botStatus.removeClass('bg-green-lt').addClass('bg-red-lt').text('Not running');
    botOverlay.addClass('d-none');

    // Enable trading bot options and interval period buttons
    botTradingOptions.prop('disabled', false);
    botIntervalPeriodButtons.prop('disabled', false);

    let newRow = `
    <tr>
      <td colspan="5" class="text-muted">
        <div><span class="badge bg-red-lt">Bot Stopped ...</span></div>
      </td>
    </tr>
  `;

    // Empty bot log header about current interval
    botLogInterval.text('-');

    addBotLogRow(newRow);
  });

  xybot.dexyBot.on('error', function(data) {
    botStatus.removeClass('bg-green-lt').addClass('bg-red-lt').text('Not running');

    let newRow = `
    <tr><td colspan="5" class="text-muted">
      <div><span class="badge bg-red-lt">Bot Start Failed</span> ${data.message}</div>
    </td>
  </tr>`;

    addBotLogRow(newRow);
  });

  xybot.dexyBot.on('intervalChange', function(data) {

    const startTime = new Date(data.interval.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const endTime = new Date(data.interval.end).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let newRow = `<tr>
    <td colspan="2" class="text-muted">
      <div><span class="badge bg-orange-lt">Started new interval ...</span></div>
    </td>
    <td colspan="3" class="">
      <div class="d-flex flex-row text-muted small justify-content-end">
        <span class="badge bg-green-lt">Start: ${startTime}</span>
        <span class="badge bg-red-lt">End: ${endTime}</span>
      </div>
    </td>
  </tr>`;

    // Update BOTLOG header about current interval
    botLogInterval.text(startTime + ' - ' + endTime)

    addBotLogRow(newRow);

  });

  xybot.dexyBot.on('intervalDelay', function(data) {

    const startTime = new Date(data.interval.start).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
    const endTime = new Date(data.interval.end).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });

    let newRow = `<tr>
    <td colspan="2" class="text-muted">
      <div><span class="badge bg-orange-lt">Scheduling for interval start ...</span></div>
    </td>
    <td colspan="3" class="">
      <div class="d-flex flex-row text-muted small justify-content-end">
        <span class="badge bg-green-lt">Start: ${startTime}</span>
        <span class="badge bg-red-lt">End: ${endTime}</span>
      </div>
    </td>
  </tr>`;

    // Update BOTLOG header about current interval
    botLogInterval.html('<span class="text-orange">Scheduling ' + startTime + ' - ' + endTime + '</span>')

    addBotLogRow(newRow);
  });




  xybot.dexyBot.on('orderPlace', function(data) {

    let orderClass = "";
    if (data.orderType == "buy")
      orderClass = "bg-lime-lt";
    else
      orderClass = "bg-red-lt";

    let newRow = "";
    let status = "";
    let orderTime = new Date(data.order.timestamp).toLocaleTimeString([], {
      hour12: false
    });

    if (data.success) {
      newRow = `<tr>
      <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
      <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
      <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
      <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
      <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
    </tr>`;
    } else {
      newRow = `<tr>
      <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
      <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}, <br>ych.nnum: ${ych.nnum}, <br><span class="buftext"><b>Bot buftext:</b> ${xybot.buftextBot}</span></div></td>
      <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
    </tr>`;
    }

    addBotLogRow(newRow);
  });


  xybot.dexyBot.on('orderCancel', function(data) {


    let orderClass = ""
    if (data.orderType == "buy")
      orderClass = "bg-lime-lt";
    else
      orderClass = "bg-red-lt";

    let newRow = "";
    let status = "";
    let orderTime = new Date(data.order.timestamp).toLocaleTimeString([], {
      hour12: false
    });
    if (data.success)
      newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
                    <td data-label="Price" class="text-muted yright"><div>${(data.order.price).toFixed(8)}</div></td>
                    <td data-label="Amount" class="text-muted yright"><div>${(data.order.amount).toFixed(8)}</div></td>
                    <td data-label="Cost" class="text-muted yright"><div>${(data.order.cost).toFixed(8)}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
                </tr>`;
    else {
      newRow = `<tr>
                    <td data-label="Order"><div><span class="badge ${orderClass}">${data.orderType} cancel</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
                    <td data-label="Message" colspan="3" class="text-muted small "><div>${data.error}</div></td>
                    <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
                </tr>`;
    }

    addBotLogRow(newRow);

  });
/* //STOP DexyBot */



/*Pagination*/
// jQuery Plugin for Table Pagination
// jQuery Plugin for Table Pagination





/**
 * Sort Tables
 *
 * */
function enableTableSorting(table) {
  const thRow = table.querySelector('thead tr');
  const tbody = table.querySelector('tbody');

  thRow.addEventListener('click', function(event) {
    var th = event.target.closest('th[data-sort]');
    if (!th) return;

    var thIndex = th.cellIndex;
    var inverse = th.dataset.inverse === 'true';

    var rows = Array.from(tbody.children);

    rows.sort(function(a, b) {
      var attrA = a.cells[thIndex].getAttribute('data-sort');
      var attrB = b.cells[thIndex].getAttribute('data-sort');

      // Check if any of the attributes is "false" and skip sorting if true
      if (attrA === 'false' || attrB === 'false') return 0;

      // Parse the attributes to numbers if they are numeric strings
      if (!isNaN(parseFloat(attrA))) attrA = parseFloat(attrA);
      if (!isNaN(parseFloat(attrB))) attrB = parseFloat(attrB);

      return attrA > attrB ? (inverse ? -1 : 1) : attrA < attrB ? (inverse ? 1 : -1) : 0;
    });

    rows.forEach(function(row) {
      tbody.appendChild(row);
    });

    th.dataset.inverse = !inverse;
  });
}
// Enable sorting for a table with both table and div tags
xy_fn.enableDivTableSortingWorking = function (table) {
  // Get the header row and table body elements
  const thRow = table.querySelector('.flex-thead');
  const tBody = table.querySelector('.flex-tbody');
  
  // Attach click event listener to the header row for sorting
  thRow.addEventListener('click', function (event) {
    // Find the clicked column header
    const th = event.target.closest('.flex-cell[data-sort]');
    //console.log('th: ', th);
    if (!th) return;

    // Get all rows in the table body
    const trRows = Array.from(tBody.querySelectorAll('[table-sort-row]'));


    // Find the index of the clicked column header
    const thIndex = Array.from(thRow.querySelectorAll('.flex-cell')).indexOf(th);
    const inverse = th.dataset.inverse === 'true';

    //console.log('thIndex: ', thIndex);
    //console.log('trRows: ', trRows);

    // Sort the rows based on the clicked column's data-sort attribute
    trRows.sort(function (a, b) {
      const cellsA = Array.from(a.querySelectorAll('[table-sort-cells] .flex-cell'));
      const cellsB = Array.from(b.querySelectorAll('[table-sort-cells] .flex-cell'));

      //console.log('thIndex: ', thIndex);
      // Ensure the cells are present before accessing the attribute
      if (thIndex >= cellsA.length || thIndex >= cellsB.length) return 0;

      // Get the data-sort attribute values of the two rows for comparison
      let attrA = cellsA[thIndex].dataset.sort;
      let attrB = cellsB[thIndex].dataset.sort;

      //console.log('attrA: ', attrA);
      //console.log('attrB: ', attrB);

      // Check if any of the attributes is "false" and skip sorting if true
      if (attrA === 'false' || attrB === 'false') return 0;

      // Parse the attributes to numbers if they are numeric strings
      // Parse the attributes to numbers if they are numeric strings
      if (!isNaN(parseFloat(attrA))) attrA = parseFloat(attrA);
      if (!isNaN(parseFloat(attrB))) attrB = parseFloat(attrB);

      // Compare and return sort order based on attribute values
      return attrA > attrB ? (inverse ? -1 : 1) : attrA < attrB ? (inverse ? 1 : -1) : 0;
      
    });

    // Append sorted rows to the table body
    trRows.forEach(function (row) {
      // Only append the row if it's not flagged with "data-sort=false"
      if (row.getAttribute('data-sort') !== 'false') {
        tBody.appendChild(row);
      }
    });

    // Toggle the sort direction for the clicked column
    th.dataset.inverse = !inverse;
  });
}

xy_fn.enableDivTableSorting = function (table) {
  const thRow = table.querySelector('.flex-thead');
  const tBody = table.querySelector('.flex-tbody');
  let prevTh; // Track the previous clicked column header
  let inverse = false; // Initialize inverse to false

  thRow.addEventListener('click', function (event) {
    const th = event.target.closest('.flex-cell[data-sort]');
    if (!th) return;

    const thIndex = Array.from(thRow.querySelectorAll('.flex-cell')).indexOf(th);

    // Check if the clicked column is the same as the previous one
    if (th === prevTh) {
      inverse = !inverse; // Toggle the inverse value
    } else {
      inverse = false; // Reset the inverse value for a new column header
    }

    const trRows = Array.from(tBody.querySelectorAll('[table-sort-row]'));
    trRows.sort(function (a, b) {
      const cellsA = Array.from(a.querySelectorAll('[table-sort-cells] .flex-cell'));
      const cellsB = Array.from(b.querySelectorAll('[table-sort-cells] .flex-cell'));

      // Ensure the cells are present before accessing the attribute
      if (thIndex >= cellsA.length || thIndex >= cellsB.length) return 0;

      let attrA = cellsA[thIndex].dataset.sort;
      let attrB = cellsB[thIndex].dataset.sort;

      // Check if any of the attributes is "false" and skip sorting if true
      if (attrA === 'false' || attrB === 'false') return 0;

      // Parse the attributes to numbers if they are numeric strings
      if (!isNaN(parseFloat(attrA))) attrA = parseFloat(attrA);
      if (!isNaN(parseFloat(attrB))) attrB = parseFloat(attrB);

      return attrA > attrB ? (inverse ? -1 : 1) : attrA < attrB ? (inverse ? 1 : -1) : 0;
    });

    // Use Document Fragment to batch append the sorted rows
    const fragment = document.createDocumentFragment();
    trRows.forEach(function (row) {
      // Only append the row if it's not flagged with "data-sort=false"
      if (row.dataset.sort !== 'false') {
        fragment.appendChild(row);
      }
    });

    // Clear the current content of the table body and append the sorted rows
    tBody.textContent = ''; // Faster than innerHTML
    tBody.appendChild(fragment);

    // Update the inverse flag based on the sorting result
    th.dataset.inverse = inverse;
    prevTh = th; // Update the previous clicked column header
  });
}



xy_fn.tablePagination2 = function (showPerPage = 10, containerId, pagingContentId) {

   // Remove existing event listeners from the container
  $('#' + containerId).off();
  
  console.log('xy_fn.tablePagination: ', showPerPage, containerId, pagingContentId);

  var number_of_items = $('#' + pagingContentId).children().length;
  var number_of_pages = Math.ceil(number_of_items / showPerPage);

  $('#' + containerId + ' .current_page').val(0);
  $('#' + containerId + ' .show_per_page').val(showPerPage);

  $('#' + pagingContentId)
    .children()
    .addClass('d-none');

  $('#' + pagingContentId)
    .children()
    .slice(0, showPerPage)
    .removeClass('d-none');

  // Use event delegation for "Go to page" functionality
  $('#' + containerId).on('click', '.page_navigation .page-link', function (e) {
    e.preventDefault();
    var page_num = parseInt($(this).attr('longdesc'));
    //console.log('tablePagination page-link: ', page_num);

    go_to_page.call($('#' + containerId), page_num);
  });

  // Use event delegation for "Previous" functionality
  $('#' + containerId).on('click', '.page_navigation .previous_link', function (e) {
    e.preventDefault();
    
    var new_page = parseInt($('#' + containerId + ' .current_page').val()) - 1;
    //console.log('tablePagination previous_link: ', new_page, $('#' + containerId + ' li.active').prev('.page-item'));
    if ($('#' + containerId + ' li.active').prev('.page-item').length == 1) {
      go_to_page.call($('#' + containerId), new_page);
    }
  });

  // Use event delegation for "Next" functionality
  $('#' + containerId).on('click', '.page_navigation .next_link', function (e) {
    e.preventDefault();
    
    var new_page = parseInt($('#' + containerId + ' .current_page').val()) + 1;
    //console.log('tablePagination next_link: ', new_page, $('#' + containerId + ' li.active').next('.page-item'));
    if ($('#' + containerId + ' li.active').next('.page-item').length == 1) {
      go_to_page.call($('#' + containerId), new_page);
    }
  });

  function go_to_page(page_num) {
    var show_per_page = parseInt($('#' + containerId + ' .show_per_page').val());

    // Calculate the total number of pages
    var number_of_items = $('#' + pagingContentId).children().length;
    var number_of_pages = Math.ceil(number_of_items / show_per_page);
    var navigation_html = '';
    var summary_text = '';

    // Check if there are any rows
    if (number_of_items === 0) {
      // Hide the pagination element
      $('#' + containerId + ' .page_navigation').hide();
      // Reset pagination summary
      summary_text = 'Showing 0 to 0 of 0 entries';
      $('#' + containerId + ' .navigation_summary').text(summary_text);
      return;
    } else {
      // Show the pagination element if hidden
      $('#' + containerId + ' .page_navigation').show();
    }

    // Ensure that page_num is within the valid range of page numbers
    page_num = Math.max(0, Math.min(page_num, number_of_pages - 1));

    var start_from = page_num * show_per_page;
    var end_on = start_from + show_per_page;

    //display pages relative to chosen page
    $('#' + pagingContentId)
      .children()
      .addClass('d-none')
      .slice(start_from, end_on)
      .removeClass('d-none');

    //add css class active to current page
    $('#' + containerId + ' .page-link[longdesc=' + page_num + ']')
      .closest('li') // Find the closest parent <li> element
      .addClass('active') // Add the 'active' class to the <li> element
      .siblings() // Get the other <li> elements
      .removeClass('active'); // Remove the 'active' class from them

    $('#' + containerId + ' .current_page').val(page_num);

    // Update the navigation summary
    var total_items = $('#' + pagingContentId).children().length;
    var start_item = start_from + 1;
    var end_item = Math.min(start_from + show_per_page, total_items);
    summary_text = `Showing ${start_item} to ${end_item} of ${total_items} entries`;

    $('#' + containerId + ' .navigation_summary').html(summary_text);

    // Update pagination links based on the current page
    var middleRange = 3;
    var visiblePages = middleRange * 2 + 1;
    var currentPage = page_num + 1;
    var startPage, endPage;

    if (number_of_pages <= visiblePages) {
      startPage = 1;
      endPage = number_of_pages;
    } else {
      if (currentPage - middleRange <= 0) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + middleRange > number_of_pages) {
        startPage = number_of_pages - visiblePages + 1;
        endPage = number_of_pages;
      } else {
        startPage = currentPage - middleRange;
        endPage = currentPage + middleRange;
      }
    }

    navigation_html = '<li class="page-item"><a class="previous_link pe-1" href="#"><i class="ti ti-chevron-left"></i> Prev</a></li>';
    for (var i = startPage - 1; i < endPage; i++) {
      navigation_html +=
        '<li class="page-item"><a class="page-link ps-1" href="#" longdesc="' +
        i +
        '">' +
        (i + 1) +
        '</a></li>';
    }
    navigation_html += '<li class="page-item"><a class="next_link ps-1" href="#">Next <i class="ti ti-chevron-right"></i></a></li>';

    $('#' + containerId + ' .page_navigation').html(navigation_html);
    $('#' + containerId + ' .page_navigation .page-link[longdesc=' + page_num + ']').parent().addClass('active');
  }

  // Initialize the pagination for the first page
  go_to_page(0);
};



xy_fn.tablePagination = function (showPerPage = 10, containerId, pagingContentId) {
  // Remove existing event listeners from the container
  $('#' + containerId).off();

  console.log('xy_fn.tablePagination: ', showPerPage, containerId, pagingContentId);

  var number_of_items = $('#' + pagingContentId).children().length;
  var number_of_pages = Math.ceil(number_of_items / showPerPage);

  $('#' + containerId + ' .current_page').val(0);
  $('#' + containerId + ' .show_per_page').val(showPerPage);

  $('#' + pagingContentId)
    .children()
    .addClass('d-none');

  $('#' + pagingContentId)
    .children()
    .slice(0, showPerPage)
    .removeClass('d-none');

  // Use event delegation for "Go to page" functionality
  $('#' + containerId).on('click', '.page_navigation .page_link', function (e) {
    e.preventDefault();
    var page_num = parseInt($(this).attr('longdesc'));
    //console.log('tablePagination page-link: ', page_num);

    go_to_page.call($('#' + containerId), page_num);
  });

  // Use event delegation for "Previous" functionality
  $('#' + containerId).on('click', '.page_navigation .page-link.previous_link', function (e) {
    e.preventDefault();

    var new_page = parseInt($('#' + containerId + ' .current_page').val()) - 1;
    //console.log('tablePagination previous_link: ', new_page, $('#' + containerId + ' li.active').prev('.page-item'));
    if ($('#' + containerId + ' li.active').prev('.page-item').length == 1) {
      go_to_page.call($('#' + containerId), new_page);
    }
  });

  // Use event delegation for "Next" functionality
  $('#' + containerId).on('click', '.page_navigation .page-link.next_link', function (e) {
    e.preventDefault();

    var new_page = parseInt($('#' + containerId + ' .current_page').val()) + 1;
    //console.log('tablePagination next_link: ', new_page, $('#' + containerId + ' li.active').next('.page-item'));
    if ($('#' + containerId + ' li.active').next('.page-item').length == 1) {
      go_to_page.call($('#' + containerId), new_page);
    }
  });
   // Use event delegation for "Go to first page" functionality
  $('#' + containerId).on('click', '.page_navigation .page_link_first', function (e) {
    e.preventDefault();
    go_to_page(0); // Go to the first page directly
  });

  // Use event delegation for "Go to last page" functionality
  $('#' + containerId).on('click', '.page_navigation .page_link_last', function (e) {
    e.preventDefault();
    go_to_page(number_of_pages - 1); // Go to the last page directly
  });

  function go_to_page(page_num) {
    var show_per_page = parseInt($('#' + containerId + ' .show_per_page').val());

    // Calculate the total number of pages
    var number_of_items = $('#' + pagingContentId).children().length;
    var number_of_pages = Math.ceil(number_of_items / show_per_page);
    var navigation_html = '';
    var summary_text = '';

    // Check if there are any rows
    if (number_of_items === 0) {
      // Hide the pagination element
      $('#' + containerId + ' .page_navigation').hide();
      // Reset pagination summary
      summary_text = 'Showing 0 to 0 of 0 entries';
      $('#' + containerId + ' .navigation_summary').text(summary_text);
      return;
    } else {
      // Show the pagination element if hidden
      $('#' + containerId + ' .page_navigation').show();
    }

    // Ensure that page_num is within the valid range of page numbers
    page_num = Math.max(0, Math.min(page_num, number_of_pages - 1));

    var start_from = page_num * show_per_page;
    var end_on = start_from + show_per_page;

    //display pages relative to chosen page
    $('#' + pagingContentId)
      .children()
      .addClass('d-none')
      .slice(start_from, end_on)
      .removeClass('d-none');

    // Highlight/Active to current page
    $('#' + containerId + ' .page_link[longdesc=' + page_num + ']')
      .closest('li') // Find the closest parent <li> element
      .addClass('active') // Add the 'active' class to the <li> element
      .siblings() // Get the other <li> elements
      .removeClass('active'); // Remove the 'active' class from them

    $('#' + containerId + ' .current_page').val(page_num);

    // Update the navigation summary
    var total_items = $('#' + pagingContentId).children().length;
    var start_item = start_from + 1;
    var end_item = Math.min(start_from + show_per_page, total_items);
    summary_text = `Showing ${start_item} to ${end_item} of ${total_items} entries`;

    $('#' + containerId + ' .navigation_summary').html(summary_text);

    // Update pagination links based on the current page
    var middleRange = 3;
    var visiblePages = middleRange * 2 + 1;
    var currentPage = page_num + 1;
    var startPage, endPage;

    if (number_of_pages <= visiblePages) {
      startPage = 1;
      endPage = number_of_pages;
    } else {
      if (currentPage - middleRange <= 0) {
        startPage = 1;
        endPage = visiblePages;
      } else if (currentPage + middleRange > number_of_pages) {
        startPage = number_of_pages - visiblePages + 1;
        endPage = number_of_pages;
      } else {
        startPage = currentPage - middleRange;
        endPage = currentPage + middleRange;
      }
    }

    navigation_html = '<li class="page-item pe-1 me-1"><a class="page-link page_link_first" href="#" ><i class="ti ti-chevrons-left"></i></a></li>';
    navigation_html += '<li class="page-item pe-1 me-1"><a class="previous_link page-link" href="#"><i class="ti ti-chevron-left"></i> Prev</a></li>';
    for (var i = startPage - 1; i < endPage; i++) {
      navigation_html +=
        '<li class="page-item"><a class="page-link page_link ps-1" href="#" longdesc="' +
        i +
        '">' +
        (i + 1) +
        '</a></li>';
    }
    navigation_html += '<li class="page-item ps-1 ms-1"><a class="next_link page-link" href="#">Next <i class="ti ti-chevron-right"></i></a></li>';
    navigation_html += '<li class="page-item ps-1 ms-1"><a class="page-link page_link_last" href="#" ><i class="ti ti-chevrons-right"></i></a></li>';

    $('#' + containerId + ' .page_navigation').html(navigation_html);
    $('#' + containerId + ' .page_navigation .page_link[longdesc=' + page_num + ']').parent().addClass('active');

    // Disable "Prev" link when on the first page
    if (page_num === 0) {
      $('#' + containerId + ' .previous_link').addClass('disabled');
      $('#' + containerId + ' .previous_link').parent().addClass('disabled');
      $('#' + containerId + ' .page_link_first').parent().addClass('disabled');
      $('#' + containerId + ' .page_link_first').parent().addClass('disabled');
      
    } else {
      $('#' + containerId + ' .previous_link').removeClass('disabled');
      $('#' + containerId + ' .previous_link').parent().removeClass('disabled');
      $('#' + containerId + ' .page_link_first').parent().removeClass('disabled');
      $('#' + containerId + ' .page_link_first').parent().removeClass('disabled');
    }

    // Disable "Next" link when on the last page
    if (page_num === number_of_pages - 1) {
      $('#' + containerId + ' .next_link').addClass('disabled');
      $('#' + containerId + ' .next_link').parent().addClass('disabled');
      
      $('#' + containerId + ' .page_link_last').addClass('disabled');
      $('#' + containerId + ' .page_link_last').parent().addClass('disabled');
      
    } else {
      $('#' + containerId + ' .next_link').removeClass('disabled');
      $('#' + containerId + ' .next_link').parent().removeClass('disabled');
      
      $('#' + containerId + ' .page_link_last').removeClass('disabled');
      $('#' + containerId + ' .page_link_last').parent().removeClass('disabled');
    }
  }

  // Initialize the pagination for the first page
  go_to_page(0);
};







/*const numAttrA = !isNaN(parseFloat(attrA)) ? parseFloat(attrA) : attrA;
      const numAttrB = !isNaN(parseFloat(attrB)) ? parseFloat(attrB) : attrB;

      return numAttrA > numAttrB ? (inverse ? -1 : 1) : numAttrA < numAttrB ? (inverse ? 1 : -1) : 0;
      */



const table_balance = document.getElementById('table-balance');
enableTableSorting(table_balance);

//xy_fn.tablePagination(6, 'table_orders', 'userOrders');




  $(document).on('focus click', '[data-bot="intervalPeriod"] .datetime', function() {
    var timePicker = $(this);

    console.log('timePicker: ', timePicker);
    if (!timePicker.data('timepicker')) {

      //if (!timePicker.hasClass('easy-timepicker')) {
      //date time picker settings
      var today = new Date();
      var h = today.getHours().toString();
      h = h.padStart(2, '0');
      var m = today.getMinutes().toString();
      m = m.padStart(2, '0');

      $(this).timepicker({
        //minTime: h + ':' + m,
        defaultTime: 'now',   // Set the default time to 'now' (current time), or HH:mm
        //minuteIncrement: 5, // Increment minutes by 5
        //hourIncrement: 1 // Increment hours by 2
      });
      console.log('add timepicker, minTime: - ' + h + ':' + m);

      // Set the custom data attribute to mark the attachment
      timePicker.data('timepicker', true);
    }

  });

  // Add extra Interval
  $('#intervalPeriod [data-bot="interval-add"]').on('click', function() {
    var intervalPeriod = $('#intervalPeriod'); // Get the interval period container

    // Clone the first interval and append it to the interval period container
    //var newInterval = intervalPeriod.find('[data-bot="intervals"]').first().html();
    var newInterval = intervalPeriod.find('.row:first-child').clone();

    console.log('newInterval: ', newInterval);
    intervalPeriod.append(newInterval);

    // Reset the values of the cloned interval
    newInterval.find('input').removeClass('ui-timepicker-input');
    newInterval.find('[data-bot="intervalStart"]').val('').removeClass('border-danger border-success').next('.invalid-tooltip').css('display', 'none');
    newInterval.find('[data-bot="intervalEnd"]').val('').removeClass('border-danger border-success').next('.invalid-tooltip').css('display', 'none');


    newInterval.find('[data-bot="interval-add"]').attr('data-bot', 'interval-remove').html('-').removeClass('btn-outline-info').addClass('btn-outline-secondary');


  });


  //Remove extra Interval
  $("body").on("click", '#intervalPeriod [data-bot="interval-remove"]', function(e) {
    $(this).parent().parent().remove();
  });



  // Hide dropdown after item click
  $('.dropdown-menu .dropdown-item').on('click', function() {
    $(this).parent().removeClass('show');
  });

  //Close a Bootstrap modal when a specific element within the modal, such as an <a> tag with the class nav-link, is clicked
  $(document).on('click', '.modal a.nav-link', function() {
    $('.modal').modal('hide');
  });






/*custom table*/
// Event delegation for the "table .js-check-all" checkboxes
$('.table-custom-checkbox').on('change', 'table.custom-table .js-check-all, input[type="checkbox"]', function(event) {
  event.stopPropagation(); // Stop event propagation to the document level

  var target = $(event.target);
  var isCheckAll = target.hasClass('js-check-all');
  var table = target.closest('table'); // Get the parent table of the clicked checkbox
  var allCheckboxes = table.find('input[type="checkbox"]');

  if (isCheckAll) {
    var isChecked = target.prop('checked'); // Get the checked state of the clicked "table .js-check-all" checkbox
    allCheckboxes.prop('checked', isChecked);
    table.find('tr').toggleClass('active', isChecked);
  } else {
    var isChecked = target.prop('checked'); // Get the checked state of the clicked "th[scope="row"] input[type="checkbox"]" checkbox
    target.closest('tr').toggleClass('active', isChecked);

    // Update the "table .js-check-all" checkbox based on the number of checked rows
    table.find('table .js-check-all').prop('checked', allCheckboxes.length === allCheckboxes.filter(':checked').length);
  }
});
  

// Event delegation for the "table .js-check-all" checkboxes
$('.flex-table-checkbox').on('change', '.flex-table .js-check-all, input[type="checkbox"]', function(event) {
  event.stopPropagation(); // Stop event propagation to the document level

  var target = $(event.target);
  var isCheckAll = target.hasClass('js-check-all');
  var table = target.closest('.flex-table'); // Get the parent table of the clicked checkbox
  var allCheckboxes = table.find('input[type="checkbox"]');

  if (isCheckAll) {
    var isChecked = target.prop('checked'); // Get the checked state of the clicked "table .js-check-all" checkbox
    allCheckboxes.prop('checked', isChecked);
    table.find('div.flex-row').toggleClass('active', isChecked);
  } else {
    var isChecked = target.prop('checked'); // Get the checked state of the clicked "th[scope="row"] input[type="checkbox"]" checkbox
    target.closest('div.flex-row').toggleClass('active', isChecked);

    // Update the "table .js-check-all" checkbox based on the number of checked rows
    table.find('.flex-table .js-check-all').prop('checked', allCheckboxes.length === allCheckboxes.filter(':checked').length);
  }
});

  


//bid Trend config info
botBidPriceAction.on('change', function() {
	$('#tradingbot input[data-bot="minRandomTradeBidPrice"]').trigger('input');
});

$('#tradingbot input[data-bot="minRandomTradeBidPrice"], ' +
    '#tradingbot input[data-bot="maxRandomTradeBidPrice"], ' +
    '#tradingbot input[data-bot="minRandomTradeBidQty"], ' +
    '#tradingbot input[data-bot="maxRandomTradeBidQty"]').on('input', function() {
    console.log('===bidSettings changed');

    // Get the values of min and max price and min and max quantity
    let minPrice = parseFloat($('#tradingbot input[data-bot="minRandomTradeBidPrice"]').val()) / 1e8;

    let maxPrice = parseFloat($('#tradingbot input[data-bot="maxRandomTradeBidPrice"]').val()) / 1e8;
    let minQty = parseFloat($('#tradingbot input[data-bot="minRandomTradeBidQty"]').val());
    let maxQty = parseFloat($('#tradingbot input[data-bot="maxRandomTradeBidQty"]').val());

    //get price action trend
    const priceAction = $(botBidPriceAction).filter(':checked').val();
    
        //get marketprice 
    const market = $('#tradingbot select[data-bot="tradingPair"]').attr('data-market-pair');
    let bidPrice = Number(ych.data.buys[market][0].price) / 1e8;
    
    // Price trend Action
    if (priceAction == 'above')  {  //push price up
      minPrice += bidPrice;
      maxPrice += bidPrice;
    } else if (priceAction == 'below')  { //push price down
      minPrice = bidPrice - minPrice;
      maxPrice = bidPrice - maxPrice;
    } else {  //trend should be neutral
      minPrice += bidPrice;
      maxPrice += bidPrice;
    }


    // Generate random numbers between min and max price and quantity
    let randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
    let randomQty = Math.random() * (maxQty - minQty) + minQty;
    
    // Calculate min cost, max cost, and average cost
    let minCost = minPrice * minQty;
    let maxCost = maxPrice * maxQty;
    let averageCost = (maxCost + minCost) / 2;
    //let averageCost = randomPrice * randomQty;
    
    // Output or use the calculated values as needed
    console.log("Bid Min Price:", minPrice.toFixed(8));
    console.log("Bid Max Price:", maxPrice.toFixed(8));
    console.log("Bid Min Cost:", minCost.toFixed(8));
    console.log("Bid Max Cost:", maxCost.toFixed(8));
    console.log("Bid Average Cost:", averageCost.toFixed(8));

    $('#tradingbot [data-bot="bidSettings.bidPrice"]').text(bidPrice.toFixed(8));
    $('#tradingbot [data-bot="bidSettings.bidPriceMin"]').text(minPrice.toFixed(8));
    $('#tradingbot [data-bot="bidSettings.bidPriceMax"]').text(maxPrice.toFixed(8));

    $('#tradingbot [data-bot="bidSettings.minCost"]').text(minCost.toFixed(8));
    $('#tradingbot [data-bot="bidSettings.maxCost"]').text(maxCost.toFixed(8));
    $('#tradingbot [data-bot="bidSettings.averageCost"]').text(averageCost.toFixed(8));
    
});
//ask Trend config info
botAskPriceAction.on('change', function() {
	$('#tradingbot input[data-bot="minRandomTradeAskPrice"]').trigger('input');
});

$('#tradingbot input[data-bot="minRandomTradeAskPrice"], ' +
    '#tradingbot input[data-bot="maxRandomTradeAskPrice"], ' +
    '#tradingbot input[data-bot="minRandomTradeAskQty"], ' +
    '#tradingbot input[data-bot="maxRandomTradeAskQty"]').on('input', function() {
    console.log('===askSettings changed');

    // Get the values of min and max price and min and max quantity
    let minPrice = parseFloat($('#tradingbot input[data-bot="minRandomTradeAskPrice"]').val()) / 1e8;
    let maxPrice = parseFloat($('#tradingbot input[data-bot="maxRandomTradeAskPrice"]').val()) / 1e8;
    let minQty = parseFloat($('#tradingbot input[data-bot="minRandomTradeAskQty"]').val());
    let maxQty = parseFloat($('#tradingbot input[data-bot="maxRandomTradeAskQty"]').val());
    
    //get price action trend
    const priceAction = $(botAskPriceAction).filter(':checked').val();
    

    //get marketprice 
    const market = $('#tradingbot select[data-bot="tradingPair"]').attr('data-market-pair');
    let askPrice = Number(ych.data.sells[market][0].price) / 1e8;
    // Price trend Action
    if (priceAction == 'above')  {  //push price up
      minPrice += askPrice;
      maxPrice += askPrice;
    } else if (priceAction == 'below')  { //push price down
      minPrice = askPrice - minPrice;
      maxPrice = askPrice - maxPrice;
    } else {  //trend should be neutral
      minPrice += askPrice;
      maxPrice += askPrice;
    }

    // Calculate min cost, max cost, and average cost
    let minCost = minPrice * minQty;
    let maxCost = maxPrice * maxQty;
    //let averageCost;
    let averageCost = (maxCost + minCost) / 2;
    /*
    // Calculate cost for various combinations and collect them in an array
    const costs = [];
    for (let i = 0; i < 100; i++) { // Generate 1000 samples
      // Generate random numbers between min and max price and quantity
      let randomPrice = Math.random() * (maxPrice - minPrice) + minPrice;
      let randomQty = Math.random() * (maxQty - minQty) + minQty;
      averageCost = randomPrice * randomQty;
      costs.push(averageCost);
    }
    averageCost = costs.reduce((acc, curr) => acc + curr, 0) / costs.length;
    */
    
    // Output or use the calculated values as needed
    console.log("Ask Min Price:", minPrice.toFixed(8));
    console.log("Ask Max Price:", maxPrice.toFixed(8));
    console.log("Ask Min Cost:", minCost.toFixed(8));
    console.log("Ask Max Cost:", maxCost.toFixed(8));
    console.log("Ask Average Cost:", averageCost.toFixed(8));

    $('#tradingbot [data-bot="askSettings.askPrice"]').text(askPrice.toFixed(8));
    $('#tradingbot [data-bot="askSettings.askPriceMin"]').text(minPrice.toFixed(8));
    $('#tradingbot [data-bot="askSettings.askPriceMax"]').text(maxPrice.toFixed(8));

    $('#tradingbot [data-bot="askSettings.minCost"]').text(minCost.toFixed(8));
    $('#tradingbot [data-bot="askSettings.maxCost"]').text(maxCost.toFixed(8));
    $('#tradingbot [data-bot="askSettings.averageCost"]').text(averageCost.toFixed(8));
    
});

  


  //JBox
    xy_fn.JBoxDialog = new jBox('Modal', {
    attach: '#jbox-dialog',
    width: 220,
    title: '',
    overlay: false,
    content: '',
    draggable: 'title',
    repositionOnOpen: false,
    repositionOnContent: false
  });//.open();
    //xy_fn.JBoxDialog.setTitle('Kalle');
    //xy_fn.JBoxDialog.setContent('Kalle');

});
