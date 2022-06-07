import React, { useState, useEffect } from "react";
import axios from "axios";
import Category from "../components/Category";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Product from "../components/Product";
import "../styles/ProductHome.scss";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadProductList();
  }, []);

  const loadProductList = async () => {
    setLoading(true);
    try {
      const endpoint = process.env.REACT_APP_BACKEND_HOST + "/product?limit=20" ;

      const { data } = await axios({
        url: endpoint,
        method: "get",
        headers: {},
        data: {},
      });

      setProductList(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#F5F5F5",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />

      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="home-banner" style={{ paddingTop: "20px" }}>
              <img
                style={{ width: "100%" }}
                src="https://cf.shopee.com.my/file/5e7d031649e162ee1b4fa73bc686bb43"
                alt="home-banner"
              />
            </div>
          </div>
        </div>
      </div>

      <Category />

      {loading ? (
        <Loading />
      ) : (
        <div className="product-home__main container">
          <div className="row">
            <div className="col-12">
              <div className="product-home__header">
                <div className="product-home__today">
                  <h3 className="product-home__title">GỢI Ý HÔM NAY</h3>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            {productList.items.map((productItem, index) => (
              <div key={index} className="col-2-5">
                <Product  product={productItem} />
              </div>
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
