import { useState, useRef, useEffect } from "react";

const initialMessages = [
  {
    id: 1,
    role: "ai",
    text: "Look, I appreciate the interest in the Modern Pro V2. They're top of the line. $200 is already a fair price for this tech, but I'm willing to hear you out. What's your opening move? 🤖",
  },
  {
    id: 2,
    role: "user",
    text: "I've seen these elsewhere for $175, and I'm a loyal customer of DealForge. Can we do $150 today for a quick sale?",
  },
  {
    id: 3,
    role: "ai",
    text: "$150 is a bit steep of a drop for these. How about we meet at $160? That's a 20% discount just because you're a regular. That's my best offer for this round.",
  },
];

const aiReplies = [
  "I understand your position, but $160 is already a great deal. The market value for these is well above $200. What else can you bring to the table?",
  "You're a tough negotiator! I can see you've done your homework. Let me think... $155 is my absolute floor. Take it or leave it.",
  "Alright, alright. You've worn me down. $152 — and that's with free shipping. Final answer.",
  "I have to say, you're one of the best I've dealt with. Fine. $150. But only because I respect the hustle. Deal?",
];

export default function DealForgeNegotiate() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [currentOffer, setCurrentOffer] = useState(160);
  const [round, setRound] = useState(3);
  const [aiReplyIndex, setAiReplyIndex] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [walkedAway, setWalkedAway] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input.trim() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setRound(r => Math.min(r + 1, 10));

    setTimeout(() => {
      const reply = aiReplies[aiReplyIndex % aiReplies.length];
      setAiReplyIndex(i => i + 1);
      const newOffer = Math.max(currentOffer - Math.floor(Math.random() * 8 + 2), 140);
      setCurrentOffer(newOffer);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: "ai", text: reply }]);
      setIsTyping(false);
    }, 1800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  const savePct = Math.round(((200 - currentOffer) / 200) * 100);
  const progressPct = (round / 10) * 100;
  const heatPct = Math.min(round * 10, 80);
  const heatLabel = heatPct < 30 ? "Low" : heatPct < 60 ? "Medium" : "High";
  const heatColor = heatPct < 30 ? "#83aeff" : heatPct < 60 ? "#f8a010" : "#ff716c";

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0e0e0e", color: "#adaaaa", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #484847; border-radius: 10px; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-4px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        .dot-bounce { animation: bounce 1s infinite; }
        .dot-bounce-2 { animation: bounce 1s 0.2s infinite; }
        .dot-bounce-3 { animation: bounce 1s 0.4s infinite; }
        .pulse-dot { animation: pulse 1.5s infinite; }
        .float-arrow { animation: float 1.5s ease-in-out infinite; }
        .momentum-glow { box-shadow: 0 0 15px 2px rgba(197,255,201,0.4); }
        .glass-panel {
          background: rgba(38,38,38,0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .chat-input:focus { outline: none; box-shadow: 0 0 0 2px rgba(131,174,255,0.2); }
        .three-col {
          display: grid;
          grid-template-columns: 3fr 6fr 3fr;
          gap: 1.5rem;
          height: calc(100vh - 280px);
          min-height: 600px;
        }
        @media (max-width: 1024px) {
          .three-col { grid-template-columns: 1fr; height: auto; min-height: unset; }
          .nav-links { display: none !important; }
          .status-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 1024px) {
          .status-grid { grid-template-columns: repeat(3, 1fr); }
        }
      `}</style>

     

      {/* Main */}
      <main style={{ paddingTop: 96, paddingBottom: 48, padding: "96px 1.5rem 48px", maxWidth: 1280, margin: "0 auto", minHeight: "100vh" }}>

        {/* Game Status Header */}
        <div className="status-grid" style={{ display: "grid", gap: "1.5rem", alignItems: "center", marginBottom: "2rem" }}>
          {/* Left: Title */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#6ba0ff", marginBottom: 4, fontWeight: 600 }}>
              Negotiating For
            </span>
            <h1 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 800, color: "#fff" }}>
              Modern Headphones
            </h1>
          </div>

          {/* Center: Progress */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", marginBottom: 8, padding: "0 4px" }}>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#adaaaa", fontWeight: 600 }}>
                Round {round} of 10
              </span>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#f8a010", fontWeight: 600 }}>
                Listed: $200
              </span>
            </div>
            <div style={{ width: "100%", height: 12, background: "#262626", borderRadius: "9999px", overflow: "hidden" }}>
              <div style={{
                height: "100%", width: `${progressPct}%`,
                background: "linear-gradient(90deg, #ff716c, #f8a010, #c5ffc9)",
                borderRadius: "9999px", position: "relative", transition: "width 0.5s ease",
              }}>
                <div style={{ position: "absolute", right: 0, top: 0, height: "100%", width: 8, background: "rgba(255,255,255,0.4)", filter: "blur(2px)" }} />
              </div>
            </div>
          </div>

          {/* Right: Status */}
          <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem" }}>
            <div style={{ textAlign: "right" }}>
              <span style={{ display: "block", fontSize: "0.7rem", color: "#adaaaa" }}>Status</span>
              <span className="font-headline" style={{
                color: "#c5ffc9", fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6,
              }}>
                <span className="pulse-dot" style={{ width: 8, height: 8, borderRadius: "50%", background: "#c5ffc9", display: "inline-block" }} />
                Active Session
              </span>
            </div>
          </div>
        </div>

        {/* Three-column layout */}
        <div className="three-col">

          {/* LEFT: Product Details */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div style={{
              background: "#131313", borderRadius: "1rem", overflow: "hidden",
              flex: 1, display: "flex", flexDirection: "column",
            }}>
              {/* Product Image */}
              <div style={{ height: 192, overflow: "hidden", position: "relative" }}>
                <div style={{
                  width: "100%", height: "100%",
                  background: "linear-gradient(145deg, #0a1628, #0d2040)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ position: "absolute", width: 100, height: 100, background: "#4af0ff18", borderRadius: "50%", filter: "blur(40px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
                  <svg viewBox="0 0 140 120" width="150" height="130" style={{ position: "relative", zIndex: 1 }}>
                    <ellipse cx="70" cy="50" rx="42" ry="40" fill="none" stroke="#1e3a5f" strokeWidth="18" />
                    <ellipse cx="70" cy="50" rx="42" ry="40" fill="none" stroke="#2a4a7f" strokeWidth="15" strokeDasharray="200 300" strokeDashoffset="-60" />
                    <rect x="16" y="68" width="22" height="36" rx="10" fill="#1a2840" stroke="#2a3f60" strokeWidth="1.5" />
                    <rect x="20" y="72" width="14" height="28" rx="7" fill="#0f1e36" />
                    <rect x="102" y="68" width="22" height="36" rx="10" fill="#1a2840" stroke="#2a3f60" strokeWidth="1.5" />
                    <rect x="106" y="72" width="14" height="28" rx="7" fill="#0f1e36" />
                    <line x1="27" y1="82" x2="27" y2="94" stroke="#4af0ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                    <line x1="113" y1="82" x2="113" y2="94" stroke="#4af0ff" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
                  </svg>
                </div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #131313, transparent)" }} />
              </div>

              {/* Product Info */}
              <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "1rem" }}>
                <h3 className="font-headline" style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff" }}>Modern Pro V2</h3>
                <p style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "#adaaaa" }}>
                  Premium sound, noise-canceling, and 40-hour battery life. Engineered for the sonic perfectionist.
                </p>
                <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(72,72,71,0.1)", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {[
                    { icon: "✓", label: "Active Noise Cancellation" },
                    { icon: "⚡", label: "40h Battery Life" },
                    { icon: "⬡", label: "Bluetooth 5.3" },
                  ].map(feat => (
                    <div key={feat.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.75rem" }}>
                      <span style={{ color: "#83aeff", fontSize: "0.9rem", fontWeight: 700 }}>{feat.icon}</span>
                      <span>{feat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* CENTER: Chat */}
          <section style={{
            display: "flex", flexDirection: "column",
            background: "#1a1919", borderRadius: "1rem",
            overflow: "hidden", border: "1px solid rgba(72,72,71,0.05)",
          }}>
            {/* Chat Header */}
            <div style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid rgba(72,72,71,0.1)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "9999px",
                  background: "rgba(131,174,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#83aeff", fontSize: "1.2rem",
                }}>🤖</div>
                <div>
                  <span style={{ display: "block", fontSize: "0.875rem", fontWeight: 700, color: "#fff" }}>Max</span>
                  <span style={{ fontSize: "0.65rem", color: "#c5ffc9", display: "flex", alignItems: "center", gap: 4 }}>
                    <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "#c5ffc9", display: "inline-block" }} />
                    Online & Thinking
                  </span>
                </div>
              </div>
              <span style={{ color: "#adaaaa", cursor: "pointer", fontSize: "1.2rem" }}>⋮</span>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, padding: "1.5rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {messages.map(msg => (
                <div key={msg.id} style={{
                  display: "flex", alignItems: "flex-start",
                  flexDirection: msg.role === "user" ? "row-reverse" : "row",
                  gap: "0.75rem", maxWidth: "85%",
                  alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                }}>
                  {/* Avatar */}
                  <div style={{
                    width: 32, height: 32, borderRadius: "9999px", flexShrink: 0,
                    background: msg.role === "ai" ? "#201f1f" : "#6ba0ff",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: msg.role === "ai" ? "1px solid rgba(72,72,71,0.2)" : "none",
                    fontSize: "0.85rem",
                  }}>
                    {msg.role === "ai" ? "🤖" : <span style={{ color: "#002d64", fontWeight: 700, fontSize: "0.7rem" }}>U</span>}
                  </div>
                  {/* Bubble */}
                  <div style={{
                    background: msg.role === "ai" ? "#201f1f" : "rgba(131,174,255,0.9)",
                    color: msg.role === "ai" ? "#fff" : "#002d64",
                    padding: "1rem 1.1rem",
                    borderRadius: msg.role === "ai" ? "0 1rem 1rem 1rem" : "1rem 0 1rem 1rem",
                    fontSize: "0.85rem", lineHeight: 1.6, fontWeight: msg.role === "user" ? 500 : 400,
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 8px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {[0, 1, 2].map(i => (
                      <div key={i} className={`dot-bounce${i > 0 ? `-${i + 1}` : ""}`} style={{
                        width: 6, height: 6,
                        background: "#adaaaa", borderRadius: "9999px",
                        animation: `bounce 1s ${i * 0.2}s infinite`,
                      }} />
                    ))}
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "rgba(173,170,170,0.5)" }}>Max is typing...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div style={{ padding: "1.5rem", background: "#131313" }}>
              <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
                <input
                  className="chat-input"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Make your case... be convincing!"
                  style={{
                    width: "100%", background: "#262626",
                    border: "none", borderRadius: "0.5rem",
                    padding: "1rem 3.5rem 1rem 1.5rem",
                    color: "#fff", fontSize: "0.9rem",
                    fontFamily: "'Inter', sans-serif",
                    transition: "box-shadow 0.2s",
                  }}
                />
                <button
                  onClick={handleSend}
                  style={{
                    position: "absolute", right: 8,
                    background: "#83aeff", color: "#002d64",
                    border: "none", borderRadius: "0.4rem",
                    padding: "0.5rem 0.65rem",
                    cursor: "pointer", fontWeight: 700, fontSize: "1.1rem",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={e => e.currentTarget.style.transform = "scale(1.05)"}
                  onMouseOut={e => e.currentTarget.style.transform = "scale(1)"}
                >➤</button>
              </div>
            </div>
          </section>

          {/* RIGHT: Stats & Actions */}
          <aside style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

            {/* Current Offer */}
            <div className="glass-panel" style={{
              padding: "1.5rem", borderRadius: "1rem",
              border: "1px solid rgba(131,174,255,0.1)",
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
            }}>
              <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "#adaaaa", marginBottom: "1rem", fontWeight: 600 }}>
                Current AI Offer
              </span>
              <div style={{ position: "relative", display: "inline-block", marginBottom: 8 }}>
                <h2 className="font-headline" style={{
                  fontSize: "3.5rem", color: "#c5ffc9",
                  letterSpacing: "-0.04em", lineHeight: 1,
                }}>
                  ${currentOffer}
                </h2>
                <span className="float-arrow" style={{
                  position: "absolute", right: -24, top: 4,
                  color: "#c5ffc9", fontSize: "1.2rem",
                }}>↓</span>
              </div>
              <div style={{
                background: "rgba(197,255,201,0.1)",
                color: "#c5ffc9",
                padding: "4px 12px", borderRadius: "9999px",
                fontSize: "0.7rem", fontWeight: 700,
                border: "1px solid rgba(197,255,201,0.2)",
              }}>
                You've saved {savePct}% so far!
              </div>
            </div>

            {/* Deal Heat */}
            <div style={{ background: "#131313", padding: "1.5rem", borderRadius: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#adaaaa", fontWeight: 600 }}>
                  Deal Heat
                </span>
                <span style={{ fontSize: "0.75rem", color: heatColor, fontWeight: 700 }}>{heatLabel}</span>
              </div>
              <div style={{ width: "100%", height: 8, background: "#262626", borderRadius: "9999px", overflow: "hidden" }}>
                <div style={{
                  height: "100%", width: `${heatPct}%`,
                  background: "linear-gradient(90deg, #f8a010, #ff716c)",
                  transition: "width 0.5s ease",
                }} />
              </div>
              <p style={{ fontSize: "0.7rem", color: "rgba(173,170,170,0.6)", fontStyle: "italic", lineHeight: 1.5 }}>
                Max is starting to feel the pressure. One more good point might seal it.
              </p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "auto" }}>
              {accepted ? (
                <div style={{
                  background: "rgba(197,255,201,0.15)", border: "1px solid rgba(197,255,201,0.3)",
                  padding: "1.25rem", borderRadius: "0.75rem", textAlign: "center",
                }}>
                  <p className="font-headline" style={{ color: "#c5ffc9", fontWeight: 700, fontSize: "1rem" }}>
                    🎉 Deal Accepted at ${currentOffer}!
                  </p>
                  <p style={{ color: "#adaaaa", fontSize: "0.75rem", marginTop: 4 }}>You saved ${200 - currentOffer}</p>
                </div>
              ) : walkedAway ? (
                <div style={{
                  background: "rgba(255,113,108,0.1)", border: "1px solid rgba(255,113,108,0.2)",
                  padding: "1.25rem", borderRadius: "0.75rem", textAlign: "center",
                }}>
                  <p className="font-headline" style={{ color: "#ff716c", fontWeight: 700, fontSize: "1rem" }}>
                    🚪 You walked away.
                  </p>
                  <p style={{ color: "#adaaaa", fontSize: "0.75rem", marginTop: 4 }}>Better luck next time!</p>
                </div>
              ) : (
                <>
                  <button
                    onClick={() => setAccepted(true)}
                    className="momentum-glow"
                    style={{
                      width: "100%", padding: "1.25rem",
                      background: "linear-gradient(135deg, #c5ffc9, #5bf083)",
                      color: "#004a1d",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700, fontSize: "1.1rem",
                      border: "none", borderRadius: "0.75rem",
                      cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseOver={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                    onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; }}
                    onMouseDown={e => { e.currentTarget.style.transform = "scale(0.95)"; }}
                    onMouseUp={e => { e.currentTarget.style.transform = "scale(1.02)"; }}
                  >
                    <span>Accept Deal</span>
                    <span>✓</span>
                  </button>

                  <button
                    onClick={() => setWalkedAway(true)}
                    style={{
                      width: "100%", padding: "1rem",
                      background: "rgba(255,113,108,0.05)",
                      color: "#ff716c",
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      border: "1px solid rgba(255,113,108,0.2)",
                      borderRadius: "0.75rem", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      transition: "background 0.2s, transform 0.15s",
                    }}
                    onMouseOver={e => e.currentTarget.style.background = "rgba(255,113,108,0.1)"}
                    onMouseOut={e => e.currentTarget.style.background = "rgba(255,113,108,0.05)"}
                    onMouseDown={e => e.currentTarget.style.transform = "scale(0.95)"}
                    onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}
                  >
                    <span>Walk Away</span>
                    <span>🚪</span>
                  </button>
                </>
              )}
            </div>
          </aside>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0e0e0e", width: "100%", padding: "3rem 1rem",
        borderTop: "1px solid rgba(72,72,71,0.15)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
          <span className="font-headline" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>DealForge</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Twitter", "Discord", "LinkedIn"].map(link => (
              <a key={link} href="#" style={{
                color: "#adaaaa", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
                onMouseOver={e => e.target.style.color = "#c5ffc9"}
                onMouseOut={e => e.target.style.color = "#adaaaa"}>{link}</a>
            ))}
          </div>
          <p style={{ color: "#adaaaa", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "28rem", fontFamily: "'Inter', sans-serif" }}>
            © 2024 DealForge. The AI never gives up easily. Can you?
          </p>
        </div>
      </footer>
    </div>
  );
}