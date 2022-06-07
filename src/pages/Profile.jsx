import axios from "axios";
import { useEffect, useState } from "react";
import { IoCamera } from "react-icons/io5";
import Header from "../components/Header";
import Loading from "../components/Loading";
import "../styles/Profile.scss";

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState();
  // const [avatar, setAvatar] = useState();
  //const formData = new FormData();

  useEffect(() => {
    handleGetProfile();
  }, []);

  const handleGetProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: process.env.REACT_APP_BACKEND_HOST + "/user",
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });
    
      setData(res.data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  // const handleChangeAvatar = (e) => {
  //   const file = e.target.files[0];
  //   file.preview = URL.createObjectURL(file);

  //   //formData.append("File", e.target.files[0]);

  //   setAvatar(file);
  //   setData({ ...data, avatar: file });
  // };

  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      await axios({
        method: "put",
        url: process.env.REACT_APP_BACKEND_HOST + "/user",
        data: {
          name: data.name,
          address: data.address,
          //avatar: data.avatar,
          avatar:
            // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFLP-G1MZF20B18zKRTYtngwjUnqFgPi9jA&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQD3TDQBB-_F1sfu-gElz73vtUAdlOdLerHDw&usqp=CAU",
        },
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      handleGetProfile(); //Cap nhat lai thong tin vua update tren giao dien
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        {loading && <Loading />}
        <div className="profile">
          <section className="profile__title">
            <span style={{ textTransform: "capitalize", fontSize: "25px" }}>
              Hồ sơ của tôi
            </span>
            <span>Quản lý thông tin hồ sơ để bảo mật tài khoản</span>
          </section>
          <div className="profile__main">
            <section className="profile__main__edit">
              <div className="form">
                <div className="group">
                  <label>SĐT:</label>
                  <input
                    // readOnly
                    type="text"
                    defaultValue={data && data.phone}
                  />
                </div>
                <div className="group">
                  <label>Tên:</label>
                  <input
                    type="text"
                    value={data && data.name}
                    onChange={(e) => {
                      setData({ ...data, name: e.target.value });
                    }}
                  />
                </div>
                <div className="group">
                  <label>Địa chỉ:</label>
                  <input
                    type="text"
                    value={data && data.address}
                    onChange={(e) => {
                      setData({ ...data, address: e.target.value });
                    }}
                  />
                </div>
                <button className="btnUpdate" onClick={handleUpdateProfile}>
                  Lưu
                </button>
              </div>
            </section>

            <section className="profile__main__avatar">
              <img src={data && data.avatar} alt="" />
              <div className="changeAvatar">
                <IoCamera />
                <input
                  type="file"
                  accept="image/*"
                  // onChange={handleChangeAvatar}
                />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
