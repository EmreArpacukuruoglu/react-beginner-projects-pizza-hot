export default function CardReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.item.id);
    const updateItems = [...state.items];
    if (index > -1) {
      const existingItem = state.items[index];
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };

      updateItems[index] = updateItem;
    } else {
      updateItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updateItems };
  }
  if (action.type == "REMOVE_ITEM") {
    const index = state.items.findIndex((item) => item.id === action.id);
    const existingItem = state.items[index];
    const updateItems = [...state.items];
    if (existingItem.quantity === 1) {
      updateItems.splice(existingItem, 1);
    } else {
      const updateItem = {
        ...existingItem,
        quantity: existingItem.quantity - 1,
      };
      updateItems[index] = updateItem;
    }
    return { ...state, items: updateItems };
  }
  if (action.type === "CLEAR_CARD") {
    return { ...state, items: [] };
  }

  return state;
}
