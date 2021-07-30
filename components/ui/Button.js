import React from "react";

function Button(props) {
  return (
    <>
      <button>{props.text}</button>
      <style jsx>
        {`
          button {
            font-weight: 700;
            text-transform: uppercase;
            border: 1px solid #d1d1d1;
            padding: 0.8rem 2rem;
            margin-right: ${props.last ? 0 : "1rem"};
            background-color: ${props.bgColor ? "#DA552f" : "white"};
            color: ${props.bgColor ? "white" : "#000"};
          }

          button :hover {
            cursor: pointer;
        }
        `}
      </style>
    </>
  );
}

export default Button;
