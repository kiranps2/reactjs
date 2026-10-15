
import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Home";
import ProductForm from "./ProductForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "add",
        element: <ProductForm />
      },
      {
        path: "edit/:id",
        element: <ProductForm />
      }
    ]
  }
]);

export default router;
