import requests
GEMINI_API_KEY = "AIzaSyD2U5ybaSWPxN5QsGPyNxDsoMsvWtWbcLw"
GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;



def query_gemini(prompt):
    headers = {"Content-Type": "application/json"}
    params = {"key": GEMINI_API_KEY}
    data = {
        "contents": [{"parts": [{"text": prompt}]}]
    }
    response = requests.post(GEMINI_API_URL, headers=headers, params=params, json=data)
    if response.status_code != 200:
        print("Error:", response.text)
    response.raise_for_status()
    return response.json()["candidates"][0]["content"]["parts"][0]["text"]