import React, { useState } from "react";

import { AiFillFacebook, AiFillInstagram } from "react-icons/ai";
import { CgShoppingCart } from "react-icons/cg";
import { GoSearch } from "react-icons/go";

import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import logoWhite from "../assets/images/logoWhite.png";
import "../styles/Header.scss";

function Header(props) {
  // let [searchParams, setSearchParams] = useSearchParams();
  // const keyword = searchParams.get("keyword");

  const navigate = useNavigate();

  const { user } = useSelector((state) => state.userReducer);

  const token = localStorage.getItem("token");
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    navigate("/search?keyword=" + search);
  };

  const handleKeypress = (e) => {
    if (e.charCode === 13) {
      handleSearch();
    }
  };

  const handleCart = () => {
    if (token) {
      navigate("/cart");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="header">
      <section className="header__logo">
        <img
          src={logoWhite}
          alt=""
          onClick={() => {
            // setSearch("")
            navigate("/");
          }}
        />
      </section>

      <section className="header__search">
        <input
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyPress={handleKeypress}
        />
        <button className="btnSearch" onClick={handleSearch}>
          <GoSearch />
        </button>
      </section>

      <section className="header__option">
        <button>Kênh người bán</button>
        <span>|</span>
        <button>Tải ứng dụng</button>
        <span>|</span>
        <button>Kết nối</button>
        <AiFillFacebook className="fb" />
        <AiFillInstagram className="ig" />
      </section>

      <section className="header__cart">
        <CgShoppingCart onClick={handleCart} />
      </section>

      <section className="header__user">
        {token === null ? (
          <div>
            <button
              onClick={() => {
                navigate("/register");
              }}
            >
              Đăng ký
            </button>
            <span>|</span>
            <button
              onClick={() => {
                navigate("/login");
              }}
            >
              Đăng nhập
            </button>
          </div>
        ) : (
          <Tippy
            content={
              <div style={{ width: "110px" }}>
                <button
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Tài khoản của bạn
                </button>
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  Đăng xuất
                </button>
              </div>
            }
            interactive
          >
            <div className="header__user-name">{user ? user.name : ""}</div>
          </Tippy>
        )}
      </section>
    </div>
  );
}

export default Header;
