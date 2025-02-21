import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  AiFillExclamationCircle,
  GoPlus,
  IoIosArrowBack,
  IoIosArrowForward,
} from "../../assets/icons";
import {
  addresses_icon,
  big_start,
  Edit_Square,
  Favorite_icon,
  UserTwo,
  wallet,
} from "../../assets/images/images";

const Favorite = () => {
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || "english"
  );
  useEffect(() => {
    const handleStorageChange = () => {
      setUserLanguage(localStorage.getItem("userLanguage") || "english");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  return (
    <div className="px-7">
      <div className="pb-6 block">
        <ul
          className={`flex ${
            userLanguage == "english" ? "items-center" : "flex-row-reverse"
          }`}
        >
          {userLanguage == "english" ? (
            <>
              <li className="pr-3">
                <Link
                  to="/"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  The home page <IoIosArrowForward />
                </Link>
              </li>
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                The favorite(s)
              </li>
            </>
          ) : (
            <>
              <li className="pl-3">
                <Link
                  to="/"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  <IoIosArrowBack />
                  The home page
                </Link>
              </li>
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                The favorite(s)
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Product start here */}
      <div className="pb-12">
        <div className="gap-4">
          <div
            className={`flex ${
              userLanguage == "english" ? "justify-start" : "flex-row-reverse"
            } items-center border border-[#ece7e3] bg-white rounded-xl px-8 py-4 shadow-md`}
          >
            <div className="items-center w-full py-12">
              <div className="w-6/12 mx-auto text-center">
                <img
                  src={big_start}
                  alt="big_start"
                  className="inline-block mb-4"
                />
                <h3 className="text-2xl text-[#231000] font-bold pb-4">
                  No favorite products found.
                </h3>
                <p className="text-base text-black font-medium block pb-8">
                  Search for products to add them to <br></br> favorites.
                </p>
                <Link className="bg-[#F6BC56] text-sm lg:text-xl text-black font-semibold px-4 lg:px-40 py-1 lg:py-3 rounded-lg inline-block shadow-md">
                  Browse
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product ends here */}
    </div>
  );
};

export default Favorite;
