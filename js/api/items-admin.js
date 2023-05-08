// Retrieve item details from an API endpoint
window.onload = function() {
  fetch(`${BASE_URL}/items`)
    .then(response => response.json())
    .then(items => {
      const tableBody = document.querySelector('table tbody');

      // Clear existing table rows
      tableBody.innerHTML = '';

      // Loop through the items and create a table row for each item
      items.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.sellerId}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td>${item.rating}</td>
        <td>${item.quantity}</td>
        <td>${item.category}</td>
        <td>
          <button onclick="deleteItem(${item.id})">Delete</button>
        </td>
        <td>
          <button onclick="showEditModal('${item._id}')">Update</button>
        </td>
      `;
        // Append the row to the table body
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
    });
};


// Delete item function
function deleteItem(itemId) {
  // Make a DELETE request to the API endpoint for deleting the item
  fetch(`${BASE_URL}/items/${itemId}`, {
      method: 'DELETE'
    })
    .then(response => {
      if (response.ok) {
        // Item successfully deleted
        alert('Item deleted successfully');
        // Reload the page or update the table
        // with the latest item details
      } else {
        // Failed to delete item
        alert('Failed to delete item');
      }
    })
    .catch(error => {
      console.error('Error deleting item:', error);
    });
}

function updateItem() {
  // Get the updated item details from the form
  var itemId = document.getElementById('editItemId').value;
  var itemName = document.getElementById('editItemName').value;
  var itemDescription = document.getElementById('editItemDescription').value;
  var itemPrice = document.getElementById('editItemPrice').value;

  // Create the updated item object
  var updatedItem = {
    name: itemName,
    description: itemDescription,
    price: parseFloat(itemPrice),
    sellerId:"abc",
    rating:2,
    quantity:5,
    category:"rt"
    // Add other fields for updating item details
  };

  // Make a PATCH request to the API endpoint for updating the item
  fetch(`${BASE_URL}/items/${itemId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
    .then(response => {
      if (response.ok) {
        // Item successfully updated
        alert('Item updated successfully');
        // Close the modal
        $('#editModal').modal('hide');
        // Reload the page or update the item details in the table
      } else {
        // Failed to update item
        alert('Failed to update item');
      }
    })
    .catch(error => {
      console.error('Error updating item:', error);
    });
}

// Show edit modal function
function showEditModal(itemId) {
  // Get the item details using the item ID
  fetch(`${BASE_URL}/items/${itemId}`)
    .then(response => response.json())
    .then(item => {
      // Populate the modal with the item details
      document.getElementById('editItemId').value = item._id;
      document.getElementById('editItemName').value = item.name;
      document.getElementById('editItemDescription').value = item.description;
      document.getElementById('editItemPrice').value = item.price;
      // ... populate other fields in the modal

      // Show the modal
      $('#editModal').modal('show');
    })
    .catch(error => {
      console.error('Error fetching item details:', error);
    });
  $('#editModal').modal('show');
}
