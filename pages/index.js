import Layout from "../components/layout";
import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";
import ProductDetails from "../components/layout/ProductDetails";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { firebase } = useContext(FirebaseContext);

  useEffect(() => {
    function snapshotManager(snapshot) {
      const products = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });
      setProducts(products);
    }

    (function getProducts() {
      firebase.db
        .collection("products")
        .orderBy("create_at", "desc")
        .onSnapshot(snapshotManager);
    })();
  }, []);

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
