import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import api from "../../config/customApi";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { REACT_APP_DEFAULT_PROFILE_IMAGE } from "../../constants/link";
import { app } from "../../firebase/firebase";
import { RootState } from "../../redux/store";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
//firebase storage
//   allow read;
//   allow write:if
//   request.resource.size< 10 * 1024 * 1024 &&
//   request.resource.contentType.matches('images/.*')

const useFileManagement = (
  formData: FormDataType | null,
  setFormData: React.Dispatch<React.SetStateAction<FormDataType | null>>,
) => {
  const userDispatch = useDispatch();
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const [showImageOptionsDiv, setShowImageOptionsDiv] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [filePercentage, setFilePercentage] = useState<number>(0);
  const divRef = useRef<HTMLDivElement>(null);
  const [fileUploadError, setFileUploadError] = useState<object | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const handlePicRemove = async () => {
    try {
      userDispatch(updateUserStart());
      const res = await api.put(
        `user/removePic/${currentUser?._id}`,
        { avatar: REACT_APP_DEFAULT_PROFILE_IMAGE },
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message);
      userDispatch(updateUserSuccess(res.data.user));
    } catch (error: any) {
      toast.error(error.response.data.message);
      userDispatch(updateUserFailure(error.response.data.message));
    }
  };
  const handlePicClick = () => {
    if (fileRef.current) {
      fileRef.current.click();
      setShowImageOptionsDiv(false);
    }
  };
  const handleViewPicture = () => {
    setShowImageOptionsDiv(false);
  };
  const handlePictureUpload = async (downloadUrl: string) => {
    userDispatch(updateUserStart());
    try {
      const res = await api.put(
        `user/updatePic/${currentUser?._id}`,
        { avatar: downloadUrl },
        { withCredentials: true },
      );
      userDispatch(updateUserSuccess(res.data.user));
      toast.success(res.data.message);
    } catch (error: any) {
      userDispatch(updateUserFailure(error.response.data.message));
      toast.error(error.response.data.message);
    }
  };
  const handlePicSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      toast.error(CLIENT_MESSAGE.PHOTO_NOT_UPLOADED);
      return;
    }
    try {
      const newUploadedFile = e.target.files[0];
      const storage = getStorage(app);
      const fileName = newUploadedFile.name + new Date().getTime();
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, newUploadedFile);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          toast.info(CLIENT_MESSAGE.UPLOAD_STARTED, {
            toastId: TOAST_ID,
            hideProgressBar: true,
          });
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilePercentage(Math.round(progress));
          toast.update(TOAST_ID, {
            render: `Uploading ${Math.round(progress)}%`,
          });
        },
        (error: any) => {
          setFileUploadError(error);
          toast.dismiss(TOAST_ID);
          toast.error(CLIENT_MESSAGE.INVALID_PHOTO);
          setFilePercentage(0); // You might want to reset the percentage on error
          e.target.files = null;
        },
        async () => {
          // Wait for the upload task to complete
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFilePercentage(100); // Set the percentage to 100 on success
          setFileUploadError(null);
          toast.dismiss(TOAST_ID);
          setFormData((prevFormData: FormDataType | null) => ({
            ...prevFormData,
            avatar: downloadUrl,
          }));

          handlePictureUpload(downloadUrl);
        },
      );
      setFile(newUploadedFile);
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowImageOptionsDiv(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowImageOptionsDiv]);
  return {
    handlePicClick,
    handlePicSelect,
    handleViewPicture,
    filePercentage,
    fileUploadError,
    file,
    fileRef,
    handlePicRemove,
    showImageOptionsDiv,
    setShowImageOptionsDiv,
    divRef,
  };
};

export default useFileManagement;
