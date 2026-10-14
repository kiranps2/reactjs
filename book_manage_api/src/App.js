
import { useState, useEffect } from "react";
import "./App.css";

const API_URL = "https://worksheet-library.mashupstack.com/books";

function App() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    author: "",
    published_year: "",
    genre: ""
  });

  const [editId, setEditId] = useState(null);

  // GET: Fetch all books
  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch books");
      }

      const result = await response.json();

      // Support either an array or a common wrapped response
      const bookList = Array.isArray(result)
        ? result
        : result.books ?? result.data ?? [];

      setBooks(bookList);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // POST: Create a book
  // PUT: Update an existing book
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const bookData = {
      title: form.title.trim(),
      author: form.author.trim(),
      published_year: Number(form.published_year),
      genre: form.genre.trim()
    };

    try {
      const url = editId
        ? `${API_URL}/${editId}`
        : API_URL;

      const response = await fetch(url, {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookData)
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${editId ? "update" : "create"} book`
        );
      }

      alert(editId ? "Book updated successfully!" : "Book added successfully!");

      setForm({
        title: "",
        author: "",
        published_year: "",
        genre: ""
      });

      setEditId(null);

      // Reload the latest data from the API
      await fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  // Load selected book into the form
  const handleEdit = (book) => {
    setForm({
      title: book.title ?? "",
      author: book.author ?? "",
      published_year: book.published_year ?? "",
      genre: book.genre ?? ""
    });

    setEditId(book.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE: Remove a book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) {
      return;
    }

    setError("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete book");
      }

      alert("Book deleted successfully!");
      await fetchBooks();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditId(null);

    setForm({
      title: "",
      author: "",
      published_year: "",
      genre: ""
    });
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📚 Book Manager</h1>
        <p>Manage your library books in one place</p>
      </header>

      <main className="container">
        {error && (
          <div className="error">
            {error}
            <button onClick={() => setError("")}>×</button>
          </div>
        )}

        {/* Create / Edit Form */}
        <section className="form-card">
          <h2>{editId ? "Edit Book" : "Add New Book"}</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="title">Book Title</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter book title"
                  value={form.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="author">Author</label>
                <input
                  id="author"
                  type="text"
                  name="author"
                  placeholder="Enter author name"
                  value={form.author}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="published_year">Published Year</label>
                <input
                  id="published_year"
                  type="number"
                  name="published_year"
                  placeholder="e.g. 2024"
                  min="0"
                  max="9999"
                  value={form.published_year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="genre">Genre</label>
                <input
                  id="genre"
                  type="text"
                  name="genre"
                  placeholder="e.g. Fiction"
                  value={form.genre}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn primary">
                {editId ? "Update Book" : "Add Book"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="btn secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* Book List */}
        <section className="list-section">
          <div className="list-heading">
            <h2>All Books</h2>
            <span className="count">{books.length} books</span>
          </div>

          {loading ? (
            <p className="message">Loading books...</p>
          ) : books.length === 0 ? (
            <p className="message">No books found. Add your first book!</p>
          ) : (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published Year</th>
                    <th>Genre</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td className="book-title">{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.published_year}</td>
                      <td>
                        <span className="genre">{book.genre}</span>
                      </td>
                      <td>
                        <div className="actions">
                          <button
                            className="btn edit"
                            onClick={() => handleEdit(book)}
                          >
                            Edit
                          </button>

                          <button
                            className="btn delete"
                            onClick={() => handleDelete(book.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
