import React, { useEffect, useRef, useState, useContext } from "react";
import { HashLink } from "react-router-hash-link";
import { Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import "../App.css";

export default function Navbar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#Home");
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFavoritesClicked, setIsFavoritesClicked] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);

  const mobileSearchRef = useRef();
  const menuBtnRef = useRef();
  const mobileNavRef = useRef();

  const { products,setSelectedProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        mobileSearchOpen &&
        !mobileSearchRef.current?.contains(e.target) &&
        !e.target.closest("#mobileSearchBtn")
      ) {
        setMobileSearchOpen(false);
      }

      if (
        mobileNavOpen &&
        !mobileNavRef.current?.contains(e.target) &&
        !menuBtnRef.current?.contains(e.target)
      ) {
        setMobileNavOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [mobileSearchOpen, mobileNavOpen]);

  useEffect(() => {
    const navLinks = document.querySelectorAll("nav a");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("id");
          const link = document.querySelector(`nav a[href="/#${id}"], nav a[href="#${id}"]`);
          if (entry.isIntersecting && link) {
            setActiveLink(`#${id}`);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id]");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    if (value.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    }
  };

  const handleSuggestionClick = (product) => {
    setSearchInput("");
    setSuggestions([]);
    setSelectedProduct(product)
    navigate(`/product/${product.id}`);
  };

  const sections = [
    "Home",
    "About",
    "Products",
    "Gifts",
    "Tools",
    "Journals",
    
    "contact",
  ];

  return (
    <section className="w-full bg-white fixed z-50 shadow-md">
      <div className="container">
        <header className="flex justify-between items-center gap-6 flex-wrap relative ">
          <Link to="/">
            <img
              src="imges/Logo.png"
              alt="Logo"
              className="w-[80px] h-auto md:w-[120px]"
            />
          </Link>

          <nav className="items-center justify-center gap-[30px] lg:gap-[40px] font-normal md:text-[16px] lg:text-[18px] hidden lg:flex">
            {sections.map((section) => (
              <HashLink
                key={section}
                smooth
                to={`/#${section}`}
                className={`text-black no-underline ${
                  activeLink === `#${section}` ? "active" : ""
                }`}
                onClick={() => setActiveLink(`#${section}`)}
              >
                {section === "contact" ? "Contact Us" : section}
              </HashLink>
            ))}
          </nav>

          <div className="flex items-center gap-4 xl:gap-5 text-xl ">
            <button
              className="block lg:hidden text-xl order-last"
              id="menuBtn"
              ref={menuBtnRef}
              onClick={() => setMobileNavOpen((prev) => !prev)}
            >
              <i
                className={`fa-solid ${
                  mobileNavOpen ? "fa-xmark" : "fa-bars"
                } hover:cursor-pointer`}
              ></i>
            </button>

            <button
              className="block text-xl"
              id="mobileSearchBtn"
              onClick={() => setMobileSearchOpen((prev) => !prev)}
            >
              <i className="fa-solid fa-magnifying-glass hover:cursor-pointer"></i>
            </button>

            <Link
              to="/favorites"
              className="transition text-black no-underline"
              onClick={() => setIsFavoritesClicked((prev) => !prev)}
            >
              <i
                className={`hover:text-[#4B5929] fa-regular fa-heart text-xl lg:text-[20px] ${
                  isFavoritesClicked ? "text-green-500" : "text-black"
                }`}
              ></i>
            </Link>

            <Link
              to="/cart"
              className="hover:text-[#4B5929] transition text-black no-underline"
              onClick={() => setIsCartClicked((prev) => !prev)}
            >
              <i
                className={`fa-solid fa-cart-shopping text-xl lg:text-[20px] ${
                  isCartClicked ? "text-green-500" : "text-black"
                }`}
              ></i>
            </Link>

            <Link
              to="/login"
              className="hover:text-[#4B5929] font-bold hover:underline text-[20px] hidden  text-black no-underline"
            >
              <i className="fas fa-sign-in-alt"></i>
            </Link>
            <Link
              to="/profile"
              className="bg-[#4B5929] font-bold hover:underline h-[24px] w-[24px] rounded-full text-[20px] hidden md:inline-block text-black no-underline"
            > 
            <img src="imges/Profile.png" alt="profile" />
            </Link>
          </div>

          {mobileSearchOpen && (
            <div
              id="mobileSearchContainer"
              ref={mobileSearchRef}
              className="w-full relative mb-2.5"
            >
              <div className="flex items-center w-full h-[50px] border border-[#4B5929] rounded-[10px] px-4 relative">
                <input
                  type="search"
                  placeholder="Search..."
                  value={searchInput}
                  onChange={handleSearchChange}
                  className="flex-1 h-full text-[16px] focus:outline-none placeholder:text-[#777] pr-10"
                />
                <i className="fa-solid fa-magnifying-glass text-[#4B5929] text-lg ml-2"></i>
                {suggestions.length > 0 && (
                  <ul className="h-[400px] overflow-y-auto absolute top-full left-0 w-full bg-white border border-gray-200 rounded mt-1 z-10">
                    {suggestions.map((product) => (
                      <li
                        key={product.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => handleSuggestionClick(product)}
                      >
                        {product.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {mobileNavOpen && (
            <div
              id="mobileNav"
              ref={mobileNavRef}
              className="flex-col items-center w-full bg-white shadow-md rounded-lg text-[18px] font-medium lg:hidden flex-wrap text-center"
            >
              {sections.map((section) => (
                <HashLink
                  key={section}
                  smooth
                  to={`/#${section}`}
                  className="block border-b border-gray-200 py-2 text-black no-underline"
                  onClick={() => {
                    setMobileNavOpen(false);
                    setActiveLink(`#${section}`);
                  }}
                >
                  {section === "contact" ? "Contact Us" : section}
                </HashLink>
              ))}
              <Link
                to="/login"
                className="block py-2 text-black no-underline"
              >
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link
                to="/Profile"
                className="block py-2 text-black no-underline"
              >
                <i className="fas fa-sign-in-alt"></i> Profile
              </Link>
            </div>
          )}
        </header>
      </div>
    </section>
  );
}