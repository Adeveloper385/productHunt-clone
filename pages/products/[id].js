import React, { useEffect, useContext, useState } from "react";
import { useRouter } from "next/router";
import { FirebaseContext } from "../../firebase";
import Error404 from "../../components/layout/404";
import Layout from "../../components/layout";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Button from "../../components/ui/Button";
import Image from "next/image";

function Product() {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [comment, setComment] = useState({});
  const [dbQuery, setDbQuery] = useState(true);

  const {
    comments,
    create_at,
    description,
    business,
    name,
    url,
    imageUrl,
    likes,
    created_by,
    hasVoted,
  } = product;

  const router = useRouter();
  const {
    query: { id },
  } = router;

  console.log(router);
  console.log(created_by);

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && dbQuery) {
      (async function getProduct() {
        const productQuery = await firebase.db.collection("products").doc(id);
        const product = await productQuery.get();
        if (product.exists) {
          setProduct(product.data());
          setDbQuery(false);
        } else {
          setError(true);
          setDbQuery(false);
        }
      })();
    }
  }, [id]);

  if (Object.keys(product).length === 0 && !error) {
    return (
      <Layout>
        <h1 style={{ marginTop: "5rem", textAlign: "center" }}>Cargando...</h1>
      </Layout>
    );
  }

  const handleLikes = () => {
    if (!user) router.push("/login");

    const newTotal = likes + 1;

    if (hasVoted.includes(user.uid)) return;

    const newHasVoted = [...hasVoted, user.uid];

    firebase.db
      .collection("products")
      .doc(id)
      .update({ likes: newTotal, hasVoted: newHasVoted });

    setProduct({
      ...product,
      likes: newTotal,
    });

    setDbQuery(true);
  };

  const handleComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
    });
  };

  const isAutor = (id) => {
    if (created_by.id === id) return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) router.push("/");

    comment.userId = user.uid;
    comment.userName = user.displayName;

    const newComments = [...comments, comment];

    firebase.db.collection("products").doc(id).update({
      comments: newComments,
    });

    setProduct({
      ...product,
      comments: newComments,
    });

    setDbQuery(true);
  };

  const canDelete = () => {
    if (!user) return false;

    if (created_by.id === user.uid) {
      return true;
    }
  };

  const deleteProduct = async () => {
    if (!user) return router.push("/login");
    if (!created_by !== user.uid) return router.push("/");
    try {
      firebase.db.collection("products").doc(id).delete();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <>
        {error ? (
          <Error404 />
        ) : (
          <div className="containerLocal">
            <h1>{name}</h1>
            <div className="productsContainer">
              <div>
                <p>
                  Publicado hace:{" "}
                  {formatDistanceToNow(new Date(create_at), { locale: es })}
                </p>
                <p>
                  Por: {created_by.name} de {business}
                </p>
                <Image
                  width={500}
                  height={500}
                  className="img"
                  src={imageUrl}
                />
                <p>{description}</p>

                {user && (
                  <>
                    <h2>Agrega tu comentario</h2>
                    <form onSubmit={handleSubmit}>
                      <div className="field">
                        <input
                          type="text"
                          name="message"
                          onChange={handleComment}
                        />
                      </div>
                      <Button
                        type="submit"
                        bgColor={true}
                        text="Comentar"
                        className="submit"
                      />
                    </form>
                  </>
                )}

                {comments.length === 0 ? (
                  "Aun no hay comentarios"
                ) : (
                  <>
                    <h2 style={{ margin: "2rem 0" }}>Comentarios</h2>
                    <ul>
                      {comments.map((comment, i) => (
                        <li
                          key={`${comment.userId}-${i}`}
                          style={{
                            border: "1px solid #e1e1e1",
                            padding: "2rem",
                            marginBottom: "1rem",
                          }}
                        >
                          <p>{comment.message}</p>
                          <p>
                            Escrito por:
                            <span style={{ fontWeight: "bold" }}>
                              {" "}
                              {comment.userName}
                            </span>
                          </p>
                          {isAutor(comment.userId) && (
                            <p className="autor">Autor</p>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              <aside>
                <Button
                  text="Visitar URL"
                  bgColor={true}
                  target="_blank"
                  href={url}
                  className="button"
                />
                <div style={{ marginTop: "5rem" }}>
                  <p style={{ textAlign: "center" }}>{likes} Votos</p>
                  {user && (
                    <Button
                      text="Votar"
                      bgColor={false}
                      onClick={handleLikes}
                      className="button2"
                    />
                  )}
                </div>
              </aside>
            </div>
            {canDelete() && (
              <Button bgColor={false} text="Eliminar" onClick={deleteProduct} />
            )}
          </div>
        )}
      </>
      <style jsx>
        {`
          h1 {
            margin-top: 5rem;
            text-align: center;
          }

          .containerLocal {
            max-width: 1200px;
            width: 95%;
            margin: 0 auto;
          }

          .img {
            width: 100%
          }

          .autor {
            padding: .5rem 2rem;
            background-color: #DA552F;
            color: #fff;
            text-transform: uppercase;
            font-weight: bold;
            display: inline-block;
            text-align: center;
          }
          }
        `}
      </style>
    </Layout>
  );
}

export default Product;
