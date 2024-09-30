import { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Navbar from "./components/navbar/Navbar"
import Menu from "./components/menu/Menu"
import Footer from "./components/footer/Footer"
import Home from "./pages/home/Home";
import Graphs from "./pages/graphs/Graphs";
import Live from "./pages/live/Live";
import Maps from "./pages/maps/Maps";
import "./styles/global.scss"

function App() {

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Your logic to check for unsaved changes
      const unsavedChanges = true;
      if (unsavedChanges) {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);


  const Layout = () => {
    return (
      <div className="main">
        <Navbar />
        <div className="container">
          <div className="menuContainer">
            <Menu />
          </div>
          <div className="contentContainer">
            <Outlet />
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/graphs",
          element:<Graphs />,
        },
        {
          path: "/maps",
          element:<Maps />,
        },
        {
          path: "/live",
          element:<Live />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />

}

export default App;
