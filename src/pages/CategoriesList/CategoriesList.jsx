import React, { useEffect, useState } from "react";
import {
  bestSeller01,
  bestSeller02,
  bestSeller03,
  bestSeller04,
  chocolateBanner,
  chocolateList,
  food01,
  food02,
  food03,
  food04,
  food05,
  food06,
  food07,
  fp01,
  fp02,
  fp03,
  fp04,
  fp05,
  fp06,
  sweet01,
  sweet02,
  sweet03,
  sweetlist,
} from "../../assets/images/images";
import { GoPlus, IoIosArrowBack, IoIosArrowForward } from "../../assets/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CategoriesList = () => {
  var daily_needs_setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrow: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || "english"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setUserLanguage(localStorage.getItem("userLanguage") || "english");
    };

    // Listen for the custom storage event
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="px-7">
      <div className="pb-6 block">
        <ul
          // className="flex items-center"
          className={`flex ${
            userLanguage == "english" ? "items-center" : "flex-row-reverse"
          }`}
        >
          <li className={`flex ${userLanguage == "english" ? "pr-3" : "pl-3"}`}>
            {userLanguage == "english" ? (
              <>
                <Link
                  to="/"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  The home page <IoIosArrowForward />
                </Link>
              </>
            ) : (
              <>
                {" "}
                <Link
                  to="/"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  <IoIosArrowBack />
                  The home page
                </Link>
              </>
            )}
          </li>
          <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
            Chocolate and sweets/candies
          </li>
        </ul>
      </div>
      {/* Banner start here  */}
      <div className="shop_banner_slider">
        <div className="shop_banner_slider_box">
          <img src={chocolateBanner} alt="chocolateBanner" className="w-full" />
        </div>
      </div>
      {/* Banner ends here */}
      {/* Favorite products start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Best Sellers{" "}
          </h3>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller01}
                  alt="bestSeller01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller02}
                  alt="bestSeller02"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller03}
                  alt="bestSeller03"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller04}
                  alt="bestSeller04"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller01}
                  alt="bestSeller01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller02}
                  alt="bestSeller02"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* Favorite products ends here */}
      {/* Chocolate product start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Chocolate
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-3">
          <div className="text-center float-left">
            <Link to="/product-list">
              <div className="text-center mb-3">
                <img
                  src={chocolateList}
                  alt="chocolateList"
                  className="inline-block"
                />
              </div>
              <p className="text-sm text-black font-bold px-4">Chocolate</p>
            </Link>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img
                src={chocolateList}
                alt="chocolateList"
                className="inline-block"
              />
            </div>
            <p className="text-sm text-black font-bold px-4">Chocolate</p>
          </div>
        </div>
      </div>
      {/* Chocolate product ends here */}
      {/* Sweet product start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Sweets
          </h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-8 gap-3">
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
          <div className="text-center float-left">
            <div className="text-center mb-3">
              <img src={sweetlist} alt="sweetlist" className="inline-block" />
            </div>
            <p className="text-sm text-black font-bold px-4">Sweets</p>
          </div>
        </div>
      </div>
      {/* Sweet product ends here */}
      {/* Favorite products start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Chocolate
          </h3>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller01}
                  alt="bestSeller01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller02}
                  alt="bestSeller02"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller03}
                  alt="bestSeller03"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller01}
                  alt="bestSeller01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller02}
                  alt="bestSeller02"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller03}
                  alt="bestSeller03"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* Favorite products ends here */}
      {/* Favorite products start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Sweets or Desserts{" "}
          </h3>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={sweet01}
                  alt="sweet01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={sweet02}
                  alt="sweet01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={sweet03}
                  alt="sweet01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={bestSeller03}
                  alt="bestSeller03"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={sweet01}
                  alt="sweet01"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={sweet02}
                  alt="sweet02"
                  className="inline-block w-full"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4`}
              >
                <div
                  className={`flex ${
                    userLanguage == "english" ? "justify-start" : "justify-end"
                  } mb-0`}
                >
                  <button className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center">
                    <GoPlus className="text-xl text-black" />
                  </button>
                </div>
                <h3 className="text-[26px] text-[#231000] font-medium">
                  23{" "}
                  <span className="text-[#776b61] text-[12px] font-medium">
                    SAR
                  </span>
                </h3>
                <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                  12% off{" "}
                  <span className="text-[#776b61] text-[12px] font-medium line-through">
                    23 SAR
                  </span>
                </h4>
                <p className="text-[#231000] text-sm font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* Favorite products ends here */}
    </div>
  );
};

export default CategoriesList;
