import React from "react";
import Link from "next/link";

function Nav() {
  return (
    <nav>
      <Link href="/"><a>Inicio</a></Link>
      <Link href="/featured"><a>Populares</a></Link>
      <Link href="/new-product"><a>Nuevo Producto</a></Link>
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
          nav a :&last-of-type {
            margin-right: 0;
          }
        `}
      </style>
    </nav>
  );
}

export default Nav;
