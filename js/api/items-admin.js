// Retrieve item details from an API endpoint
/*window.onload = function () {
    fetch('http://example.com/api/items')
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
          <button onclick="showEditModal(${item.id})">Update</button>
        </td>
      `;
                // Append the row to the table body
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });
};*/


// Delete item function
function deleteItem(itemId) {
    // Make a DELETE request to the API endpoint for deleting the item
    fetch(`http://example.com/api/items/${itemId}`, { method: 'DELETE' })
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

// Show edit modal function
function showEditModal(itemId) {
    // Get the item details using the item ID
    /*fetch(`http://example.com/api/items/${itemId}`)
        .then(response => response.json())
        .then(item => {
            // Populate the modal with the item details
            document.getElementById('editItemId').value = item.id;
            document.getElementById('editItemName').value = item.name;
            document.getElementById('editItemDescription').value = item.description;
            document.getElementById('editItemPrice').value = item.price;
            // ... populate other fields in the modal

            // Show the modal
            $('#editModal').modal('show');
        })
        .catch(error => {
            console.error('Error fetching item details:', error);
        });*/
        $('#editModal').modal('show');
}
