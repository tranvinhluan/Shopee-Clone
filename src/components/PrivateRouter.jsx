import LoginPage from "../pages/Login";

function PrivateRouter({ children }) {
  const token = localStorage.getItem("token");

  if (token !== null) {
    return children;
  } else {
    return <LoginPage />;
  }
}

export default PrivateRouter;
