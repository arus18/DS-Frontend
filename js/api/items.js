window.onload = function() {
  // Load the list of items from the API endpoint
  fetch('http://192.168.59.100:31781/items')
    .then(response => response.json())
    .then(items => {
      // Get a reference to the div where the items will be displayed
      const itemsDiv = document.getElementById('items');

      // Iterate over the list of items and create a new div for each item
      items.forEach(item => {
        // Create a new div element for the item
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('col-lg-3', 'col-md-4', 'col-sm-6', 'mix', 'vegetables', 'fastfood');

        // Set the HTML content of the item div using the template you provided
        itemDiv.innerHTML = `<div class="featured__item">
          <div class="featured__item__pic set-bg" data-setbg="${item.imageUrl}">
            <ul class="featured__item__pic__hover">
              <li><a href="#"><i class="fa fa-heart"></i></a></li>
              <li><a href="#"><i class="fa fa-retweet"></i></a></li>
              <li><a href="#"><i class="fa fa-shopping-cart"></i></a></li>
            </ul>
          </div>
          <div class="featured__item__text">
            <h6><a href="#">${item.name}</a></h6>
            <h5>$${item.price}</h5>
          </div>
        </div>`;

        // Add a click listener to the item div
        itemDiv.addEventListener('click', () => {
          // Redirect to the item details page with the item id as a query parameter
          window.location.href = `item-details.html?id=${item._id}`;
        });

        // Add the item div to the items div
        itemsDiv.appendChild(itemDiv);
      });
    })
    .catch(error => {
      console.error('Error fetching items:', error);
    });
};
