
function Contact() {
  const headingColor = 'lightblue';

  function showEnthusiasm() {
    document.getElementById('enthusiasm-message').textContent =
      'Hello from React! I love this page!';

    document.getElementById('page-heading').style.backgroundColor =
      headingColor;
  }

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h1 id="page-heading" className="p-3 rounded">
        This is the Contact Page
      </h1>

      <p id="enthusiasm-message" className="mt-3">
        Click the button to see my enthusiasm!
      </p>

      <button
        className="btn btn-primary"
        onClick={showEnthusiasm}
      >
        Show Enthusiasm
      </button>
    </div>
  );
}

export default Contact;
