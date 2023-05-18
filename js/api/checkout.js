const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get('item_id');
window.onload = function() {
  const checkoutOrderProducts = document.getElementById('checkoutOrderProducts');
  const checkoutProductsList = document.getElementById('checkoutProductsList');
  const subtotal = document.getElementById('subtotal');
  const total = document.getElementById('total');
  const cardPaymentFields = document.getElementById('cardPaymentFields');

  // Function to update the order details
  // Clear the existing order details
  checkoutProductsList.innerHTML = '';
  subtotal.textContent = '';
  total.textContent = '';

  // Retrieve the item ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('item_id');

  // Fetch item details based on the item ID
  fetch(`${BASE_URL}/items/${itemId}`)
    .then(response => response.json())
    .then(item => {
      // Generate the HTML for the item details
      const itemHtml = `<li>${item.name} <span>${item.price}</span></li>`;
      checkoutProductsList.insertAdjacentHTML('beforeend', itemHtml);

      // Calculate and display the subtotal and total amounts
      const subTotalAmount = item.price;
      subtotal.textContent = `Subtotal: $${subTotalAmount.toFixed(2)}`;
      total.textContent = `Total: $${subTotalAmount.toFixed(2)}`;
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
    });


  // Call the updateOrderDetails funct
};


// Function to toggle the visibility of card payment fields
function togglePaymentFields() {
  const paymentCheckbox = document.getElementById('payment');
  cardPaymentFields.style.display = paymentCheckbox.checked ? 'block' : 'none';
}

// Function to handle the checkout process

// Function to handle the place order process
function placeOrder() {
  console.log("called");
  event.preventDefault();
  // Retrieve delivery details from the form
  const firstName = document.querySelector('#checkoutForm input[name="first_name"]').value;
  const lastName = document.querySelector('#checkoutForm input[name="last_name"]').value;
  const country = document.querySelector('#checkoutForm input[name="country"]').value;
  const address = document.querySelector('#checkoutForm input[name="address"]').value;
  const city = document.querySelector('#checkoutForm input[name="city"]').value;
  const state = document.querySelector('#checkoutForm input[name="state"]').value;
  const postcode = document.querySelector('#checkoutForm input[name="postcode"]').value;
  const phone = document.querySelector('#checkoutForm input[name="phone"]').value;
  const email = document.querySelector('#checkoutForm input[name="email"]').value;

  // Retrieve payment details
  const paymentCheckbox = document.getElementById('payment');
  const paymentType = paymentCheckbox.checked ? 'Card Payment' : 'Cash on Delivery';
  const cardNumber = document.getElementById('cardNumber').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const cvv = document.getElementById('cvv').value;

  // Generate the order object
  const order = {
    itemId: itemId,
    delivery: {
      firstName,
      lastName,
      country,
      address,
      city,
      state,
      postcode,
      phone,
      email,
    },
    payment: {
      type: paymentType,
      cardNumber: paymentCheckbox.checked ? cardNumber : undefined,
      expiryDate: paymentCheckbox.checked ? expiryDate : undefined,
      cvv: paymentCheckbox.checked ? cvv : undefined,
    },
  };

  // Send the order details using fetch
  fetch(`${BASE_URL}/orders/confirm-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
    .then(response => response.json())
    .then(data => {
      // Handle the response and show the modal
      // Implement your logic here based on the response
      console.log('Order Placed:', data);
      showModal();
    })
    .catch(error => {
      console.error('Error placing order:', error);
    });
}

// Function to show the modal
function showModal() {
  document.getElementById('orderId').textContent = orderId;
  document.getElementById('paymentType').textContent = paymentType;

  // Show the modal using Bootstrap's modal function
  $('#myModal').modal('show');
}

// Call the function to update the order details on page load


// Function to retrieve URL parameter by name
