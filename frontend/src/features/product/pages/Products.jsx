import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Modern Headphones",
    listPrice: 299,
    bestDeal: 140,
    saved: 30,
    badge: { label: "TRENDING", color: "#6bff8f", textColor: "#004a1d", icon: "⚡" },
    emoji: "🎧",
    gradientFrom: "#0a1628",
    gradientTo: "#0d2040",
    accentColor: "#4af0ff",
    svgType: "headphones",
  },
  {
    id: 2,
    name: "Minimalist Watch",
    listPrice: 450,
    bestDeal: 315,
    saved: 30,
    badge: null,
    emoji: "⌚",
    gradientFrom: "#141414",
    gradientTo: "#1e1e1e",
    accentColor: "#c8c8c8",
    svgType: "watch",
  },
  {
    id: 3,
    name: "Ergonomic Keyboard",
    listPrice: 189,
    bestDeal: 132,
    saved: 30,
    badge: null,
    emoji: "⌨️",
    gradientFrom: "#0a0e1a",
    gradientTo: "#111827",
    accentColor: "#5bf083",
    svgType: "keyboard",
  },
  {
    id: 4,
    name: "Cyberpunk Lamp",
    listPrice: 120,
    bestDeal: 84,
    saved: 30,
    badge: null,
    emoji: "💡",
    gradientFrom: "#1a0a2e",
    gradientTo: "#0d0a1e",
    accentColor: "#bf5fff",
    svgType: "lamp",
  },
  {
    id: 5,
    name: "Durable Backpack",
    listPrice: 165,
    bestDeal: 115,
    saved: 30,
    badge: { label: "FORGE CHOICE", color: "#f8a010", textColor: "#4a2c00", icon: "⭐" },
    emoji: "🎒",
    gradientFrom: "#111111",
    gradientTo: "#1a1a1a",
    accentColor: "#888",
    svgType: "backpack",
  },
  {
    id: 6,
    name: "Smart Thermostat",
    listPrice: 249,
    bestDeal: 174,
    saved: 30,
    badge: null,
    emoji: "🌡️",
    gradientFrom: "#0a0e14",
    gradientTo: "#111820",
    accentColor: "#83aeff",
    svgType: "thermostat",
  },
];

