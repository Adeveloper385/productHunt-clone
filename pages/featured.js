import Layout from "../components/layout";
import useProducts from "../hooks/useProducts";
import React from "react";
import ProductDetails from "../components/layout/ProductDetails";

export default function Featured() {
  const { products } = useProducts("likes");

  return (
    <>
      <Layout>
        <div className="product-list">
          <div className="container">
            <ul className="bg-white">
              {products.map((product) => (
                <ProductDetails key={product.id} product={product} />
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
