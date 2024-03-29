import { useState } from "react";

const useImageModal = () => {
  const [showModal, setShowModal] = useState(false);
  return { showModal, setShowModal };
};

export default useImageModal;
