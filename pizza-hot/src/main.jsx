import { createRoot } from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext";
import App from "./App";
import { CardContextProvider } from "./contexts/CardContext";
import { UIContextProvider } from "./contexts/UIContext";

createRoot(document.getElementById("root")).render(
  <UIContextProvider>
    <ThemeProvider>
      <CardContextProvider>
        <App />
      </CardContextProvider>
    </ThemeProvider>
  </UIContextProvider>
);
