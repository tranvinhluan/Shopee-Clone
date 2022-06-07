import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { BiError } from "react-icons/bi";
import { FaEye, FaEyeSlash, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import logo2 from "../assets/images/logo-2.png";
import logo1 from "../assets/images/logoSP.png";
import Loading from "../components/Loading";
import "../styles/Register.scss";
import { registerSchema } from "../validations/UserValidation";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRegister, setIsRegister] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      navigate("/");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      phone: "",
      name: "",
      password: "",
      confirm_password: "",
      address: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (data) => {
      try {
        setLoading(true);
        await axios({
          method: "post",
          url: process.env.REACT_APP_BACKEND_HOST + "/user",
          data: {
            phone: data.phone,
            name: data.name,
            password: data.password,
            confirm_password: data.confirm_password,
            address: data.address,
          },
        });

        navigate("/login");
      } catch (error) {
        console.log(error.message);

        console.log("REGISTER FAIL");
        setIsRegister(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <header>
        <div style={{ display: "flex", alignItems: "center", width: 300 }}>
          <img
            src={logo2}
            alt="logo"
            onClick={() => {
              navigate("/");
            }}
          />
          <span>Đăng ký</span>
        </div>

        <a href="#">Bạn cầu giúp đỡ?</a>
      </header>
      <div className="register">
        {loading && <Loading />}
        <div className="register__logo">
          <img src={logo1} alt="logo" />
        </div>

        <div className="register__form">
          <span className="title">Đăng ký</span>
          {isRegister === false ? (
            <div className="error_register">
              <BiError />
              <span>
                Số điện thoại của bạn đã được đăng ký cho một tài khoản khác.
              </span>
            </div>
          ) : (
            <></>
          )}

          <form className="form" onSubmit={formik.handleSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Tên"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.errors.name && formik.touched.name && (
              <p className="error">{formik.errors.name}</p>
            )}

            <input
              name="phone"
              type="text"
              placeholder="Số điện thoại"
              value={formik.values.phone}
              onChange={formik.handleChange}
            />
            {formik.errors.phone && formik.touched.phone && (
              <p className="error">{formik.errors.phone}</p>
            )}

            <input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <div className="showPassword">
              {showPassword ? (
                <FaEyeSlash
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></FaEyeSlash>
              ) : (
                <FaEye
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                ></FaEye>
              )}
            </div>
            {formik.errors.password && formik.touched.password && (
              <p className="error">{formik.errors.password}</p>
            )}

            <input
              name="confirm_password"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              value={formik.values.confirm_password}
              onChange={formik.handleChange}
            />
            <div className="showConfirmPassword">
              {showConfirmPassword ? (
                <FaEyeSlash
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                ></FaEyeSlash>
              ) : (
                <FaEye
                  onClick={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                ></FaEye>
              )}
            </div>
            {formik.errors.confirm_password &&
              formik.touched.confirm_password && (
                <p className="error">{formik.errors.confirm_password}</p>
              )}

            <input
              name="address"
              type="text"
              placeholder="Địa chỉ"
              value={formik.values.address}
              onChange={formik.handleChange}
            />
            {formik.errors.address && formik.touched.address && (
              <p className="error">{formik.errors.address}</p>
            )}

            <button type="submit" className="btnRegister">
              Đăng ký
            </button>
          </form>

          <div className="or">
            <div class="line"></div>
            <span>Hoặc</span>
            <div class="line"></div>
          </div>

          <div className="or_container">
            <div className="or_items">
              <FaFacebook style={{ color: "#125195" }} />
              <span>Facebook</span>
            </div>
            <div className="or_items">
              <FcGoogle />
              <span>Google</span>
            </div>
          </div>

          <div className="guest">
            <span>Bạn đã có tài khoản? </span>
            <span
              className="navigate"
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
