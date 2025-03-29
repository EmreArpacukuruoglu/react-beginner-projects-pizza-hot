import { useContext } from "react";
import Modal from "./UI/Modal";
import { CardContext } from "../contexts/CardContext";
import CardItem from "./CardItem";
import { UIContext } from "../contexts/UIContext";

export default function Card() {
  const { items, addItem, deleteItem } = useContext(CardContext);
  const { uiProgress, hideCard, showCheckout } = useContext(UIContext);
  const cardTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Modal open={uiProgress === "card"}>
      <h2>Sepetiniz</h2>
      {Object.keys(items).length > 0 ? (
        <ul className="card-items">
          {items.map((item) => (
            <CardItem
              key={item.id}
              item={item}
              onIncrease={() => addItem(item)}
              onDecrease={() => deleteItem(item.id)}
            />
          ))}
        </ul>
      ) : (
        <div className="alert alert-danger">Sepetinizde ürün yok...</div>
      )}

      <div className="card-summary">
        <div className="modal-actions text-end">
          <button
            className="btn btn-sm btn-danger me-2"
            onClick={() => hideCard()}
          >
            Kapat
          </button>
          {Object.keys(items).length > 0 && (
            <button
              className="btn btn-sm btn-outline-success"
              onClick={() => showCheckout()}
            >
              Sipariş ver
            </button>
          )}
        </div>
        {Object.keys(items).length > 0 && (
          <p className="badge text-bg-success mb-0 fs-5">{cardTotal}₺</p>
        )}
      </div>
    </Modal>
  );
}
