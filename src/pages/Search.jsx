import axios from "axios";
import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loading from "../components/Loading";
import Product from "../components/Product";
import "../styles/Search.scss";

function Search(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");
  const page = searchParams.get("page");

  const [data, setData] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadProducts();
  }, [keyword, page]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const endpoint =
        process.env.REACT_APP_BACKEND_HOST + "/product?search=" + keyword + "&page=" + page;
      const { data } = await axios({
        url: endpoint,
        headers: {},
        data: {},
      });

      setData(data);

      // localStorage.setItem("data", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Header />

      {
        // loading ? (
        // <Loading />
        // ) :
        <div className="products container">
          <div className="row" style={{ width: "100%" }}>
            {data.items.map((product) => {
              return (
                <div className="col-2-5" key={product._id}>
                  <Product product={product} />
                </div>
              );
            })}
          </div>
        </div>
      }

      <Pagination
        total={data.total_item}
        onChange={(page, pageSize) => {
          const host = `${window.location.pathname}?keyword=${searchParams.get(
            "keyword"
          )}&page=${page - 1}`;

          navigate(host);
        }}
      />

      <Footer />
    </div>
  );
}

export default Search;
