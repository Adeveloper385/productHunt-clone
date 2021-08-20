import Layout from "../components/layout";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ProductDetails from "../components/layout/ProductDetails";
import useProducts from "../hooks/useProducts";

function Search() {
  const router = useRouter();
  const {
    query: { q },
  } = router;

  console.log(q)
  const [result, setResult] = useState([]);

  const { products } = useProducts("create_at");

  useEffect(() => {
    const search = q.toLowerCase();
    const filter = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search) ||
        p.description.toLowerCase().includes(search)
    );

    setResult(filter);
  }, [q, products]);

  if(result.length === 0) return <Layout><h1>Producto no Encontrado</h1></Layout>

  return (
    <>
      <Layout>
        <div className="product-list">
          <div className="container">
            <ul className="bg-white">
              {
                result.map(product => (
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

export default Search;
