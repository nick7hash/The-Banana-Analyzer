from flask import Flask, render_template, request
import tensorflow as tf
import numpy as np

app = Flask(__name__)
model = tf.keras.models.load_model('trained_model.keras')

@app.route('/', methods = ['GET'])
def helloworld():
    return render_template('index.html')

@app.route('/', methods = ['POST'])
def predict():
    imagefile = request.files['image']
    image_path = './images/'+ imagefile.filename
    imagefile.save(image_path)

    #load and predict the image
    classes = ["overripe", "ripe", "rotten", "unripe"]
    image = tf.keras.preprocessing.image.load_img(image_path, target_size = (128,128))
    input_arr = tf.keras.preprocessing.image.img_to_array(image)
    input_arr = np.array([input_arr])
    pred = model.predict(input_arr)
    prediction = np.argmax(pred)
    result = classes[prediction]
    return render_template('index.html', prediction = result)

if __name__ == "__main__":
    app.run(debug = True)
