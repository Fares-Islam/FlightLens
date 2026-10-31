import { useState } from "react";
import Index from "./components/Pages/Index";
import About from "./components/Pages/About";

export default function App() {
  const [page, setPage] = useState("index");

  return (
    <div>
      <nav>
        <button onClick={() => setPage("index")}>Home</button>
        <button onClick={() => setPage("about")}>About</button>
      </nav>

      <main>
        {page === "index" && <Index />}
        {page === "about" && <About />}
      </main>
    </div>
  );
}
