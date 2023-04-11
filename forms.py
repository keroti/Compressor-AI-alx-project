# Import necessary modules and classes from Flask and WTForms
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Length, Email, EqualTo


# Define a class for the registration form, which inherits from FlaskForm
class RegistrationForm(FlaskForm):
    # Define form fields using WTForms classes, with validation rules
    username = StringField('Username',
                           validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password',
                                     validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up') # Add a submit button to the form


# Define a class for the login form, which also inherits from FlaskForm
class LoginForm(FlaskForm):
    # Define form fields using WTForms classes, with validation rules
    email = StringField('Email',
                        validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me') # Add a checkbox to the form
    submit = SubmitField('Login') # Add a submit button to the form
