import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const JournalDetails = () => {
  const { id } = useParams();
  const { journals } = useContext(ProductContext);
  const journal = journals.find(j => j.id === parseInt(id));

  if (!journal) return <div className="text-center mt-10">Journal not found</div>;

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto">
      <img src={journal.image} alt={journal.title} className="w-full rounded-lg mb-6" />
      <h1 className="text-3xl font-bold mb-4">{journal.title}</h1>
      <p className="text-gray-700 mb-6">{journal.content}</p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">More Journals</h2>
      <Swiper spaceBetween={20} slidesPerView={1} breakpoints={{
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}>
        {journals
          .filter(j => j.id !== journal.id)
          .map(j => (
            <SwiperSlide key={j.id}>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <img src={j.image} alt={j.title} className="w-full h-40 object-cover rounded-md mb-2" />
                <p className="font-semibold">{j.title}</p>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default JournalDetails;
