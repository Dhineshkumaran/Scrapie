from flask import Flask, jsonify, request
import requests
from bs4 import BeautifulSoup
from flask_cors import CORS
import google.generativeai as genai
import os

genai.configure(api_key="#")

app = Flask(__name__)

CORS(app)

@app.route('/scrape', methods=['GET'])
def scrape():
    url = request.args.get('url')
    desc = request.args.get('desc')
    if not url:
        return jsonify({"error": "Please provide a URL parameter"}), 400
    
    if not desc:
        desc = "Generate all useful contents from the below scraped text."

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()
        soup = BeautifulSoup(response.text, 'html.parser')
        elements = soup.find_all()
        extract = ''
        for element in elements:
            extract+=element.get_text(strip=True)
        model = genai.GenerativeModel("gemini-1.5-flash")
        response = model.generate_content(desc+extract)
        return jsonify({"response": response.text}), 200
    
    except requests.exceptions.RequestException as e:
        print(e)
        return jsonify({"error": f"Failed to fetch the webpage: {e}"}), 500
    except Exception as e:
        print(e)
        return jsonify({"error": f"An error occurred: {e}"}), 500

if __name__ == '__main__':
    app.run(debug=True)
