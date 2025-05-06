import React from "react";


const Hero = ({ title, subtitle, buttonText, buttonLink }) => {
  return (
    <section className="bg-green-600 text-white py-20 px-6 animate-fade-in">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-lg md:text-xl mb-8">{subtitle}</p>
        <a
          href={buttonLink}
          className="bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-100 transition duration-300"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
};

export default Hero;
