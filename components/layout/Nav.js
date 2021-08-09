import React, { useContext } from "react";
import Link from "next/link";
import { FirebaseContext } from "../../firebase";

function Nav() {
  const { user } = useContext(FirebaseContext);

  return (
    <nav>
      <Link href="/">
        <a>Inicio</a>
      </Link>
      <Link href="/featured">
        <a>Populares</a>
      </Link>
      {user && (
        <Link href="/new-product">
          <a>Nuevo Producto</a>
        </Link>
      )}

      <style jsx>
        {`
          nav {
            padding-left: 2rem;
          }
          nav a {
            font-size: 1.8rem;
            margin-left: 2rem;
            color: var(--gris2);
            font-family: "Pt Sans", sans-serif;
          }
          nava: &last-of-type {
            margin-right: 0;
          }
        `}
      </style>
    </nav>
  );
}

export default Nav;
