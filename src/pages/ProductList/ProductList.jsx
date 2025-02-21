import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Pagination } from "flowbite-react";
import { ToastContainer, toast } from "react-toastify";
import {
  AiFillExclamationCircle,
  GoPlus,
  IoIosArrowBack,
  IoIosArrowForward,
} from "../../assets/icons";
import {
  bestSeller01,
  bestSeller02,
  bestSeller03,
  bestSeller04,
  bikeIcon,
  fp01,
  fp02,
  fp03,
  fp04,
  fp05,
  fp06,
  vanIcon,
} from "../../assets/images/images";

import {
  Label,
  Select,
  Accordion,
  Radio,
  Checkbox,
  Datepicker,
} from "flowbite-react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { getProductList } from "../../reducers/ProductListSlice";
import { getCategoryAttributeDetail } from "../../reducers/CategoryAttributeDetailSlice";
import { addProductInList } from "../../reducers/AddToCardSlice";
import "react-toastify/dist/ReactToastify.css";
import { priceSearch } from "../../reducers/PricingSearchSlice";
const ProductList = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { priceSearchData } = useSelector((state) => state?.pSearch);
  const [filterData, setFilterData] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { productlist } = useSelector((state) => state?.productlist);

  const [currentPage, setCurrentPage] = useState(1);
  const [range, setRange] = useState([50, 5000]);
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || "english"
  );
  console.log("Product List", productlist?.data);

  const { categoryAttributeData } = useSelector(
    (state) => state?.categoryDetails
  );
  console.log("categoryAttributeData", categoryAttributeData?.data);
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;
  console.log("Retrieved userId:", userId);
  const onPageChange = (page) => setCurrentPage(page);
  useEffect(() => {
    const payload = {
      categoryId: id,
      limit: 10,
      page: currentPage,
    };
    dispatch(getProductList(payload));
  }, [dispatch, id, currentPage]);

  useEffect(() => {
    dispatch(getCategoryAttributeDetail({ categoryId: id }));
  }, [dispatch, id]);

  useEffect(() => {
    const handleStorageChange = () => {
      setUserLanguage(localStorage.getItem("userLanguage") || "english");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);


  const handleClick = (item) => {
    navigate('/product-details', { state: { item } });
  };


  const handleAndCheckComplexProduct = async (itemId) => {
    const payload = {
      product_id: itemId,
      // "combination_id": null,
      user_id: userId,
      quantity: 1,
    };

    dispatch(addProductInList(payload)).then((res) => {
      console.log("add to cart", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.response?.data?.message || res?.payload?.message, {
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
 
  const [selectedIds, setSelectedIds] = useState([]); 
  const handleRadioChange = (id) => {
    setFilterData(true);
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((selectedId) => selectedId !== id);
      } else {
        return [...prev, id];
      }
    });
  };
  
  const handleRangeChange = (newRange) => {
    setRange(newRange);
  };
  const catId = useParams();
  console.log("catId", catId?.id);
  useEffect(() => {
    const payload = {
      categoryId: [Number(catId?.id)],
      brand_id: [],
      unit_id: [],
      startPrice: range[0],
      endPrice: range[1],
      attribute: selectedIds ? selectedIds : [],
    };
    if (filterData) {
      dispatch(priceSearch(payload)).then((res) => {
        console.log("Price: ", res);
      });
    }
  }, [range, selectedIds, filterData]);

  const handleIsCombinationProduct = (item) => {
    navigate('/product-details', { state: { item } });
  };


  return (
    <>
      <ToastContainer />
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
                <li className="text-[#BE7A3A] text-sm font-bold pr-3">
                  <Link
                    to="/categories-list"
                    className="text-xs lg:text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
                  >
                    Chocolate and sweets/candies <IoIosArrowForward />
                  </Link>
                </li>
                <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                  Chocolate
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
                    Chocolate and sweets/candies
                  </Link>
                </li>
                <li className="text-[#BE7A3A] text-xs lg:text-sm font-bold">
                  Chocolate
                </li>
              </>
            )}
          </ul>
        </div>
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
        {/* Product list section start here */}
        <div
          className={`lg:flex ${
            userLanguage == "english" ? "" : "flex-row-reverse"
          }`}
        >
          <div
            className={`w-full lg:w-3/12 mb-4 lg:mb-0 ${
              userLanguage == "english" ? "pr-6" : "pl-6"
            }  filter_section`}
          >
            <div className="bg-white border border-[#eae5e0] py-5 px-2 rounded-xl">
              <Accordion
                id="accordion-open"
                data-accordion="open"
                className="filter_section_area"
              >
                {categoryAttributeData?.data?.map((item, index) => {
                  return (
                    <Accordion.Panel key={index}>
                      <Accordion.Title className="py-3 text-[15px] font-semibold text-black">
                        {item?.attribute_name}
                      </Accordion.Title>
                      <Accordion.Content className="p-4 border-none">
                        {item?.values?.map((val, index) => {
                          return (
                            <div key={index}>
                              <div className="flex items-center gap-2 mb-2.5">
                                <Radio
                                  id="deals"
                                  name="sortby"
                                  value={val?.id}
                                  checked={selectedIds.includes(val?.id)}
                                  onChange={() => handleRadioChange(val?.id)}
                                />
                                <Label htmlFor="deals">{val?.value}</Label>
                              </div>
                            </div>
                          );
                        })}
                      </Accordion.Content>
                    </Accordion.Panel>
                  );
                })}
              </Accordion>
              <Accordion collapseAll className="filter_section_area">
                <Accordion.Panel>
                  <Accordion.Title>Price</Accordion.Title>
                  <Accordion.Content>
                    {" "}
                    <Slider
                      range
                      min={50}
                      max={5000}
                      value={range}
                      onChange={handleRangeChange}
                    />
                    <div className="flex justify-between">
                      <span>Min: {range[0].toFixed(2)} </span>
                      <span>Max:{range[1].toFixed(2)}</span>
                    </div>
                  </Accordion.Content>
                </Accordion.Panel>
              </Accordion>
            </div>
          </div>
          <div className="w-full lg:w-9/12">
            {/* Best offers start here */}
            <div className="pb-5">
              <div
                //className="flex justify-between items-center mb-8"
                className={`flex ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                } justify-between items-center mb-8`}
              >
                <div>
                  <h3 className="text-[#231000] text-xl lg:text-[24px] font-normal pb-3">
                    {/* Chocolate */}
                    {productlist?.selected_category?.name}
                  </h3>
                  <p className="text-[#231000] font-normal text-sm">
                    {productlist?.total_data} products
                  </p>
                </div>
                <div className="w-6/12 lg:w-3/12">
                  <Select required>
                    <option>Sort by:</option>
                    <option>Chocolate</option>
                    <option>Sweet</option>
                    <option>Chocolate</option>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {productlist?.data?.length > 0 && filterData === false ? (
                  <>
                    {productlist?.data?.filter((item) => Array.isArray(item?.branch) && item.branch.length > 0)?.map((item) => {  
                      return (
                        <div
                          key={item.id}
                          className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden"
                        >
                          <div
                            className="text-center cursor-pointer border-b border-[#faf4ee]"
                            onClick={() => handleClick(item)}
                          >
                           {item?.productImage.length > 0 ? (
                             <img
                             src={
                               item?.productImage?.[0]?.image
                                 ? `${baseUrl}uploads/products/${item?.id}/250/${item.productImage[0].image.split('/').pop()}`
                                 : "https://development.pellets.supply/assets/noimg.png"
                             }
                             alt={item?.productName || "Product Image"}
                             className="w-full h-auto object-cover"
                           />
                            ) : (
                              <img
                                src="https://development.pellets.supply/assets/noimg.png"
                                alt="cat01"
                                className="inline-block rounded-xl w-full"
                              />
                            )}

                          </div>
                          <div
                            className={`${
                              userLanguage == "english"
                                ? "text-left"
                                : "text-right"
                            } px-4 pb-4 mt-[-20px] min-h-[160px]`}
                          >
                            <div
                              className={`flex ${
                                userLanguage === "english"
                                  ? "justify-start"
                                  : "justify-end"
                              } mb-0`}
                            >
                              <button
                                className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                                onClick={() => {
                                  if (item?.is_combinable) {
                                    handleIsCombinationProduct(item);
                                  } else {
                                    // Call handleCheckId function with item.id
                                    handleAndCheckComplexProduct(item.id);
                                  }
                                }}
                              >
                                <GoPlus className="text-xl text-black" />
                              </button>
                            </div>
                            <h3 className="text-[26px] text-[#231000] font-medium">
                              {item?.price}{" "}
                              <span className="text-[#776b61] text-[12px] font-medium">
                                SAR
                              </span>
                            </h3>
                            <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                              {item?.discount_price}% off{" "}
                              <span className="text-[#776b61] text-[12px] font-medium line-through">
                                {item?.price} SAR
                              </span>
                            </h4>
                            <p className="text-[#231000] text-base font-normal hover:text-[#776b61]">
                              <Link to={`/product-details/${item.id}`}>
                                {item?.product_name}
                              </Link>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : priceSearchData?.data?.length > 0 && filterData === true ? (
                  <>
                    {priceSearchData?.data?.map((item) => {
                      return (
                        <div
                          key={item.id}
                          className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden"
                        >
                          <div
                            className="text-center cursor-pointer border-b border-[#faf4ee]"
                            onClick={() => handleClick(item.id)}
                          >
                            {item?.productImage?.length > 0 ? (
                              <img
                              src={
                                item?.productImage?.[0]?.image
                                  ? `${baseUrl}/uploads/products/${item?.id}/250/${item.productImage[0].image.split('/').pop()}`
                                  : "https://development.pellets.supply/assets/noimg.png"
                              }
                             alt="bestSeller01"
                             className="inline-block w-full h-[144px]"
                            />
                            ) : (
                              <img
                                src="https://development.pellets.supply/assets/noimg.png"
                                alt="cat01"
                                className="inline-block rounded-xl w-full"
                              />
                            )}
                          </div>
                          <div
                            className={`${
                              userLanguage == "english"
                                ? "text-left"
                                : "text-right"
                            } px-4 pb-4 mt-[-20px] min-h-[160px]`}
                          >
                            <div
                              className={`flex ${
                                userLanguage === "english"
                                  ? "justify-start"
                                  : "justify-end"
                              } mb-0`}
                            >
                              <button
                                className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                                onClick={() => {
                                  if (item?.is_combinable) {
                                    // Navigate to the product details page
                                    window.location.href = `/product-details/${item.id}`;
                                  } else {
                                    // Call handleCheckId function with item.id
                                    handleAndCheckComplexProduct(item.id);
                                  }
                                }}
                              >
                                <GoPlus className="text-xl text-black" />
                              </button>
                            </div>
                            <h3 className="text-[26px] text-[#231000] font-medium">
                              {item?.price}{" "}
                              <span className="text-[#776b61] text-[12px] font-medium">
                                SAR
                              </span>
                            </h3>
                            <h4 className="text-[#EA1E2D] text-[10px] font-medium">
                              {item?.discount_price}% off{" "}
                              <span className="text-[#776b61] text-[12px] font-medium line-through">
                                {item?.price} SAR
                              </span>
                            </h4>
                            <p className="text-[#231000] text-base font-normal hover:text-[#776b61]">
                              <Link to={`/product-details/${item.id}`}>
                                {item?.product_name}
                              </Link>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <p>No Product found</p>
                  </>
                )}
              </div>
              <div className="flex overflow-x-auto sm:justify-center pagination_section mt-12">
                {/* <Pagination currentPage={currentPage} totalPages={data?.total_data || []} onPageChange={onPageChange} showIcons /> */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(productlist?.total_data / 10) || []}
                  onPageChange={onPageChange}
                  showIcons
                />
              </div>
            </div>
            {/* Best offers ends here */}
          </div>
        </div>
        {/* Product list section ends here */}
        <ToastContainer />
      </div>
    </>
  );
};

export default ProductList;
