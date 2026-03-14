import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { applySavedTheme } from "./components/screens/SettingsTheme";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    applySavedTheme();
  }, []);

  return <RouterProvider router={router} />;
}