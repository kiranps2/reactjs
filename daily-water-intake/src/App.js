
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import WaterForm from "./components/WaterForm";

function getToday() {
  const date = new Date();

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("currentUser") || "null"
  );

  const [waterList, setWaterList] = useState(() =>
    JSON.parse(localStorage.getItem("waterList") || "[]")
  );

  const [page, setPage] = useState(1);

  useEffect(() => {
    localStorage.setItem("waterList", JSON.stringify(waterList));
  }, [waterList]);

  const myRecords = user
    ? waterList.filter((item) => item.userId === user.id)
    : [];

  function addWater(amount) {
    if (!user) {
      navigate("/login");
      return;
    }

    const today = getToday();

    if (myRecords.some((item) => item.date === today)) {
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

  function logout() {
    localStorage.removeItem("currentUser");
    navigate("/login", { replace: true });
  }

  const sortedRecords = [...myRecords].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

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

  const todayRecord = myRecords.find(
    (item) => item.date === getToday()
  );

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

        <div className="row g-3 my-3">
          <div className="col-md-6">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5>Today's Intake</h5>
                <h2>{todayRecord?.quantity || 0} ml</h2>
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

        <WaterForm
          onSave={addWater}
          today={getToday()}
          time={getTime()}
        />

        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4>Water Intake History</h4>

          <Link to="/compare" className="btn btn-success">
            Compare Two Dates
          </Link>
        </div>

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
                      <Link
                        to={`/edit/${record.id}`}
                        className="btn btn-primary btn-sm me-2"
                      >
                        Edit
                      </Link>

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
      </div>
    </>
  );
}
