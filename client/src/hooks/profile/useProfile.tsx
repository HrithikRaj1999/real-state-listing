import { useState } from "react";

import { useNavigate } from "react-router-dom";
import useFileManagement from "./useFileManagement";
import useImageModal from "./useImageModal";
import { useInputHandling } from "./useInputHandling";
import useModal from "./useModal";
import useUserActions from "./useUserActions";

const useProfile = () => {
  const [formData, setFormData] = useState<FormDataType | null>(null);
  const { openModal, closeModal, modalConditions } = useModal();
  const { showModal, setShowModal } = useImageModal();
  const navigate = useNavigate();
  const {
    handlePicClick,
    handlePicSelect,
    handleViewPicture,
    filePercentage,
    fileUploadError,
    file,
    fileRef,
    divRef,
    showImageOptionsDiv,
    handlePicRemove,
    setShowImageOptionsDiv,
  } = useFileManagement(formData, setFormData);
  const { currentUser, handleSignOut, handleUserDelete, handleUpdateSubmit } =
    useUserActions(formData, setFormData);
  const {
    state,
    loading,
    error,
    passwordShowIcon,
    handleInputChange,
    handlePassView,
    dispatch,
  } = useInputHandling(formData, setFormData);
  const profilePic = formData?.avatar || currentUser?.avatar;
  return {
    currentUser,
    fileRef,
    profilePic,
    file,
    formData,
    filePercentage,
    fileUploadError,
    state,
    loading,
    error,
    passwordShowIcon,
    showImageOptionsDiv,
    divRef,
    openModal,
    closeModal,
    modalConditions,
    setShowImageOptionsDiv,
    showModal,
    navigate,
    setShowModal,
    handleViewPicture,
    dispatch,
    handlePicClick,
    handlePicRemove,
    handlePicSelect,
    handleInputChange,
    handleUpdateSubmit,
    handlePassView,
    handleUserDelete,
    handleSignOut,
  };
};

export default useProfile;
