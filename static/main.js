$(document).ready(function () {
  const app = {
    config: {
      RAPIDAPI_API_KEY: 'a550036d08msh0d1430c3f64599cp15b8aajsn46bd9d79d7c7'
    }
  };
  
  // When an image is selected
  $('#image-input').on('change', function () {
    const files = $(this).prop('files');
    $('#image-preview').html('');
    $.each(files, function (index, file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const img = $('<img>', {
          class: 'image-previews',
          src: event.target.result
        });
        $('#image-preview').append(img);
        
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
      };
      reader.readAsDataURL(file);
    });
  });
  
  function pollForResult(processId) {
    fetch(`https://megaoptim-image-compression.p.rapidapi.com/optimize/${processId}/result?timeout=120`, {
      method: 'POST', // Change the method to POST
      headers: {
        'X-API-KEY': 'LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj',
        'X-RapidAPI-Key': 'a550036d08msh0d1430c3f64599cp15b8aajsn46bd9d79d7c7',
        'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com'
      }
    })
    .then(response => response.text()) // Get the response as text instead of JSON
    .then(data => {
      if (data.includes('<')) {
        // If the response contains '<', it is not valid JSON
        console.error('Error: invalid response');
      } else {
        // Otherwise, parse the JSON and display the compressed image
        const compressedData = JSON.parse(data);
        const compressedImage = new Image();
        compressedImage.src = `data:image/${compressedData.format};base64,${compressedData.data}`;
        $('#image-preview').html(compressedImage);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
});
