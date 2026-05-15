from flask import Flask, request, jsonify
import json

app = Flask(__name__)

@app.route('/generate-chart', methods=['POST'])
def generate_chart():
    data = request.json
    json_data = json.dumps(data.get('reviews', []))
    chart_base64 = generate_sentiment_chart(json_data)

    if chart_base64:
        return jsonify({'success': True, 'chart_image': chart_base64})
    else:
        return jsonify({'success': False, 'error': 'Failed to generate chart'}), 500

if __name__ == '__main__':
    app.run(port=5001)  # Запускаем на другом порту
