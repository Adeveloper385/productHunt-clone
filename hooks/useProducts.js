import React, { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../firebase";

const useProducts = (order) => {
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
        .orderBy(order, "desc")
        .onSnapshot(snapshotManager);
    })();
  }, []);

  return {
    products
  }
};

export default useProducts;
