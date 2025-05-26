import React from "react";
import { IoFlowerOutline } from "react-icons/io5";
import { PiFlowerLotusLight } from "react-icons/pi";

export default function HeroSection() {
  return (
    <section
      id="Home"
      className="px-6 sm:px-10 md:px-20 bg-[#FAF7F2] pt-[86px] md:pt-[145.5px] min-h-screen flex flex-col justify-center overflow-hidden pb-10"
    >
      {/* أيقونة الوردة في الخلفية - مخفية في الموبايل */}
      <div className="hidden lg:block absolute text-[100px] text-white right-10 top-20 opacity-20">
        <PiFlowerLotusLight />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 ">
      

        {/* النص */}
        <div className="w-full order-1 md:w-1/2 pt-5 md:pt-0 flex flex-col items-center md:items-start sm:text-center md:text-left">
        <h1 className="text-[30px] md:text-[36px] lg:text-[44px] font-bold leading-tight mb-4 relative  ">
            <img
              src="imges/twemoji_olive.png"
              alt="Olive"
              className="hidden lg:block absolute w-[60px] right-[70px] top-[-10px]"
            />
            Rooted in <span className="text-[#4B5929]">Heritage,</span>{" "}
            <span className="text-[#4B5929]">Blooming</span> in Beauty
          </h1>
          <p className="text-[#5A5A45]    text-[16px] leading-relaxed font-light mb-6">
            Every plant, flower, and gift we offer tells a story — of
            Palestinian roots, timeless beauty, and the joy of giving from the
            heart. Let nature bloom in your home with the spirit of Palestine in
            every leaf and petal.
          </p>

          <div className="flex justify-center md:justify-start gap-4">
            <a href="#Products">
              <button className="bg-[#4B5929] text-white font-medium text-lg w-[130px] h-[50px] rounded-[10px] transition-all hover:scale-105 shadow-md">
                Shop Now
              </button>
            </a>
           
          </div>
        </div>
          
        {/* الصورة */}
        <div className="w-full order-2 md:w-1/2 flex justify-center md:justify-end">
          <img
            src="imges/pngtree-white-lily-of-the-valley-bouquet-in-decorative-ceramic-vase-serene-png-image_16177895.png"
            alt="Flower Vase"
            className="w-[250px]   md:w-[350px] lg:w-[400px] "
          />
        </div>
      </div>
    </section>
  );
}
