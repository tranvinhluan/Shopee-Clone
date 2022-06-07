import React from "react";
import { Link } from "react-router-dom";

function Product({ product }) {
  return (
    // <div className="col-2-5">
    <div className="product">
      <Link to={"/product/" + product._id}>
        <div className="product__image">
          <img src={product.image} alt="" />
        </div>
        <div className="product__name">{product.name}</div>
        <div className="product__price">
          {product.price.toLocaleString()}<sup>đ</sup>
        </div>
        <div>còn hàng</div>
      </Link>
    </div>
    //  </div>
  );
}

export default Product;
