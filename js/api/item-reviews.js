
window.onload = function() {
    const itemId = getItemIdFromURL();
    fetchItemReviews(itemId);
  };

// Function to add a review to an item
function addReview() {
    const reviewInput = document.getElementById('reviewInput');
    const reviewText = reviewInput.value;

    // Get the item ID from the URL or any other source
    const itemId = getItemIdFromURL();

    // Make a fetch request to save the item review
    fetch(`${BASE_URL}/items/itemreviews/${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ review: reviewText }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          // Review added successfully
          // Clear the review input field
          reviewInput.value = '';

          // Reload the item reviews to display the updated list
          fetchItemReviews(itemId);
        } else {
          // Failed to add review
          console.error('Failed to add review:', data.error);
        }
      })
      .catch(error => {
        console.error('Error adding review:', error);
      });
  }

  // Function to retrieve item reviews and add them to the reviews container
  function fetchItemReviews(itemId) {
    // Make a fetch request to retrieve item reviews
    fetch(`${BASE_URL}/items/itemreviews/${itemId}`)
      .then(response => response.json())
      .then(reviews => {
        const reviewsContainer = document.getElementById('reviewsContainer');

        // Clear existing reviews
        reviewsContainer.innerHTML = '';

        // Loop through the reviews and create a div for each review
        reviews.forEach(review => {
          const reviewDiv = document.createElement('div');
          reviewDiv.textContent = review.text;

          // Append the review div to the reviews container
          reviewsContainer.appendChild(reviewDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching item reviews:', error);
      });
  }

  // Function to get the item ID from the URL
  function getItemIdFromURL() {
    // Get the current URL
    const url = window.location.href;

    // Extract the item ID from the URL
    // Assuming the item ID is represented as a query parameter named 'id'
    const urlParams = new URLSearchParams(new URL(url).search);
    const itemId = urlParams.get('id');

    return itemId;
  }
