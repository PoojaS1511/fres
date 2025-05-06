import React from "react";

const Card = ({ image, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition duration-300 animate-fade-in-up">
      <img
        src={image}
        alt={title}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h3 className="text-xl font-bold text-green-700 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Card;
