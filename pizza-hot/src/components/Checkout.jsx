import useFetch from "../hooks/useFetch";
import { useContext } from "react";
import Modal from "./UI/Modal";
import { UIContext } from "../contexts/UIContext";
import { CardContext } from "../contexts/CardContext";
const config = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const { uiProgress, hideCheckout } = useContext(UIContext);
  const { items, clearAll } = useContext(CardContext);
  const { data, isLoading, error, sendRequest } = useFetch(
    "http://localhost:3000/orders",
    config
  );
  function handleClose() {
    hideCheckout();
    clearAll();
  }

  const cardTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const customerData = Object.fromEntries(formData.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: items,
          customer: customerData,
        },
      })
    );
  }

  if (data && !error) {
    return (
      <Modal open={uiProgress === "checkout"}>
        <h2>Siparişiniz Alındı...</h2>
        <button
          className="btn btn-sm btn-outline-danger me-2"
          onClick={() => handleClose()}
        >
          Kapat
        </button>
      </Modal>
    );
  }

  return (
    <Modal open={uiProgress === "checkout"}>
      <h2>Checkout</h2>
      <p className="text-danger">Sipariş tutarı:{cardTotal}₺</p>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="col">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Ad-Soyad
            </label>
            <input type="name" name="name" id="name" className="form-control" />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                E-Posta
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="phone" className="form-label">
                Telefon
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col">
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Adres
            </label>
            <textarea
              name="address"
              id="address"
              className="form-control"
            ></textarea>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="mb-3">
              <label htmlFor="city" className="form-label">
                Şehir
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="form-control"
              />
            </div>
          </div>
          <div className="col">
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                Mahalle
              </label>
              <input
                type="text"
                name="district"
                id="district"
                className="form-control"
              />
            </div>
          </div>
        </div>
        {isLoading ? (
          <div className="alert alert-warning">Yükleniyor</div>
        ) : (
          <>
            <button
              className="btn btn-sm btn-outline-danger me-2"
              onClick={() => hideCheckout()}
            >
              Kapat
            </button>
            <button type="submit" className="btn btn-sm btn-success me-2">
              Kaydet
            </button>
          </>
        )}
      </form>
    </Modal>
  );
}
