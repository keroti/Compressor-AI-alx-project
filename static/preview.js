document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('upload-form');
  const imagePreview = document.getElementById('image-preview');

  const app = {
    config: {
      RAPIDAPI_API_KEY: 'your_api_key_here'
    }
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    const image = event.target.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

    fetch('/compress-image', {
      method: 'POST',
      headers: {
        'X-RapidAPI-Host': 'megaoptim-image-compression.p.rapidapi.com',
        'X-RapidAPI-Key': app.config['RAPIDAPI_API_KEY'],
      },
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        const compressedImage = new Image();
        compressedImage.src = `data:image/${data.format};base64,${data.data}`;
        imagePreview.appendChild(compressedImage);
      } else {
        console.error('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error(error);
    });
  });
});
