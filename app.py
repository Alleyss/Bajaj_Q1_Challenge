from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app, origins=["https://bfhl-frontend-rhqklyu8h-sai-pranav-vangalas-projects.vercel.app"])
@app.route('/bfhl', methods=['POST', 'GET'])
def bfhl():
    if request.method == 'POST':
        data = request.json.get('data', [])
        numbers = [item for item in data if item.isdigit()]
        alphabets = [item for item in data if item.isalpha()]
        lowercase_alphabets = [item for item in alphabets if item.islower()]
        highest_lowercase_alphabet = max(lowercase_alphabets) if lowercase_alphabets else None

        response = {
            "is_success": True,
            "user_id": "john_doe_17091999",  # Replace with your details
            "email": "john@xyz.com",         # Replace with your details
            "roll_number": "ABCD123",        # Replace with your details
            "numbers": numbers,
            "alphabets": alphabets,
            "highest_lowercase_alphabet": [highest_lowercase_alphabet] if highest_lowercase_alphabet else []
        }

        return jsonify(response), 200

    elif request.method == 'GET':
        response = {"operation_code": 1}
        return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
