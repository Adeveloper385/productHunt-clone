import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { es } from "date-fns/locale";
import Link from "next/link";
import Image from "next/image";

function ProductDetails({ product }) {
  const {
    id,
    comments,
    create_at,
    description,
    business,
    name,
    url,
    imageUrl,
    likes,
  } = product;

  return (
    <li className="product">
      <div className="product-description">
        <div>
          <Image width={400} height={300} src={imageUrl} />
        </div>
        <div>
          <Link href="/products/[id]" as={`/products/${id}`}>
            <a className="title">{name}</a>
          </Link>
          <p className="description">{description}</p>
          <div className="comments">
            <div>
              <Image
                width={15}
                height={15}
                src="/static/img/comentario.png"
              />
              <p>{comments.length} Comentarios</p>
            </div>
          </div>
          <p>
            Publicado hace:{" "}
            {formatDistanceToNow(new Date(create_at), { locale: es })}
          </p>
        </div>
      </div>
      <div className="likes">
        <div>&#9650;</div>
        <p>{likes}</p>
      </div>
      <style jsx>
        {`
          .img {
            width: 300px;
          }
          .product {
            padding: 4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 1px solid #e1e1e1;
          }

          .product-description {
            flex: 0 1 600px;
            display: grid;
            grid-template-columns: 1fr 3fr;
            column-gap: 2rem;
          }

          .title {
            font-size: 2rem;
            font-weight: bold;
            margin: 0;
            color: #000;
          }

          .description {
            font-size: 1.6rem;
            margin: 0;
            color: #888;
          }

          .title :hover {
            cursor: pointer;
          }

          .comments {
            margin-top: 2rem;
            display: flex;
            align-items: center;
          }

          .comments div {
            display: flex;
            align-items: center;
            border: 1px solid #e1e1e1;
            padding: 0.3rem 1rem;
            margin-right: 2rem;
          }

          .comments div img {
            width: 2rem;
            margin-right: 2rem;
          }

          .comments div p {
            font-size: 1.6rem;
            margin-righ: 1rem;
            font-weight: 700;
          }

          .likes {
            flex: 0 0 auto;
            padding: 1rem 3rem;
            border: 1px solid #e1e1e1;
            text-align: center;
          }

          .likes div {
            font-size: 2rem;
          }

          .likes p {
            margin: 0;
            font-size: 2rem;
            font-weight: 700;
          }
        `}
      </style>
    </li>
  );
}

export default ProductDetails;
