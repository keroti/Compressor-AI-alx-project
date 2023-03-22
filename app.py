from flask import Flask, render_template, request, send_file
# from compress import compress_image

app = Flask(__name__)

# @app.route('/compress', methods=['POST'])
# def compress():
#     file = request.files['image']
#     compressed_file = compress_image(file)
#     return send_file(compressed_file, attachment_filename='compressed.jpg', as_attachment=True)

# @app.route('/example')
# def example():
#     return send_file('example.jpg', attachment_filename='example.jpg', as_attachment=True)

@app.route('/')
@app.route('/home')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

