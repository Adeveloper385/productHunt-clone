import React from "react";
import Search from "../ui/Search";
import Nav from "./Nav";
import Button from "../ui/Button";

import Link from "next/link";

function Header() {
  const user = false;

  return (
    <>
      <header className="container">
        <div className="search">
          <Link href="/">
            <p className="logo">P</p>
          </Link>

          <Search />
          <Nav />
        </div>
        <div className="buttons-container">
          {user ? (
            <>
              <p className="hi">Hola! André</p>
              <Button text="Cerrar Sesión" />
            </>
          ) : (
            <>
              <Link href="/login">
                <a>
                  <Button text="Iniciar Sesión" bgColor={true} />
                </a>
              </Link>
              <Link href="/register">
                <a>
                  <Button text="Registrarme" last={true} />
                </a>
              </Link>
            </>
          )}
        </div>
      </header>
      <style jsx>
        {`
          header {
            border-bottom: 2px solid var(--gris3);
            padding: 1rem 0;
          }

          .logo {
            color: var(--naranja);
            font-family: "Roboto Slab" serif;
            font-size: 4rem;
            line-height: 0;
            font-weight: 700;
            margin-right: 2rem;
          }

          .buttons-container {
            display: flex;
            align-items: center;
          }

          .hi {
            margin-right: 2rem;
          }

          .search {
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </>
  );
}

export default Header;
