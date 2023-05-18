const form = document.getElementById('addItemForm');
form.addEventListener('submit', function(event) {
  event.preventDefault();

  const itemImage = document.getElementById('item-images').files[0];
  const name = document.getElementById('item-name').value;
  const description = document.getElementById('item-description').value;
  const price = document.getElementById('item-price').value;
  const quantity = document.getElementById('item-quantity').value;
  const category = document.getElementById('item-category').value;
  const rating = 0;
  const seller_id = 'abc';

  const formData = new FormData();
  formData.append('itemImage', itemImage);

  fetch(`http://localhost:3000/upload`, {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(result => {
    const imagePath = result.path;
    const image_urls = [imagePath];
    // Now you have the image paths returned from the image server.
    // You can proceed to send the image paths to the server or perform any other operations.

    console.log('Image paths:', image_urls);
    const itemData = {
      name,
      description,
      image_urls,
      price,
      quantity,
      category,
      rating,
      seller_id
    };

    fetch(`${BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(itemData)
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
  })
  .catch(error => {
    console.error('Error uploading images:', error);
  });
});
