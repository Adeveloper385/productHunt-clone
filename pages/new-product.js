import React, { useState, useContext } from "react";
import Router, { useRouter } from "next/router";
import Layout from "../components/layout";
import useValidation from "../hooks/useValidation";
import createProductValidation from "../validation/CreateProduct";
import FileUploader from "react-firebase-file-uploader";
import Error404 from "../components/layout/404";

import { FirebaseContext } from "../firebase";
import Button from "../components/ui/Button";

const INITIAL_STATE = {
  name: "",
  business: "",
  image: "",
  url: "",
  description: "",
};

export default function NewProduct() {
  const [error, setError] = useState(false);
  const [imageName, setImageName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState("");

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, createProductValidation, createProduct);

  const { name, business, image, url, description } = values;

  const { firebase, user } = useContext(FirebaseContext);

  const router = useRouter();

  async function createProduct() {
    if (!user) {
      router.push("/login");
    }

    const product = {
      name,
      business,
      url,
      imageUrl,
      description,
      likes: 0,
      comments: [],
      create_at: Date.now(),
      created_by: {
        id: user.uid,
        name: user.displayName,
      },
      hasVoted: [],
    };

    firebase.db.collection("products").add(product);

    router.push("/");
  }

  //    Event Handlers

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = (progress) => setProgress({ progress });

  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  };

  const handleUploadSucces = (name) => {
    setUploading(false);
    setProgress(100);
    setImageName(name);
    firebase.storage
      .ref("products")
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImageUrl(url);
      });
  };

  if (!user)
    return (
      <Layout>
        <Error404 />
      </Layout>
    );

  return (
    <>
      <Layout>
        <h1>Nuevo Producto</h1>
        <form className="form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Información General</legend>
            <div className="field">
              <label htmlFor="name">Nombre</label>
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
              <label htmlFor="business">Empresa</label>
              <input
                type="text"
                id="business"
                value={business}
                name="business"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.business && <p className="error">{errors.business}</p>}

            <div className="field">
              <label htmlFor="image">Imagen</label>
              <FileUploader
                accept="image/*"
                id="image"
                name="image"
                randomizeFilename
                storageRef={firebase.storage.ref("products")}
                onUploadStart={handleUploadStart}
                onUploadError={handleUploadError}
                onUploadSuccess={handleUploadSucces}
                onProgress={handleProgress}
              />
            </div>

            <div className="field">
              <label htmlFor="url">Url</label>
              <input
                type="text"
                id="url"
                value={url}
                name="url"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.url && <p className="error">{errors.url}</p>}
          </fieldset>
          <fieldset>
            <legend>Sobre tu Producto</legend>
            <div className="field">
              <label htmlFor="description">Descripción</label>
              <textarea
                type="text"
                id="description"
                value={description}
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            {errors.description && (
              <p className="error">{errors.description}</p>
            )}
          </fieldset>

          {error && <p className="error">{error}</p>}
          <Button type="submit" text="Crear Producto" bgColor={true} />
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
