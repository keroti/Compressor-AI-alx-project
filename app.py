from flask import Flask, render_template, url_for, flash, redirect, request, jsonify
from forms import RegistrationForm, LoginForm
import requests
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = '5791628bb0b13ce0c676dfde280ba245'
app.config['MEGAOPTIM_API_KEY'] = os.environ.get('LxT2Vq6WFS7qmX7aPG8ok1FYjeraiQjj')
app.config['MEGAOPTIM_API_HOST'] = 'megaoptim-image-compression.p.rapidapi.com'

@app.route("/")
@app.route("/home")
def home():
    return render_template('home.html')

@app.route('/compress-image', methods=['POST'])
def compress_image():
    api_key = app.config['MEGAOPTIM_API_KEY']
    api_host = app.config['MEGAOPTIM_API_HOST']
    api_url = 'https://megaoptim-image-compression.p.rapidapi.com/optimize'

    # Get the uploaded image file
    image_file = request.files.get('image')

    # Compress the image using the MegaOptim API
    headers = {
        'X-RapidAPI-Host': api_host,
        'X-RapidAPI-Key': api_key,
        'Content-Type': 'image/jpeg'  # Change this if your images are in a different format
    }
    response = requests.post(api_url, headers=headers, files={'file': image_file})

    # Return the compressed image data as a JSON response
    if response.status_code == 200:
        response_data = response.json()
        return jsonify({'status': 'success', 'data': response_data['data'], 'format': response_data['format']})
    else:
        return jsonify({'status': 'error', 'message': 'Failed to compress image'})

@app.route("/about")
def about():
    return render_template('about.html', title='About')

@app.route("/register", methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.username.data}!', 'success')
        return redirect(url_for('home'))
    return render_template('register.html', title='Register', form=form)


@app.route("/login", methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'peterkeroti55@gmail.com' and form.password.data == 'password':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')
