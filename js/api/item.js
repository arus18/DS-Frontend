window.onload = function() {
  // Get the item ID from the URL query string
  const urlParams = new URLSearchParams(window.location.search);
  const itemId = urlParams.get('id');

  // Get a reference to the elements that will display the item details
  const nameEl = document.getElementById('item-name');
  const descriptionEl = document.getElementById('item-description');
  const priceEl = document.getElementById('item-price');

  // Fetch the item details using the API endpoint
  fetch(`http://192.168.59.100:31781/items/${itemId}`)
    .then(response => response.json())
    .then(itemDetails => {
      // Set the text content of the elements with the item details
      nameEl.textContent = itemDetails.name;
      descriptionEl.textContent = itemDetails.description;
      priceEl.textContent = `$${itemDetails.price}`;
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
    });
};
