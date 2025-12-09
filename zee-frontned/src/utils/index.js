// utils/index.js
export const createPageUrl = (pageName) => {
  const routes = {
    Home: "/",
    StyleQuiz: "/quiz",
    StyleDashboard: "/dashboard",
    StyleResult: "/result",
  };

  return routes[pageName] || "/";
};
