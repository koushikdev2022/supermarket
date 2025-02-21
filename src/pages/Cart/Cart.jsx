import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  AiOutlinePlus,
  AiOutlineMinus,
  BsExclamationSquare,
  IoIosArrowBack,
  IoIosArrowForward,
  MdOutlineDelete,
} from "../../assets/icons";
import {
  bikeIcon2,
  cardImg,
  cartChoco,
  productThumbNew,
} from "../../assets/images/images";

import {
  ToggleSwitch,
  Select,
  Modal,
  Label,
  TextInput,
  Radio,
} from "flowbite-react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { addProductInList } from "../../reducers/AddToCardSlice";
import { getCartItemList } from "../../reducers/CartItemSlice";
import { removeSpecificCartItem } from "../../reducers/RemoveSpecificCartItemSlice";
import { delevaryCalculation, placeOrder } from "../../reducers/OrderSlice";
import { useForm } from "react-hook-form";
import {
  addAddress,
  getAddress,
  getLatLong,
} from "../../reducers/AddAddressSlice";

const Cart = () => {
  const baseUrl = "https://supermarket.bestworks.cloud/";
  const { userAddress } = useSelector((state) => state?.address);
  const [addressModal, setAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const notify = () => toast("Item Deleted!");
  const { data: cartItemList } = useSelector((state) => state?.cartItemList);
  const [data, setData] = useState([]);
  const [addOtherAddress, setAddAnotherAddress] = useState(false);
  const [switch1, setSwitch1] = useState(false);
  const [userLanguage, setUserLanguage] = useState(
    localStorage.getItem("userLanguage") || "english"
  );

  // const { delevaryCalculationData } = useSelector((state) => state?.orders);
  // console.log("delevaryCalculationData", delevaryCalculationData)
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;
  console.log("Retrieved userId:", userId);
  useEffect(() => {
    console.log("Cartdata", data?.data);
  }, [data]);

  useEffect(() => {
    dispatch(
      getCartItemList({
        user_id: userId,
      })
    );
  }, [dispatch]);

  useEffect(() => {
    setData(cartItemList);
  }, [cartItemList]);
  const totalPrice = data?.data?.reduce((sum, item) => {
    const price = parseFloat(item?.product_details?.price);
    return sum + price * (item.quantity || 0);
  }, 0);
  console.log("Total Price", totalPrice);

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

  const handleClickScroll = (id) => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };
  var our_offers_slider_setting = {
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
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getCartItemId = async (cart_item_id) => {
    if (cart_item_id !== null) {
      const deleteResponse = await dispatch(
        removeSpecificCartItem(cart_item_id)
      );
      if (deleteResponse.meta.requestStatus === "fulfilled") {
        dispatch(
          getCartItemList({
            user_id: userId,
          })
        );
        // Update local data state to remove the deleted user
        // setData((prevData) => prevData.filter(user => user.id !== selectedUserId));
      } else {
        console.error("Delete failed:", deleteResponse.payload);
      }
    }
  };
  const incrementQuantity = (id) => {
    setData((prevCartData) => {
      return {
        ...prevCartData, 
        data: prevCartData?.data?.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: (item.quantity || 0) + 1, 
            };
          } else {
            return item; 
          }
        }),
      };
    });
  };

  const decrementQuantity = (id) => {
    setData((prevCartData) => {
      return {
        ...prevCartData, 
        data: prevCartData?.data?.map((item) => {
          if (item.id === id) {
            return {
              ...item,
              quantity: (item.quantity || 0) - 1, 
            };
          } else {
            return item; 
          }
        }),
      };
    });
  };


  const handleContinue = () => {
    if (!selectedAddress) {
      toast.error("Please select your delivery address!");
      return;
    } else {
      handleCompleteOrder();
    }
    // Proceed with order
  };
  const handleCompleteOrder = () => {
    const payload = {
      data: data?.data,
    };
    try {
      dispatch(delevaryCalculation(payload)).then((res) => {
        if (res?.type === "orders/delevaryCalculation/fulfilled") {
          navigation("/payment", {
            state: { user_address_id: selectedAddress },
          });
        }
      });
    } catch (error) {
      console.log("Error!", error);
    }
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const payload = {
      address_line1: data?.address_line1,
      address_line2: data?.address_line2,
      postal_code: data?.postal_code,
      city: data?.city,
      state: data?.state,
    };
    dispatch(getLatLong(payload)).then((res) => {
      console.log("Res", res);
      if (res?.payload?.status_code === 200) {
        dispatch(
          addAddress({
            ...data,
            user_id: userId,
            latitude: res?.payload?.data?.lat,
            longitude: res?.payload?.data?.lng,
          })
        ).then((res) => {
          console.log("Address", res);
          if (res?.payload?.status_code === 201) {
            // setAddressModal(false);
            // handleCompleteOrder();
            dispatch(getAddress({ user_id: userId }));
            setAddAnotherAddress(false);
          }
        });
      }
    });
  };

  useEffect(() => {
    dispatch(getAddress({ user_id: userId }));
  }, [dispatch, userId]);


  const handelAddAddress = () => {
    setAddressModal(true);
    console.log("userAddress Length: ", userAddress?.data?.length);
    console.log("other address", addOtherAddress);
    setAddAnotherAddress(false);
  };
  const handleAnotherAddress = () => {
    setAddAnotherAddress(true);
  };

  const handleBack = () => {
    setAddAnotherAddress(false);
  };
  return (
    <>
      <div className="px-7" id="scrollview">
        <div className="pb-6 block">
          <ul
            // className="flex items-center"
            className={`flex ${
              userLanguage == "english" ? "items-center" : "flex-row-reverse"
            }`}
          >
            <li
              className={`flex ${userLanguage == "english" ? "pr-3" : "pl-3"}`}
            >
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
              Shopping cart
            </li>
          </ul>
        </div>
        {/* Cart section start here */}
        <div
          className={`lg:flex ${
            userLanguage == "english" ? "" : "flex-row-reverse"
          } gap-10 py-6`}
        >
          <div className="w-full lg:w-6/12">
            {/* Recommended products section start here */}
            <div>
              <h3
                className={`text-base text-[#231000] font-bold mb-3 ${
                  userLanguage == "english" ? "" : "text-right"
                }`}
              >
                Recommended products
              </h3>
              <div className="our_offers_slider_section mb-3">
                <Slider {...our_offers_slider_setting}>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                  <div className="border border-[#ece7e3] rounded-xl shadow-md">
                    <div>
                      <img
                        src={cartChoco}
                        alt="cartChoco"
                        className="rounded-t-xl w-full"
                      />
                    </div>
                    <div className="py-3 flex justify-center items-center">
                      <button className="text-xs text-[#BE7A3A] font-bold hover:text-black">
                        Add
                      </button>
                    </div>
                  </div>
                </Slider>
              </div>
              <div
                className={`flex justify-between ${
                  userLanguage == "english" ? "" : "flex-row-reverse"
                }`}
              >
                <div className="text-[10px] lg:text-xs text-[#231000] font-bold flex items-center">
                  Allowing product replacement in case of unavailability?
                  <BsExclamationSquare className="text-[#be7a3a] text-sm ml-1" />
                </div>
                <div>
                  <ToggleSwitch
                    checked={switch1}
                    label=""
                    onChange={setSwitch1}
                  />
                </div>
              </div>
              {/* Product section start here */}
              <div className="mt-10">
                {data?.data?.map((item, index) => {
                  const images = item.product_details.images || [];
                  console.log("image", images);
                  return (
                    <div key={index} className="mb-10">
                      <div
                        className={`mb-2 flex ${
                          userLanguage == "english" ? "" : "flex-row-reverse"
                        }`}
                      >
                        <div
                          className={`w-6/12 ${
                            userLanguage == "english" ? "" : "text-right"
                          }`}
                        >
                          {/* <h3 className="text-[13px] text-[#231000] font-medium pb-2">
                            <span className="text-[#231000] text-[18px]">
                              1/2
                            </span>{" "}
                            Shipment
                          </h3> */}
                          <p className="text-[#726D69] text-[10px] pb-4">
                            Sold by
                          </p>
                          <div
                            className={`flex ${
                              userLanguage == "english"
                                ? ""
                                : "flex-row-reverse"
                            } items-center gap-4`}
                          >
                            <div>
                              <img src={bikeIcon2} alt="bikeIcon2" />
                            </div>
                            <div>
                              <h3 className="text-[#231000] text-xs lg:text-sm font-bold">
                                Now within 120 minutes
                              </h3>
                              <p className="text-[#726D69] text-[10px]">
                                The delivery time will be <br></br> determined
                                at checkout.
                              </p>
                            </div>
                          </div>
                        </div>
                        <div
                          className={`w-6/12 ${
                            userLanguage == "english"
                              ? "text-right"
                              : "text-left"
                          }`}
                        >
                          <p className="text-[#726D69] text-[15px] font-normal">
                            1 product
                          </p>
                        </div>
                      </div>
                      <div
                        className={`border border-[#ece7e3] rounded-xl shadow-md p-4 lg:flex ${
                          userLanguage == "english" ? "" : "flex-row-reverse"
                        }`}
                      >
                        <div className="w-full lg:w-8/12">
                          <div
                            className={`flex ${
                              userLanguage == "english"
                                ? ""
                                : "flex-row-reverse"
                            } gap-4`}
                          >
                            <div className="w-2/12">
                              <div className="border-2 border-[#e0d8d1] rounded-xl overflow-hidden">
                                {images?.length > 0 ? (
                                  <>
                                    {images.map((imgSrc, imgIndex) => (
                                      <img
                                        key={imgIndex}
                                        className="object-cover w-32 h-32 rounded-lg"
                                        src={`${baseUrl}uploads/products/${item?.product_id}/250/${imgSrc}`}
                                        alt={`Product Image ${imgIndex + 1}`}
                                      />
                                    ))}
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
                              className={`w-10/12 ${
                                userLanguage == "english" ? "" : "text-right"
                              }`}
                            >
                              <p className="text-[#231000] text-xs pb-0">
                                {item?.product_details?.name}
                              </p>
                              <h3 className="text-[#726D69] text-xs font-medium pb-0">
                                SAR{" "}
                                <span className="text-[#231000] text-xl">
                                  {item?.product_details?.price}
                                </span>
                              </h3>
                              <h3 className="text-[#726D69] text-xs font-medium line-through">
                                SAR 23
                              </h3>
                            </div>
                          </div>
                        </div>
                        <div className="w-full lg:w-4/12 flex justify-end items-center">
                          <div className="flex gap-3 items-center">
                            <button
                              onClick={() => incrementQuantity(item.id)}
                              className="bg-[#fce9c7] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                            >
                              <AiOutlinePlus className="text-xl" />
                            </button>
                            <div className="w-10 h-8 border border-gray-400 rounded flex items-center justify-center">
                              {item.quantity}
                            </div>

                            {item.quantity == 1 ? (
                              <button
                                onClick={() => {
                                  getCartItemId(item.id);
                                  notify();
                                  handleClickScroll(item.id);
                                }}
                                className="bg-[#fce9c7] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                              >
                                <MdOutlineDelete className="text-xl" />
                              </button>
                            ) : (
                              <button
                                onClick={() => decrementQuantity(item.id)}
                                className="bg-[#fce9c7] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                              >
                                <AiOutlineMinus className="text-xl" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="value_section mt-6">
                        {/* <p className="text-[#231000] text-xs lg:text-sm font-medium mb-2">
                          <span className="text-xs lg:text-sm font-bold">
                            (SAR 75.00)
                          </span>{" "}
                          Add more to reach the minimum order value."
                        </p> */}
                        <div className="value_bar">&nbsp;</div>
                      </div>
                      <div
                        className={`flex ${
                          userLanguage == "english" ? "" : "flex-row-reverse"
                        } justify-between mt-6`}
                      >
                        {/* <div
                          className={`w-8/12 ${
                            userLanguage == "english" ? "" : "text-right"
                          }`}
                        >
                          <p className="text-[#231000] font-medium text-sm">
                            Subtotal
                          </p>
                          <h3 className="text-[#231000] font-medium text-[18px]">
                           
                            SAR{item?.product_details?.price}
                          </h3>
                        </div> */}
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* Product section ends here */}
            </div>
            {/* Recommended products section ends here */}
          </div>
          <div className="w-full lg:w-6/12">
            <h3
              className={`text-base text-[#231000] font-bold mb-3 ${
                userLanguage == "english" ? "" : "text-right"
              }`}
            >
              Summary of order
            </h3>
            <div
              className={`border border-[#ece7e3] rounded-xl shadow-md p-4 flex ${
                userLanguage == "english" ? "" : "flex-row-reverse"
              }`}
            >
              <div
                className={`w-8/12 ${
                  userLanguage == "english" ? "" : "text-right"
                }`}
              >
                <p className="text-[#231000] text-[10px] font-medium">
                  Please make sure that the value of all shipments has reached
                  the minimum to be able to complete the order.
                </p>
                <h3 className="text-[#726D69] text-[18px] font-medium">
                  {/* SAR 23 */}
                  SAR {totalPrice}
                </h3>
                <span className="text-[#726D69] text-[10px] font-medium">
                  with tax"
                </span>
              </div>
              <div className="w-4/12 flex justify-end items-end">
                <button
                  //onClick={() => handleCompleteOrder()}
                  onClick={() => handelAddAddress()}
                  className="bg-[#F6BC56] text-[#231000] text-xs lg:text-base font-medium w-full block py-2 rounded-lg hover:bg-black hover:text-[#F6BC56]"
                >
                  Completion of order
                </button>
              </div>
            </div>
            <div className="text-center mt-6">
              <p className="text-[#231000] text-sm font-bold pb-3">
                Available payment methods
              </p>
              <img src={cardImg} alt="cardImg" className="inline-block" />
            </div>
          </div>
        </div>
        {/* Cart section ends here */}
        <ToastContainer />
      </div>

      {addressModal && (
        <>
          <Modal
            show={addressModal}
            onClose={() => setAddressModal(false)}
            size="2xl"
          >
            <Modal.Header className="coose_product_bg">
              {!userAddress?.data?.length > 0 || addOtherAddress === true
                ? "Add Delivery Adress"
                : "Select Delivery Address"}
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit(onSubmit)}>
                {!userAddress?.data?.length > 0 ||
                  (addOtherAddress === true && (
                    <>
                      <div className="bg-white shadow-xl py-12 rounded-lg mb-14">
                        <div className="md:flex gap-8 px-6 lg:px-12">
                          <div className="w-full lg:w-full">
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="Address Type*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="Address Type"
                                {...register("address_type", {
                                  required: true,
                                })}
                              />
                              {errors?.address_type && (
                                <p className="text-red-500">
                                  Address Type is Required
                                </p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="Address Line 1*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="Address Line 1"
                                {...register("address_line1", {
                                  required: true,
                                })}
                              />
                              {errors?.address_line1 && (
                                <p className="text-red-500">
                                  Address Line 1 is Required
                                </p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="Address Line 2" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="Address Line"
                                {...register("address_line2")}
                              />
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="City*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="City"
                                {...register("city", { required: true })}
                              />
                              {errors?.city && (
                                <p className="text-red-500">City is Required</p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="State*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="State"
                                {...register("state", { required: true })}
                              />
                              {errors?.state && (
                                <p className="text-red-500">
                                  State is Required
                                </p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="Postal Code*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="Postal Code"
                                {...register("postal_code", { required: true })}
                              />
                              {errors?.postal_code && (
                                <p className="text-red-500">
                                  Postal Code is Required
                                </p>
                              )}
                            </div>
                            <div className="mb-3">
                              <div className="mb-2 block">
                                <Label htmlFor="base" value="Country*" />
                              </div>
                              <TextInput
                                type="text"
                                sizing="md"
                                placeholder="Country"
                                {...register("country", { required: true })}
                              />
                              {errors?.country && (
                                <p className="text-red-500">
                                  Country is Required
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex justify-center lg:justify-end items-center gap-4 pt-10 px-12">
                            <button
                              onClick={() => handleBack()}
                              type="button"
                              className="bg-[#F6BC56] hover:bg-[#231000] text-black text-base leading-[18px] font-semibold text-center rounded-lg px-7 py-3"
                            >
                              Back
                            </button>
                          </div>
                          <div className="flex justify-center lg:justify-end items-center gap-4 pt-10 px-12">
                            <button
                              type="submit"
                              className="bg-[#F6BC56] hover:bg-[#231000] text-black text-base leading-[18px] font-semibold text-center rounded-lg px-7 py-3"
                            >
                              Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}

                {userAddress?.data?.length > 0 && addOtherAddress === false && (
                  <>
                    <div className="">
                      <div className="md:flex gap-8 px-6 lg:px-12 pb-12">
                        <div className="w-full lg:w-full">
                          <div>
                            {userAddress?.data?.map((addresses, index) => {
                              return (
                                <>
                                  <div key={index}>
                                    <div className="flex items-center gap-2 mb-2.5">
                                      <Radio
                                        id="newest"
                                        name="sortby"
                                        value={addresses?.id}
                                        onChange={() =>
                                          setSelectedAddress(addresses?.id)
                                        }
                                        checked={
                                          selectedAddress === addresses?.id
                                        }
                                      />
                                      <Label htmlFor="newest">
                                        {addresses?.address_line1},
                                        {addresses?.address_line2},
                                        {addresses?.city}-
                                        {addresses?.postal_code},
                                        {addresses?.state},{addresses?.country}
                                      </Label>
                                    </div>
                                    {index < userAddress?.data?.length - 1 && (
                                      <hr className="my-4" />
                                    )}
                                  </div>
                                </>
                              );
                            })}
                            <div className="flex gap-1">
                              <div className="flex justify-center lg:justify-end items-center gap-4 pt-10 px-12">
                                <button
                                  onClick={() => handleAnotherAddress()}
                                  type="button"
                                  className="bg-[#F6BC56] hover:bg-[#231000] text-black text-base leading-[18px] font-semibold text-center rounded-lg px-7 py-3"
                                >
                                  Add Another Address
                                </button>
                              </div>
                              <div className="flex justify-center lg:justify-end items-center gap-4 pt-10 px-12">
                                <button
                                  onClick={() => handleContinue()}
                                  type="button"
                                  className="bg-[#F6BC56] hover:bg-[#231000] text-black text-base leading-[18px] font-semibold text-center rounded-lg px-7 py-3"
                                >
                                  Continue With Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
};

export default Cart;
