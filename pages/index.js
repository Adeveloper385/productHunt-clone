import Layout from "../components/layout";
import React from "react";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

export default function Home() {

  const { products } = useProducts("create_at")

  return (
    <>
      <Layout>
        <div className="product-list">
          <div className="container">
            <ul className="bg-white">
              {
                products.map(product => (
                  <ProductDetails 
                    key={product.id}
                    product={product}
                  /> 
                ))
              }
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
}
