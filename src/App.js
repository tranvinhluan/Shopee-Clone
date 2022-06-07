import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import PrivateRouter from "./components/PrivateRouter";
import { removeUser, setUser } from "./redux/_user";
import routers from "./routers/router";

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      getUser();
    }
  }, []);

  const getUser = async () => {
    try {
      // const endpoint = "https://k24-server-1.herokuapp.com/user";
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
