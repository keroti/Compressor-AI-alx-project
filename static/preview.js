const imageInput = document.getElementById('image-input');
const imagePreview = document.getElementById('image-preview');

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const url = URL.createObjectURL(file);
  const img = new Image();

  img.onload = function() {
    const imgWidth = img.width;
    const imgHeight = img.height;
    const imgSize = (file.size / 1024).toFixed(2);
    const imgURL = url;

    imagePreview.innerHTML = `
      <img src="${imgURL}" alt="Selected Image" width="${imgWidth}" height="${imgHeight}">
      <p>Image Size: ${imgSize} KB</p>
      <p>Image URL: ${imgURL}</p>
    `;
  };

  img.src = url;
});
