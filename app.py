from flask import Flask, render_template, request
import tensorflow as tf
import numpy as np
import os

app = Flask(__name__)

model = None
def get_model():
    global model
    if model == None:
        model = tf.keras.models.load_model('trained_model.keras')
    return model


@app.route('/', methods = ['GET'])
def helloworld():
    return render_template('index.html')

@app.route('/', methods = ['POST'])
def predict():
    imagefile = request.files.get('bananaimg')
    if imagefile == None or imagefile.filename == '':
        return render_template('index.html', noimage = "Please Upload the image first")
    image_path = os.path.join('images',imagefile.filename)
    imagefile.save(image_path)
    #load and predict the image
    classes = ["overripe", "ripe", "rotten", "unripe"]
    image = tf.keras.preprocessing.image.load_img(image_path, target_size = (128,128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    model = get_model()
    pred = model.predict(input_arr)
    prediction = np.argmax(pred)
    result = classes[prediction]
    return render_template('index.html', prediction = result)


if __name__ == "__main__":
    pass
    # app.run(debug = True)
