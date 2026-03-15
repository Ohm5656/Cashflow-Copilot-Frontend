import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { BusinessAnalysis } from "./components/screens/BusinessAnalysis";
import { Suppliers } from "./components/screens/Suppliers";
import { MaterialDetail } from "./components/screens/MaterialDetail";
import { CashRunway } from "./components/screens/CashRunway";
import { Simulator } from "./components/screens/Simulator";
import { Settings } from "./components/screens/Settings";
import { SettingsAccount } from "./components/screens/SettingsAccount";
import { SettingsInventory } from "./components/screens/SettingsInventory";
import { SettingsImport } from "./components/screens/SettingsImport";
import { SettingsTheme } from "./components/screens/SettingsTheme";
import { Login } from "./components/screens/Login";
import { Signup } from "./components/screens/Signup";
import { ForgotPassword } from "./components/screens/ForgotPassword";
import { NotFound } from "./components/screens/NotFound";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ExpenseAnomalyDetail } from "./components/screens/ExpenseAnomalyDetail";
import { ProductAnalysisDetail } from "./components/screens/ProductAnalysisDetail";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <BusinessAnalysis /> },
      { path: "suppliers", element: <Suppliers /> },
      { path: "suppliers/:materialId", element: <MaterialDetail /> },
      { path: "cash-runway", element: <CashRunway /> },
      { path: "simulator", element: <Simulator /> },
      { path: "settings", element: <Settings /> },
      { path: "settings/account", element: <SettingsAccount /> },
      { path: "settings/inventory", element: <SettingsInventory /> },
      { path: "settings/import", element: <SettingsImport /> },
      { path: "settings/theme", element: <SettingsTheme /> },
      { path: "*", element: <NotFound /> },
      { path: "expense-anomaly", element: <ExpenseAnomalyDetail /> },
      { path: "product-analysis", element: <ProductAnalysisDetail /> },
    ],
  },
]);