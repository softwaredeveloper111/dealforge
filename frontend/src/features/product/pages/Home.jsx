import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const colors = {
  background: "#0e0e0e",
  surface: "#0e0e0e",
  "surface-container": "#1a1919",
  "surface-container-low": "#131313",
  "surface-container-high": "#201f1f",
  "surface-container-highest": "#262626",
  "surface-bright": "#2c2c2c",
  primary: "#83aeff",
  "primary-container": "#6ba0ff",
  "primary-fixed-dim": "#5392fb",
  "on-primary": "#002d64",
  secondary: "#f8a010",
  "on-secondary": "#4a2c00",
  tertiary: "#c5ffc9",
  "on-surface": "#ffffff",
  "on-surface-variant": "#adaaaa",
  "outline-variant": "#484847",
  outline: "#767575",
};

export default function DealForge() {
  const [count, setCount] = useState(12542);

  useEffect(() => {
    let start = 0;
    const end = 12542;
    const duration = 1800;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif", background: "#0e0e0e", color: "#ffffff", minHeight: "100vh" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .glass-panel {
          background: rgba(38,38,38,0.6);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }
        .hero-glow {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 600px; height: 600px;
          background: rgba(131,174,255,0.08);
          border-radius: 9999px;
          filter: blur(120px);
          z-index: 0;
          pointer-events: none;
        }
        .hero-glow-secondary {
          position: absolute;
          top: 25%; right: 0;
          width: 400px; height: 400px;
          background: rgba(248,160,16,0.04);
          border-radius: 9999px;
          filter: blur(100px);
          z-index: 0;
          pointer-events: none;
        }
        .step-card {
          background: #131313;
          border-radius: 1rem;
          padding: 2.5rem;
          transition: transform 0.3s ease;
        }
        .step-card:hover { transform: translateY(-8px); }
        .icon-box {
          width: 64px; height: 64px;
          border-radius: 1rem;
          display: flex; align-items: center; justify-content: center;
        }
        .featured-card {
          background: #1a1919;
          border-radius: 1rem;
          overflow: hidden;
          display: flex;
          box-shadow: 0 25px 50px -12px rgba(0,0,0,0.6);
        }
        .featured-card:hover .product-img { transform: scale(1.1); }
        .product-img { transition: transform 0.5s ease; }
        .leaderboard-card { background: #201f1f; border-radius: 1rem; padding: 2.5rem; display: flex; flex-direction: column; }
        .lb-row {
          display: flex; align-items: center; gap: 1rem;
          padding: 1rem; border-radius: 0.5rem;
        }
        .lb-row-gold { background: rgba(248,160,16,0.1); border: 1px solid rgba(248,160,16,0.2); }
        .lb-row-silver { background: #1a1919; border: 1px solid rgba(72,72,71,0.1); }
        .lb-row-bronze { background: #1a1919; border: 1px solid rgba(72,72,71,0.1); }
        .lb-badge {
          width: 40px; height: 40px; border-radius: 9999px;
          display: flex; align-items: center; justify-content: center;
          font-weight: 900; font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .start-btn {
          background: linear-gradient(135deg, #83aeff 0%, #6ba0ff 100%);
          color: #002d64;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          border: none; cursor: pointer;
          box-shadow: 0 8px 32px rgba(131,174,255,0.15);
          transition: transform 0.2s ease;
          font-size: 1rem;
        }
        .start-btn:hover { transform: scale(1.05); }
        .start-btn:active { transform: scale(0.95); }
        .outline-btn {
          background: transparent;
          color: #ffffff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          padding: 1.25rem 2.5rem;
          border-radius: 1rem;
          border: 1px solid #484847;
          cursor: pointer;
          transition: background 0.2s ease;
          font-size: 1rem;
        }
        .outline-btn:hover { background: rgba(255,255,255,0.05); }
        .primary-btn {
          background: #83aeff;
          color: #002d64;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          padding: 1rem;
          border-radius: 0.5rem;
          border: none; cursor: pointer;
          transition: filter 0.2s ease;
          width: 100%;
          font-size: 1rem;
        }
        .primary-btn:hover { filter: brightness(1.1); }
        nav a { text-decoration: none; }
        .nav-active { border-bottom: 2px solid #83aeff; padding-bottom: 4px; }
        @media (max-width: 768px) {
          .featured-card { flex-direction: column; }
          .product-half { width: 100%; height: 256px; }
          .nav-links { display: none; }
          .bento-grid { grid-template-columns: 1fr; }
          .hero-title { font-size: 3.5rem; }
          .steps-grid { grid-template-columns: 1fr; }
        }
        @media (min-width: 769px) {
          .product-half { width: 50%; }
          .hero-title { font-size: 5rem; }
          .steps-grid { grid-template-columns: repeat(3, 1fr); }
          .bento-grid { grid-template-columns: 7fr 5fr; }
        }
        @media (min-width: 1024px) {
          .hero-title { font-size: 6rem; }
        }
      `}</style>


      <main style={{ paddingTop: 80 }}>

        {/* Hero Section */}
        <section style={{
          position: "relative", minHeight: "921px",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          padding: "0 1.5rem", overflow: "hidden"
        }}>
          <div className="hero-glow" />
          <div className="hero-glow-secondary" />

          <div style={{ maxWidth: "56rem", textAlign: "center", position: "relative", zIndex: 1 }}>
            <h1 className="font-headline hero-title" style={{
              fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05,
              color: "#ffffff", marginBottom: "2rem"
            }}>
              Negotiate. <br />
              <span style={{
                background: "linear-gradient(90deg, #83aeff, #6ba0ff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}>Outsmart.</span>{" "}Win.
            </h1>

            <p className="font-body" style={{
              fontSize: "1.25rem", color: "#adaaaa", maxWidth: "42rem",
              margin: "0 auto 2.5rem", lineHeight: 1.7
            }}>
              Go head-to-head with an AI seller and get the best deal possible. Master the art of the deal in our high-stakes playground.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
              <button className="start-btn">Start Negotiating</button>
              <button className="outline-btn">View Leaderboard</button>
            </div>
          </div>

          {/* Counter */}
          <div className="glass-panel" style={{
            marginTop: "6rem", border: "1px solid rgba(72,72,71,0.15)",
            padding: "1.5rem 3rem", borderRadius: "1.25rem",
            display: "flex", flexDirection: "column", alignItems: "center",
            position: "relative", zIndex: 1
          }}>
            <span className="font-label" style={{
              fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.15em",
              color: "#83aeff", textTransform: "uppercase", marginBottom: "0.5rem"
            }}>Platform Activity</span>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
              <span className="font-headline" style={{ fontSize: "2.5rem", fontWeight: 900, color: "#fff" }}>
                Total Deals Closed:
              </span>
              <span className="font-headline" style={{ fontSize: "2.5rem", fontWeight: 900, color: "#f8a010" }}>
                {count.toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section style={{ padding: "8rem 1.5rem", maxWidth: "1280px", margin: "0 auto" }}>
          <div className="steps-grid" style={{ display: "grid", gap: "2rem" }}>
            {/* Step 1 */}
            <div className="step-card">
              <div className="icon-box" style={{ background: "rgba(131,174,255,0.1)", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🛒</span>
              </div>
              <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
                Pick a Product
              </h3>
              <p className="font-body" style={{ color: "#adaaaa", lineHeight: 1.7 }}>
                Browse our curated collection of luxury items and high-tech gadgets waiting for your offer.
              </p>
            </div>
            {/* Step 2 */}
            <div className="step-card">
              <div className="icon-box" style={{ background: "rgba(197,255,201,0.1)", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>🧠</span>
              </div>
              <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
                Negotiate with AI
              </h3>
              <p className="font-body" style={{ color: "#adaaaa", lineHeight: 1.7 }}>
                Engage with our advanced neural negotiator. Use logic, pressure, or charm to lower the price.
              </p>
            </div>
            {/* Step 3 */}
            <div className="step-card">
              <div className="icon-box" style={{ background: "rgba(248,160,16,0.1)", marginBottom: "1.5rem" }}>
                <span style={{ fontSize: "2rem" }}>📊</span>
              </div>
              <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: "1rem" }}>
                Climb the Leaderboard
              </h3>
              <p className="font-body" style={{ color: "#adaaaa", lineHeight: 1.7 }}>
                Save the most money to earn Forge Gold and cement your status as a legendary dealer.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid */}
        <section style={{ paddingBottom: "8rem", padding: "0 1.5rem 8rem", maxWidth: "1280px", margin: "0 auto" }}>
          <div className="bento-grid" style={{ display: "grid", gap: "2rem" }}>

            {/* Featured Product Card */}
            <div className="featured-card" style={{ flexDirection: "row" }}>
              <div className="product-half" style={{ overflow: "hidden", minHeight: "260px" }}>
                {/* Stylized headphones placeholder */}
                <div style={{
                  width: "100%", height: "100%", minHeight: 260,
                  background: "linear-gradient(135deg, #1a1919 0%, #0e0e0e 60%, #131313 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  position: "relative", overflow: "hidden"
                }} className="product-img">
                  {/* Cyan glow effect */}
                  <div style={{
                    position: "absolute", width: 200, height: 200,
                    background: "rgba(91,240,131,0.08)", borderRadius: "50%",
                    filter: "blur(60px)", top: "50%", left: "50%",
                    transform: "translate(-50%,-50%)"
                  }} />
                  {/* Headphone SVG */}
                  <svg viewBox="0 0 140 120" width="180" height="160" style={{ position: "relative", zIndex: 1 }}>
                    <ellipse cx="70" cy="50" rx="42" ry="42" fill="none" stroke="#2c2c2c" strokeWidth="18" />
                    <ellipse cx="70" cy="50" rx="42" ry="42" fill="none" stroke="#3a3a3a" strokeWidth="16" strokeDasharray="200 300" strokeDashoffset="-60" />
                    {/* Left cup */}
                    <rect x="16" y="68" width="22" height="36" rx="10" fill="#262626" stroke="#3a3a3a" strokeWidth="1.5" />
                    <rect x="20" y="72" width="14" height="28" rx="7" fill="#1a1919" />
                    {/* Right cup */}
                    <rect x="102" y="68" width="22" height="36" rx="10" fill="#262626" stroke="#3a3a3a" strokeWidth="1.5" />
                    <rect x="106" y="72" width="14" height="28" rx="7" fill="#1a1919" />
                    {/* Accent lines */}
                    <line x1="28" y1="88" x2="28" y2="96" stroke="#5bf083" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                    <line x1="112" y1="88" x2="112" y2="96" stroke="#5bf083" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
                  </svg>
                </div>
              </div>
              <div className="product-half" style={{ padding: "2.5rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                <div>
                  <span style={{
                    fontSize: "0.7rem", fontWeight: 700, color: "#c5ffc9",
                    textTransform: "uppercase", letterSpacing: "0.15em",
                    fontFamily: "'Inter', sans-serif"
                  }}>Featured Negotiable</span>
                  <h2 className="font-headline" style={{
                    fontSize: "2.25rem", fontWeight: 800, color: "#fff",
                    margin: "1rem 0 0.75rem", lineHeight: 1.1
                  }}>Sleek Headphones</h2>
                  <p style={{ color: "#adaaaa", lineHeight: 1.6 }}>
                    Noise-cancelling, 40h battery life, and a very stubborn AI seller.
                  </p>
                </div>
                <div style={{ marginTop: "2rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
                    <span style={{ color: "#adaaaa", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>List Price</span>
                    <span className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", opacity: 0.5, textDecoration: "line-through" }}>$200</span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
                    <span style={{ color: "#adaaaa", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Target Deal</span>
                    <span className="font-headline" style={{ fontSize: "1.75rem", fontWeight: 900, color: "#83aeff" }}>$145</span>
                  </div>
                  <button className="primary-btn">Start Bid</button>
                </div>
              </div>
            </div>

            {/* Leaderboard Card */}
            <div className="leaderboard-card">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
                <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>Top Negotiators</h3>
                <span style={{ fontSize: "1.5rem" }}>🏆</span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", flexGrow: 1 }}>
                {/* Gold */}
                <div className="lb-row lb-row-gold">
                  <div className="lb-badge" style={{ background: "#f8a010", color: "#4a2c00" }}>1</div>
                  <div style={{ flexGrow: 1 }}>
                    <p className="font-headline" style={{ fontWeight: 700, color: "#fff" }}>Alex_Vortex</p>
                    <p style={{ fontSize: "0.7rem", color: "#adaaaa", textTransform: "uppercase", letterSpacing: "0.1em" }}>Saved $12,450</p>
                  </div>
                  <span style={{ color: "#f8a010", fontSize: "1.25rem" }}>⭐</span>
                </div>

                {/* Silver */}
                <div className="lb-row lb-row-silver">
                  <div className="lb-badge" style={{ background: "rgba(173,170,170,0.2)", color: "#fff" }}>2</div>
                  <div style={{ flexGrow: 1 }}>
                    <p className="font-headline" style={{ fontWeight: 700, color: "#fff" }}>NegotiatorPro</p>
                    <p style={{ fontSize: "0.7rem", color: "#adaaaa", textTransform: "uppercase", letterSpacing: "0.1em" }}>Saved $11,200</p>
                  </div>
                </div>

                {/* Bronze */}
                <div className="lb-row lb-row-bronze">
                  <div className="lb-badge" style={{ background: "rgba(205,127,50,0.2)", color: "#cd7f32" }}>3</div>
                  <div style={{ flexGrow: 1 }}>
                    <p className="font-headline" style={{ fontWeight: 700, color: "#fff" }}>DealMaker_X</p>
                    <p style={{ fontSize: "0.7rem", color: "#adaaaa", textTransform: "uppercase", letterSpacing: "0.1em" }}>Saved $9,800</p>
                  </div>
                </div>
              </div>

              <button style={{
                marginTop: "2rem", background: "none", border: "none",
                color: "#83aeff", fontWeight: 700, fontSize: "0.8rem",
                textTransform: "uppercase", letterSpacing: "0.1em",
                cursor: "pointer", display: "flex", alignItems: "center",
                alignSelf: "center", gap: "0.5rem", transition: "color 0.2s",
                fontFamily: "'Inter', sans-serif"
              }}
                onMouseOver={e => e.currentTarget.style.color = "#fff"}
                onMouseOut={e => e.currentTarget.style.color = "#83aeff"}>
                See Full Leaderboard →
              </button>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0e0e0e", width: "100%", padding: "3rem 1rem",
        borderTop: "1px solid rgba(72,72,71,0.15)"
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
          <span className="font-headline" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>DealForge</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Twitter", "Discord", "LinkedIn"].map(link => (
              <a key={link} href="#" className="font-body" style={{
                color: "#adaaaa", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s"
              }}
                onMouseOver={e => e.target.style.color = "#c5ffc9"}
                onMouseOut={e => e.target.style.color = "#adaaaa"}>{link}</a>
            ))}
          </div>
          <p className="font-body" style={{ color: "#adaaaa", fontSize: "0.875rem", lineHeight: 1.6, maxWidth: "28rem" }}>
            © 2024 DealForge. The AI never gives up easily. Can you?
          </p>
        </div>
      </footer>
    </div>
  );
}