import { useContext } from "react";
import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import ThemeSelector from "./components/ThemeSelector";
import { ThemeContext, ThemeProvider } from "./contexts/ThemeContext";
import Card from "./components/Card";
import Checkout from "./components/Checkout";

export default function App() {
  const { mode } = useContext(ThemeContext);

  return (
    <div
      className={mode === "dark" ? "bg-dark text-white" : "bg-light text-black"}
    >
      <Header />
      <ThemeSelector />
      <div className="container my-4">
        <PizzaList />
        <Card />
        <Checkout />
      </div>
    </div>
  );
}
