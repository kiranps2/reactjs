
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function getToday() {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [waterList, setWaterList] = useState(() =>
    JSON.parse(localStorage.getItem("waterList") || "[]")
  );

  const record = waterList.find(
    (item) => item.id === id && item.userId === user?.id
  );

  const [quantity, setQuantity] = useState(
    record ? String(record.quantity) : ""
  );
  const [date, setDate] = useState(record?.date || "");

  function saveEdit(e) {
    e.preventDefault();

    const amount = Number(quantity);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Enter a valid water quantity.");
      return;
    }

    if (!date || date > getToday()) {
      alert("Choose a valid date.");
      return;
    }

    const duplicate = waterList.some(
      (item) =>
        item.userId === user.id &&
        item.date === date &&
        item.id !== id
    );

    if (duplicate) {
      alert("An entry already exists for that date.");
      return;
    }

    const updatedList = waterList.map((item) =>
      item.id === id && item.userId === user.id
        ? { ...item, quantity: amount, date }
        : item
    );

    setWaterList(updatedList);
    localStorage.setItem("waterList", JSON.stringify(updatedList));

    alert("Water intake updated successfully.");
    navigate("/dashboard");
  }

  if (!record) {
    return (
      <div className="container py-5">
        <h4>Water intake record not found.</h4>
        <Link to="/dashboard" className="btn btn-success">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body">
          <h3 className="text-success">Edit Water Intake</h3>

          <form onSubmit={saveEdit}>
            <label className="form-label mt-3">
              Quantity (ml)
            </label>

            <input
              type="number"
              className="form-control"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label className="form-label mt-3">Date</label>

            <input
              type="date"
              className="form-control"
              value={date}
              max={getToday()}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <button className="btn btn-success mt-4 w-100">
              Save Changes
            </button>

            <button
              type="button"
              className="btn btn-secondary mt-2 w-100"
              onClick={() => navigate("/dashboard")}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditPage;
