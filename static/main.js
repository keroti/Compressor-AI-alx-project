// Get the form element and image preview element
const form = document.getElementById('upload-form');
const imagePreview = document.getElementById('image-preview');

// Add an event listener to the form submit event
form.addEventListener('submit', event => {
  event.preventDefault();

  // Get the selected image file
  const image = event.target.image.files[0];

  // Create a FormData object and append the image file to it
  const formData = new FormData();
  formData.append('image', image);

  // Send a POST request to the server to compress the image
  fetch('https://megaoptim-image-compression.p.rapidapi.com/optimize', {
    method: 'POST',
    headers: {
      'X-API-KEY': 'LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj',
      'X-RapidAPI-Key': 'a550036d08msh0d1430c3f64599cp15b8aajsn46bd9d79d7c7',
      'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com'
    },
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    // Poll the server for the compressed image data
    pollForResult(data.process_id);
  })
  .catch(error => {
    console.error(error);
  });

  // Function to poll the server for the compressed image data
  function pollForResult(processId) {
    // Send a GET request to the server to get the compressed image data
    fetch(`https://megaoptim-image-compression.p.rapidapi.com/optimize/${processId}/result?timeout=120`, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj',
        'X-RapidAPI-Key': 'a550036d08msh0d1430c3f64599cp15b8aajsn46bd9d79d7c7',
        'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(data => {
      // Check if the compressed image data is ready
      if (data.status === 'success') {
        // Display the compressed image preview
        const compressedImage = new Image();
        compressedImage.src = `data:image/${data.format};base64,${data.data}`;
        imagePreview.appendChild(compressedImage);
      } else if (data.status === 'processing') {
        // The compressed image data is still processing, so wait a bit and try again
        setTimeout(() => {
          pollForResult(processId);
        }, 1000);
      } else {
        // Something went wrong, so display an error message
        console.error('Error: ' + data.error);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
});

