import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRouter from "./components/PrivateRouter";
import { setUser } from "./redux/_user";
import { setCart } from "./redux/_cart";
import routers from "./routers/router";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUser();
      getCart();
    }
  }, []);

  const getUser = async () => {
    try {
      const endpoint = process.env.REACT_APP_BACKEND_HOST + "/user";

      const res = await axios({
        url: endpoint,
        method: "get",
        headers: { token: localStorage.getItem("token") },
      });

      const action = setUser(res.data);
      dispatch(action);
    } catch (error) {
      console.log(error);
    }
  };

  const getCart = async () => {
    try {
      const res = await axios({
        method: "GET",
        url: process.env.REACT_APP_API_BACKEND + "/cart",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const action = setCart(res.data);
      dispatch(action);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {routers.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.private === true ? (
                  <PrivateRouter>{route.element}</PrivateRouter>
                ) : (
                  route.element
                )
              }
            />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
