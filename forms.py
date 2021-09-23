from flask_wtf import FlaskForm
from wtforms import StringField, FloatField
from wtforms.validators import InputRequired, URL

class AddCupcakeForm(FlaskForm):

    flavor = StringField("Flavor", validators=[InputRequired(message="Flavor can't be blank")])
    size = StringField("Size", validators=[InputRequired(message="Size can't be blank")])
    rating = FloatField("Rating", validators=[InputRequired(message="Rating can't be blank")])
    image = StringField("Image URL", validators=[InputRequired(message="Image URL can't be blank"),
        URL(require_tld=True, message="Please enter valid URL")])
