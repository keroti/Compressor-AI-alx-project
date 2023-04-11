$(document).ready(function () {
  const app = {
    config: {
      RAPIDAPI_API_KEY: 'a550036d08msh0d1430c3f64599cp15b8aajsn46bd9d79d7c7'
    }
  }; 
  
  const fileInput = document.querySelector('#fileInput');
  const imagePreview = document.querySelector('#imagePreview');
  
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      // Compress the image and display the result
      const formData = new FormData();
      formData.append('image', file);

      fetch('https://megaoptim-image-compression.p.rapidapi.com/optimize', {
        method: 'POST',
        headers: {
          'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com',
          'X-RapidAPI-Key': app.config['RAPIDAPI_API_KEY'],
          'Content-Type': 'image/jpeg'
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        // Poll for the result of the compression
        pollForResult(data.process_id);
      })
      .catch(error => {
        console.error(error);
      });
    });
    reader.readAsDataURL(file);
  });
  
  function pollForResult(processId) {
    fetch(`https://megaoptim-image-compression.p.rapidapi.com/optimize/${processId}/result?timeout=120`, {
      method: 'GET',
      headers: {
        'X-API-KEY': 'LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj',
        'X-RapidAPI-Key': app.config['RAPIDAPI_API_KEY'],
        'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Compression is complete
        const compressedImage = new Image();
        compressedImage.src = `data:image/${data.format};base64,${data.data}`;
        imagePreview.appendChild(compressedImage);

        // Add download button
        const downloadButton = document.createElement('a');
        downloadButton.textContent = 'Download Image';
        downloadButton.download = `compressed.${data.format}`;
        downloadButton.href = compressedImage.src;
        imagePreview.appendChild(downloadButton);
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

