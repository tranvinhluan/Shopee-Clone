import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading.jsx";
import "../styles/Detail.scss";
import NumberFormat from "react-number-format";

function Detail(props) {
  const [product, setProduct] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Add to Cart");

  const token = localStorage.getItem("token");

  let { id } = useParams();
  let navigate = useNavigate();

  const productInfo = async () => {
    setLoading(true);
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "/product/" + id;

      const { data } = await axios({
        url: url,
        method: "get",
      });

      setProduct(data);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    productInfo();
    getCart();
  }, []);

  const getCart = async () => {
    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "/cart";

      const { data } = await axios({
        url: url,
        method: "get",
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setCartItems(data.products);
    } catch (error) {
      console.log(error.message);
    } finally {
    }
  };

  const handleAddCart = async () => {
    document.getElementById("addtocart").setAttribute("disabled", "disabled");
    setLoadingText("Adding...");

    try {
      const url = process.env.REACT_APP_BACKEND_HOST + "/cart";
      await axios({
        url: url,
        method: "put",
        headers: {
          token: localStorage.getItem("token"),
        },

        data: {
          products: [
            ...cartItems,
            {
              product: id,
              quantity: 1,
            },
          ],
        },
      });
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingText("Complete...");

      setTimeout(function () {
        navigate("/cart");
      }, 1000);
    }
  };

  return (
    <div>
      <Header />

      {loading ? (
        <>
          <Loading />
        </>
      ) : (
        <>
          <div className="main-detail">
            <div className="container">
              <div>
                <div
                  className="product-detail-container"
                  style={{ marginTop: "40px" }}
                >
                  <div className="box-image">
                    <div className="gallery-item item-main">
                      <img src={product.image} />
                    </div>
                  </div>

                  <div className="box-info">
                    <h2 className="name">{product.name}</h2>

                    <div className="price-stock clearfix">
                      <div className="info-price">
                        <NumberFormat
                          value={product.price}
                          displayType={"text"}
                          thousandSeparator={true}
                          // suffix={" đ"}
                          />
                          <sup>đ</sup>
                      </div>
                      <div className="stock">In stock</div>
                    </div>

                    <div className="description">
                      Form áo: OVERSIZE form rộng chuẩn TAY LỠ UNISEX cực đẹp.
                      Ngày nay áo phông nam tay lỡ được coi là món đồ " Must
                      have " trong tủ đồ của các tín đồ về thời trang...
                    </div>

                    <div className="add-to-cart">
                      {token ? (
                        <button
                          id="addtocart"
                          className="addtocart"
                          onClick={handleAddCart}
                        >
                          {loadingText}
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            navigate("/login");
                          }}
                        >
                          Login
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
}

export default Detail;
