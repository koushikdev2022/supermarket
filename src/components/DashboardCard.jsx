import {
  AiFillTag,
  AiFillTags,
  AiOutlineArrowUp,
  AiOutlineBulb,
  AiOutlineShoppingCart,
  BsCollection,
} from "../assets/icons/index";
const DashboardCard = () => {
  return (
    <>
      <div className="rounded-md shadow-md border border-stroke bg-white py-4 px-4 shadow-default">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <AiFillTag className="text-2xl text-[#556ee6]" />
          </div>
          <p className="pl-2 text-lg text-blue-800 font-medium">
            Offer Requests
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-2xl font-medium text-black">45,2K</h4>
          </div>
        </div>
      </div>
      <div className="rounded-md shadow-md border border-stroke bg-white py-4 px-4 shadow-default">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <AiOutlineBulb className="text-2xl text-[#556ee6]" />
          </div>
          <p className="pl-2 text-lg text-blue-800 font-medium">
            Product Concept
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-2xl font-medium text-black">45,2K</h4>
          </div>
        </div>
      </div>
      <div className="rounded-md shadow-md border border-stroke bg-white py-4 px-4 shadow-default">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <AiFillTags className="text-2xl text-[#556ee6]" />
          </div>
          <p className="pl-2 text-lg text-blue-800 font-medium">Offers</p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-2xl font-medium text-black">45,2K</h4>
          </div>
        </div>
      </div>
      <div className="rounded-md shadow-md border border-stroke bg-white py-4 px-4 shadow-default">
        <div className="flex items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <BsCollection className="text-2xl text-[#556ee6]" />
          </div>
          <p className="pl-2 text-lg text-blue-800 font-medium">Collections</p>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <h4 className="text-2xl font-medium text-black">45,2K</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardCard;
