import { useState } from "react";
import "../../styles/ChatWidget.css";
export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([
    { role: "bot", text: "Hi — how can I help today?" },
  ]);
  function send() {
    if (!input.trim()) return;
    setMsgs((m) => [...m, { role: "user", text: input }]);
    setInput("");
    setTimeout(
      () =>
        setMsgs((m) => [...m, { role: "bot", text: "Thanks — demo reply." }]),
      600
    );
  }
  return (
    <div className="chat-widget">
      <div>
        {open && (
          <div className="chat-panel">
            <div style={{ padding: 8, borderBottom: "1px solid #eee" }}>
              Ask Jaldikaam
            </div>
            <div className="messages" style={{ padding: 8 }}>
              {msgs.map((m, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: m.role === "user" ? "right" : "left",
                    margin: "6px 0",
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      padding: "8px",
                      borderRadius: 6,
                      background: m.role === "user" ? "#e6f4ff" : "#f3f4f6",
                    }}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                padding: 8,
                borderTop: "1px solid #eee",
                display: "flex",
                gap: 8,
              }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                style={{ flex: 1, padding: 8 }}
              />
              <button onClick={send} className="btn">
                Send
              </button>
            </div>
          </div>
        )}
      </div>
      <button className="btn" onClick={() => setOpen((v) => !v)}>
        {open ? "Close" : "Chat"}
      </button>
    </div>
  );
}
