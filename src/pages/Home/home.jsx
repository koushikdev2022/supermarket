import { Avatar, Accordion } from "flowbite-react";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import {
  AiFillExclamationCircle,
  AiFillPlusCircle,
  CiDiscount1,
  GoPlus,
} from "../../assets/icons";
import {
  bannerLogo,
  bikeIcon,
  cat01,
  cat02,
  cat03,
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
  offer01,
  offer02,
  offer03,
  offercard01,
  offercard02,
  offercard03,
  shopBanner,
  slide2,
  vanIcon,
} from "../../assets/images/images";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  getDailyNeeds,
  getFreshProduct,
} from "../../reducers/HomeSlice";
import HomeCategory from "./HomeCategory";
import FreshProduct from "./FreshProduct";
import DailyNeeds from "./DailyNeeds";

const Home = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  var our_offers_slider_setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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

  let userLang = localStorage.getItem("userLanguage");

  console.log(userLang, "userLanguage body");
  const { categories, freshProlist, dailyNeedsPro } = useSelector(
    (state) => state?.homes
  );
  const dispatch = useDispatch();
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
  useEffect(() => {
    dispatch(getCategories());
  }, []);
  useEffect(() => {
    dispatch(getFreshProduct({ categoryId: 37 }));
    dispatch(getDailyNeeds({ categoryId: 38 }));
  }, []);
  console.log("DailyNeeds: ", dailyNeedsPro);

  console.log("categories", categories);

  return (
    <div className="px-7">
      {/*  */}
      <div className="bg-white py-6 px-10 shadow-md rounded-t-xl view_order_area mb-10">
        <div
          className={`text-center lg:text-left lg:flex ${
            userLanguage == "english"
              ? "justify-between"
              : "flex-row-reverse justify-between"
          }`}
        >
          <Link to="/order-list" className="text-base text-black font-bold">
            My orders
          </Link>
          <p className="text-base text-black font-medium">All 23</p>
          <p className="text-base text-black font-medium">Current 0</p>
          <p className="text-base text-[#BE7A3A] font-bold hover:text-black">
            <Link to="/cart">View orders</Link>
          </p>
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="bg-[#f6f3ed] rounded-xl p-1.5 mb-10">
        <div
          className={`lg:flex ${
            userLanguage == "english" ? "" : "flex-row-reverse"
          }`}
        >
          <div className="w-full lg:w-6/12 bg-white rounded-xl p-4">
            <div className="lg:flex justify-between items-center">
              <div className="flex justify-center items-center mb-2">
                <AiFillExclamationCircle className="text-[#f6bc56] text-xl" />
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">Free delivery</p>
                <strong className="text-xs text-[#231000]">+200 riyal</strong>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">Minimum order</p>
                <strong className="text-xs text-[#231000]">100 riyal </strong>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">Appointment delivery</p>
                <strong className="text-xs text-[#231000]">
                  Tomorrow 11 AM
                </strong>
              </div>
              <div className="flex justify-center items-center">
                <h3 className="text-base text-[#231000] pr-2 font-bold">
                  Delivery schedule
                </h3>
                <img src={vanIcon} alt="vanIcon" />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-6/12 p-4">
            <div className="lg:flex justify-between items-center">
              <div className="flex justify-center items-center mb-2">
                <AiFillExclamationCircle className="text-[#f6bc56] text-xl" />
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">
                  The minimum order requirement
                </p>
                <strong className="text-xs text-[#231000]">75 SAR</strong>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">Product</p>
                <strong className="text-xs text-[#231000]">+ 40.000</strong>
              </div>
              <div className="text-center">
                <p className="text-xs text-[#231000]">Delivery</p>
                <strong className="text-xs text-[#231000]">
                  60 to 120 minutes{" "}
                </strong>
              </div>
              <div className="flex justify-center items-center">
                <h3 className="text-base text-[#231000] pr-2 font-bold">
                  Quick delivery
                </h3>
                <img src={bikeIcon} alt="bikeIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/* Banner start here  */}
      <div className="shop_banner_slider">
        <Slider {...settings}>
          <div className="shop_banner_slider_box">
            <img src={shopBanner} alt="shopBanner" className="w-full" />
            <div className="shop_banner_slider_box_cont">
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <img
                    src={bannerLogo}
                    alt="bannerLogo"
                    className="inline-block w-6 lg:w-16 lg:mb-3"
                  />
                  <p className="text-black text-sm lg:text-xl font-medium">
                    Shop from your place.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="shop_banner_slider_box">
            <img src={shopBanner} alt="shopBanner" className="w-full" />
            <div className="shop_banner_slider_box_cont">
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <img
                    src={bannerLogo}
                    alt="bannerLogo"
                    className="inline-block w-6 lg:w-16 lg:mb-3"
                  />
                  <p className="text-black text-sm lg:text-xl font-medium">
                    Shop from your place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      {/* Banner ends here */}
      {/* Product start here */}
      <div className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div
            className={`flex ${
              userLanguage == "english" ? "justify-start" : "flex-row-reverse"
            } items-center border border-[#ece7e3] bg-white rounded-xl px-8 py-4 shadow-md`}
          >
            <CiDiscount1 className="text-[#be7a3a] text-3xl" />
            <p className="text-xs text-black font-medium text-left ml-4">
              Check on{" "}
              <span className="text-sm text-black font-medium block">
                Offers
              </span>
            </p>
          </div>
          <div
            className={`flex ${
              userLanguage == "english" ? "justify-start" : "flex-row-reverse"
            } items-center border border-[#ece7e3] bg-white rounded-xl px-8 py-4 shadow-md`}
          >
            <CiDiscount1 className="text-[#be7a3a] text-3xl" />
            <p className="text-xs text-black font-medium text-left ml-4">
              Check on{" "}
              <span className="text-sm text-black font-medium block">
                Offers
              </span>
            </p>
          </div>
          <div
            className={`flex ${
              userLanguage == "english" ? "justify-start" : "flex-row-reverse"
            } items-center border border-[#ece7e3] bg-white rounded-xl px-8 py-4 shadow-md`}
          >
            <CiDiscount1 className="text-[#be7a3a] text-3xl" />
            <p className="text-xs text-black font-medium text-left ml-4">
              Check on{" "}
              <span className="text-sm text-black font-medium block">
                Offers
              </span>
            </p>
          </div>
        </div>
      </div>
      {/* Product ends here */}
      {/*  */}
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-3">
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food01} alt="food01" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Milk and cheese
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food02} alt="food02" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Your summer vacation
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food03} alt="food03" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Milk and cheese{" "}
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food04} alt="food04" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Chocolate and sweets
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food05} alt="food05" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Fruits
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food06} alt="food06" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Our offers{" "}
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food07} alt="food07" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Our new arrivals have arrived.
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food01} alt="food01" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Your summer vacation
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food02} alt="food02" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Vegetables
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food03} alt="food03" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Fruits
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food04} alt="food04" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Your summer vacation
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food05} alt="food05" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Our new arrivals have arrived.
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food06} alt="food06" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Your summer escape
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food07} alt="food07" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Vegetables
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food01} alt="food01" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Chocolate
          </p>
        </div>
        <div className="text-center float-left">
          <div className="text-center mb-3">
            <img src={food02} alt="food02" className="inline-block" />
          </div>
          <p className="text-base leading-[20px] text-black font-bold px-4">
            Milk and cheese
          </p>
        </div>
      </div>
      {/*  */}
      {/* Favorite products start here */}

      <DailyNeeds userLanguage={userLanguage} dailyNeedsPro={dailyNeedsPro} />
      {/* Favorite products ends here */}
      {/* offer section start here */}
      <div className="flex gap-4 mb-6">
        <div className="w-6/12">
          <img src={offer01} alt="offer01" className="w-full" />
        </div>
        <div className="w-6/12">
          <img src={offer02} alt="offer02" className="w-full" />
        </div>
      </div>
      <div>
        <img src={offer03} alt="offer03" className="w-full" />
      </div>
      {/* offer section ends here */}
      {/* Best offers start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Best offers
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            Favorite products
          </p>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp01}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp02}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp03}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp04}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp05}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center border-b border-[#faf4ee]">
                <img
                  src={fp06}
                  alt="fp01"
                  className="inline-block rounded-xl w-full h-[144px]"
                />
              </div>
              <div
                className={`${
                  userLanguage == "english" ? "text-left" : "text-right"
                } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
                <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                  <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                    23 SAR
                  </span>
                  12% off{" "}
                </h4>
                <p className="text-[#231000] text-base leading-[20px] font-normal">
                  Fresh Cheddar Cheese 100 grams
                </p>
              </div>
            </div>
          </Slider>
        </div>
      </div>
      {/* Best offers ends here */}
      {/* Our offers for you start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Our offers for you
          </h3>
        </div>
        <div className="our_offers_slider_section">
          <Slider {...our_offers_slider_setting}>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard01}
                alt="offercard01"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard02}
                alt="offercard02"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard01}
                alt="offercard01"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard02}
                alt="offercard02"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard01}
                alt="offercard01"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl overflow-hidden">
              <img
                src={offercard02}
                alt="offercard02"
                className="rounded-xl w-full"
              />
            </div>
          </Slider>
        </div>
      </div>
      {/* Our offers for you ends here */}
      {/* Banner start here  */}
      <div className="shop_banner_slider pt-5">
        <Slider {...settings}>
          <div className="shop_banner_slider_box">
            <img src={slide2} alt="slide2" className="w-full" />
            <div className="shop_banner_slider_box_cont lg:pl-[200px]">
              <div className="flex justify-between items-center w-full lg:w-6/12 h-full">
                <div className="text-center hidden md:block">
                  <img
                    src={bannerLogo}
                    alt="bannerLogo"
                    className="inline-block w-16 mb-3"
                  />
                  <p className="text-black text-xl font-medium">
                    Shop from your place.
                  </p>
                </div>
                <div className="flex justify-center items-center w-full">
                  <Link className="bg-[#F6BC56] text-sm lg:text-base text-black font-medium px-4 lg:px-16 py-1 lg:py-3 rounded-lg">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="shop_banner_slider_box">
            <img src={slide2} alt="slide2" className="w-full" />
            <div className="shop_banner_slider_box_cont lg:pl-[200px]">
              <div className="flex justify-between items-center w-full lg:w-6/12 h-full">
                <div className="text-center hidden md:block">
                  <img
                    src={bannerLogo}
                    alt="bannerLogo"
                    className="inline-block w-16 mb-3"
                  />
                  <p className="text-black text-xl font-medium">
                    Shop from your place.
                  </p>
                </div>
                <div className="flex justify-center items-center w-full">
                  <Link className="bg-[#F6BC56] text-sm lg:text-base text-black font-medium px-4 lg:px-16 py-1 lg:py-3 rounded-lg">
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
      {/* Banner ends here */}
      {/* Order again start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Order again
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            View all
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp01}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp02}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp03}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp04}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp05}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp06}
                alt="fp01"
                className="inline-block rounded-xl w-full h-[144px]"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Order again ends here */}
      {/* Our offers for you start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            savings
          </h3>
        </div>
        <div className="our_offers_slider_section">
          <Slider {...our_offers_slider_setting}>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard01}
                alt="offercard01"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard02}
                alt="offercard02"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard03}
                alt="offercard03"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard02}
                alt="offercard02"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard01}
                alt="offercard01"
                className="rounded-xl w-full"
              />
            </div>
            <div className="bg-white border-2 border-[#ebe6e2] p-0 rounded-xl">
              <img
                src={offercard03}
                alt="offercard03"
                className="rounded-xl w-full"
              />
            </div>
          </Slider>
        </div>
      </div>
      {/* Our offers for you ends here */}
      {/* Best offers start here */}
      {/* <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Fresh products
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            Favorite products
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp01}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp02}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp03}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp04}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp05}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center border-b border-[#faf4ee]">
              <img
                src={fp06}
                alt="fp01"
                className="inline-block rounded-xl w-full"
              />
            </div>
            <div
              className={`${
                userLanguage == "english" ? "text-left" : "text-right"
              } px-4 pb-4 mt-[-20px] min-h-[160px]`}
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
              <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                  23 SAR
                </span>
                12% off{" "}
              </h4>
              <p className="text-[#231000] text-base leading-[20px] font-normal">
                Fresh Cheddar Cheese 100 grams
              </p>
            </div>
          </div>
        </div>
      </div> */}
      <FreshProduct userLanguage={userLanguage} freshProlist={freshProlist} />
      {/* Best offers ends here */}
      {/* Categories start here */}
      {/* <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Categories
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            View all
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Juices</p>
            </div>
            <div className="text-center">
              <img
                src={cat01}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">
                Vegetables and fruits
              </p>
            </div>
            <div className="text-center">
              <img
                src={cat02}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Milk</p>
            </div>
            <div className="text-center">
              <img
                src={cat03}
                alt="cat03"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Juices</p>
            </div>
            <div className="text-center">
              <img
                src={cat01}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">
                Vegetables and fruits
              </p>
            </div>
            <div className="text-center">
              <img
                src={cat02}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Milk</p>
            </div>
            <div className="text-center">
              <img
                src={cat03}
                alt="cat03"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
        </div>
      </div> */}
      <HomeCategory userLanguage={userLanguage} categories={categories} />
      {/* Categories ends here */}
      {/* Last Offer start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Last offers
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            View all
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Juices</p>
            </div>
            <div className="text-center">
              <img
                src={cat01}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">
                Vegetables and fruits
              </p>
            </div>
            <div className="text-center">
              <img
                src={cat02}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Milk</p>
            </div>
            <div className="text-center">
              <img
                src={cat03}
                alt="cat03"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Juices</p>
            </div>
            <div className="text-center">
              <img
                src={cat01}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">
                Vegetables and fruits
              </p>
            </div>
            <div className="text-center">
              <img
                src={cat02}
                alt="cat01"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
          <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
            <div className="text-center py-14">
              <p className="text-[#231000] text-base font-medium">Milk</p>
            </div>
            <div className="text-center">
              <img
                src={cat03}
                alt="cat03"
                className="inline-block rounded-xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Last Offer ends here */}
    </div>
  );
};

export default Home;
