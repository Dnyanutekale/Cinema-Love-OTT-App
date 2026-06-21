# 🚀 Simple Gemini AI Chatbot

A beginner-friendly, interactive command-line AI chatbot written in Python. This project utilizes the modern, official Google GenAI SDK to interact with **Gemini 2.5 Flash**, keeping track of conversation history for a natural multi-turn dialogue.

---

## Features

- **💬 Multi-Turn Conversations**: Maintains full conversation history so the chatbot remembers the context of previous messages.
- **⚡ Fast & Concise Responses**: Configured to use `gemini-2.5-flash`, which is optimized for speed and short, conversational answers.
- **🛠️ Graceful Error Handling**: Handles missing API keys, invalid credentials, and network dropouts cleanly without crashing.
- **🎨 Premium Console Experience**: Colorful, stylized command-line interface with clean formatting.
- **🛡️ Secure Configurations**: Relies on environment variables (`.env` file) to store sensitive credentials safely.

---

## Project Structure

```text
simple_chatbot/
├── chatbot.py         # Main modular application script
├── .env               # Local configuration file (ignored by version control)
├── .env.example       # Template file showing required configuration
└── requirements.txt   # Third-party package dependencies
```

---

## Installation & Setup

Follow these steps to set up and run the chatbot on your machine:

### 1. Prerequisites
Ensure you have **Python 3.9** or higher installed on your computer. You can check your version by running:
```bash
python --version
```

### 2. Create a Virtual Environment (Recommended)
Creating a virtual environment ensures that the project's dependencies don't conflict with other Python installations on your system.

**On Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

**On macOS/Linux:**
```bash
python3 -m venv venv
source venv/bin/activate
```

### 3. Install Dependencies
Install the required libraries listed in `requirements.txt`:
```bash
pip install -r requirements.txt
```

### 4. Configure Your API Key
1. Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/).
2. In the `simple_chatbot` folder, locate the `.env` file. (If it does not exist, copy `.env.example` to `.env`).
3. Open the `.env` file and insert your API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

---

## Usage

Start the chatbot by executing:

```bash
python chatbot.py
```

### Basic Commands
* **Type any message** and press `Enter` to get a reply.
* Type **`exit`** or **`quit`** to safely terminate the session.
* Press `Ctrl + C` at any point to force quit.

---

## Code Breakdown

* **`load_config()`**: Uses `dotenv` to load the `.env` file and reads the `GEMINI_API_KEY`. If the key is not configured, it raises a helpful exception.
* **`initialize_chat()`**: Creates a `genai.Client` and initializes the chat session (`client.chats.create(...)`). We specify the model (`gemini-2.5-flash`) and inject a system instruction to instruct the bot to respond concisely and warmly.
* **`run_chatbot()`**: The main interaction loop. It reads console inputs, handles blank messages, submits queries to the active chat session (retaining history), and intercepts network/API exceptions to report errors user-friendly.
