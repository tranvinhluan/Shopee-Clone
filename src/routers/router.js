import CategoryItem from "../pages/CategoryItem";
import Detail from "../pages/Detail";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import ProfilePage from "../pages/Profile";
import RegisterPage from "../pages/Register";
import Cart from "../pages/Cart";
import CreateOrder from "../pages/CreateOrder";
import PageNotFound from "../pages/PageNotFound";
import Search from "../pages/Search";

const routers = [
  {
    path: "/",
    element: <HomePage />,
    private: false,
  },
  {
    path: "/login",
    element: <LoginPage />,
    private: false,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
    private: true,
  },
  {
    path: "/register",
    element: <RegisterPage />,
    private: false,
  },
  {
    path: "/cart",
    element: <Cart />,
    private: true,
  },
  {
    path: "/createOrder",
    element: <CreateOrder />,
    private: true,
  },
  {
    path: "/search",
    element: <Search />,
    private: false,
  },
  {
    path: "/category/:id/product",
    element: <CategoryItem />,
    private: false,
  },
  {
    path: "/product/:id",
    element: <Detail />,
    private: false,
  },
  {
    path: "/*",
    element: <PageNotFound />,
    private: false,
  },
];

export default routers;