function ProductIllustration({ svgType, accentColor, gradientFrom, gradientTo }) {
  const style = {
    width: "100%", height: "100%", minHeight: 220,
    background: `linear-gradient(145deg, ${gradientFrom}, ${gradientTo})`,
    display: "flex", alignItems: "center", justifyContent: "center",
    position: "relative", overflow: "hidden",
  };

  const glow = (
    <div style={{
      position: "absolute", width: 160, height: 160,
      background: accentColor + "22",
      borderRadius: "50%", filter: "blur(50px)",
      top: "50%", left: "50%", transform: "translate(-50%,-50%)",
      pointerEvents: "none",
    }} />
  );

  if (svgType === "headphones") return (
    <div style={style}>
      {glow}
      <svg viewBox="0 0 140 120" width="160" height="140" style={{ position: "relative", zIndex: 1 }}>
        <ellipse cx="70" cy="50" rx="42" ry="40" fill="none" stroke="#1e3a5f" strokeWidth="18" />
        <ellipse cx="70" cy="50" rx="42" ry="40" fill="none" stroke="#2a4a7f" strokeWidth="15" strokeDasharray="200 300" strokeDashoffset="-60" />
        <rect x="16" y="68" width="22" height="36" rx="10" fill="#1a2840" stroke="#2a3f60" strokeWidth="1.5" />
        <rect x="20" y="72" width="14" height="28" rx="7" fill="#0f1e36" />
        <rect x="102" y="68" width="22" height="36" rx="10" fill="#1a2840" stroke="#2a3f60" strokeWidth="1.5" />
        <rect x="106" y="72" width="14" height="28" rx="7" fill="#0f1e36" />
        <line x1="27" y1="82" x2="27" y2="94" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <line x1="113" y1="82" x2="113" y2="94" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <ellipse cx="27" cy="86" rx="3" ry="6" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4" />
        <ellipse cx="113" cy="86" rx="3" ry="6" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.4" />
      </svg>
    </div>
  );

  if (svgType === "watch") return (
    <div style={style}>
      {glow}
      <svg viewBox="0 0 120 150" width="130" height="160" style={{ position: "relative", zIndex: 1 }}>
        <rect x="47" y="10" width="26" height="22" rx="4" fill="#2a2a2a" />
        <rect x="47" y="118" width="26" height="22" rx="4" fill="#2a2a2a" />
        <circle cx="60" cy="75" r="42" fill="#e8e8e8" stroke="#c0c0c0" strokeWidth="4" />
        <circle cx="60" cy="75" r="36" fill="#f0f0f0" />
        <circle cx="60" cy="75" r="34" fill="white" stroke="#ddd" strokeWidth="1" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => {
          const r = a * Math.PI / 180;
          const r1 = i%3===0 ? 28 : 30;
          const r2 = i%3===0 ? 32 : 31.5;
          return <line key={a} x1={60+r1*Math.sin(r)} y1={75-r1*Math.cos(r)} x2={60+r2*Math.sin(r)} y2={75-r2*Math.cos(r)} stroke="#bbb" strokeWidth={i%3===0?2:1} />;
        })}
        <line x1="60" y1="75" x2="60" y2="51" stroke="#333" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="60" y1="75" x2="77" y2="75" stroke="#555" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="75" r="2.5" fill="#888" />
        <rect x="88" y="71" width="6" height="8" rx="2" fill="#aaa" />
      </svg>
    </div>
  );

  if (svgType === "keyboard") return (
    <div style={style}>
      {glow}
      <svg viewBox="0 0 200 120" width="200" height="130" style={{ position: "relative", zIndex: 1 }}>
        {/* Left half */}
        <rect x="8" y="30" width="82" height="64" rx="8" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5" />
        {[0,1,2,3].map(row => [0,1,2,3,4,5].map(col => (
          <rect key={`l${row}${col}`} x={14+col*13} y={36+row*14} width="10" height="10" rx="2"
            fill={Math.random()>0.7 ? accentColor+"33" : "#222"} stroke="#333" strokeWidth="0.5" />
        )))}
        {/* Right half */}
        <rect x="110" y="30" width="82" height="64" rx="8" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1.5" />
        {[0,1,2,3].map(row => [0,1,2,3,4,5].map(col => (
          <rect key={`r${row}${col}`} x={116+col*13} y={36+row*14} width="10" height="10" rx="2"
            fill={Math.random()>0.7 ? accentColor+"33" : "#222"} stroke="#333" strokeWidth="0.5" />
        )))}
        {/* Gap */}
        <line x1="96" y1="50" x2="104" y2="70" stroke="#333" strokeWidth="1" />
        {/* Glow keys */}
        <rect x="27" y="78" width="10" height="10" rx="2" fill={accentColor} opacity="0.6" />
        <rect x="123" y="78" width="10" height="10" rx="2" fill={accentColor} opacity="0.6" />
        <rect x="40" y="50" width="10" height="10" rx="2" fill={accentColor} opacity="0.4" />
        <rect x="155" y="50" width="10" height="10" rx="2" fill={accentColor} opacity="0.4" />
      </svg>
    </div>
  );

  if (svgType === "lamp") return (
    <div style={style}>
      {glow}
      <div style={{ position: "absolute", width: 100, height: 100, background: "#bf5fff33", borderRadius: "50%", filter: "blur(40px)", bottom: 20, left: "50%", transform: "translateX(-50%)" }} />
      <div style={{ position: "absolute", width: 60, height: 60, background: "#ff00ff22", borderRadius: "50%", filter: "blur(30px)", top: 30, left: "50%", transform: "translateX(-50%)" }} />
      <svg viewBox="0 0 120 140" width="140" height="160" style={{ position: "relative", zIndex: 1 }}>
        {/* Geometric lamp shape - diamond/octahedron */}
        <polygon points="60,20 90,60 60,100 30,60" fill="none" stroke="#bf5fff" strokeWidth="2" opacity="0.9" />
        <polygon points="60,20 90,60 60,100 30,60" fill="#bf5fff" opacity="0.08" />
        {/* Inner lines */}
        <line x1="60" y1="20" x2="60" y2="100" stroke="#ff00ff" strokeWidth="1" opacity="0.4" />
        <line x1="30" y1="60" x2="90" y2="60" stroke="#4444ff" strokeWidth="1" opacity="0.4" />
        {/* Corner accents */}
        <circle cx="60" cy="20" r="3" fill="#ff00ff" opacity="0.8" />
        <circle cx="90" cy="60" r="3" fill="#4444ff" opacity="0.8" />
        <circle cx="60" cy="100" r="3" fill="#bf5fff" opacity="0.8" />
        <circle cx="30" cy="60" r="3" fill="#4444ff" opacity="0.8" />
        {/* Neon light rays */}
        <line x1="60" y1="100" x2="30" y2="130" stroke="#ff00ff" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        <line x1="60" y1="100" x2="90" y2="130" stroke="#4444ff" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
        {/* Base */}
        <ellipse cx="60" cy="130" rx="18" ry="4" fill="#bf5fff" opacity="0.3" />
      </svg>
    </div>
  );

  if (svgType === "backpack") return (
    <div style={style}>
      {glow}
      <svg viewBox="0 0 120 150" width="140" height="170" style={{ position: "relative", zIndex: 1 }}>
        {/* Main body */}
        <rect x="20" y="35" width="80" height="95" rx="12" fill="#1e1e1e" stroke="#333" strokeWidth="2" />
        {/* Front pocket */}
        <rect x="28" y="80" width="64" height="42" rx="8" fill="#252525" stroke="#333" strokeWidth="1.5" />
        {/* Zipper line */}
        <path d="M28 100 Q60 94 92 100" fill="none" stroke="#444" strokeWidth="1.5" />
        <path d="M28 100 Q60 106 92 100" fill="none" stroke="#3a3a3a" strokeWidth="1" />
        {/* Zipper pull */}
        <circle cx="60" cy="100" r="3" fill="#555" />
        {/* Top handle */}
        <path d="M48 35 Q60 22 72 35" fill="none" stroke="#333" strokeWidth="5" strokeLinecap="round" />
        {/* Shoulder straps */}
        <path d="M30 50 Q18 70 22 110" fill="none" stroke="#2a2a2a" strokeWidth="8" strokeLinecap="round" />
        <path d="M90 50 Q102 70 98 110" fill="none" stroke="#2a2a2a" strokeWidth="8" strokeLinecap="round" />
        {/* Logo area */}
        <rect x="48" y="50" width="24" height="18" rx="4" fill="#2a2a2a" stroke="#383838" strokeWidth="1" />
        {/* Chest clip */}
        <rect x="35" y="78" width="50" height="4" rx="2" fill="#333" />
        {/* Side clips */}
        <rect x="18" y="90" width="6" height="12" rx="2" fill="#333" />
        <rect x="96" y="90" width="6" height="12" rx="2" fill="#333" />
      </svg>
    </div>
  );

  if (svgType === "thermostat") return (
    <div style={style}>
      {glow}
      <div style={{ position: "absolute", width: 120, height: 120, background: accentColor+"18", borderRadius: "50%", filter: "blur(40px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      <svg viewBox="0 0 140 140" width="160" height="160" style={{ position: "relative", zIndex: 1 }}>
        {/* Outer ring */}
        <circle cx="70" cy="70" r="56" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="3" />
        {/* Progress arc */}
        <circle cx="70" cy="70" r="48" fill="none" stroke={accentColor} strokeWidth="4"
          strokeDasharray="226 75" strokeDashoffset="56" strokeLinecap="round" opacity="0.7" />
        {/* Inner circle */}
        <circle cx="70" cy="70" r="38" fill="#111" />
        {/* Display text */}
        <text x="70" y="64" textAnchor="middle" fill={accentColor} fontSize="22" fontWeight="700" fontFamily="monospace">87°</text>
        <text x="70" y="82" textAnchor="middle" fill="#555" fontSize="8" fontFamily="monospace">FAHRENHEIT</text>
        {/* Tick marks */}
        {Array.from({length:20}).map((_,i) => {
          const angle = (i * 18 - 135) * Math.PI / 180;
          const r1 = 52, r2 = i%5===0 ? 44 : 47;
          return <line key={i} x1={70+r1*Math.cos(angle)} y1={70+r1*Math.sin(angle)}
            x2={70+r2*Math.cos(angle)} y2={70+r2*Math.sin(angle)}
            stroke={i<13 ? accentColor : "#333"} strokeWidth={i%5===0?2:1} opacity="0.8" />;
        })}
        {/* Center dot */}
        <circle cx="70" cy="70" r="3" fill={accentColor} opacity="0.6" />
        {/* Mounting screws */}
        <circle cx="20" cy="20" r="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <circle cx="120" cy="20" r="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <circle cx="20" cy="120" r="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
        <circle cx="120" cy="120" r="4" fill="#1a1a1a" stroke="#2a2a2a" strokeWidth="1" />
      </svg>
    </div>
  );

  return <div style={style}>{glow}</div>;
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false);
  const [btnHovered, setBtnHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "#1a1919" : "#131313",
        borderRadius: "1rem", padding: "1.5rem",
        transition: "background 0.3s ease",
        position: "relative",
      }}
    >
      {/* Image Area */}
      <div style={{
        position: "relative", aspectRatio: "1/1", marginBottom: "2rem",
        overflow: "hidden", borderRadius: "1rem",
      }}>
        <div style={{
          width: "100%", height: "100%",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 0.5s ease",
        }}>
          <ProductIllustration
            svgType={product.svgType}
            accentColor={product.accentColor}
            gradientFrom={product.gradientFrom}
            gradientTo={product.gradientTo}
          />
        </div>

        {/* Badge */}
        {product.badge && (
          <div style={{
            position: "absolute", top: 16, right: 16,
            background: product.badge.color + "e6",
            color: product.badge.textColor,
            padding: "6px 14px", borderRadius: "9999px",
            fontSize: "0.7rem", fontWeight: 700,
            display: "flex", alignItems: "center", gap: 4,
            fontFamily: "'Inter', sans-serif", letterSpacing: "0.03em",
          }}>
            <span style={{ fontSize: "0.75rem" }}>{product.badge.icon}</span>
            {product.badge.label}
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <h3 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: "1.375rem", fontWeight: 700, color: "#fff", lineHeight: 1.2,
          }}>
            {product.name}
          </h3>
          <span style={{
            color: "#adaaaa", textDecoration: "line-through", fontSize: "0.875rem",
            fontFamily: "'Inter', sans-serif", whiteSpace: "nowrap", marginLeft: 8,
          }}>
            ${product.listPrice}
          </span>
        </div>

        {/* Deal badge */}
        <div style={{
          background: "rgba(131,174,255,0.1)",
          border: "1px solid rgba(131,174,255,0.2)",
          color: "#83aeff",
          padding: "8px 14px", borderRadius: "0.5rem",
          fontWeight: 700, fontSize: "0.85rem",
          fontFamily: "'Inter', sans-serif",
          display: "inline-flex", alignItems: "center", gap: 4,
        }}>
          Your Best Deal: ${product.bestDeal}
          <span style={{ fontSize: "0.65rem", opacity: 0.7, marginLeft: 4 }}>
            (Saved {product.saved}%)
          </span>
        </div>

        {/* CTA Button */}
        <button
          onMouseEnter={() => setBtnHovered(true)}
          onMouseLeave={() => setBtnHovered(false)}
          style={{
            width: "100%", padding: "1rem",
            background: "linear-gradient(135deg, #83aeff 0%, #6ba0ff 100%)",
            color: "#000000",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700, fontSize: "0.95rem",
            letterSpacing: "-0.02em",
            border: "none", borderRadius: "0.5rem",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
            transform: btnHovered ? "scale(1.02)" : "scale(1)",
            boxShadow: btnHovered ? "0px 8px 32px rgba(131,174,255,0.3)" : "none",
            transition: "all 0.2s ease",
          }}
        >
          Negotiate Now
          <span style={{ fontSize: "1rem" }}>↗</span>
        </button>
      </div>
    </article>
  );
}

