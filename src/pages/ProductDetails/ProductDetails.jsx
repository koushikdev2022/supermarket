import React, { useEffect, useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  bikeIcon,
  checkedIcon,
  fp01,
  fp02,
  fp03,
  fp04,
  fp05,
  fp06,
  product01,
  productBig,
  productThumb,
  vanIcon,
} from "../../assets/images/images";
import {
  GoPlus,
  IoIosArrowBack,
  IoIosArrowForward,
  LuHeart,
  PiShareNetworkFill,
} from "../../assets/icons";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Select } from "flowbite-react";
import { getProductList } from "../../reducers/ProductListSlice";
import { addProductInList } from "../../reducers/AddToCardSlice";
import { getCartItemList } from "../../reducers/CartItemSlice";
const ProductDetails = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const itemObj = useLocation();
  const id = itemObj?.state?.item?.id;
  console.log("check ID",id);
  
  const dispatch = useDispatch();
  const { productlist } = useSelector((state) => state?.productlist);
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImage = (obj) => {
    setSelectedImage(obj?.image);
  };
  useEffect(() => {
    const payload = {
      productId: id,
      limit: 10,
      page: 1,
    };
    dispatch(getProductList(payload));
  }, [dispatch, id]);
  console.log("Product list", productlist);

  useEffect(() => {
    // Update data state when productlist changes
    if (productlist) {
      setData(productlist);
      // Safely extract the first product image and set it as the default
      const defaultImage =
        productlist?.data?.[0]?.productImage?.[0]?.image || null;
      setSelectedImage(defaultImage);
    }
  }, [productlist]);

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
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;

  const addProductToCart = async () => {
    const payload = {
      product_id: id,
      // "combination_id": null,
      user_id: userId,
      quantity: parseInt(selectedValue),
    };
    dispatch(addProductInList(payload)).then((res) => {
      console.log("add to cart!",res?.payload?.message);
      if (res?.payload?.status_code === 201) {
        dispatch(
          getCartItemList({
            user_id: userId,
          })
        );
        toast.success(res?.payload?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
          progressStyle: { backgroundColor: "#ffbf69" },
        });
      } else {
        toast.error(res?.payload?.response?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "dark",
        });
      }
    });
  };


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
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold pr-3">
                <Link
                  to="/categories-list"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  Meat and Poultry <IoIosArrowForward />
                </Link>
              </li>
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                Hen
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
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold pl-3">
                <Link
                  to="/categories-list"
                  className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                >
                  <IoIosArrowBack />
                  Meat and Poultry
                </Link>
              </li>
              <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                Hen
              </li>
            </>
          )}
        </ul>
      </div>
      {/* Product details section start here */}
      <div className="mb-4">
        <div
          className={`lg:flex ${
            userLanguage == "english" ? "" : "flex-row-reverse"
          } justify-between`}
        >
          {data?.data?.map((item, index) => {

            return (
              <div key={index} className="w-full lg:w-8/12 mb-8 lg:mb-0">
                <div
                  className={`flex gap-6 ${
                    userLanguage == "english" ? "" : "flex-row-reverse"
                  }`}
                >
                  <div className="w-64">
                    <div className="border border-[#ece8e4] rounded-xl overflow-hidden">
                      {item?.productImage?.length > 0 && (
                        <img 
                        
                        src={`${baseUrl}uploads/products/${id}/250/${selectedImage}`}
                         alt="productBig" />
                      )}
                    </div>
                    <div className="mt-2  flex space-x-2">
                      {item?.productImage?.length > 0 ? (
                        <>
                          {item?.productImage?.map((item) => {
                            return (
                              <div
                                onClick={() => handleImage(item)}
                                className="mt-2"
                              >
                                <div className="border border-[#9f8772] rounded-xl overflow-hidden w-12">
                                  <img 
                                    src={
                                    item?.image
                                      ? `${baseUrl}uploads/products/${id}/250/${item?.image}`
                                      : "https://development.pellets.supply/assets/noimg.png"
                                  }
                                  alt="productThumb" />
                                </div>
                                {/* {branchLength==0||branchLength == undefined ||branchLength == ""?  <span className="text-red-400">This Product can not be deliverd</span>:""} */}
                              </div>
                            );
                          })}
                        </>
                        
                      ) : (
                        <>
                          <img
                            src="https://development.pellets.supply/assets/noimg.png"
                            alt="cat01"
                            className="inline-block rounded-xl w-full"
                          />
                        </>
                      )}
                    </div>
                  </div>
                  <div
                    className={`w-8/12 ${
                      userLanguage == "english" ? "" : "text-right"
                    }`}
                  >
                    <h3 className="text-[#231000] text-[18px] font-bold pb-2">
                      {/* Good Taste Chilled Chicken 1 kg */}
                      {item?.product_name}
                    </h3>
                   <div className="flex space-x-2">

                   <p className="text-lg text-[#231000] font-normal pb-2">
                      Size: 
                    </p>
                    <Select id="select_id" className="w-32">
                      <option>Select Size</option>
                      {[
                        ...new Set(
                          item?.cobminationArray
                            ?.map((val) => val?.combinationsAttribute?.size?.trim()) 
                            ?.filter((size) => size) 
                        ),
                      ].map((uniqueSize, index) => (
                        <option key={index} value={uniqueSize}>
                          {uniqueSize}
                        </option>
                      ))}
                    </Select>
                   </div>
                    <p className="text-[#847971] text-base font-normal pb-2">
                      SAR {item?.price}{" "}
                      <span className="text-[#231000] text-xs">
                        Including tax{" "}
                        <span className="text-[#EA1E2D]">
                          {item?.discount_price}% off
                        </span>
                      </span>
                    </p>
                    <button className="border border-[#2a8956] text-[#2a8956] text-sm bg-[#e0ece5] rounded-full px-4 py-1 hover:bg-[#2a8956] hover:text-white">
                      Saudi industry
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="w-full lg:w-4/12">
            <div className="bg-[#f5f4f4] p-4 rounded-xl">
              <h3
                className={`text-[#231000] text-base font-bold mb-2 ${
                  userLanguage == "english" ? "" : "text-right"
                } `}
              >
                Get it:
              </h3>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } gap-5 mb-4`}
              >
                <div className="border border-[#e9e6e6] bg-[#f5f4f4] rounded-xl p-2 text-center w-6/12">
                  <img
                    src={bikeIcon}
                    alt="bikeIcon"
                    className="inline-block mb-1"
                  />
                  <strong className="text-[#71655b] text-sm font-bold block">
                    Tomorrow 10 am - 2 pm
                  </strong>
                  <p className="text-[#71655b] text-sm font-normal">essentia</p>
                </div>
                <div className="border border-[#3d2c1c] bg-[#f5eee1] rounded-xl p-2 text-center w-6/12">
                  <img
                    src={vanIcon}
                    alt="vanIcon"
                    className="inline-block mb-1"
                  />
                  <strong className="text-[#BE7A3A] text-sm font-bold block">
                    120 minutes
                  </strong>
                  <p className="text-[#BE7A3A] text-sm font-normal">now</p>
                </div>
              </div>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } gap-4`}
              >
                <div className="w-3/12 mb-4">
                  <select
                    required
                    value={selectedValue}
                    onChange={(e) => setSelectedValue(e.target.value)}
                    className="w-full p-2 border rounded"
                  >
                    <option value="">Select an option</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div className="w-9/12">
                  <button
                    className="bg-[#F6BC56] text-[#231000] text-base font-medium w-full block py-2 rounded-lg hover:bg-black hover:text-[#F6BC56]"
                    onClick={() => {
                      addProductToCart();
                    }}
                  >
                    Add to cart.
                  </button>
                </div>
              </div>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } gap-3`}
              >
                <button className="text-[#BE7A3A] w-[42px] h-[42px] rounded-full bg-white flex justify-center items-center">
                  <LuHeart className="text-xl" />
                </button>
                <button className="text-[#BE7A3A] w-[42px] h-[42px] rounded-full bg-white flex justify-center items-center">
                  <PiShareNetworkFill className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Product details section ends here */}
      {/*  Customers prefer product start here */}
      <div className="py-5">
        <div className="border-2 border-[#eae5e0] rounded-xl px-8 py-3">
          <div
            className={`flex ${
              userLanguage == "english" ? "" : "flex-row-reverse"
            } justify-between items-center mb-3`}
          >
            <h3 className="text-[18px] text-[#231000] font-bold">
              Customers prefer this product.
            </h3>
            <button className="bg-[#EA1E2D] text-white text-sm lg:text-base font-medium py-2 px-5 lg:px-10 rounded-xl">
              Add all (33 SAR)
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } items-center`}
              >
                <img src={checkedIcon} alt="checkedIcon" />
                <img src={product01} alt="product01" />
              </div>
              <p
                className={`text-base text-[#231000] font-normal ${
                  userLanguage == "english" ? "" : "text-right"
                }`}
              >
                Good Baiq chicken chilled 1 kg
              </p>
              <h3
                className={`text-[#EA1E2D] text-[18px] font-extrabold ${
                  userLanguage == "english" ? "" : "text-right"
                } `}
              >
                SAR{" "}
                <span>
                  <span className="text-base">12.23 </span>
                </span>
                <span className="text-[#867c73] text-base font-medium line-through">
                  SAR 23
                </span>
              </h3>
            </div>
            <div>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } items-center`}
              >
                <img src={checkedIcon} alt="checkedIcon" />
                <img src={product01} alt="product01" />
              </div>
              <p
                className={`text-base text-[#231000] font-normal ${
                  userLanguage == "english" ? "" : "text-right"
                }`}
              >
                Good Baiq chicken chilled 1 kg
              </p>
              <h3
                className={`text-[#EA1E2D] text-[18px] font-extrabold ${
                  userLanguage == "english" ? "" : "text-right"
                } `}
              >
                SAR{" "}
                <span>
                  <span className="text-base">12.23 </span>
                </span>
                <span className="text-[#867c73] text-base font-medium line-through">
                  SAR 23
                </span>
              </h3>
            </div>
            <div>
              <div
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } items-center`}
              >
                <img src={checkedIcon} alt="checkedIcon" />
                <img src={product01} alt="product01" />
              </div>
              <p
                className={`text-base text-[#231000] font-normal ${
                  userLanguage == "english" ? "" : "text-right"
                }`}
              >
                Good Baiq chicken chilled 1 kg
              </p>
              <h3
                className={`text-[#EA1E2D] text-[18px] font-extrabold ${
                  userLanguage == "english" ? "" : "text-right"
                } `}
              >
                SAR{" "}
                <span>
                  <span className="text-base">12.23 </span>
                </span>
                <span className="text-[#867c73] text-base font-medium line-through">
                  SAR 23
                </span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      {/*  Customers prefer product ends here */}
      {/* Best offers start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            You may also like
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            Favorite products
          </p>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={fp01}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp02}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp03}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp04}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp05}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp06}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
      {/* Best offers ends here */}
      {/* Best offers start here */}
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Best Sellers
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            Favorite products
          </p>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
              <div className="text-center">
                <img
                  src={fp01}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp02}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp03}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp04}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp05}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
                  src={fp06}
                  alt="fp01"
                  className="inline-block rounded-xl w-full"
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
          <ToastContainer />
        </div>
      </div>
      {/* Best offers ends here */}
    </div>
  );
};

export default ProductDetails;