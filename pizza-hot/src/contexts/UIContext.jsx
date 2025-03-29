import { createContext, useState } from "react";

export const UIContext = createContext();
export function UIContextProvider({ children }) {
  const [uiProgress, setUiProgress] = useState("");

  function showCard() {
    setUiProgress("card");
  }
  function hideCard() {
    setUiProgress("");
  }
  function showCheckout() {
    setUiProgress("checkout");
  }
  function hideCheckout() {
    setUiProgress("");
  }
  const uiProgressContext = {
    uiProgress,
    showCard,
    hideCard,
    showCheckout,
    hideCheckout,
  };
  return (
    <UIContext.Provider value={uiProgressContext}>
      {children}
    </UIContext.Provider>
  );
}
