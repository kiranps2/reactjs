
import { useState } from "react";

function WaterForm({ onSave, today, time }) {
  const [quantity, setQuantity] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    const amount = Number(quantity);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Enter a valid water quantity.");
      return;
    }

    onSave(amount);
    setQuantity("");
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h4>Add Water Intake</h4>

        <form onSubmit={handleSubmit}>
          <label className="form-label">
            Quantity in millilitres
          </label>

          <input
            type="number"
            className="form-control mb-3"
            min="1"
            step="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Example: 2500"
            required
          />

          <p className="text-muted">
            Date: {today} | Time: {time}
          </p>

          <button type="submit" className="btn btn-success">
            Save Intake
          </button>
        </form>
      </div>
    </div>
  );
}

export default WaterForm;
