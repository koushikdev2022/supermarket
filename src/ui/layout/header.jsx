import React, { useRef, useEffect, useState } from "react";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Navbar,
  Button,
  Modal,
  Label,
  TextInput,
  Select,
  MegaMenu,
} from "flowbite-react";
import logo from "../../assets/imagesource/logo.png";
import { getMegamenuList } from "../../reducers/MenuSlice";
import {
  AiOutlineSearch,
  HiOutlineUser,
  IoChevronBack,
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
  SlLocationPin,
} from "../../assets/icons";
import { cartIcon } from "../../assets/images/images";
import { getCartItemList } from "../../reducers/CartItemSlice";
import getCookie from "../../pages/Auth/getCookie";
import { logout, refreshToken } from "../../reducers/AuthSlice";
const Header = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: megamenu } = useSelector((state) => state?.megamenu);
  const [data, setData] = useState([]);
  const { cartItemList } = useSelector((state) => state);
  const [quantity, setQantity] = useState();
  const [activeMenuItem, setActiveMenuItem] = useState(null);
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredSubcategoryId, setHoveredSubcategoryId] = useState(null);
  const userTokenString = localStorage.getItem("userToken");
  const userTokenParse = userTokenString? JSON.parse(userTokenString)?.token: null;
  console.log("userTokenParse", userTokenParse);

  // const refreshTokenCookie = getCookie("refresh_token");
  // console.log("refreshToken", refreshTokenCookie);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const refreshTokenCookie = getCookie("refresh_token");
      dispatch(refreshToken({ refresh_token: refreshTokenCookie }));
    }, 1 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleMouseEnter = (categoryId) => {
    setHoveredCategoryId(categoryId);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredCategoryId(null);
    setHoveredSubcategoryId(null);
    setIsVisible(false);
  };

  const handleSubcategoryMouseEnter = (subcategoryId) => {
    setHoveredSubcategoryId(subcategoryId);
  };

  const handleSubcategoryMouseLeave = () => {
    setHoveredSubcategoryId(null);
  };
  const handleMenuItemClick = (menuItem, flag = null) => {
    setActiveMenuItem(menuItem);
    console.log("nenuItem", menuItem);
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    localStorage.setItem("userLanguage", selectedLanguage);
    // Trigger a custom event to notify other components of the change
    window.dispatchEvent(new Event("storage"));
  };
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || "english"
  );
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;

  useEffect(() => {
    dispatch(
      getCartItemList({
        user_id: userId,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMegamenuList());
  }, [dispatch]);

  useEffect(() => {
    setData(megamenu);
  }, [megamenu]);

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

  const [isVisible, setIsVisible] = useState(true);

  const handleToggle = () => {
    setIsVisible(!isVisible);
  };

  const addToCart = (productId) => {
    console.log("Adding product to cart with ID:", productId);
  };

  useEffect(() => {
    const foundItem = cartItemList?.data?.data?.find((item) => {
      // Check if the product_id or id matches
      return item.product_id == id || item.id == id;
    });

    if (foundItem) {
      setQantity(foundItem.quantity);
    } else {
      console.log("No matching item found.");
    }
  }, [cartItemList, id]);


  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <div className="header_section w-full bg-white shadow-md">
        <div className="pt-3 pb-2 px-3 md:px-3 md:pt-4 flex max-w-7xl mx-auto">
          <div className="w-full">
            <div
              className={`header_top lg:flex justify-between items-center ${userLanguage == "english"
                  ? "justify-between"
                  : "flex-row-reverse justify-between"
                }`}
            >
              <div
                className={`w-full lg:w-6/12 lg:mr-10 mb-2 lg:mb-0 flex ${userLanguage == "english"
                    ? "justify-start"
                    : "flex-row-reverse justify-center"
                  }`}
              >
                <div className="w-4/12 lg:w-2/12 mr-6 flex justify-center lg:justify-end items-center lg:items-end pt-0 lg:pt-0 pb-2 lg:pb-0">
                  <Link to="/home">
                    <img src={logo} className="my-0" />
                  </Link>
                </div>
                <div className="w-5/12 lg:w-10/12 lg:pl-5 pr-0 mb-0 mt-0">
                  <div className="bg-[#f3f3f3] border border-[#e8e5e3] w-full mx-auto p-0 rounded-xl mb-0 overflow-hidden">
                    <form className="flex items-center justify-between w-full mx-auto h-[43px]">
                      <div className="relative w-[88%] lg:w-[92%] ml-0">
                        <input
                          type="text"
                          id="simple-search"
                          className="bg-[#f3f3f3] border-none text-[#988f88] text-left text-sm lg:text-sm rounded-lg focus:ring-[#f3f3f3] focus:border-[#f3f3f3] block w-full ps-5 p-2.5"
                          placeholder="Search..."
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-4/12 lg:w-[8%] p-0 flex justify-center items-center ms-0 text-base lg:text-2xl font-medium text-[#988f88] bg-[#f3f3f3] hover:text-black rounded-r-lg overflow-hidden focus:ring-4 focus:outline-none focus:ring-[#f3f3f3]"
                      >
                        <AiOutlineSearch />
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-6/12 mr-0">
                <div
                  className={`flex justify-center items-center ${userLanguage == "english"
                      ? ""
                      : "flex-row-reverse justify-between"
                    }`}
                >
                  <div className="w-3/12 lg:w-4/12 flex justify-start items-center">
                    <SlLocationPin className="text-2xl text-[#BE7A3A] mr-2" />
                    <p className="text-xs lg:text-[15px] text-[#231000] font-medium">
                      Delivery to Gada-Gada
                    </p>
                  </div>
                  <div className="w-3/12 lg:w-4/12 flex justify-start items-center pl-2 lg:pl-4">
                    <HiOutlineUser className="text-2xl text-[#BE7A3A] mr-2" />
                    {userTokenParse ? (
                      <buttton
                        onClick={() => handleLogout()}
                        className="text-xs lg:text-[15px] text-[#231000] font-medium cursor-pointer"
                      >
                        Logout
                      </buttton>
                    ) : (
                      <p className="text-xs lg:text-[15px] text-[#231000] font-medium">
                        Sign in / Sign up
                      </p>
                    )}
                  </div>
                  <div className="lang_select w-4/12 lg:w-2/12 mr-0">
                    <select
                      onChange={handleLanguageChange}
                      defaultValue={
                        localStorage.getItem("userLanguage") || "english"
                      }
                    >
                      <option value="english">English</option>
                      <option value="arabic">Arabic</option>
                    </select>
                  </div>
                  <div
                    className={`w-2/12 flex relative ${userLanguage === "english"
                        ? "justify-center lg:justify-center"
                        : "justify-center lg:justify-center"
                      }`}
                  >
                    <NavLink to="/Cart" className="relative">
                      <div
                        onClick={addToCart}
                        className="absolute -top-1 left-[10px] w-4 h-4 rounded-full bg-[#13834d] flex items-center justify-center cursor-pointer"
                      >
                        <span className="text-white text-xs">
                          {cartItemList?.data?.total}
                        </span>
                      </div>
                      <img src={cartIcon} alt="cartIcon" />
                    </NavLink>

                  </div>
                </div>
              </div>
            </div>
            <div className="menu_section pb-2">
              <div className="main_menu">
                <Navbar fluid rounded className="bg-transparent pt-0">
                  <div className="flex md:order-2">
                    <Navbar.Toggle />
                  </div>
                  <Navbar.Collapse className="w-80 md:w-auto rounded-xl border border-gray-700 md:border-0 absolute right-6 top-16 z-10 bg-white md:bg-transparent md:static px-4 pb-2 md:px-0 md:pb-0 lg:bg-transparent">
                    {data?.data?.map((item, index) => {
                      return (
                        <li key={index}
                          onMouseEnter={() =>
                            handleMouseEnter(item.id)
                          }
                          onMouseLeave={handleMouseLeave}

                        >
                          <NavLink
                            className={
                              activeMenuItem === "item1"
                                ? "active"
                                : "text-black"
                            }
                            // onClick={() => handleMenuItemClick("item1")}
                            onClick={handleToggle}
                            active
                            to={`/product-list/${item.id}`}
                          >
                            <span className="flex items-center justify-between lg:justify-center">
                              {item?.category_name}{" "}
                              <MdOutlineKeyboardArrowDown className="text-xl ml-0.5 hidden lg:block" />
                              <MdOutlineKeyboardArrowRight className="text-xl ml-0.5 lg:hidden" />
                            </span>
                          </NavLink>
                          {isVisible && hoveredCategoryId === item.id && item?.subcategories?.length > 0 && (
                            <div className="shadow-lg lg:ml-20">
                              {item?.subcategories?.map((temp, index) => {
                                return (
                                  <ul key={index} className="w-4/12 float-left">
                                    <li className="pb-2"
                                      onMouseEnter={() => handleSubcategoryMouseEnter(temp.id)}
                                      onMouseLeave={handleSubcategoryMouseLeave}
                                    >
                                      <p className="text-[#231000] text-base font-medium">
                                        {temp?.category_name}
                                      </p>
                                      {hoveredSubcategoryId === temp.id && temp?.subcategories?.length > 0 && (
                                        <ul>
                                          {temp?.subcategories?.map(
                                            (subItem, subIndex) => {
                                              return (
                                                <li
                                                  key={subItem.id}
                                                  // onMouseEnter={() =>
                                                  //   handleMouseEnter(subItem.id)
                                                  // }
                                                  // onMouseLeave={handleMouseLeave}
                                                  className="relative"
                                                >
                                                  <NavLink
                                                    className="text-[#231000]"
                                                    to={`/product-list/${subItem.id}`}
                                                  >
                                                    {subItem.category_name}
                                                  </NavLink>

                                                  {/* Subcategories dropdown */}
                                                  {hoveredCategoryId === subItem.id &&
                                                    subItem?.subcategories?.length >
                                                    0 && (
                                                      <ul
                                                        className="lg:absolute top-6 py-3 left-0 bg-white shadow-md p-4 z-50 border border-gray-200"
                                                        onMouseEnter={() =>
                                                          setHoveredCategoryId(
                                                            subItem.id
                                                          )
                                                        }
                                                        onMouseLeave={() =>
                                                          setHoveredCategoryId(null)
                                                        }
                                                      >
                                                        {subItem.subcategories.map(
                                                          (sub) => (
                                                            <li
                                                              key={sub.id}
                                                              className="py-1"
                                                            >
                                                              <NavLink
                                                                className="text-[#231000]"
                                                                to={`/product-list/${sub.id}`}
                                                              >
                                                                {sub.category_name}
                                                              </NavLink>
                                                            </li>
                                                          )
                                                        )}
                                                      </ul>
                                                    )}
                                                </li>
                                              );
                                            }
                                          )}
                                        </ul>
                                      )}
                                    </li>
                                  </ul>
                                );
                              })}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </Navbar.Collapse>
                </Navbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
