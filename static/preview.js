$(document).ready(function () {
  // When an image is selected
  $('#image-input').on('change', function () {
      var files = $(this).prop('files');
      $('#image-preview').html('');
      $.each(files, function (index, file) {
          var reader = new FileReader();
          reader.onload = function (event) {
              var img = $('<img>', {
                  class: 'image-previews',
                  src: event.target.result
              });
              $('#image-preview').append(img);
          };
          reader.readAsDataURL(file);
      });
  });
});
