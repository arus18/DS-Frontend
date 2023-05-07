const form = document.getElementById('addItemForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const name = document.getElementById('item-name').value;
  const description = document.getElementById('item-description').value;
  const imageUrls =  ["url1","url2"]; //document.getElementById('imageUrls').value.split(',');
  const price = document.getElementById('item-price').value;
  const quantity = document.getElementById('item-quantity').value;
  const category = document.getElementById('item-category').value;
  const rating = 0;
  const seller_id = 'abc';

  const data = {
    name,
    description,
    imageUrls,
    price,
    quantity,
    category,
    rating,
    seller_id
  };

  fetch('http://192.168.59.100:31781/items', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(result => {
    console.log('Item added successfully:', result);
    // Clear form inputs
    form.reset();
  })
  .catch(error => {
    console.error('Error adding item:', error);
  });
});
