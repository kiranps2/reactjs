
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import WaterForm from "./components/WaterForm";

// Dashboard page
export function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  const [waterList, setWaterList] = useState(() =>
    JSON.parse(localStorage.getItem("waterList") || "[]")
  );

  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");
  const [page, setPage] = useState(1);

  // Save records to Local Storage
  useEffect(() => {
    localStorage.setItem("waterList", JSON.stringify(waterList));
  }, [waterList]);

  function getToday() {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  function getTime() {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Get records belonging to the logged-in user
  const myRecords = user
    ? waterList.filter((item) => item.userId === user.id)
    : [];

  // Add water intake from WaterForm
  function addWater(amount) {
    const today = getToday();

    const alreadyAdded = myRecords.some(
      (item) => item.date === today
    );

    if (alreadyAdded) {
      alert("You have already added water intake today!");
      return;
    }

    const newRecord = {
      id: Date.now().toString(),
      userId: user.id,
      quantity: amount,
      date: today,
      time: getTime(),
    };

    setWaterList((previous) => [...previous, newRecord]);
    setPage(1);

    alert("Water intake saved!");
  }

  // Delete a record
  function deleteWater(id) {
    if (!window.confirm("Delete this water intake record?")) {
      return;
    }

    setWaterList((previous) =>
      previous.filter(
        (item) => !(item.id === id && item.userId === user.id)
      )
    );
  }

  // Logout
  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  }

  // Compare two dates
  function compareDates(e) {
    e.preventDefault();

    if (!date1 || !date2 || date1 === date2) {
      alert("Select two different dates.");
      return;
    }

    if (date1 > getToday() || date2 > getToday()) {
      alert("Future dates cannot be compared.");
      return;
    }

    navigate(`/compare?first=${date1}&second=${date2}`);
  }

  // Sort newest records first
  const sortedRecords = [...myRecords].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  // Pagination: five records per page
  const recordsPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil(sortedRecords.length / recordsPerPage)
  );

  const currentPage = Math.min(page, totalPages);

  const visibleRecords = sortedRecords.slice(
    (currentPage - 1) * recordsPerPage,
    currentPage * recordsPerPage
  );

  function getIntake(date) {
    const record = myRecords.find((item) => item.date === date);
    return record ? record.quantity : 0;
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-success">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            Water Tracker
          </Link>

          <button className="btn btn-light btn-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container py-4">
        <h2 className="text-success">
          Welcome, {user?.name || "User"}!
        </h2>

        {/* Intake summary */}
        <div className="row g-3 my-3">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Today's Intake</h5>
                <h2>{getIntake(getToday())} ml</h2>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Total Recorded Days</h5>
                <h2>{myRecords.length}</h2>
              </div>
            </div>
          </div>
        </div>

        {/* Separate water form component */}
        <WaterForm
          onSave={addWater}
          today={getToday()}
          time={getTime()}
        />

        {/* Water intake history */}
        <h4 className="mb-3">Water Intake History</h4>

        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="table-success">
              <tr>
                <th>Date</th>
                <th>Quantity</th>
                <th>Added Time</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {visibleRecords.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center">
                    No records found.
                  </td>
                </tr>
              ) : (
                visibleRecords.map((record) => (
                  <tr key={record.id}>
                    <td>{record.date}</td>
                    <td>{record.quantity} ml</td>
                    <td>{record.time}</td>
                    <td>
                      <button
                        className="btn btn-primary btn-sm me-2"
                        onClick={() =>
                          navigate(`/edit/${record.id}`)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteWater(record.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex gap-3 align-items-center mb-5">
          <button
            className="btn btn-outline-success"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="btn btn-outline-success"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
          >
            Next
          </button>
        </div>

        {/* Compare dates */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4>Compare Two Dates</h4>

            <form onSubmit={compareDates}>
              <label className="form-label">First date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={date1}
                max={getToday()}
                onChange={(e) => setDate1(e.target.value)}
                required
              />

              <label className="form-label">Second date</label>
              <input
                type="date"
                className="form-control mb-3"
                value={date2}
                max={getToday()}
                onChange={(e) => setDate2(e.target.value)}
                required
              />

              <button className="btn btn-success">
                Compare
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

// Edit water intake page
export function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

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

  function getToday() {
    const today = new Date();

    return `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  function saveEdit(e) {
    e.preventDefault();

    const amount = Number(quantity);

    if (!Number.isFinite(amount) || amount <= 0) {
      alert("Enter a valid quantity.");
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

    alert("Record updated successfully.");
    navigate("/dashboard");
  }

  if (!record) {
    return (
      <div className="container py-5">
        <h4>Record not found.</h4>
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
          <h3>Edit Water Intake</h3>

          <form onSubmit={saveEdit}>
            <label className="form-label mt-3">
              Quantity (ml)
            </label>

            <input
              type="number"
              min="1"
              step="1"
              className="form-control"
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

// Compare two dates page
export function ComparePage() {
  const user = JSON.parse(localStorage.getItem("currentUser") || "null");

  const query = new URLSearchParams(window.location.search);
  const firstDate = query.get("first");
  const secondDate = query.get("second");

  const waterList = JSON.parse(localStorage.getItem("waterList") || "[]");

  function getIntake(date) {
    const record = waterList.find(
      (item) => item.userId === user?.id && item.date === date
    );

    return record ? record.quantity : 0;
  }

  const firstAmount = getIntake(firstDate);
  const secondAmount = getIntake(secondDate);
  const difference = secondAmount - firstAmount;

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: "500px" }}
      >
        <div className="card-body">
          <h3 className="text-success">Comparison Result</h3>

          <p>
            {firstDate}: {firstAmount} ml
          </p>

          <p>
            {secondDate}: {secondAmount} ml
          </p>

          <hr />

          <h4>
            Difference: {difference > 0 ? "+" : ""}
            {difference} ml
          </h4>

          <p>
            {difference > 0
              ? "You drank more on the second date."
              : difference < 0
              ? "You drank less on the second date."
              : "Both dates have the same intake."}
          </p>

          <Link to="/dashboard" className="btn btn-success">
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
