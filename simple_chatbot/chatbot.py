import os
import sys
from dotenv import load_dotenv
from google import genai
from google.genai import types
from google.genai.errors import APIError

# ANSI color codes for premium CLI styling
COLOR_RESET = "\033[0m"
COLOR_PRIMARY = "\033[1;34m"   # Bold Blue
COLOR_SECONDARY = "\033[1;36m" # Bold Cyan
COLOR_SUCCESS = "\033[1;32m"   # Bold Green
COLOR_WARNING = "\033[1;33m"   # Bold Yellow
COLOR_ERROR = "\033[1;31m"     # Bold Red
COLOR_MUTED = "\033[0;90m"     # Dark Gray

def load_config() -> str:
    """
    Loads environment variables from the .env file and retrieves the Gemini API key.
    
    Returns:
        str: The API key if found.
        
    Raises:
        ValueError: If the API key is missing or empty.
    """
    # Load environment variables from .env file
    load_dotenv()
    
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key.strip() == "" or api_key == "your_gemini_api_key_here":
        raise ValueError(
            "GEMINI_API_KEY is not set. Please add it to your simple_chatbot/.env file.\n"
            "You can obtain an API key from Google AI Studio: https://aistudio.google.com/"
        )
    return api_key.strip()

def initialize_chat(api_key: str):
    """
    Initializes the Gemini client and starts a new multi-turn chat session.
    
    Args:
        api_key (str): The Google Gemini API key.
        
    Returns:
        tuple: (Client, Chat) The initialized client and the active chat session.
    """
    try:
        # Initialize client with specified API key
        client = genai.Client(api_key=api_key)
        
        # We use gemini-2.5-flash as the default model (fast, accurate, and cost-effective)
        # We pass a system instruction to shape the chatbot's personality
        system_instruction = (
            "You are a friendly, helpful, and concise AI assistant. "
            "Keep your responses short, conversational, and easy for beginners to understand."
        )
        
        chat = client.chats.create(
            model="gemini-2.5-flash",
            config=types.GenerateContentConfig(
                system_instruction=system_instruction,
                temperature=0.7,
            )
        )
        return client, chat
    except Exception as e:
        raise ConnectionError(f"Failed to initialize the Gemini client: {e}")

def display_welcome_banner():
    """Prints a premium, visual welcome message in the console."""
    print(f"\n{COLOR_PRIMARY}=" * 60)
    print(f" {COLOR_SECONDARY}🚀 Welcome to the Gemini AI Chatbot! 🚀{COLOR_PRIMARY}")
    print(f" {COLOR_MUTED}Powered by Google Gemini 2.5 Flash{COLOR_PRIMARY}")
    print("=" * 60 + COLOR_RESET)
    print(f"{COLOR_MUTED}Instructions:{COLOR_RESET}")
    print(f" - Type your message and press {COLOR_SECONDARY}Enter{COLOR_RESET} to chat.")
    print(f" - Type {COLOR_WARNING}'exit'{COLOR_RESET} or {COLOR_WARNING}'quit'{COLOR_RESET} to end the conversation.")
    print(f" - The chatbot maintains context from previous messages.")
    print(f"{COLOR_PRIMARY}=" * 60 + f"{COLOR_RESET}\n")

def run_chatbot():
    """Main function containing the chatbot execution and interactive CLI loop."""
    # 1. Load API Configuration
    try:
        api_key = load_config()
    except ValueError as e:
        print(f"\n{COLOR_ERROR}❌ Configuration Error:{COLOR_RESET}")
        print(e)
        sys.exit(1)

    # 2. Initialize Gemini Client & Chat
    print(f"{COLOR_MUTED}Connecting to Gemini API...{COLOR_RESET}", end="\r")
    try:
        client, chat = initialize_chat(api_key)
        print(f"{COLOR_SUCCESS}✓ Connected to Gemini successfully!{COLOR_RESET}        ")
    except (ConnectionError, Exception) as e:
        print(f"\n{COLOR_ERROR}❌ Connection Error:{COLOR_RESET}")
        print(e)
        sys.exit(1)

    # 3. Welcome Banner
    display_welcome_banner()

    # 4. Interactive Chat Loop
    while True:
        try:
            # Get user input
            user_input = input(f"{COLOR_SECONDARY}You ➔ {COLOR_RESET}").strip()
            
            # Handle empty input
            if not user_input:
                print(f"{COLOR_WARNING}⚠️ Please enter a valid message.{COLOR_RESET}\n")
                continue
                
            # Handle exit commands
            if user_input.lower() in ("exit", "quit"):
                print(f"\n{COLOR_SUCCESS}Goodbye! Have a great day. 👋{COLOR_RESET}\n")
                break
                
            print(f"{COLOR_MUTED}Gemini is thinking...{COLOR_RESET}", end="\r")
            
            # Send message and receive response (maintaining history)
            response = chat.send_message(user_input)
            
            # Clear the "thinking..." line and print the response
            print(" " * 30, end="\r")  # overwrite line
            print(f"{COLOR_SUCCESS}Gemini ➔{COLOR_RESET} {response.text}\n")
            
        except APIError as e:
            # Handle API-specific issues (e.g. quota limits, invalid API keys, blocked content)
            print(" " * 30, end="\r")
            print(f"\n{COLOR_ERROR}❌ Gemini API Error:{COLOR_RESET}")
            if "API_KEY_INVALID" in str(e) or e.code == 400:
                print("Your API key appears to be invalid. Please verify the key in your .env file.")
            else:
                print(e.message)
            print()
            
        except Exception as e:
            # Handle generic exceptions (e.g. network disconnection, keyboard interrupt)
            print(" " * 30, end="\r")
            print(f"\n{COLOR_ERROR}❌ Network/System Error:{COLOR_RESET}")
            print(f"An unexpected error occurred: {e}")
            print("Please check your internet connection and try again.\n")

if __name__ == "__main__":
    # Ensure Windows console supports UTF-8 encoding and ANSI escape sequences
    if sys.platform == "win32":
        import os
        os.system("color")
        if hasattr(sys.stdout, "reconfigure"):
            sys.stdout.reconfigure(encoding="utf-8")
        if hasattr(sys.stdin, "reconfigure"):
            sys.stdin.reconfigure(encoding="utf-8")
        
    try:
        run_chatbot()
    except KeyboardInterrupt:
        print(f"\n\n{COLOR_SUCCESS}Session ended via keyboard interrupt. Goodbye! 👋{COLOR_RESET}\n")
        sys.exit(0)
