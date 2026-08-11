import Link from "next/link";

export default function NotFound() {
  return (
    <main
      id="main"
      style={{
        minHeight: "100dvh",
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        padding: "5rem 0",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "clamp(200px, 30vw, 400px)",
          height: "clamp(200px, 30vw, 400px)",
          opacity: 0.14,
          pointerEvents: "none",
        }}
        className="checker-big"
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: "clamp(200px, 26vw, 360px)",
          height: "clamp(200px, 26vw, 360px)",
          opacity: 0.3,
          pointerEvents: "none",
        }}
        className="stripes-diag"
      />

      <div className="container-custom" style={{ width: "100%", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          className="stamp"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "var(--red-dim)",
            border: "1px solid var(--border-red)",
            padding: "0.4rem 1rem",
            fontSize: "0.72rem",
            fontFamily: 'var(--font-ui)',
            color: "#fca5a5",
            fontWeight: 700,
            letterSpacing: "0.12em",
            marginBottom: "1.5rem",
            textTransform: "uppercase",
            transform: "rotate(-2deg)",
          }}
        >
          <span style={{ width: "7px", height: "7px", background: "#ef4444", boxShadow: "0 0 8px #ef4444", display: "block" }} />
          Red flag
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-orbitron), sans-serif',
            fontSize: "clamp(5rem, 20vw, 12rem)",
            fontWeight: 900,
            lineHeight: 0.85,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ display: "block", color: "var(--red)" }}>DNF</span>
          <span className="text-outline-thin" style={{ display: "block", fontSize: "0.35em", marginTop: "0.3em" }}>
            404
          </span>
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-ui)',
            fontSize: "clamp(0.75rem, 1.6vw, 0.88rem)",
            color: "var(--text-secondary)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginTop: "1.25rem",
            marginBottom: "0.75rem",
            fontWeight: 600,
          }}
        >
          Page not found — this lap doesn&apos;t exist.
        </p>
        <p style={{ color: "var(--text-muted)", fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)", maxWidth: "420px", margin: "0 auto 2.5rem", lineHeight: 1.7 }}>
          The rider checked into pit lane but the track ahead is closed. Head back to the start line.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/#projects" className="btn btn-outline">
            View projects
          </Link>
        </div>
      </div>
    </main>
  );
}