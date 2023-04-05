import openai
import json
from flask import Flask, request

app = Flask(__name__)

@app.route('/api/gpt', methods=['POST'])
def gpt_api():
    data = request.json
    model = data.get('model', 'gpt-3.5-turbo')
    content = data.get('content', '')

    response = openai.ChatCompletion.create(
        model=model,
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": content},
        ]
    )

    reply = response['choices'][0]['message']['content']
    return json.dumps({"response": reply})

if __name__ == '__main__':
    app.run()