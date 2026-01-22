import { renderToString } from "react-dom/server";
import App from "./App";
import "./index.css";

// This is a simplified entry point for server-side rendering if needed,
// but for a standard SPA we usually render on the client.
// The user asked to "render it into html", which could mean SSR or just a static build.
// Since this is a Replit Agent template, it's already set up as a Vite SPA.
// I will ensure the index.html is correctly set up.
import { createRoot } from "react-dom/client";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
