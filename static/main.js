document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('upload-form');
  const imagePreview = document.getElementById('image-preview');

  const app = {
    config: {
      RAPIDAPI_API_KEY: 'LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj'
    }
  };

  form.addEventListener('submit', event => {
    event.preventDefault();

    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

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
      pollForResult(data.process_id);
    })
    .catch(error => {
      console.error(error);
    });

    function pollForResult(processId) {
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
        if (data.status === 'success') {
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
});
