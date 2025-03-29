export default function CardItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="card-item border-bottom p-2">
      <p>
        {item.title}-{item.quantity * item.price}
      </p>
      <div className="actions">
        <button className="btn btn-sm btn-outline-primary" onClick={onDecrease}>
          -
        </button>
        <span>{item.quantity}</span>
        <button className="btn btn-sm btn-outline-primary" onClick={onIncrease}>
          +
        </button>
      </div>
    </li>
  );
}
