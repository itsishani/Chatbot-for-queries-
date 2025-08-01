from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS  # Add this for cross-origin requests
from data_loader import DataLoader
from gemini_api import query_gemini

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

data_loader = DataLoader()

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    customer_id = request.json.get('customer_id')

    # Your existing logic here
    customer = data_loader.get_customer(customer_id)
    if not customer:
        return jsonify({"response": "Sorry, customer not found. Please check your Customer ID."})

    plan = data_loader.get_plan(customer[0]['plan_taken'])
    history = data_loader.get_customer_history(customer_id)
    plans = data_loader.get_all_plans()

    context = f"""
    Customer Details: {customer}
    Customer Plan: {plan}
    Customer History: {history}
    Available Plans: {plans}
    User Query: {user_message}
    Please answer the user's query using the above data, referencing policies and plans as needed.
    """

    try:
        answer = query_gemini(context)
    except Exception as e:
        answer = "Sorry, there was an error processing your request."

    return jsonify({"response": answer})

if __name__ == '__main__':
    app.run(debug=True)