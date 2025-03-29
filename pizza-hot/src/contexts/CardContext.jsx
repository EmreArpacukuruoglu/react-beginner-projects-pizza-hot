import { createContext, useReducer } from "react";
import CardReducer from "../reducers/CardReducer";

export const CardContext = createContext();

export function CardContextProvider({ children }) {
  const [card, dispatch] = useReducer(CardReducer, { items: [] });

  function addItem(item) {
    dispatch({ type: "ADD_ITEM", item });
  }

  function deleteItem(id) {
    dispatch({ type: "REMOVE_ITEM", id });
  }
  function clearAll() {
    dispatch({ type: "CLEAR_CARD" });
  }

  const cardContext = {
    items: card.items,
    addItem,
    deleteItem,
    clearAll,
  };

  return (
    <CardContext.Provider value={cardContext}>{children}</CardContext.Provider>
  );
}
