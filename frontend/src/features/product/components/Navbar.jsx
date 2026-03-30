import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 50,
        background: "rgba(14,14,14,0.6)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          height: "80px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <div
          className="font-headline"
          style={{
            fontSize: "1.5rem",
            fontWeight: 900,
            letterSpacing: "-0.05em",
            color: "#fff",
          }}
        >
          DealForge
        </div>

        <div
          className="nav-links font-headline"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
            fontWeight: 700,
          }}
        >
          <NavLink
            to="/"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#adaaaa",
              borderBottom: isActive ? "2px solid #83aeff" : "none",
              paddingBottom: isActive ? "4px" : "0px",
            })}
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#adaaaa",
              borderBottom: isActive ? "2px solid #83aeff" : "none",
              paddingBottom: isActive ? "4px" : "0px",
            })}
          >
          Products
          </NavLink>

          <NavLink
            to="/leaderboard"
            style={({ isActive }) => ({
              color: isActive ? "#fff" : "#adaaaa",
              borderBottom: isActive ? "2px solid #83aeff" : "none",
              paddingBottom: isActive ? "4px" : "0px",
            })}
          >
            Leaderboard
          </NavLink>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "9999px",
              overflow: "hidden",
              border: "1px solid rgba(72,72,71,0.3)",
              cursor: "pointer",
              transition: "transform 0.2s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                background: "linear-gradient(135deg,#5392fb,#83aeff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#002d64",
                fontWeight: 900,
                fontSize: "0.9rem",
              }}
            >
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
