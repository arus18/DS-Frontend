// Fetch orders and fill the table
function fetchOrders() {
  fetch('http://example.com/api/orders')
    .then(response => response.json())
    .then(orders => {
      const orderList = document.getElementById('orderList');

      // Clear existing order list
      orderList.innerHTML = '';

      // Loop through the orders and create a table row for each order
      orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.id}</td>
          <td>${order.item}</td>
          <td>${order.quantity}</td>
          <td>${order.status}</td>
          <td>
            ${order.status !== 'Confirmed' ? `<button type="button" class="btn btn-primary" onclick="confirmOrder(${order.id})">Confirm Order</button>` : ''}
          </td>
        `;

        // Append the row to the order list
        orderList.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching orders:', error);
    });
}

// Confirm order
function confirmOrder(orderId) {
  // Show the confirmation modal
  $('#confirmModal').modal('show');

  // Handle confirm order button click
  const confirmOrderBtn = document.getElementById('confirmOrderBtn');
  confirmOrderBtn.onclick = () => {
    // Make a fetch request to confirm the order
    fetch(`http://example.com/api/orders/${orderId}/confirm`, { method: 'POST' })
      .then(response => response.json())
      .then(data => {
        // Check the response for success or failure
        if (data.success) {
          // Order confirmed successfully
          // Show success alert using the Bootstrap modal
          $('#confirmModal').modal('hide');
          $('#successModal').modal('show');
        } else {
          // Failed to confirm order
          // Show error alert using the Bootstrap modal
          $('#confirmModal').modal('hide');
          $('#errorModal').modal('show');
        }
      })
      .catch(error => {
        console.error('Error confirming order:', error);
      });
  };
}

// Fetch and fill the order table on page load
window.onload = fetchOrders;
