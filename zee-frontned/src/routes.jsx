import { Routes, Route } from "react-router-dom";
import App from "./App";
// Pages
import Home from "./Pages/Home";
import StyleDashboard from "./Pages/StyleDashboard";
import StyleQuiz from "./Pages/StyleQuiz";
import StyleResult from "./Pages/StyleResult";

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
