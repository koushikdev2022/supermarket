import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "../../assets/icons";
import {
  cardImg,
  deliveryIcon,
  siteIcon,
  taddyIcon,
  waletIcon,
} from "../../assets/images/images";
import { useDispatch, useSelector } from "react-redux";
import { ToggleSwitch } from "flowbite-react";
import { useState } from "react";
import { getCartItemList, placeOrder } from "../../reducers/CartItemSlice";
import { getAddress } from "../../reducers/AddAddressSlice";
import { toast, ToastContainer } from "react-toastify";

const Payment = () => {
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { userAddress } = useSelector((state) => state?.address);
  const { data } = useSelector((state) => state?.cartItemList);
  const deliveryData = useSelector((state) => state.orders);
  const [switch1, setSwitch1] = useState(false);
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;
  console.log("Retrieved userId:", userId);
  console.log("deliveryData", deliveryData);
  let user_address_id = location?.state?.user_address_id;
  console.log("location", location?.state?.user_address_id);

  const delevaryCharge = deliveryData?.delevaryCalculationData?.data?.map(
    (item, index) => {
      return item?.delivaryCharge;
    }
  );

  const paidTotal = deliveryData?.delevaryCalculationData?.paidTotal || 0;
  const deliveryCharge =
    deliveryData?.delevaryCalculationData?.delevaryCharge || 0;

  const finalSum = paidTotal + deliveryCharge;
  console.log("deliveryData1", deliveryData?.delevaryCalculationData?.data);
  useEffect(() => {
    dispatch(getCartItemList({ user_id: userId }));
  }, []);
  console.log("cart Item", data?.data);
  useEffect(() => {
    dispatch(getAddress({ user_id: userId }));
  }, [userId]);
  console.log("userAddress", userAddress);
  const filteredAddress = userAddress?.data?.filter(
    (address) => address.id === user_address_id
  );
  console.log("Filtered Address:", filteredAddress);

  // console.log(finalSum); // This will display the final sum
  const handlePlaceOrder = () => {
    const products =
      data?.data?.map((item) => ({
        product_id: item?.product_id,
        quantity: item?.quantity,
        unit_price: item?.product_details?.price,
        is_free: item?.is_free || 0, // Default to 0 if `is_free` is not provided
      })) || [];
    const payload = {
      user_id: userId,
      order_type: "delivery",
      user_address_id: user_address_id,
      payment_status: 1,
      delivery_mode: "pickup",
      products: products,
      data: deliveryData?.delevaryCalculationData?.data,
    };
    dispatch(placeOrder(payload)).then((res) => {
      console.log("res", res);
      if (res?.payload?.status_code === 201) {
        toast.success(res?.payload?.message);
        setTimeout(() => {
          nevigate("/home");
        }, 3000);
      }
    });
  };
  return (
    <>
      <ToastContainer />
      <div>
        <div className="pb-6 block">
          <ul className="flex items-center">
            <li className="pr-3">
              <Link
                to="/"
                className="text-sm text-[#726D69] font-normal flex justify-start items-center hover:text-[#BE7A3A]"
              >
                The main page <IoIosArrowForward />
              </Link>
            </li>
            <li className="text-[#BE7A3A] text-sm font-bold">Shopping cart</li>
          </ul>
        </div>
        {/* Cart section start here */}
        <div className="flex gap-10 py-6">
          <div className="w-6/12">
            {/* Recommended products section start here */}
            <div className="border-b-2 border-[#edded0] pb-3 mb-4">
              <h3 className="text-base text-[#231000] font-bold mb-3">
                The address and delivery time
              </h3>
              <div className="flex items-center">
                <img src={deliveryIcon} alt="" className="mr-1" />
                <p className="text-[#231000] text-sm">
                  Delivery to: {filteredAddress?.[0]?.address_line1},
                  {filteredAddress?.[0]?.address_line2},
                  {filteredAddress?.[0]?.city}-
                  {filteredAddress?.[0]?.postal_code},
                  {filteredAddress?.[0]?.state},{filteredAddress?.[0]?.country}
                </p>
              </div>
            </div>
            <div className="border-b-2 border-[#edded0] pb-3 mb-6">
              <div className="pb-4">
                <h3 className="text-base text-[#231000] font-bold mb-6">
                  Payment method
                </h3>
                <div className="flex justify-between items-center border-b border-[#d9d8d7] pb-3">
                  <div className="flex items-center">
                    <img src={taddyIcon} alt="taddyIcon" className="mr-2" />
                    <p className="text-base text-black font-medium">tabby</p>
                  </div>
                  <div>
                    <Link>تغيير</Link>
                  </div>
                </div>
              </div>
              <div className="pb-0">
                <h3 className="text-base text-[#231000] font-bold mb-6">
                  Payment method
                </h3>
                <div className="flex justify-between items-center pb-3">
                  <div className="flex items-center">
                    <img src={waletIcon} alt="waletIcon" className="mr-2" />
                    <p className="text-base text-black font-medium mr-6">
                      wallet
                    </p>
                    <p className="text-base text-[#BE7A3A] font-medium">
                      SAR 0.00
                    </p>
                  </div>
                  <div>
                    <ToggleSwitch
                      checked={switch1}
                      label=""
                      onChange={setSwitch1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="border-b-2 border-[#edded0] pb-3 mb-6">
              <div className="border border-[#efecea] p-5 rounded-xl w-8/12">
                <div className="flex">
                  <div className="py-4">
                    <img src={siteIcon} alt="siteIcon" />
                  </div>
                  <div>
                    <div className="flex px-3">
                      <div className="text-base text-[#231000] font-bold pr-3">
                        <p>Free Delivery on Every Order</p>
                      </div>
                      <div className="w-20 h-8 rounded-full bg-[#F6BC56] flex items-center justify-center">
                        <p className="m-0 p-0 text-center font-bold">
                          Subscribe
                        </p>
                      </div>
                    </div>
                    <div className="text-base text-[#231000] px-3">
                      <p>
                        Helps you get promotional offers and personal discounts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-6 block">
              <ul className="flex  justify-between w-12/12">
                <li className="pr-3">
                  <Link
                    to="/"
                    className="text-lg text-[#BE7A3A] flex justify-start items-center hover:text-[#BE7A3A] font-bold"
                  >
                    All coupons(0) <IoIosArrowForward />
                  </Link>
                </li>
                <li className="text-[#000000] text-sm font-bold">
                  Coupons and Offers
                </li>
              </ul>
            </div>

            <div className="border-b-2 border-[#edded0] pb-3 mb-6">
              <div className="border border-[#efecea] rounded-xl w-8/12">
                <div className="flex">
                  <div className="bg-[#F6BC56] rounded-l-lg w-8 h-16">
                    <p className="rotate-90 text-xs mb-14 ml-4">Coupons</p>
                  </div>

                  <div className="m-1 p-1">
                    <div className="w-80 flex justify-between">
                      <p className="rotate-text text-[#BE7A3A] font-bold ">
                        Add Coupon
                      </p>
                      <p className="rotate-text text-[#2310008A]">
                        Valid until 2\2\2022
                      </p>
                    </div>
                    <div>
                      <p className="text-[#2310008A]">
                        You can add your own coupon.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-[#231000]">
                If the product is not available, would you like to:
              </p>
            </div>

            <div className="p-2">
              <div className="border border-[#efecea] rounded-xl w-8/12 h-9 flex items-center pl-2 bg-[#ffffff]">
                <input type="radio" className="mr-2" />
                <p className="text-sm">Replace it with a similar product</p>
              </div>
            </div>

            <div className="p-2">
              <div className="border border-[#efecea] rounded-xl w-8/12 h-9 flex items-center pl-2 bg-[#ffffff]">
                <input type="radio" className="mr-2" />
                <p className="text-sm">The item is not available.</p>
              </div>
            </div>

            {/* Recommended products section ends here */}
          </div>
          <div className="w-6/12">
            <div>
              <h3 className="text-base text-[#231000] font-bold mb-3">
                Order summary
              </h3>

              <h3 className="text-base text-[#231000] font-bold mb-3">
                summary
              </h3>

              <div className="w-8/12 flex justify-between items-center">
                <p className="text-base text-[#726D69] font-medium">
                  Price of items
                </p>
                <p className="text-base text-[#231000] font-medium">0$</p>
              </div>

              <div class="border-b border-[#d9d8d7] pb-3 mb-4 w-8/12" />
            </div>

            <div className="w-8/12 flex justify-between items-center">
              <p className="text-base text-[#726D69] font-medium">
                Shipping fees/costs
              </p>
              <p className="text-base text-[#231000] font-medium">0$</p>
            </div>

            <div class="border-b border-[#d9d8d7] pb-3 mb-4 w-8/12" />

            <div className="w-8/12 flex justify-between items-center">
              <p className="text-base text-[#726D69] font-medium">
                The discount
              </p>
              <p className="text-base text-[#231000] font-medium">0$</p>
            </div>

            <div class="border-b border-[#d9d8d7] pb-3 mb-4 w-8/12" />

            <div className="w-8/12 flex justify-between items-center">
              <p className="text-base text-[#726D69] font-medium">
                Delivery Charges
              </p>
              <p className="text-base text-[#231000] font-medium">
                {delevaryCharge}$
              </p>
            </div>

            <div class="border-b border-[#d9d8d7] pb-3 mb-4 w-8/12" />

            <div className="w-8/12 flex justify-between items-center">
              <p className="text-base text-[#231000] font-medium">
                Final total/Sum total
              </p>
              <p className="text-base text-[#231000] font-medium">
                {finalSum}$
              </p>
            </div>
            <div />

            <div className="border border-[#ece7e3] rounded-xl shadow-md p-4 flex">
              <div className="w-8/12">
                <p className="text-[#231000] text-[10px] font-medium">
                  Please make sure that the value of all shipments has reached
                  the minimum to be able to complete the order.
                </p>
                <h3 className="text-[#726D69] text-[18px] font-medium">
                  SAR 23
                </h3>
                <span className="text-[#726D69] text-[10px] font-medium">
                  with tax"
                </span>
              </div>
              <div className="w-4/12 flex justify-end items-end">
                <button
                  onClick={() => {
                    handlePlaceOrder();
                  }}
                  className="bg-[#3AFFBE] text-[#231000] text-base font-medium w-full block py-2 rounded-lg hover:bg-black hover:text-[#F6BC56]"
                >
                  Taddy
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
      </div>
    </>
  );
};

export default Payment;
