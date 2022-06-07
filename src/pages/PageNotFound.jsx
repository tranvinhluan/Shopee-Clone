import { useNavigate } from "react-router-dom";
import errorImg from "../assets/images/PageNotFound.jpg";
import "../styles/PageNotFound.scss";

export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <img src={errorImg} alt="" />
      <button
        className="btnBackToHome"
        onClick={() => {
          navigate("/");
        }}
      >
        Quay lại trang chủ
      </button>
    </div>
  );
}
