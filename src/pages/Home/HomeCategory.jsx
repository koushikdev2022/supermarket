import { useState } from "react";
import { cat01, cat02, cat03 } from "../../assets/images/images";
import { useNavigate } from "react-router-dom";

const HomeCategory = ({ userLanguage, categories }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);
  const handleViewAll = () => {
    setShowAll(!showAll);
  };
  const handleCategoryPage = (id) => {
    navigate(`/product-list/${id}`);
  };
  return (
    <>
      <div className="py-5">
        <div
          className={`flex ${
            userLanguage == "english" ? "justify-between" : "flex-row-reverse"
          } justify-between items-center mb-2 lg:mb-8`}
        >
          <h3 className="text-black text-[18px] lg:text-[28px] font-bold">
            Categories
          </h3>
          <p className="text-[#BE7A3A] font-bold text-sm lg:text-[17px]">
            <button onClick={handleViewAll}>
              {showAll ? "View less" : "View all"}
            </button>
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-8">
          {(showAll ? categories?.data : categories?.data?.slice(0, 6))?.map(
            (categoriData) => {
              return (
                <>
                  <button
                    onClick={() => {
                      handleCategoryPage(categoriData?.id);
                    }}
                  >
                    <div className="bg-white border border-[#f1e2d4] p-0 rounded-xl overflow-hidden">
                      <div className="text-center py-14">
                        <p className="text-[#231000] text-base font-medium">
                          {categoriData?.category_name}
                        </p>
                      </div>
                      <div className="text-center">
                        {categoriData?.banner ? (
                          <img
                            src={categoriData?.banner}
                            alt="cat01"
                            className="inline-block rounded-xl w-full"
                          />
                        ) : (
                          <img
                            src="https://development.pellets.supply/assets/noimg.png"
                            alt="cat01"
                            className="inline-block rounded-xl w-full"
                          />
                        )}
                      </div>
                    </div>
                  </button>
                </>
              );
            }
          )}
        </div>
      </div>
    </>
  );
};
export default HomeCategory;
