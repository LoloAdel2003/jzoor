import React from "react";


export default function HeroSection() {
  return (
    <section
      id="Home"
      className="px-20 landing bg-[#FAF7F2] pt-[86px] md:pt-[145.5px] h-screen relative overflow-hidden pb-[60px]"
    >
      <div className="flex justify-center md:justify-between items-center h-full w-full max-w-screen-xl relative">
        <div className="flex items-center h-full">
          <div className="w-full max-w-[500px]  md:text-left">
            <h1 className="text-[30px] md:text-[30px] lg:text-[40px] font-bold mb-4 relative">
              <img
                src="imges/twemoji_olive.png"
                alt=""
                className="absolute right-0 right-[-40px] top hidden lg:block text-[40px]"
              />
              Rooted in{" "}
              <span className="text-[#4B5929]">Heritage,</span>{" "}
              <span className="text-[#4B5929]">Blooming </span>
              {/* <br /> */}
              in Beauty
            </h1>
            <p className="mb-2 text-[16px] font-light leading-normal text-[#5A5A45] leading-relaxed">
              Every plant, flower, and gift we offer tells a story — of
              Palestinian roots, timeless beauty, and the joy of giving from the
              heart. Let nature bloom in your home with the spirit of Palestine
              in every leaf and petal.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-6 relative z-10">
              <a href="#Products">
                <button className="bg-[#4B5929] text-white font-medium text-lg w-[130px] h-[50px] rounded-[10px] transition-all duration-300 transform hover:scale-105 shadow-md cursor-pointer">
                  Shop Now
                </button>
              </a>
              <img
                src="imges/twemoji_olive.png"
                alt=""
                className="absolute right-0 left-[150px] top-[0px] hidden md:block w-[60px] lg:hidden"
              />
            </div>
          </div>
        </div>

        <div className="hidden md:block md:w-[200px] md:h-[400px] lg:mb-[120px] xl:w-[450px] relative mt-28">
          <img src="imges/pngtree-white-lily-of-the-valley-bouquet-in-decorative-ceramic-vase-serene-png-image_16177895.png" alt="" />
        </div>
      </div>
    </section>
  );
}
