import { useState, useEffect } from "react";

import useShowListing from "../../hooks/useShowListing";

import { Edit, Eye, Trash } from "react-feather";
import CustomModal from "../CustomModal";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaInfoCircle, FaRoute } from "react-icons/fa";

const SingleList = (props: SingleListProps) => {
  const { item } = props;

  const [showModal, setShowModal] = useState(false);
  const [screenWidth, setScreenWidth] = useState(800);
  const navigate = useNavigate();
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [window.innerWidth]);
  const { handleDeleteListing } = useShowListing();

  return (
    <>
      <div className="max-w-[300px] max-h-[400px] sm:max-h-[450px]  overflow-hidden bg-white rounded-lg hover:shadow-2xl shadow-lg flex flex-col justify-center">
        <Link to={`/show-listing/${item._id}`}>
          <div className="relative">
            <img
              className="w-full sm:h-48  transition duration-100"
              src={
                typeof item.imageUrls[0] === "string" ? item.imageUrls[0] : ""
              }
              alt={item.name}
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 transition duration-100 hover:bg-opacity-50 hover:opacity-100">
              <Eye color={"white"} size={40} />
            </div>
          </div>
        </Link>
        <div className="flex-2 p-6 items-center h-[100px] sm:h-[250px] max-h-[150px] sm:max-h-[250px]">
          <h4 className="text-2xl font-semibold text-gray-700">{item.name}</h4>
          <div className="my-3 flex gap-3 flex-wrap items-center">
            {screenWidth > 500 && (
              <p className="flex text-sm gap-3 text-gray-700">
                <FaInfoCircle size={20} />
                {item.description.split(" ").slice(0, 7).join(" ")}....
              </p>
            )}
            <h5 className="flex text-sm gap-3 text-gray-700">
              <FaRoute />
              {item.address.slice(0, 20)}
            </h5>

            <h6 className="flex text-sm gap-3 text-gray-700">
              <FaHome />
              {item.roomType.toUpperCase()}
            </h6>
          </div>
        </div>

        <div className="flex-1 max-h-[88px] flex justify-between p-5 bg-gray-100 ">
          <span>₹{item.specifications.discountedPrice.toFixed(2)}</span>
          <div className="flex gap-3 ">
            <span className="hover:bg-stone-100" title="Delete this Lisiting">
              <Trash
                size={20}
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </span>
            <span className="hover:bg-slate-100" title="Edit this Listing">
              <Edit
                size={20}
                hanging={"true"}
                onClick={() => navigate(`/update-listing/${item._id}`)}
              />
            </span>
          </div>
        </div>
      </div>

      <CustomModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onOk={() => handleDeleteListing(item?._id || "")}
        title={"You are Permanently deleting this Listing! "}
      />
    </>
  );
};

export default SingleList;
