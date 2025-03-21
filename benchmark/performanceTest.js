function generateRandomOrderData(amount) {
  const orders = [];
  for (let i = 0; i < amount; i++) {
    const orderType = Math.random() < 0.5 ? 'buy' : 'sell';
    const timestamp = Date.now();
    const price = Math.random() * 100;
    const amount = Math.random() * 10;
    const cost = price * amount;
    const success = Math.random() < 0.8;
    const error = success ? '' : 'Order failed';
    const ych = { nnum: Math.random() };
    const buftextBot = 'Bot buftext';

    orders.push({
      orderType,
      order: {
        timestamp,
        price,
        amount,
        cost
      },
      success,
      error,
      ych,
      buftextBot
    });
  }
  return orders;
}

// Performance test with HTML string to DOM approach
function testHTMLStringToDOM(amount) {
  const orders = generateRandomOrderData(amount);

  console.time('HTMLStringToDOM');
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    let orderClass = '';
    if (order.orderType == 'buy')
      orderClass = 'bg-lime-lt';
    else
      orderClass = 'bg-red-lt';

    let newRow = '';
    let status = '';
    let orderTime = new Date(order.order.timestamp).toLocaleTimeString([], { hour12: false });

    if (order.success) {
      newRow = `<tr>
        <td data-label="Order"><div><span class="badge ${orderClass}">${order.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
        <td data-label="Price" class="text-muted yright"><div>${order.order.price.toFixed(8)}</div></td>
        <td data-label="Amount" class="text-muted yright"><div>${order.order.amount.toFixed(8)}</div></td>
        <td data-label="Cost" class="text-muted yright"><div>${order.order.cost.toFixed(8)}</div></td>
        <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-lime-lt">success</span></div></td>
      </tr>`;
    } else {
      newRow = `<tr>
        <td data-label="Order"><div><span class="badge ${orderClass}">${order.orderType}</span> <span class="badge bg-azure-lt">time: ${orderTime}</span></div></td>
        <td data-label="Message" colspan="3" class="text-muted small "><div>${order.error}, <br>ych.nnum: ${order.ych.nnum}, <br><span class="buftext"><b>Bot buftext:</b> ${order.buftextBot}</span></div></td>
        <td data-label="Status" class="text-muted yright text-status"><div><span class="badge bg-red-lt">failed</span></div></td>
      </tr>`;
    }

    const wrapper = document.createElement('div');
    wrapper.innerHTML = newRow.trim();
    const newElement = wrapper.firstChild;
    botLog.prepend(newElement);
  }
  console.timeEnd('HTMLStringToDOM');
}

// Performance test with optimized approach (Code B)
function testOptimizedApproach(amount) {
  const orders = generateRandomOrderData(amount);

  console.time('OptimizedApproach');
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    let orderClass = '';
    if (order.orderType == 'buy')
      orderClass = 'bg-lime-lt';
    else
      orderClass = 'bg-red-lt';

    const orderTime = new Date(order.order.timestamp).toLocaleTimeString([], { hour12: false });

    const newRow = createOrderElement(order.orderType, orderClass, orderTime, order.order.price.toFixed(8), order.order.amount.toFixed(8), order.order.cost.toFixed(8), order.success, order.error, order.ych.nnum, order.buftextBot);

    gptDOM.prepend(newRow);
  }
  console.timeEnd('OptimizedApproach');
}

// Usage:
gptDOMplugin.init(gptDOM);

const orderAmount = 10000; // Set the number of orders to test

testHTMLStringToDOM(orderAmount);
testOptimizedApproach(orderAmount);
