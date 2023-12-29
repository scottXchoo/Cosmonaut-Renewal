import React from "react";

function AboutCode(props) {
  return (
    <>
      <h1 class="w-full text-3xl font-heading place-content-center mb-2">
        {props.children}!
      </h1>
    </>
  );
}

export default AboutCode;
