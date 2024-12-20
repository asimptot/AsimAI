from flask import Flask, render_template, request, jsonify
from flask_frozen import Freezer
from g4f.client import Client
import g4f, os, warnings

warnings.filterwarnings("ignore")

app = Flask(__name__)
freezer = Freezer(app)  # Initialize the Freezer
client = Client()
messages = []

@app.route("/")
def home():
    return render_template("index.html")

# Other routes can go here...

@app.route("/check-grammar", methods=["POST"])
def check_grammar():
    input_text = request.form.get("text", "")
    try:
        prompt = "Check the grammar in the following sentence and return only the corrected version."
        combined_input = f"{prompt} {input_text}"

        response = client.chat.completions.create(
            model=g4f.models.gpt_4o_mini,
            messages=[{"role": "user", "content": combined_input}],
        )

        corrected_text = response.choices[0].message.content
        return jsonify({"corrected_text": corrected_text})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add other routes...

if __name__ == "__main__":
    if os.environ.get("FLASK_ENV") == "production":
        freezer.freeze()  # Freeze the app for static deployment
    else:
        app.run(debug=True)
