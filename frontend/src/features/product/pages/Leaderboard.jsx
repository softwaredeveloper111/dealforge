import { useState } from "react";

const tableRows = [
  {
    rank: 4,
    initial: "A",
    color: "#83aeff",
    bg: "rgba(131,174,255,0.15)",
    name: "AlphaNegotiator",
    item: "RTX 5090 Prototype",
    original: 2499,
    final: 1624,
    pct: 35,
    label: "Great",
    badgeBg: "rgba(197,255,201,0.1)",
    badgeColor: "#c5ffc9",
  },
  {
    rank: 5,
    initial: "Y",
    color: "#002d64",
    bg: "#83aeff",
    name: "You (Negotiator_X)",
    item: "Carbon Aero Frame",
    original: 4200,
    final: 2940,
    pct: 30,
    label: "Great",
    badgeBg: "rgba(197,255,201,0.1)",
    badgeColor: "#c5ffc9",
    isUser: true,
  },
  {
    rank: 6,
    initial: "M",
    color: "#f8a010",
    bg: "rgba(248,160,16,0.15)",
    name: "MarketMage",
    item: "Studio Monitor Set",
    original: 1200,
    final: 960,
    pct: 20,
    label: "Okay",
    badgeBg: "rgba(248,160,16,0.1)",
    badgeColor: "#f8a010",
  },
  {
    rank: 7,
    initial: "B",
    color: "#ff716c",
    bg: "rgba(255,113,108,0.15)",
    name: "BarterBot",
    item: "Mechanical Keyboard",
    original: 350,
    final: 315,
    pct: 10,
    label: "Poor",
    badgeBg: "rgba(255,113,108,0.1)",
    badgeColor: "#ff716c",
  },
];

