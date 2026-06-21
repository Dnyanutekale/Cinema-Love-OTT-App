import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, Sparkles, AlertCircle, Trash2, HelpCircle } from 'lucide-react';

const Chat = () => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('streamsphere_chat_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    localStorage.setItem('streamsphere_chat_history', JSON.stringify(messages));
  }, [messages]);

  // Suggestions for users
  const suggestions = [
    { text: "Recommend a Sci-Fi masterpiece", icon: "🎬" },
    { text: "What are some highly-rated thrillers?", icon: "🍿" },
    { text: "Suggest a romance movie with a twist", icon: "🎭" },
    { text: "Give me movies starring Leonardo DiCaprio", icon: "🌟" }
  ];

  const handleSend = async (messageText) => {
    const textToSend = messageText || input;
    if (!textToSend.trim()) return;

    if (!messageText) {
      setInput('');
    }
    
    setError(null);
    setIsLoading(true);

    // Append user message
    const userMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Map React-side messages to the schema expected by the FastAPI backend
      const historyPayload = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        text: msg.text
      }));

      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        }),
      });

      if (!res.ok) {
        throw new Error('Could not connect to the AI companion server. Please ensure the backend is running.');
      }

      const data = await res.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Append bot response
      setMessages(prev => [...prev, { role: 'model', text: data.response }]);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setTimeout(() => chatInputRef.current?.focus(), 50);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear your conversation history?')) {
      setMessages([]);
      localStorage.removeItem('streamsphere_chat_history');
    }
  };

  return (
    <div className="chat-page container fade-in">
      <div className="chat-header animate-slide-up">
        <div className="header-info">
          <h1 className="section-title flex-align">
            <Sparkles className="sparkle-icon" /> Cinema Love AI Companion
          </h1>
          <p className="text-muted">Ask for movie recommendations, cast details, watchlists, and more.</p>
        </div>
        {messages.length > 0 && (
          <button className="clear-btn glass hover-scale" onClick={clearChat} title="Clear conversation history">
            <Trash2 size={16} /> Clear Chat
          </button>
        )}
      </div>

      <div className="chat-layout animate-slide-up">
        {/* Chat Feed Box */}
        <div className="chat-feed glass">
          {messages.length === 0 ? (
            <div className="empty-chat">
              <div className="bot-avatar large animate-pulse">
                <Bot size={40} />
              </div>
              <h2>Hello! I'm your Cinematic AI Guide.</h2>
              <p className="text-muted">Tell me what kind of mood you're in, your favorite genres, or ask for a movie list.</p>
              
              <div className="suggestions-grid">
                {suggestions.map((sug, idx) => (
                  <button 
                    key={idx} 
                    className="suggestion-card glass hover-scale"
                    onClick={() => handleSend(sug.text)}
                  >
                    <span className="sug-icon">{sug.icon}</span>
                    <span className="sug-text">{sug.text}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div key={index} className={`message-row ${msg.role}`}>
                  <div className="avatar">
                    {msg.role === 'user' ? '🙋‍♂️' : <Bot size={20} />}
                  </div>
                  <div className="message-bubble">
                    <div className="message-text">
                      {msg.text.split('\n').map((line, lIdx) => (
                        <p key={lIdx} style={{ marginBottom: line ? '0.5rem' : '1rem' }}>
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="message-row model loading">
                  <div className="avatar">
                    <Bot size={20} className="animate-spin-slow" />
                  </div>
                  <div className="message-bubble glass animate-pulse">
                    <div className="skeleton-line"></div>
                    <div className="skeleton-line short"></div>
                  </div>
                </div>
              )}

              {error && (
                <div className="error-banner glass">
                  <AlertCircle size={20} />
                  <div className="error-text">
                    <strong>Connection Alert:</strong> {error}
                    <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', opacity: 0.8 }}>
                      Make sure to run <code>cd simple_chatbot; .\venv\Scripts\python api.py</code>
                    </p>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="input-container glass">
          <textarea
            ref={chatInputRef}
            className="chat-textarea"
            placeholder="Search movies, ask recommendations or chat with AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            rows={1}
            disabled={isLoading}
          />
          <button 
            className="send-btn" 
            onClick={() => handleSend()}
            disabled={isLoading || !input.trim()}
            title="Send message"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      <style>{`
        .chat-page {
          padding-top: 100px;
          padding-bottom: 3rem;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 70px);
          max-height: 900px;
        }

        .chat-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .flex-align {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .sparkle-icon {
          color: var(--accent-primary);
          filter: drop-shadow(0 0 8px var(--accent-primary));
        }

        .clear-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.2rem;
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          color: var(--text-main);
        }

        .clear-btn:hover {
          background: rgba(229, 9, 20, 0.1);
          border-color: var(--accent-primary);
        }

        .chat-layout {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 1rem;
          overflow: hidden;
        }

        .chat-feed {
          flex: 1;
          border-radius: var(--radius-lg);
          overflow-y: auto;
          position: relative;
          padding: 2rem;
        }

        .empty-chat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          max-width: 650px;
          margin: 0 auto;
          gap: 1.5rem;
        }

        .bot-avatar.large {
          width: 80px;
          height: 80px;
          border-radius: 24px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 30px rgba(229, 9, 20, 0.3);
        }

        .empty-chat h2 {
          font-size: 2rem;
          margin-bottom: -0.5rem;
        }

        .suggestions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          width: 100%;
          margin-top: 1.5rem;
        }

        @media (max-width: 600px) {
          .suggestions-grid {
            grid-template-columns: 1fr;
          }
        }

        .suggestion-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1.2rem;
          text-align: left;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
        }

        .suggestion-card:hover {
          background: rgba(229, 9, 20, 0.05);
          border-color: var(--accent-primary);
        }

        .sug-icon {
          font-size: 1.5rem;
        }

        .sug-text {
          font-size: 0.95rem;
          line-height: 1.3;
          color: var(--text-main);
        }

        /* Message Bubbles */
        .messages-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .message-row {
          display: flex;
          gap: 1rem;
          max-width: 80%;
          animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .message-row.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .message-row.model {
          align-self: flex-start;
        }

        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--bg-accent);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          flex-shrink: 0;
        }

        .message-row.user .avatar {
          background: var(--accent-primary);
          box-shadow: 0 0 10px rgba(229, 9, 20, 0.4);
        }

        .message-bubble {
          padding: 1rem 1.25rem;
          border-radius: var(--radius-md);
          line-height: 1.5;
        }

        .message-row.user .message-bubble {
          background: var(--accent-gradient);
          color: #fff;
          border-top-right-radius: 2px;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.2);
        }

        .message-row.model .message-bubble {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-top-left-radius: 2px;
        }

        .message-text p:last-child {
          margin-bottom: 0 !important;
        }

        /* Loading Skeletons */
        .skeleton-line {
          height: 12px;
          width: 250px;
          background: rgba(255, 255, 255, 0.08);
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .skeleton-line.short {
          width: 150px;
          margin-bottom: 0;
        }

        /* Error Display */
        .error-banner {
          display: flex;
          gap: 1rem;
          align-items: flex-start;
          padding: 1.2rem;
          border-radius: var(--radius-md);
          border: 1px solid rgba(229, 9, 20, 0.3);
          background: rgba(229, 9, 20, 0.05);
          color: #ff5252;
          margin-top: 1rem;
        }

        .error-text {
          flex: 1;
        }

        /* Input Container */
        .input-container {
          border-radius: var(--radius-lg);
          padding: 0.75rem 1rem;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .chat-textarea {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: var(--text-main);
          font-family: inherit;
          font-size: 1rem;
          resize: none;
          max-height: 120px;
          line-height: 1.5;
        }

        .chat-textarea::placeholder {
          color: var(--text-dim);
        }

        .send-btn {
          width: 44px;
          height: 44px;
          border-radius: var(--radius-md);
          background: var(--accent-gradient);
          color: #fff;
          box-shadow: 0 4px 15px rgba(229, 9, 20, 0.2);
        }

        .send-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(229, 9, 20, 0.4);
          background: var(--accent-hover);
        }

        .send-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        /* Animations */
        @keyframes pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 0.5; }
        }

        .animate-pulse {
          animation: pulse 1.8s infinite ease-in-out;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Chat;
