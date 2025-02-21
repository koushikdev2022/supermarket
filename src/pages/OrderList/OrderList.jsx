import React, { useEffect } from "react";
import { fp06 } from "../../assets/images/images";
import {
  LuCalendarDays,
  MdOutlineKeyboardArrowRight,
} from "../../assets/icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList } from "../../reducers/OrderSlice";
import { format } from "date-fns";
const OrderList = () => {
  const { orderList } = useSelector((state) => state?.orders);
  const nevigate = useNavigate();
  const dispatch = useDispatch();
  const userid = localStorage.getItem("userId");
  const parseUserId = JSON.parse(userid);
  const user_id = parseUserId?.user_id;
  useEffect(() => {
    dispatch(getOrderList({ user_id: user_id }));
  }, []);
  console.log("orderList", orderList);
  const baseUrl = "https://supermarket.bestworks.cloud/";
  const handleDetailsPage = (id) => {
    nevigate("/details", { state: { id: id } });
  };
  return (
    <div>
      <h2 className="text-black text-[18px] lg:text-[28px] font-bold">
        Order List
      </h2>
      <div className="order_list_area">
        {orderList?.data?.map((orders) => {
          return (
            <>
              {orders?.OrderItems?.map((items) => {
                return (
                  <>
                    <div className="border-b border-[#d9d9d8] py-6">
                      <div className="flex gap-4">
                        <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden inline-block">
                          <img
                            src={
                              baseUrl +
                              "/" +
                              items?.Product?.ProductImage?.[0]?.image
                            }
                            alt="fp06"
                          />
                        </div>
                        <div className="flex items-center">
                          <div>
                            <h3 className="text-[26px] text-[#231000] font-medium">
                              {/* 100.00{" "} */}
                              {items?.Product?.price}{" "}
                              <span className="text-[#776b61] text-[12px] font-medium">
                                SAR
                              </span>
                            </h3>
                            <p className="text-base text-[#BE7A3A] font-medium pb-2">
                              {/* Delivered. */}
                              {orders?.delivery_mode}
                            </p>
                            <div className="flex items-center mb-3">
                              <p className="text-sm text-[#726D69] font-medium flex items-center mr-3">
                                <LuCalendarDays className="mr-1" />
                                {format(
                                  new Date(orders?.order_date),
                                  "dd MMMM, yyyy"
                                )}
                              </p>
                              <p className="text-sm text-[#726D69] font-medium flex items-center mr-3">
                                <LuCalendarDays className="mr-1" />
                                {/* 01:12 AM */}
                                {format(
                                  new Date(orders?.order_date),
                                  "hh:mm a"
                                )}
                              </p>
                              {/* <p className="text-sm text-[#726D69] font-medium flex items-center mr-3">
                                <LuCalendarDays className="mr-1" />
                                2132142323
                              </p> */}
                            </div>
                            <button
                              onClick={() => handleDetailsPage(items?.id)}
                              className="text-base text-[#231000] font-medium pb-1 flex items-center hover:text-[#BE7A3A]"
                              // to="/details"
                            >
                              View details{" "}
                              <MdOutlineKeyboardArrowRight className="text-xl" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default OrderList;