export default function DealForgeLeaderboard() {
  const [hoveredRow, setHoveredRow] = useState(null);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#0e0e0e", color: "#fff", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800;900&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .font-headline { font-family: 'Plus Jakarta Sans', sans-serif; }

        .podium-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          align-items: end;
          margin-bottom: 6rem;
        }

        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes glow-pulse { 0%,100%{box-shadow:0 0 30px rgba(248,160,16,0.4)} 50%{box-shadow:0 0 60px rgba(248,160,16,0.7)} }
        @keyframes shimmer { 0%{opacity:0.6} 50%{opacity:1} 100%{opacity:0.6} }

        .trophy-float { animation: float 3s ease-in-out infinite; }
        .gold-glow { animation: glow-pulse 2.5s ease-in-out infinite; }

        .podium-silver { transition: transform 0.3s ease; }
        .podium-silver:hover { transform: scale(1.02); }
        .podium-gold { transition: transform 0.3s ease; }
        .podium-gold:hover { transform: scale(1.05); }
        .podium-bronze { transition: transform 0.3s ease; }
        .podium-bronze:hover { transform: scale(1.02); }

        .table-row { transition: background 0.2s ease; }
        .table-row:hover { background: #201f1f !important; }

        .forge-btn {
          background: linear-gradient(90deg, #83aeff, #6ba0ff);
          color: #002d64;
          font-family: 'Plus Jakarta Sans', sans-serif;
          font-weight: 700;
          padding: 1rem 2.5rem;
          border-radius: 0.5rem;
          border: none; cursor: pointer;
          box-shadow: 0 8px 32px rgba(131,174,255,0.25);
          transition: transform 0.2s ease;
          font-size: 1rem;
          letter-spacing: -0.02em;
        }
        .forge-btn:hover { transform: scale(1.05); }
        .forge-btn:active { transform: scale(0.95); }

        @media (max-width: 768px) {
          .podium-grid { grid-template-columns: 1fr; }
          .nav-links { display: none !important; }
          .table-scroll { overflow-x: auto; }
          h1.hall { font-size: 3.5rem !important; }
        }
      `}</style>

     

      {/* Main */}
      <main style={{ paddingTop: 128, paddingBottom: 96, padding: "128px 1.5rem 96px", maxWidth: 1280, margin: "0 auto" }}>

        {/* Hero */}
        <header style={{ textAlign: "center", marginBottom: "5rem" }}>
          {/* Trophy box */}
          <div className="trophy-float" style={{ display: "inline-block", marginBottom: "1.5rem" }}>
            <div style={{
              padding: "1.5rem", borderRadius: "1rem",
              background: "#1a1919",
              boxShadow: "0 8px 32px rgba(248,160,16,0.15)",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ fontSize: "4.5rem", lineHeight: 1 }}>🏆</span>
            </div>
          </div>

          <h1 className="font-headline hall" style={{
            fontSize: "clamp(3.5rem, 8vw, 6rem)",
            fontWeight: 800, letterSpacing: "-0.04em",
            color: "#fff", marginBottom: "1rem", lineHeight: 1,
          }}>
            Hall of Fame
          </h1>
          <p style={{ color: "#adaaaa", fontSize: "1.2rem", maxWidth: "36rem", margin: "0 auto", lineHeight: 1.6 }}>
            The master negotiators who bent the AI to their will. Will you be the next legend?
          </p>
        </header>

        {/* Podium */}
        <section className="podium-grid">

          {/* Silver — 2nd */}
          <div className="podium-silver" style={{ display: "flex", flexDirection: "column", alignItems: "center", order: 1 }}>
            <div style={{
              background: "#131313", padding: "2rem", borderRadius: "1rem",
              width: "100%", textAlign: "center",
              borderTop: "4px solid rgba(118,117,117,0.3)",
              position: "relative", overflow: "hidden",
            }}>
              {/* Background icon */}
              <div style={{ position: "absolute", right: -16, top: -16, opacity: 0.1, fontSize: "8rem", pointerEvents: "none" }}>⭐</div>

              {/* Avatar */}
              <div style={{
                width: 80, height: 80, borderRadius: "9999px",
                background: "linear-gradient(135deg, #767575, #201f1f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.75rem", fontWeight: 700, color: "#fff",
                margin: "0 auto 1rem",
                border: "4px solid rgba(118,117,117,0.2)",
              }}>S</div>

              {/* Medal */}
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#767575" }}>🥈</div>

              <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>NeonGhost</h3>
              <p style={{ color: "#adaaaa", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem" }}>
                Silver Negotiator
              </p>
              <div style={{
                background: "#201f1f", borderRadius: "0.5rem", padding: "1rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#adaaaa", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>AVG. DISCOUNT</span>
                <span className="font-headline" style={{ color: "#c5ffc9", fontWeight: 700 }}>42%</span>
              </div>
            </div>
          </div>

          {/* Gold — 1st */}
          <div className="podium-gold" style={{ display: "flex", flexDirection: "column", alignItems: "center", order: 0 }}>
            <div className="gold-glow" style={{
              background: "#1a1919", padding: "2.5rem", borderRadius: "1rem",
              width: "100%", textAlign: "center",
              borderTop: "8px solid #f8a010",
              position: "relative", overflow: "hidden",
            }}>
              {/* Big bg icon */}
              <div style={{ position: "absolute", right: -16, top: -16, opacity: 0.2, fontSize: "12rem", color: "#f8a010", pointerEvents: "none", lineHeight: 1 }}>🎖</div>

              {/* Avatar */}
              <div style={{
                width: 112, height: 112, borderRadius: "9999px",
                background: "linear-gradient(135deg, #f8a010, #855300)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "2.5rem", fontWeight: 700, color: "#fff",
                margin: "0 auto 1.5rem",
                border: "4px solid rgba(248,160,16,0.3)",
                boxShadow: "0 0 30px rgba(248,160,16,0.4)",
              }}>K</div>

              {/* Medal */}
              <div style={{ fontSize: "3rem", marginBottom: "0.5rem", color: "#f8a010" }}>🏅</div>

              <h3 className="font-headline" style={{ fontSize: "2.5rem", fontWeight: 800, color: "#fff", marginBottom: 4, letterSpacing: "-0.03em" }}>
                KinetiX
              </h3>
              <p style={{ color: "#f8a010", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", fontWeight: 700, marginBottom: "1.5rem" }}>
                The Forge Master
              </p>
              <div style={{
                background: "rgba(248,160,16,0.1)", border: "1px solid rgba(248,160,16,0.2)",
                borderRadius: "0.5rem", padding: "1.5rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#ffb554", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>RECORD DEAL</span>
                <span className="font-headline" style={{ color: "#f8a010", fontSize: "2rem", fontWeight: 900 }}>68% OFF</span>
              </div>
            </div>
          </div>

          {/* Bronze — 3rd */}
          <div className="podium-bronze" style={{ display: "flex", flexDirection: "column", alignItems: "center", order: 2 }}>
            <div style={{
              background: "#131313", padding: "2rem", borderRadius: "1rem",
              width: "100%", textAlign: "center",
              borderTop: "4px solid rgba(114,71,0,0.3)",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", right: -16, top: -16, opacity: 0.1, fontSize: "8rem", pointerEvents: "none" }}>🎗</div>

              <div style={{
                width: 80, height: 80, borderRadius: "9999px",
                background: "linear-gradient(135deg, #724700, #201f1f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.75rem", fontWeight: 700, color: "#fff",
                margin: "0 auto 1rem",
                border: "4px solid rgba(114,71,0,0.2)",
              }}>D</div>

              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem", color: "#724700" }}>🥉</div>

              <h3 className="font-headline" style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff", marginBottom: 4 }}>DealDiver</h3>
              <p style={{ color: "#adaaaa", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "1rem" }}>
                Bronze Negotiator
              </p>
              <div style={{
                background: "#201f1f", borderRadius: "0.5rem", padding: "1rem",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}>
                <span style={{ color: "#adaaaa", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>AVG. DISCOUNT</span>
                <span className="font-headline" style={{ color: "#c5ffc9", fontWeight: 700 }}>35%</span>
              </div>
            </div>
          </div>
        </section>

        {/* Table */}
        <section style={{ background: "#131313", borderRadius: "1rem", padding: 4, overflow: "hidden" }}>
          <div className="table-scroll" style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(72,72,71,0.1)" }}>
                  {["Rank", "Negotiator", "Item Secured", "Original", "Final Price", "Efficiency"].map((col, i) => (
                    <th key={col} style={{
                      padding: "1.5rem 2rem",
                      color: "#adaaaa", fontSize: "0.65rem",
                      textTransform: "uppercase", letterSpacing: "0.15em",
                      fontWeight: 600, fontFamily: "'Inter', sans-serif",
                      textAlign: i >= 3 && i < 5 ? "right" : i === 5 ? "center" : "left",
                    }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.map((row) => (
                  <tr
                    key={row.rank}
                    className="table-row"
                    onMouseEnter={() => setHoveredRow(row.rank)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: row.isUser
                        ? "rgba(131,174,255,0.08)"
                        : hoveredRow === row.rank ? "#201f1f" : "transparent",
                      borderLeft: row.isUser ? "4px solid #83aeff" : "4px solid transparent",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {/* Rank */}
                    <td style={{ padding: "1.5rem 2rem" }}>
                      <span className="font-headline" style={{
                        fontSize: "1.1rem", fontWeight: 700,
                        color: row.isUser ? "#83aeff" : "#fff",
                      }}>#{row.rank}</span>
                    </td>

                    {/* Negotiator */}
                    <td style={{ padding: "1.5rem 2rem" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          width: 40, height: 40, borderRadius: "9999px",
                          background: row.bg,
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontWeight: 700, color: row.color, fontSize: "0.9rem",
                          flexShrink: 0,
                        }}>{row.initial}</div>
                        <span style={{
                          color: "#fff", fontWeight: row.isUser ? 700 : 600,
                          fontSize: "0.9rem",
                        }}>{row.name}</span>
                      </div>
                    </td>

                    {/* Item */}
                    <td style={{ padding: "1.5rem 2rem", color: "#adaaaa", fontSize: "0.875rem" }}>
                      {row.item}
                    </td>

                    {/* Original */}
                    <td style={{ padding: "1.5rem 2rem", textAlign: "right", color: "#adaaaa", fontSize: "0.875rem", textDecoration: "line-through" }}>
                      ${row.original.toLocaleString()}
                    </td>

                    {/* Final Price */}
                    <td style={{ padding: "1.5rem 2rem", textAlign: "right" }}>
                      <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.95rem" }}>
                        ${row.final.toLocaleString()}
                      </span>
                    </td>

                    {/* Efficiency Badge */}
                    <td style={{ padding: "1.5rem 2rem", textAlign: "center" }}>
                      <span style={{
                        display: "inline-flex", alignItems: "center",
                        padding: "6px 14px", borderRadius: "9999px",
                        background: row.badgeBg, color: row.badgeColor,
                        fontSize: "0.7rem", fontWeight: 700,
                        textTransform: "uppercase", letterSpacing: "0.05em",
                        whiteSpace: "nowrap",
                      }}>
                        {row.pct}% {row.label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Empty State */}
        <section style={{ marginTop: "8rem", borderTop: "1px solid rgba(72,72,71,0.15)", paddingTop: "5rem" }}>
          <div style={{
            textAlign: "center",
            background: "#131313",
            borderRadius: "1rem",
            padding: "5rem 1.5rem",
            maxWidth: "56rem", margin: "0 auto",
            border: "2px dashed rgba(72,72,71,0.2)",
          }}>
            <div style={{ fontSize: "4.5rem", marginBottom: "1.5rem", opacity: 0.5 }}>😔</div>
            <h2 className="font-headline" style={{ fontSize: "2rem", fontWeight: 700, color: "#fff", marginBottom: 8 }}>
              No deals yet
            </h2>
            <p style={{ color: "#adaaaa", marginBottom: "2rem", lineHeight: 1.6 }}>
              The arena is empty. Start a negotiation to carve your name into the Forge records.
            </p>
            <button className="forge-btn">Forge New Deal</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{
        background: "#0e0e0e", width: "100%", padding: "3rem 1rem",
        borderTop: "1px solid rgba(72,72,71,0.15)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "1.5rem" }}>
          <span className="font-headline" style={{ fontSize: "1.25rem", fontWeight: 700, color: "#fff" }}>DealForge</span>
          <p style={{ color: "#adaaaa", fontSize: "0.875rem", lineHeight: 1.6 }}>
            © 2024 DealForge. The AI never gives up easily. Can you?
          </p>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            {["Twitter", "Discord", "LinkedIn"].map(link => (
              <a key={link} href="#" style={{
                color: "#adaaaa", fontSize: "0.875rem", textDecoration: "none", transition: "color 0.2s",
              }}
                onMouseOver={e => e.target.style.color = "#c5ffc9"}
                onMouseOut={e => e.target.style.color = "#adaaaa"}>{link}</a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}