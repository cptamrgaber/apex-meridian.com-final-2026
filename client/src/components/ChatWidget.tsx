import { useState, useRef, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { MessageCircle, X, Send, Bot, Loader2, Minimize2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hello! I'm Apex, your AI assistant for Apex Meridian. I can help you learn about our AI solutions for aviation, cybersecurity, education, AGI research, and media production. How can I help you today?",
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [leadCaptured, setLeadCaptured] = useState<string | null>(null);

  const sendMessage = trpc.chatWidget.sendMessage.useMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.content },
      ]);
      if (data.leadCaptured && data.leadCategory) {
        setLeadCaptured(data.leadCategory);
        setTimeout(() => setLeadCaptured(null), 6000);
      }
    },
    onError: () => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I encountered an error. Please try again or contact us at apex-meridian.com/contact",
        },
      ]);
    },
  });

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || sendMessage.isPending) return;

    const newMessages: Message[] = [
      ...messages,
      { role: "user", content: trimmed },
    ];
    setMessages(newMessages);
    setInput("");

    sendMessage.mutate({
      messages: newMessages,
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat Window */}
      {isOpen && (
        <div
          className={`flex flex-col rounded-2xl shadow-2xl border border-[#1e2d5a] overflow-hidden transition-all duration-300 ${
            isMinimized ? "h-14 w-80" : "w-80 sm:w-96"
          }`}
          style={{
            background: "linear-gradient(180deg, #0d1535 0%, #0a0f2e 100%)",
            maxHeight: isMinimized ? "56px" : "520px",
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
            style={{
              background:
                "linear-gradient(90deg, #0d1535 0%, #1565C0 50%, #0d1535 100%)",
              borderBottom: "1px solid #1e2d5a",
            }}
            onClick={() => isMinimized && setIsMinimized(false)}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "#00E5FF22", border: "1px solid #00E5FF55" }}
              >
                <Bot size={16} style={{ color: "#00E5FF" }} />
              </div>
              <div>
                <p
                  className="text-sm font-semibold leading-none"
                  style={{ color: "#00E5FF" }}
                >
                  Apex AI Assistant
                </p>
                <p className="text-xs mt-0.5" style={{ color: "#7986CB" }}>
                  Apex Meridian
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMinimized(!isMinimized);
                }}
                className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: "#7986CB" }}
              >
                <Minimize2 size={14} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                  setIsMinimized(false);
                }}
                className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
                style={{ color: "#7986CB" }}
              >
                <X size={14} />
              </button>
            </div>
          </div>

          {/* Messages */}
          {!isMinimized && (
            <>
              <div
                className="flex-1 overflow-y-auto p-4 space-y-3"
                style={{ minHeight: "320px", maxHeight: "380px" }}
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {msg.role === "assistant" && (
                      <div
                        className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{
                          background: "#00E5FF22",
                          border: "1px solid #00E5FF44",
                        }}
                      >
                        <Bot size={13} style={{ color: "#00E5FF" }} />
                      </div>
                    )}
                    <div
                      className="max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed"
                      style={
                        msg.role === "user"
                          ? {
                              background:
                                "linear-gradient(135deg, #1565C0, #0d47a1)",
                              color: "#E8EAF6",
                              borderBottomRightRadius: "4px",
                            }
                          : {
                              background: "#111840",
                              color: "#E8EAF6",
                              border: "1px solid #1e2d5a",
                              borderBottomLeftRadius: "4px",
                            }
                      }
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {sendMessage.isPending && (
                  <div className="flex gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center"
                      style={{
                        background: "#00E5FF22",
                        border: "1px solid #00E5FF44",
                      }}
                    >
                      <Bot size={13} style={{ color: "#00E5FF" }} />
                    </div>
                    <div
                      className="rounded-xl px-4 py-3"
                      style={{
                        background: "#111840",
                        border: "1px solid #1e2d5a",
                      }}
                    >
                      <div className="flex gap-1 items-center">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{
                            background: "#00E5FF",
                            animationDelay: "0ms",
                          }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{
                            background: "#00E5FF",
                            animationDelay: "150ms",
                          }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{
                            background: "#00E5FF",
                            animationDelay: "300ms",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Lead Captured Banner */}
              {leadCaptured && (
                <div
                  className="mx-4 mb-2 px-3 py-2 rounded-lg text-xs flex items-center gap-2"
                  style={{
                    background: "#0d2b0d",
                    border: "1px solid #2e7d32",
                    color: "#81C784",
                  }}
                >
                  <span style={{ fontSize: "14px" }}>✅</span>
                  <span>
                    <strong>Sales team notified</strong> — A specialist will follow up with you shortly regarding your {leadCaptured.toLowerCase()}.
                  </span>
                </div>
              )}

              {/* Quick Suggestions */}
              {messages.length === 1 && (
                <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                  {[
                    "Aviation solutions",
                    "Cybersecurity",
                    "Open positions",
                    "Contact sales",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        setTimeout(() => inputRef.current?.focus(), 50);
                      }}
                      className="text-xs px-2.5 py-1 rounded-full transition-colors"
                      style={{
                        background: "#111840",
                        border: "1px solid #1e2d5a",
                        color: "#00BCD4",
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              {/* Input */}
              <div
                className="px-3 py-3"
                style={{ borderTop: "1px solid #1e2d5a" }}
              >
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2"
                  style={{
                    background: "#111840",
                    border: "1px solid #1e2d5a",
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about our AI solutions..."
                    className="flex-1 bg-transparent text-sm outline-none"
                    style={{ color: "#E8EAF6" }}
                    disabled={sendMessage.isPending}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || sendMessage.isPending}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all disabled:opacity-40"
                    style={{
                      background: input.trim()
                        ? "linear-gradient(135deg, #00E5FF, #1565C0)"
                        : "#1e2d5a",
                    }}
                  >
                    {sendMessage.isPending ? (
                      <Loader2
                        size={13}
                        className="animate-spin"
                        style={{ color: "#E8EAF6" }}
                      />
                    ) : (
                      <Send size={13} style={{ color: "#E8EAF6" }} />
                    )}
                  </button>
                </div>
                <p
                  className="text-center text-xs mt-1.5"
                  style={{ color: "#3d4f7c" }}
                >
                  Powered by Apex Meridian AI
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setIsMinimized(false);
        }}
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: isOpen
            ? "#0d1535"
            : "linear-gradient(135deg, #00E5FF 0%, #1565C0 100%)",
          border: "2px solid",
          borderColor: isOpen ? "#1e2d5a" : "#00E5FF",
          boxShadow: isOpen
            ? "0 4px 20px rgba(0,229,255,0.2)"
            : "0 4px 24px rgba(0,229,255,0.4)",
        }}
        aria-label={isOpen ? "Close chat" : "Open AI chat assistant"}
      >
        {isOpen ? (
          <X size={22} style={{ color: "#00E5FF" }} />
        ) : (
          <MessageCircle size={22} style={{ color: "#0a0f2e" }} />
        )}
      </button>
    </div>
  );
}