export default function DealForgeProducts() {
  const [activeTab, setActiveTab] = useState("all");
  const [scanHovered, setScanHovered] = useState(false);

  return (
    <div style={{
      fontFamily: "'Inter', sans-serif",
      background: "#0e0e0e", color: "#ffffff", minHeight: "100vh",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .product-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2.5rem;
        }
        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .product-grid { grid-template-columns: 1fr; }
          .nav-links { display: none !important; }
          .header-row { flex-direction: column !important; }
        }
      `}</style>

      {/* Navbar */}
      {/* <nav style={{
        position: "fixed", top: 0, width: "100%", zIndex: 50,
        background: "rgba(14,14,14,0.6)", backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 2rem", height: 80, maxWidth: 1280, margin: "0 auto",
        }}>
          <div style={{
            fontSize: "1.5rem", fontWeight: 900, letterSpacing: "-0.05em",
            color: "#fff", fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>
            DealForge
          </div>

          <div className="nav-links" style={{ display: "flex", gap: "2rem", fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700 }}>
            {["Home", "Products", "Leaderboard"].map(item => (
              <a key={item} href="#" style={{
                color: item === "Products" ? "#fff" : "#adaaaa",
                textDecoration: "none",
                borderBottom: item === "Products" ? "2px solid #83aeff" : "none",
                paddingBottom: item === "Products" ? 4 : 0,
                transition: "color 0.2s",
              }}
                onMouseOver={e => { if (item !== "Products") e.target.style.color = "#fff"; }}
                onMouseOut={e => { if (item !== "Products") e.target.style.color = "#adaaaa"; }}>
                {item}
              </a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button style={{ background: "none", border: "none", color: "#adaaaa", cursor: "pointer", fontSize: "1.2rem" }}>🔍</button>
            <div style={{
              width: 40, height: 40, borderRadius: "9999px",
              background: "linear-gradient(135deg,#5392fb,#83aeff)",
              display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid rgba(72,72,71,0.3)",
              color: "#002d64", fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: "pointer",
            }}>U</div>
          </div>
        </div>
      </nav> */}

      {/* Main */}
      <main style={{ paddingTop: 128, paddingBottom: 80, padding: "128px 1.5rem 80px", maxWidth: 1280, margin: "0 auto" }}>

        {/* Header */}
        <header style={{ marginBottom: "4rem" }}>
          <div className="header-row" style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "1.5rem", flexWrap: "wrap" }}>
            <div>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem", textTransform: "uppercase",
                letterSpacing: "0.2em", color: "#83aeff",
                display: "block", marginBottom: "0.75rem", fontWeight: 600,
              }}>Marketplace</span>
              <h1 style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                fontWeight: 800, letterSpacing: "-0.04em",
                color: "#fff", lineHeight: 1.05,
              }}>
                Active{" "}
                <span style={{
                  background: "linear-gradient(90deg, #83aeff, #6ba0ff)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>Forge</span>
                {" "}Deals
              </h1>
            </div>

            {/* Filter Tabs */}
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              background: "#131313", padding: "0.5rem",
              borderRadius: "9999px", border: "1px solid rgba(72,72,71,0.1)",
            }}>
              {[["all", "All Items"], ["negotiating", "Negotiating"]].map(([key, label]) => (
                <button key={key} onClick={() => setActiveTab(key)} style={{
                  padding: "0.5rem 1.5rem", borderRadius: "9999px",
                  background: activeTab === key ? "#201f1f" : "transparent",
                  color: activeTab === key ? "#fff" : "#adaaaa",
                  border: "none", cursor: "pointer",
                  fontSize: "0.875rem", fontWeight: 600,
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s",
                }}
                  onMouseOver={e => { if (activeTab !== key) e.currentTarget.style.color = "#fff"; }}
                  onMouseOut={e => { if (activeTab !== key) e.currentTarget.style.color = "#adaaaa"; }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Product Grid */}
        <div className="product-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div style={{ marginTop: "5rem", display: "flex", justifyContent: "center" }}>
          <button
            onMouseEnter={() => setScanHovered(true)}
            onMouseLeave={() => setScanHovered(false)}
            style={{
              padding: "1rem 2rem",
              borderRadius: "9999px",
              border: `1px solid ${scanHovered ? "rgba(131,174,255,0.5)" : "rgba(72,72,71,0.2)"}`,
              background: scanHovered ? "#131313" : "transparent",
              color: "#fff", fontWeight: 700,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              cursor: "pointer",
              display: "flex", alignItems: "center", gap: "0.75rem",
              transition: "all 0.3s ease",
              fontSize: "0.95rem",
            }}
          >
            Scan More Inventory
            <span style={{
              display: "inline-block",
              transform: scanHovered ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.5s ease",
              fontSize: "1.1rem",
            }}>↻</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0e0e0e", width: "100%", padding: "3rem 1rem",
        borderTop: "1px solid rgba(72,72,71,0.15)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
          <span style={{
            fontSize: "1.25rem", fontWeight: 700, color: "#fff",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>DealForge</span>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Twitter", "Discord", "LinkedIn"].map(link => (
              <a key={link} href="#" style={{
                color: "#adaaaa", fontSize: "0.875rem",
                textDecoration: "none", transition: "color 0.2s",
                fontFamily: "'Inter', sans-serif",
              }}
                onMouseOver={e => e.target.style.color = "#c5ffc9"}
                onMouseOut={e => e.target.style.color = "#adaaaa"}>
                {link}
              </a>
            ))}
          </div>
          <p style={{
            color: "#adaaaa", fontSize: "0.875rem",
            lineHeight: 1.6, maxWidth: "20rem",
            fontFamily: "'Inter', sans-serif",
          }}>
            © 2024 DealForge. The AI never gives up easily. Can you?
          </p>
        </div>
      </footer>
    </div>
  );
}