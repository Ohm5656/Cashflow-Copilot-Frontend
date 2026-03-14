import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { applySavedTheme } from "./lib/theme-utils";

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    applySavedTheme();
  }, []);

  return <RouterProvider router={router} />;
}