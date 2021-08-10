import React, { useState } from 'react'
import Router from "next/router"
import Layout from "../components/layout";
import useValidation from "../hooks/useValidation";
import createAccountValidation from "../validation/CreateAccount";

import firebase from "../firebase";

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
};

export default function Register() {

  const [error, setError ] = useState(false)

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, createAccountValidation, createAcount);

  const { name, email, password } = values;

  async function createAcount() {
    try {
      await firebase.register(name, email, password);
      Router.push('/')
    } catch (error) {
      console.error('Ha ocurrido un error', error.message)
      console.log(error.message)
      setError(error.mesage)
    }
  }

  return (
    <>
      <Layout>
        <h1>Registrate</h1>
        <form className="form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="">Nombre</label>
            <input
              type="text"
              id="name"
              value={name}
              name="name"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.name && <p className="error">{errors.name}</p>}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.email && <p className="error">{errors.email}</p>}
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          {error && <p className="error">{error}</p>}
          <input className="submit" type="submit" value="Crear Cuenta" />
        </form>
      </Layout>
      <style jsx>
        {`
          .submit {
            font-weight: 700;
            text-transform: uppercase;
            border: none;
            padding: 1rem;
            background-color: var(--naranja);
            color: #fff;
            font-size: 1.8rem;
            text-align: center;
            width: 100%;
          }

          .submit :hover {
            cursor: pointer;
          }

          h1 {
            text-align: center;
            margin-top: 5rem;
          }
        `}
      </style>
    </>
  );
}
