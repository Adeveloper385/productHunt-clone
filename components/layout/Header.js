import React, { useContext } from "react";
import Search from "../ui/Search";
import Nav from "./Nav";
import Button from "../ui/Button";
import { FirebaseContext } from "../../firebase";

import Link from "next/link";

function Header() {

  const { user, firebase } = useContext(FirebaseContext)
  console.log(user)

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
              <p className="hi">Hola! {user.displayName}</p>
              <Button text="Cerrar Sesión" onClick={() => firebase.logOut()} />
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
