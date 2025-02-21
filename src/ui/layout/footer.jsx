import { Link } from "react-router-dom";
import {
  appStoreIcon,
  footerLogo,
  googlePayIcon,
  logo,
  messageIcon,
  phoneIcon,
} from "../../assets/images/images";
import { BsTelephone } from "../../assets/icons";
import { useEffect, useState } from "react";

const Footer = () => {
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
  console.log("userLanguagefooter", userLanguage);

  return (
    <div className="footer_container bg-[#ffe8d3] py-[40px] px-4 lg:px-0 lg:py-12">
      <div className="max-w-7xl mx-auto">
        <div
          className={`md:flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          }`}
        >
          <div className="w-full lg:w-3/12 text-center lg:text-left mb-8 lg:mb-0">
            <div className="lg:flex justify-start inline-block">
              <img src={footerLogo} alt="footerLogo" className="mb-5 w-20" />
            </div>
            <p className="text-black text-base font-medium pb-4">
              Download the KLAN app on your phone now!
            </p>
            <div className="flex justify-center lg:justify-start items-center">
              <img
                src={googlePayIcon}
                alt="googlePayIcon"
                className="mr-5 w-4/12"
              />
              <img src={appStoreIcon} alt="appStoreIcon" className="w-4/12" />
            </div>
          </div>

          <div className="w-full lg:w-3/12 lg:pl-10 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="text-black font-bold text-[18px] pb-6">Clan</h3>
            <ul>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Clan
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Home
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  FAQs
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Delete Account
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-3/12 lg:pl-4 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="text-black font-bold text-[18px] pb-6">
              Categories
            </h3>
            <ul>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Promotions
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Cool your summer
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Dairy and Cheeses
                </Link>
              </li>
              <li>
                <Link className="text-[14px] text-black font-medium pb-2 block hover:text-[#18a743]">
                  Vegetables and Fruits
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full lg:w-3/12 text-center lg:text-left mb-8 lg:mb-0">
            <h3 className="text-black font-bold text-[18px] pb-6">
              Follow our news
            </h3>
            <div className="flex justify-center lg:justify-start items-center mb-4">
              <img src={phoneIcon} alt="phoneIcon" className="w-6 mr-4" />
              <p className="text-[14px] text-black font-medium">054221312343</p>
            </div>
            <div className="flex justify-center lg:justify-start items-center">
              <img src={messageIcon} alt="message" className="w-7 mr-4" />
              <p className="text-[14px] text-black font-medium">@clan.info</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
