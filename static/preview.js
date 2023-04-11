$(document).ready(function() {
  const imageInput = $('#image-input');
  const imagePreview = $('#image-preview');

  // When an image is selected
  imageInput.on('change', function() {
    const files = $(this).prop('files');
    imagePreview.html('');

    $.each(files, function(index, file) {
      const reader = new FileReader();

      reader.onload = function(event) {
        const img = $('<img>', {
          class: 'image-previews',
          src: event.target.result
        });

        imagePreview.append(img);
      };

      reader.readAsDataURL(file);
    });
  });
});
