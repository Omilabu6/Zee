import { Routes, Route } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home";
import StyleDashboard from "./pages/StyleDashboard";
import StyleQuiz from "./pages/StyleQuiz";
import StyleResult from "./pages/StyleResult";

export default function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={<App currentPageName="Home"><Home /></App>}
      />

      <Route
        path="/dashboard"
        element={<App currentPageName="StyleDashboard"><StyleDashboard /></App>}
      />

      <Route
        path="/quiz"
        element={<App currentPageName="StyleQuiz"><StyleQuiz /></App>}
      />

      <Route
        path="/result"
        element={<App currentPageName="StyleResult"><StyleResult /></App>}
      />
    </Routes>
  );
}
