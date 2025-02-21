import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  AiFillExclamationCircle,
  AiOutlineDelete,
  GoPlus,
  IoIosArrowBack,
  IoIosArrowForward,
  RiEdit2Fill,
} from "../../assets/icons";
import {
  addresses_icon,
  big_start,
  Edit_Square,
  Favorite_icon,
  UserTwo,
  wallet,
} from "../../assets/images/images";

const Addresses = () => {
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
                My addresses
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
                My addresses
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Product start here */}
      <div className="pb-12">
        <h2 className="text-2xl text-black font-bold mb-5">My addresses</h2>
        <div className="flex gap-8">
          <div className="w-7/12">
            <div className="grid grid-cols-2 gap-8">
              <div className="w-full border border-[#f2efed] bg-[#fafafa] rounded-xl py-4 px-6 text-center shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={addresses_icon} alt="addresses_icon" />
                    <p className="text-black text-xl font-medium">House 4</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="text-2xl bg-[#A63535] p-1.5 font-medium text-white rounded-md mx-3">
                      <AiOutlineDelete />
                    </button>
                    <button className="text-2xl bg-[#1E824C] p-1.5 font-medium text-white rounded-md mx-3">
                      <RiEdit2Fill />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full border border-[#f2efed] bg-[#fafafa] rounded-xl py-4 px-6 text-center shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={addresses_icon} alt="addresses_icon" />
                    <p className="text-black text-xl font-medium">House 4</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="text-2xl bg-[#A63535] p-1.5 font-medium text-white rounded-md mx-3">
                      <AiOutlineDelete />
                    </button>
                    <button className="text-2xl bg-[#1E824C] p-1.5 font-medium text-white rounded-md mx-3">
                      <RiEdit2Fill />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full border border-[#f2efed] bg-[#fafafa] rounded-xl py-4 px-6 text-center shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={addresses_icon} alt="addresses_icon" />
                    <p className="text-black text-xl font-medium">House 4</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="text-2xl bg-[#A63535] p-1.5 font-medium text-white rounded-md mx-3">
                      <AiOutlineDelete />
                    </button>
                    <button className="text-2xl bg-[#1E824C] p-1.5 font-medium text-white rounded-md mx-3">
                      <RiEdit2Fill />
                    </button>
                  </div>
                </div>
              </div>
              <div className="w-full border border-[#f2efed] bg-[#fafafa] rounded-xl py-4 px-6 text-center shadow-md">
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 items-center">
                    <img src={addresses_icon} alt="addresses_icon" />
                    <p className="text-black text-xl font-medium">House 4</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <button className="text-2xl bg-[#A63535] p-1.5 font-medium text-white rounded-md mx-3">
                      <AiOutlineDelete />
                    </button>
                    <button className="text-2xl bg-[#1E824C] p-1.5 font-medium text-white rounded-md mx-3">
                      <RiEdit2Fill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-5/12">
            <div className="w-full border border-[#f2efed] bg-[#fafafa] rounded-xl py-12 text-center shadow-md">
              <h3 className="text-xl text-[#231000] font-bold pb-8">
                Add New Title
              </h3>
              <Link className="bg-[#F6BC56] text-sm lg:text-xl text-black font-semibold px-4 lg:px-16 py-1 lg:py-3 rounded-lg inline-block shadow-md">
                Add New Address
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Product ends here */}
    </div>
  );
};

export default Addresses;
