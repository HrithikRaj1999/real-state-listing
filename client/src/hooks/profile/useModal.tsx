import { useState } from "react";

const useModal = () => {
  const [modalConditions, setModalConditions] = useState({
    title: "",
    isOpen: false,
    handler: () => {},
  });
  const openModal = (title: string, handler: () => {}) => {
    setModalConditions((prev) => ({
      ...prev,
      title,
      isOpen: true,
      handler: handler,
    }));
  };
  const closeModal = () => {
    setModalConditions((prev) => ({
      ...prev,
      title: "",
      handler: () => {},
      isOpen: false,
    }));
  };
  return { openModal, closeModal, modalConditions };
};

export default useModal;
