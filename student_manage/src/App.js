import React, { useState } from "react";

function App() {
  const [students, setStudents] = useState([
    {
      id: 1,
      studentName: "John",
      rollNumber: "101",
      studentClass: "10A",
    },
    {
      id: 2,
      studentName: "David",
      rollNumber: "102",
      studentClass: "10B",
    },
    {
      id: 3,
      studentName: "William",
      rollNumber: "103",
      studentClass: "Grade 12",
    },
  ]);

  const [studentName, setStudentName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [studentClass, setStudentClass] = useState("");

  const [editingStudentId, setEditingStudentId] = useState(null);

  const [editedStudent, setEditedStudent] = useState({
    studentName: "",
    rollNumber: "",
    studentClass: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const duplicateRollNumber = students.some(
      (student) =>
        student.rollNumber.trim().toLowerCase() ===
        rollNumber.trim().toLowerCase()
    );

    if (duplicateRollNumber) {
      alert("Roll number already exists. Please enter a unique roll number.");
      return;
    }

    const newStudent = {
      id: students.length
        ? Math.max(...students.map((student) => student.id)) + 1
        : 1,
      studentName: studentName.trim(),
      rollNumber: rollNumber.trim(),
      studentClass: studentClass.trim(),
    };

    setStudents([...students, newStudent]);

    setStudentName("");
    setRollNumber("");
    setStudentClass("");
  };

  const handleDeleteStudent = (studentId) => {
    setStudents(
      students.filter((student) => student.id !== studentId)
    );

    if (editingStudentId === studentId) {
      handleCancelEdit();
    }
  };

  const handleEditStudent = (student) => {
    setEditingStudentId(student.id);

    setEditedStudent({
      studentName: student.studentName,
      rollNumber: student.rollNumber,
      studentClass: student.studentClass,
    });
  };

  const handleSaveStudent = () => {
    if (
      !editedStudent.studentName.trim() ||
      !editedStudent.rollNumber.trim() ||
      !editedStudent.studentClass.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    const duplicateRollNumber = students.some(
      (student) =>
        student.id !== editingStudentId &&
        student.rollNumber.trim().toLowerCase() ===
          editedStudent.rollNumber.trim().toLowerCase()
    );

    if (duplicateRollNumber) {
      alert("Roll number already exists. Please enter a unique roll number.");
      return;
    }

    const updatedStudents = students.map((student) => {
      if (student.id === editingStudentId) {
        return {
          ...student,
          studentName: editedStudent.studentName.trim(),
          rollNumber: editedStudent.rollNumber.trim(),
          studentClass: editedStudent.studentClass.trim(),
        };
      }

      return student;
    });

    setStudents(updatedStudents);
    setEditingStudentId(null);
  };

  const handleCancelEdit = () => {
    setEditingStudentId(null);

    setEditedStudent({
      studentName: "",
      rollNumber: "",
      studentClass: "",
    });
  };

  const filteredStudents = students.filter((student) => {
    const search = searchTerm.trim().toLowerCase();

    return (
      student.studentName.toLowerCase().includes(search) ||
      student.rollNumber.toLowerCase().includes(search) ||
      student.studentClass.toLowerCase().includes(search)
    );
  });

  return (
    <div>
      <br />

      <div className="container">
        <h2>Student Management System</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Student Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter student name"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Roll Number</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter roll number"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Class</label>
              <input
                type="text"
                className="form-control"
                placeholder="e.g., 10A or Grade 12"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                required
              />
            </div>

            <div className="col-md-1 d-flex align-items-end">
              <button
                className="btn btn-success"
                type="submit"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      </div>

      <br />

      <div className="container">
        <h4>Student List</h4>

        <div className="mb-3">
          <label className="form-label">Search Students</label>

          <input
            type="text"
            className="form-control"
            placeholder="Search by name, roll number, or class"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Roll Number</th>
                <th>Class</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td>{student.id}</td>

                    {/* Student Name */}
                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedStudent.studentName}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              studentName: e.target.value,
                            })
                          }
                        />
                      ) : (
                        student.studentName
                      )}
                    </td>

                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedStudent.rollNumber}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              rollNumber: e.target.value,
                            })
                          }
                        />
                      ) : (
                        student.rollNumber
                      )}
                    </td>

                    <td>
                      {editingStudentId === student.id ? (
                        <input
                          type="text"
                          className="form-control"
                          value={editedStudent.studentClass}
                          onChange={(e) =>
                            setEditedStudent({
                              ...editedStudent,
                              studentClass: e.target.value,
                            })
                          }
                        />
                      ) : (
                        student.studentClass
                      )}
                    </td>

                    {/* Actions */}
                    <td>
                      {editingStudentId === student.id ? (
                        <>
                          <button
                            type="button"
                            className="btn btn-success btn-sm me-2 mb-1"
                            onClick={handleSaveStudent}
                          >
                            Save
                          </button>

                          <button
                            type="button"
                            className="btn btn-secondary btn-sm mb-1"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm me-2 mb-1"
                            onClick={() => handleEditStudent(student)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="btn btn-danger btn-sm mb-1"
                            onClick={() =>
                              handleDeleteStudent(student.id)
                            }
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;