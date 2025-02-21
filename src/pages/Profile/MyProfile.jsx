import React, { useEffect, useState } from "react";
import {
  Select,
  Checkbox,
  Table,
  Modal,
  Label,
  TextInput,
  FileInput,
} from "flowbite-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  AiFillExclamationCircle,
  GoPlus,
  IoIosArrowBack,
  IoIosArrowForward,
} from "../../assets/icons";
import {
  addresses_icon,
  Edit_Square,
  Favorite_icon,
  UserTwo,
  wallet,
} from "../../assets/images/images";

const MyProfile = () => {
  const [openEditProfilesModal, setOpenEditProfilesModal] = useState(false);
  const editProfileHandler = () => {
    setOpenEditProfilesModal(true);
  };
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
                Profile
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
                Profile
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
            <div className="flex items-center w-full gap-8">
              <div className="w-4/12 flex items-start gap-4">
                <div className="text-center">
                  <div className="bg-white p-1 rounded-full shadow-md w-[81px] h-[81px] mb-4">
                    <img src={UserTwo} alt="UserTwo" className="rounded-full" />
                  </div>
                  <button
                    onClick={editProfileHandler}
                    className="flex items-center text-base text-[#231000] hover:text-[#BE7A3A] font-bold ml-5"
                  >
                    Edit{" "}
                    <IoIosArrowForward className="text-[#BE7A3A] text-base" />
                  </button>
                </div>
                <div className="pt-4">
                  <h3 className="text-2xl text-[#231000] font-bold">
                    Mohamed Ahmed
                  </h3>
                  <p className="text-[#726D69] font-medium text-xl">
                    +9821232221221
                  </p>
                </div>
              </div>
              <div className="w-4/12 border border-[#f3efe8] bg-[#fef8ee] rounded-xl p-4 shadow-md">
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      <img
                        src={Edit_Square}
                        alt="Edit_Square"
                        className="mr-2"
                      />
                      <h4 className="text-base text-[#231000] font-semibold pb-1">
                        Complete your profile.
                      </h4>
                    </div>
                    <p className="text-[#231000] text-sm leading-[16px] font-medium">
                      Helps you get promotional offers and personal discounts
                    </p>
                  </div>
                  <div>
                    <Link>
                      <IoIosArrowForward className="text-[#BE7A3A] hover:text-black text-2xl" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="w-4/12 border border-[#f2efed] bg-[#fafafa] rounded-xl py-8 text-center shadow-md">
                <h3 className="text-xl text-[#231000] font-bold pb-4">
                  Join a premium clan now!
                </h3>
                <p className="text-sm text-[#231000] font-medium block pb-8">
                  It helps you to get promotional offers and personal discounts.
                </p>
                <Link className="bg-[#F6BC56] text-sm lg:text-xl text-black font-semibold px-4 lg:px-16 py-1 lg:py-3 rounded-lg inline-block shadow-md">
                  Subscribe now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product ends here */}
      <div className="mb-16">
        <h2 className="text-black text-2xl font-bold pb-6">The account</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/wallet">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  The wallet
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/addresses">
              <div className="text-center">
                <img
                  src={addresses_icon}
                  alt="addresses_icon"
                  className="inline-block mb-6"
                />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  My titles/addresses
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/favorite">
              <div className="text-center">
                <img
                  src={Favorite_icon}
                  alt="Favorite_icon"
                  className="inline-block mb-6"
                />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Favorite
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/payment-method">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Payment method
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/english">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  English
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mb-16">
        <h2 className="text-black text-2xl font-bold pb-6">
          My vouchers/coupons{" "}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/coupons">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Coupons
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/free-credit">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Free credit
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/rewards">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Rewards
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="mb-16">
        <h2 className="text-black text-2xl font-bold pb-6">Help</h2>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/contact-us">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Contact Us
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/notes">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Notes
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/frequently-asked-questions">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Frequently Asked Questions
                </h3>
              </div>
            </Link>
          </div>
          <div className="w-[210px] h-[183px] border border-[#e9e4df] bg-white rounded-xl shadow-md flex justify-center items-center">
            <Link to="/terms-conditions">
              <div className="text-center">
                <img src={wallet} alt="wallet" className="inline-block mb-6" />
                <h3 className="text-[#231000] text-[18px] font-semibold">
                  Terms and conditions
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      {/* Edit profile popup start here */}
      <Modal
        show={openEditProfilesModal}
        onClose={() => setOpenEditProfilesModal(false)}
      >
        <Modal.Header className="border-none absolute right-0">
          &nbsp;
        </Modal.Header>
        <Modal.Body>
          <div className="py-6">
            <p className="text-[#030229] text-xl font-bold text-left px-0 mb-4">
              Edit Profile Information
            </p>
            <div className="mb-2">
              <div className="mb-2">
                <div className="mb-1 block">
                  <Label htmlFor="base" value="Full name" />
                </div>
                <TextInput id="base" type="text" sizing="md" />
              </div>
              <div className="mb-2">
                <div className="mb-1 block">
                  <Label htmlFor="base" value="Email or E-mail" />
                </div>
                <TextInput id="base" type="email" sizing="md" />
              </div>
              <div className="mb-2">
                <div className="mb-1 block">
                  <Label htmlFor="base" value="Phone number" />
                </div>
                <TextInput id="base" type="text" sizing="md" />
              </div>
            </div>
            <button className="bg-[#f6bc56] w-full text-[#231000] hover:bg-[#231000] hover:text-[#f6bc56] text-[18px] font-bold rounded-lg py-3 mt-4">
              Save
            </button>
          </div>
        </Modal.Body>
      </Modal>
      {/* Edit profile popup ends here */}
    </div>
  );
};

export default MyProfile;
