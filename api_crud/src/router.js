import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";

import ListPosts from "./components/blog/ListPost";
import CreatePost from "./components/blog/CreatePost";
import ViewPost from "./components/blog/Viewpost";
import EditPost from "./components/blog/EditPost";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "blog/posts",
        element: <ListPosts />,
      },
      {
        path: "blog/posts/create",
        element: <CreatePost />,
      },
      {
        path: "blog/posts/:postId",
        element: <ViewPost />,
      },
      {
        path: "blog/posts/:postId/edit",
        element: <EditPost />,
      },
    ],
  },
]);

export default router;