import axios from "axios";
// import { set } from "immer/dist/internal";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Product from "../components/Product";
import "../styles/CategoryItem.scss";

function CategoryItem(props) {
  let { id } = useParams();
  const [loading, setLoading] = useState(false);

  const [categoryItem, setCategoryItem] = useState({
    items: [],
    limit: 10,
    page: 0,
    total_item: 0,
  });

  useEffect(() => {
    loadCategoryItem();
  }, []);

  const loadCategoryItem = async () => {
    setLoading(true);
    try {
      const endpoint =
      process.env.REACT_APP_BACKEND_HOST + "/category/" + id + "/product";

      const { data } = await axios({
        url: endpoint,
        method: 'get',
        headers: {},
        data: {},
      });

      setCategoryItem(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      <Header />

      <div className="category-item__main">
        <div className="container">
          <div className="category-item__title">Danh mục sản phẩm:</div>
    
          {loading ? (
            <Loading />
          ) : (
            <div className="container">
              <div className="row">
                  {categoryItem.items.map((value, index) => (
                    <div  key={index} className="col-2-5">
                      <Product product={value} />
                    </div>
                  ))}
              </div>
              </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default CategoryItem;
