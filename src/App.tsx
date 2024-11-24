import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import GlobalView from "./components/GlobalView";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        {/* Menu de navigation */}
        <nav>
          <a href="/">Accueil</a>
          <a href="/global">Vue globale</a>
        </nav>

        {/* Définition des routes */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/global" element={<GlobalView />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
