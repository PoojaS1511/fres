import React from "react";

const Button = ({ text, link }) => {
  return (
    <a
      href={link}
      className="inline-block bg-green-700 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-green-800 transition duration-300"
    >
      {text}
    </a>
  );
};

export default Button;
