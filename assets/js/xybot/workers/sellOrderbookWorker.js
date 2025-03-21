self.addEventListener('message', function (e) {
  const orderType = e.data.orderType;
  const marketPair = e.data.marketPair;
  const selected_market_pair = e.data.selected_market_pair;
  const ych = e.data.ych;

  if (orderType === 'both' || orderType === 'sell') {
    const sellEntryContainer = ych.$('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer');
    const sellEntryContainerUpdated = ych.$('#xyOrderBookTable .entriesContainer[data-orders="sell"]');
    const tmp = ych.data.sells[marketPair];

    if (tmp === undefined) {
      return;
    }

    const tmpLength = tmp.length;
    let sellOrdersTotal = 0;

    for (let i = 0; i < tmp.length; i++) {
      const reverseI = tmpLength - i - 1;
      sellOrdersTotal += tmp[i].amounta / 1e8;

      const existingOrder = sellEntryContainer.find(`.entrySellText[data-book-row-price="${tmp[reverseI].price}"]`);
      const isOrderPresentInServerData = tmp.some((order) => order.price === tmp[reverseI].price);

      if (existingOrder.length > 0) {
        const row = existingOrder.closest('.entryContainer');
        const rowAmounta = parseFloat(row.find('.entrySellText').attr('data-book-row-amounta'));

        if (rowAmounta !== tmp[reverseI].amounta) {
          row.find('.entrySellText').attr('data-book-row-amounta', tmp[reverseI].amounta);
          row.find('.entryText').eq(0).html((tmp[reverseI].amounta / 1e8).toFixed(4));
          row.find('.marketSizeBar').css('width', `${Math.ceil((tmp[reverseI].amounta / sellOrdersTotal) * 100)}%`);
        }
      } else if (isOrderPresentInServerData) {
        const newEntryContainer = ych.$('<div>').addClass('entryContainer');
        const marketSizeBar = ych.$('<div>').addClass('marketSizeBar marketSizeBarSell');
        const leftLabelCol = ych.$('<div>').addClass('leftLabelCol').append(ych.$('<span>').addClass('entryText').text((tmp[reverseI].amounta / 1e8).toFixed(4)));
        const centerLabelCol = ych.$('<div>').addClass('centerLabelCol').append(ych.$('<span>').addClass('entrySellText text-red')
          .attr({
            'data-book-row-price': tmp[reverseI].price,
            'data-book-row-amounta': tmp[reverseI].amounta,
            'data-book-row-amountb': tmp[reverseI].amountb
          })
          .text((tmp[reverseI].price / 1e8).toFixed(8))
        );
        const rightLabelCol = ych.$('<div>').addClass('rightLabelCol').append(ych.$('<span>').addClass('entryText').text((tmp[reverseI].amountb / 1e8).toFixed(4)));
        newEntryContainer.append(marketSizeBar, leftLabelCol, centerLabelCol, rightLabelCol);

        const entryContainers = sellEntryContainerUpdated.find('.entryContainer');
        const insertIndex = entryContainers.toArray().findIndex((element) => {
          const existingPrice = parseFloat(ych.$(element).find('.entrySellText').attr('data-book-row-price'));
          return tmp[reverseI].price > existingPrice;
        });

        if (insertIndex !== -1) {
          ych.$(entryContainers[insertIndex]).before(newEntryContainer);
        } else {
          sellEntryContainerUpdated.append(newEntryContainer);
        }
      }
    }

    sellEntryContainerUpdated.find('.entryContainer').each(function () {
      const orderPrice = parseFloat(ych.$(this).find('.entrySellText').attr('data-book-row-price'));
      const isOrderPresentInServerData = tmp.some((order) => order.price === orderPrice);

      if (!isOrderPresentInServerData) {
        ych.$(this).remove();
      }
    });

    let sellTotal = sellOrdersTotal;
    const sellEntryContainers = ych.$('#xyOrderBookTable .entriesContainer[data-orders="sell"] .entryContainer');
    sellEntryContainers.each(function (i) {
      const reverseI = tmpLength - i - 1;
      const leftPercent = Math.ceil(parseFloat(sellTotal / sellOrdersTotal * 100));
      ych.$(this).find('.marketSizeBar').css('width', `${leftPercent}%`);
      ych.$(this).find('.rightLabelCol .entryText').html(sellTotal.toFixed(4));
      if (tmp[reverseI]) {
        sellTotal -= tmp[reverseI].amounta / 1e8;
      }
    });

    ych.$('[data-market="sell_orders_total"]').text(sellOrdersTotal.toFixed(8));
    ych.$('[data-balance="coinb"]').html(ych.$(`[data-balance="${selected_market_pair[1]}"] [data-balance="free"]`).html());
  }
});
