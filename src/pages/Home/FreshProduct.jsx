import { GoPlus } from "react-icons/go";
import { fp01, fp02, fp03, fp04, fp05, fp06 } from "../../assets/images/images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toast, ToastContainer } from "react-toastify";
import { addProductInList } from "../../reducers/AddToCardSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const FreshProduct = ({ userLanguage, freshProlist }) => {
  console.log("FrshPro", freshProlist);
  const baseUrl = "https://supermarket.bestworks.cloud/";
  const daily_needs_setting = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    arrows: true,
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("userId"));
  const userId = user?.user_id || null;
  const handleAndCheckComplexProduct = (itemId, combinable, frshPro) => {
    let item = frshPro;
    const payload = {
      product_id: parseInt(itemId),
      // "combination_id": null,
      user_id: userId,
      quantity: 1,
    };
    if (combinable) {
      navigate("/product-details", { state: { item } });
    } else {
      dispatch(addProductInList(payload)).then((res) => {
        console.log("add to cart", res);
        if (res?.payload?.status_code === 201) {
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
          toast.error("Something went Wrong", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            progress: undefined,
            theme: "dark",
          });
        }
      });
    }
  };
  const handleProductDes = (id) => {
    navigate(`/product-details/${id}`);
  };
  return (
    <>
      <ToastContainer />
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Fresh products
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            Favorite products
          </p>
        </div>
        <div className="daily_needs_slider">
          <Slider {...daily_needs_setting}>
            {freshProlist?.data
              ?.filter(
                (item) => Array.isArray(item?.branch) && item.branch.length > 0
              )
              ?.map((frshPro) => {
                return (
                  <>
                    <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
                      <button onClick={() => handleProductDes(frshPro?.id)}>
                        <div className="text-center border-b border-[#faf4ee]">
                          {frshPro?.productImage?.[0] ? (
                            <>
                              <img
                                src={
                                  frshPro?.productImage?.[0]?.image
                                    ? `${baseUrl}uploads/products/${
                                        frshPro?.id
                                      }/250/${frshPro.productImage[0].image
                                        .split("/")
                                        .pop()}`
                                    : "https://development.pellets.supply/assets/noimg.png"
                                }
                                alt="fp01"
                                className="inline-block rounded-xl w-full"
                              />
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
                      </button>
                      <div
                        className={`${
                          userLanguage == "english" ? "text-left" : "text-right"
                        } px-4 pb-4 mt-[-20px] min-h-[160px]`}
                      >
                        <div
                          className={`flex ${
                            userLanguage == "english"
                              ? "justify-start"
                              : "justify-end"
                          } mb-0`}
                        >
                          <button
                            onClick={() =>
                              handleAndCheckComplexProduct(
                                frshPro?.id,
                                frshPro?.is_combinable,
                                frshPro
                              )
                            }
                            className="bg-[#f6bc56] w-[40px] h-[40px] rounded-full flex justify-center items-center"
                          >
                            <GoPlus className="text-xl text-black" />
                          </button>
                        </div>
                        <h3 className="text-[26px] text-[#231000] font-medium">
                          {frshPro?.price}{" "}
                          <span className="text-[#776b61] text-[12px] font-medium">
                            SAR
                          </span>
                        </h3>
                        <h4 className="text-[#EA1E2D] text-[10px] font-medium mb-1">
                          <span className="text-[#776b61] text-[12px] font-medium line-through pr-1">
                            23 SAR
                          </span>
                          12% off{" "}
                        </h4>
                        <p className="text-[#231000] text-base leading-[20px] font-normal">
                          {frshPro?.product_name}
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default FreshProduct;
