import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Category.scss";

function Category(props) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const endpoint = process.env.REACT_APP_BACKEND_HOST + "/category";

      const { data } = await axios({
        url: endpoint,
        headers: {},
        data: {},
      });

      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-main">
      <div className="container">
       <div className="row">
          <div className="col-12">
            <div className="category-inner">
              <div className="category-header">CATEGORY</div>
      
              <div className="category-list">
                {categories.map((Item, index) => (
                  <div
                    className="category-item"
                    key={index}
                    // onClick={handle}
                  >
                    <Link to={"/category/" + Item._id + "/product"}>
                      <img
                        className="category-image"
                        src={Item.image}
                        alt={Item.image}
                      />
                      <h4 className="category-name">{Item.name}</h4>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
       </div>
      </div>
    </div>
  );
}

export default Category;
