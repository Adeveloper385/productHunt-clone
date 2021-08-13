import React, { useState } from 'react'
import Router from "next/router"
import Layout from "../components/layout";
import useValidation from "../hooks/useValidation";
import LoginValidation from "../validation/Login";
import Button from '../components/ui/Button';

import firebase from "../firebase";

const INITIAL_STATE = {
  email: "",
  password: "",
};

export default function Login() {

  const [error, setError ] = useState(false)

  const { values, errors, submitForm, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, LoginValidation, logIn);

  const {email, password } = values;

  async function logIn() {
    try {
      const user = await firebase.logIn(email, password) 
      console.log(user)
      Router.push("/")
    } catch(error) {
      console.error('Ha ocurrido un error al autenticar el usuario', error.message)
      console.log(error.message)
      setError(error.mesage)
    }
  }

  return (
    <>
      <Layout>
        <h1>Iniciar Sesión</h1>
        <form className="form" onSubmit={handleSubmit}>
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
          <Button type="submit" bgColor={true} text="Ingresar" />
        </form>
      </Layout>
      <style jsx>
        {`

          h1 {
            text-align: center;
            margin-top: 5rem;
          }
        `}
      </style>
    </>
  );
}
