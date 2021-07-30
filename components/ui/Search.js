import React from "react";

function Search() {
  return (
    <form>
      <input 
        type="text" 
        placeholder="Buscar..." 
        className="input-search" 
      />
      <button type="submit" className="input-submit">
        Buscar
      </button>
      <style jsx>{`
        .input-search {
          border: 1px solid var(--gris3);
          padding: 1rem;
          min-width: 300px;
        }

        .input-submit {
          height: 3rem;
          width: 3rem;
          display: block;
          background-size: 4rem;
          background-image: url("/static/img/buscar.png");
          background-repeat: no-repeat;
          position: absolute;
          right: 1rem;
          top: 1px;
          background-color: white;
          border: none;
          text-indent: -9999px;
        }

        .input-submit :hover {
          cursor: pointer;
        }

        form {
          position: relative;
        }
      `}</style>
    </form>
  );
}

export default Search;
