
import { useState } from "react";
import { Link } from "react-router-dom";

function getToday() {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function ComparePage() {
  const user = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [result, setResult] = useState(null);

  function compareDates(e) {
    e.preventDefault();

    if (!firstDate || !secondDate || firstDate === secondDate) {
      alert("Select two different dates.");
      return;
    }

    if (firstDate > getToday() || secondDate > getToday()) {
      alert("Future dates cannot be compared.");
      return;
    }
    

    const waterList = JSON.parse(
      localStorage.getItem("waterList") || "[]"
    );

    const myRecords = waterList.filter(
      (item) => item.userId === user?.id
    );

    function getIntake(date) {
  const record = myRecords.find((item) => item.date === date);
  return record ? Number(record.quantity) : null;
}

    const firstAmount = getIntake(firstDate);
    const secondAmount = getIntake(secondDate);

    setResult({
      firstDate,
      secondDate,
      firstAmount,
      secondAmount,
      difference: secondAmount - firstAmount,
    });
  }

  return (
    <div className="container py-5">
      <div
        className="card shadow-sm mx-auto"
        style={{ maxWidth: "550px" }}
      >
        <div className="card-body">
          <h3 className="text-success mb-4">
            Compare Water Intake
          </h3>

          <form onSubmit={compareDates}>
            <label className="form-label">First date</label>

            <input
              type="date"
              className="form-control mb-3"
              value={firstDate}
              max={getToday()}
              onChange={(e) => setFirstDate(e.target.value)}
              required
            />

            <label className="form-label">Second date</label>

            <input
              type="date"
              className="form-control mb-3"
              value={secondDate}
              max={getToday()}
              onChange={(e) => setSecondDate(e.target.value)}
              required
            />

            <button className="btn btn-success w-100">
              Compare Dates
            </button>
          </form>

          {result && (
        <div className="mt-4">
          <hr />
          <h4>Comparison Result</h4>

          <p>
            <strong>{result.firstDate}:</strong>{" "}
            {result.firstAmount === null
              ? "You didn't record any water intake on this day."
              : `${result.firstAmount} ml`}
          </p>

          <p>
            <strong>{result.secondDate}:</strong>{" "}
            {result.secondAmount === null
              ? "You didn't record any water intake on this day."
              : `${result.secondAmount} ml`}
          </p>

          {result.firstAmount === null ||
          result.secondAmount === null ? (
            <p className="text-warning">
              Comparison is unavailable because one or both dates
              have no recorded water intake.
            </p>
          ) : (
            <>
              <p>
                <strong>Difference:</strong>{" "}
                {result.difference > 0 ? "+" : ""}
                {result.difference} ml
              </p>

              <p>
                {result.difference > 0
                  ? "You drank more on the second date."
                  : result.difference < 0
                  ? "You drank less on the second date."
                  : "Both dates have the same intake."}
              </p>
            </>
          )}
        </div>
      )}

          <Link
            to="/dashboard"
            className="btn btn-outline-success mt-3 w-100"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComparePage;
