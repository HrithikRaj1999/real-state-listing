import React, { useEffect } from "react";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";

import {
  FaAudioDescription,
  FaFeatherAlt,
  FaFedora,
  FaHandPointRight,
  FaHome,
} from "react-icons/fa";
import CustomModal from "../components/CustomModal";
import useShowSingleList from "../hooks/Listing/useShowSingleList";

const ShowSingleList = () => {
  const {
    fetchListing,
    handleEmailSend,
    message,
    setMessage,
    currentUser,
    loading,
    showContactModal,
    listing,
    listId,
    setShowContactModal,
  } = useShowSingleList();

  useEffect(() => {
    fetchListing();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listId]);

  return loading && listing ? (
    <div className="flex flex-col gap-3 justify-center items-center h-screen">
      <Spinner height={10} width={10} />
      Loading....
    </div>
  ) : (
    <>
      <div>
        <Swiper
          navigation={true}
          className="mySwiper min-w-[375px] bg-black flex items-center h-[250px] sm:h-[500px] md:h-[700px]"
        >
          {listing?.imageUrls &&
            listing?.imageUrls.map((url: string, index: number) => (
              <SwiperSlide zoom={true} key={index}>
                <img
                  key={index}
                  alt="images"
                  className="coverbg-no-repeat"
                  src={url}
                ></img>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className="flex bg-zinc-50 mt-3 p-4 pt-5 sm:pt-16  mx-0 sm:mx-12 md:mx-16 flex-col rounded-xl gap-9">
        <span className="text-lg sm:text-xl md:text-2xl font-semibold">
          {listing?.name} - ₹{listing?.specifications.regularPrice}/per month
        </span>
        <span className="text-base sm:text-lg md:text-xl font-thin flex gap-4 items-center">
          <FaHome size={40} /> {listing?.address}
        </span>
        <div className="flex flex-wrap gap-4">
          <button className="bg-red-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            For {listing?.type}
          </button>{" "}
          <button className="bg-blue-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            Discount Price - ₹{listing?.specifications.discountedPrice}/per
            month
          </button>
          <button className="bg-green-800 text-white p-2 rounded-xl text-xs sm:text-sm ">
            Room Type - {listing?.roomType.toUpperCase()}
          </button>
        </div>
        <div className="flex flex-col gap-3 justify-center rounded-2xl">
          <span className="text-2xl flex gap-3  items-center font-semibold text-green-800">
            {" "}
            <FaAudioDescription /> Discription -{" "}
          </span>{" "}
          <p className=" text-sm sm:text-xl p-8  max-w-[1000px]">
            {listing?.description}
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl flex gap-3 items-center font-semibold text-green-800">
            <FaFeatherAlt />
            Facilities-{" "}
          </span>
          <div className="flex items-center ml-12 flex-wrap gap-4">
            {listing?.facilities.map((item: string) => (
              <>
                <FaHandPointRight size={15} />
                <span className="text-xs sm:text-lg  font-bold text-black ">
                  {item}
                </span>
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-2xl flex gap-3 items-center font-semibold text-green-800">
            <FaFedora />
            Specifications-{" "}
          </span>
          <div className="flex items-center ml-12 flex-wrap gap-4">
            {listing?.specifications &&
              Object.entries(listing?.specifications).map(
                (specification: any) =>
                  !["regularPrice", "discountedPrice"].includes(
                    specification[0],
                  ) ? (
                    <React.Fragment>
                      <FaHandPointRight size={15} />
                      <span className="text-xs sm:text-lg font-bold text-black ">
                        {specification[1]} {specification[0]}
                      </span>
                    </React.Fragment>
                  ) : null,
              )}
          </div>
          {currentUser && listing?.userRef !== currentUser._id ? (
            <div className="flex justify-center my-3">
              <button
                onClick={() => setShowContactModal(true)}
                className="bg-gray-700 p-3 mb-9 rounded-xl text-white text-xs sm:text-xl"
              >
                Contact to Owner{" "}
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <CustomModal
        title={"Contact to the Owner"}
        isOpen={showContactModal}
        okLabel={"Send"}
        onOk={handleEmailSend}
        onClose={() => setShowContactModal(false)}
      >
        <textarea
          className="p-2 m-2 border-slate-600 rounded-xl h-24"
          name="message"
          placeholder="Message to owner...."
          id="message"
          rows={2}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </CustomModal>
    </>
  );
};

export default ShowSingleList;
