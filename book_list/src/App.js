
import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      bookName: "Wings of Fire",
      authorName: "A.P.J. Abdul Kalam",
      publishDate: "1999-01-01",
    },
    {
      id: 2,
      bookName: "The Alchemist",
      authorName: "Paulo Coelho",
      publishDate: "1988-01-01",
    },
    {
      id: 3,
      bookName: "Harry Potter",
      authorName: "J.K. Rowling",
      publishDate: "1997-06-26",
    },
  ]);

  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [publishDate, setPublishDate] = useState("");

  const [editingItemId, setEditingItemId] = useState(null);
  const [editedBook, setEditedBook] = useState({
    bookName: "",
    authorName: "",
    publishDate: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  // Add a new book
  const handleSubmit = (event) => {
    event.preventDefault();

    if (!bookName.trim() || !authorName.trim() || !publishDate) {
      alert("Please fill in all fields");
      return;
    }

    const newItem = {
      id: items.length
        ? Math.max(...items.map((item) => item.id)) + 1
        : 1,
      bookName: bookName.trim(),
      authorName: authorName.trim(),
      publishDate: publishDate,
    };

    setItems([...items, newItem]);

    setBookName("");
    setAuthorName("");
    setPublishDate("");
  };

  // Delete a book
  const handleDeleteItem = (itemId) => {
    setItems(items.filter((item) => item.id !== itemId));
  };

  // Start editing a book
  const handleEditItem = (item) => {
    setEditingItemId(item.id);

    setEditedBook({
      bookName: item.bookName,
      authorName: item.authorName,
      publishDate: item.publishDate,
    });
  };

  // Save edited book details
  const handleSaveItem = () => {
    if (
      !editedBook.bookName.trim() ||
      !editedBook.authorName.trim() ||
      !editedBook.publishDate
    ) {
      alert("Please fill in all fields");
      return;
    }

    const updatedItems = items.map((item) => {
      if (item.id === editingItemId) {
        return {
          ...item,
          bookName: editedBook.bookName.trim(),
          authorName: editedBook.authorName.trim(),
          publishDate: editedBook.publishDate,
        };
      }

      return item;
    });

    setItems(updatedItems);
    setEditingItemId(null);
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingItemId(null);

    setEditedBook({
      bookName: "",
      authorName: "",
      publishDate: "",
    });
  };

  // Search books by title or author
  const filteredItems = items.filter(
    (item) =>
      item.bookName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>

      <br />

      <div className="container">
        <h2>Book List Management</h2>

        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Book Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter book name"
                value={bookName}
                onChange={(e) => setBookName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-4">
              <label className="form-label">Author Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter author name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                required
              />
            </div>

            <div className="col-md-3">
              <label className="form-label">Publish Date</label>
              <input
                type="date"
                className="form-control"
                value={publishDate}
                onChange={(e) => setPublishDate(e.target.value)}
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
        <h4>Book List</h4>

        <div className="mb-3">
          <label className="form-label">Search Books</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by book name or author"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Author Name</th>
                <th>Publish Date</th>
                <th>Actions</th>
              </tr>
            </thead>

           <tbody>
  {filteredItems.length > 0 ? (
    filteredItems.map((item) => (
      <tr key={item.id}>
        <td>{item.id}</td>

        <td>
          {editingItemId === item.id ? (
            <input
              type="text"
              className="form-control"
              value={editedBook.bookName}
              onChange={(e) =>
                setEditedBook({
                  ...editedBook,
                  bookName: e.target.value,
                })
              }
            />
          ) : (
            item.bookName
          )}
        </td>

        <td>
          {editingItemId === item.id ? (
            <input
              type="text"
              className="form-control"
              value={editedBook.authorName}
              onChange={(e) =>
                setEditedBook({
                  ...editedBook,
                  authorName: e.target.value,
                })
              }
            />
          ) : (
            item.authorName
          )}
        </td>

        <td>
          {editingItemId === item.id ? (
            <input
              type="date"
              className="form-control"
              value={editedBook.publishDate}
              onChange={(e) =>
                setEditedBook({
                  ...editedBook,
                  publishDate: e.target.value,
                })
              }
            />
          ) : (
            item.publishDate
          )}
        </td>

        {/* Actions */}
        <td>
          {editingItemId === item.id ? (
            <>
              <button
                type="button"
                className="btn btn-success btn-sm me-2 mb-1"
                onClick={handleSaveItem}
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
                onClick={() => handleEditItem(item)}
              >
                Edit
              </button>

              <button
                type="button"
                className="btn btn-danger btn-sm mb-1"
                onClick={() => handleDeleteItem(item.id)}
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
        No books found
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
