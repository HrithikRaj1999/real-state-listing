import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { CLIENT_MESSAGE, TOAST_ID } from "../../constants/clientMessage";
import { app } from "../../firebase/firebase";
import api from "../../config/customApi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import _ from "lodash";
import { MultiValue } from "react-select/dist/declarations/src";
import { useNavigate, useParams } from "react-router-dom";
const useUpdateListing = () => {
  const { listId } = useParams();
  const { currentUser } = useSelector((state: RootState) => state.userReducer);
  const initialFormikData: itemType | undefined = currentUser
    ?.listings!.filter((i) => i._id === listId)
    .pop();

  const updatedPictureList = (
    id: number,
    values: PictureUploadListingDataType,
  ) => {
    const img = Array.from(values.imageUrls);
    img.splice(id, 1);
    return img;
  };
  const navigate = useNavigate();

  const handleChangeOfSelect = (
    selectedOptions: MultiValue<{
      value: string;
      label: string;
      __isNew__?: boolean;
    }>,
    setFieldValue: (arg0: string, arg1: string[]) => void,
  ) => {
    const filteredOptions = selectedOptions.map(({ label, ...rest }) => label);
    setFieldValue("facilities", filteredOptions);
  };
  const handleUpdate = async (
    values: PictureUploadListingDataType,
    setFieldValue: (arg0: string, arg1: string[]) => void,
  ) => {
    if (_.isEmpty(values.imageUrls))
      toast.error(CLIENT_MESSAGE.NO_PHOTO_SELECTED);
    else if (values.imageUrls.length > 0 && values.imageUrls.length < 7) {
      try {
        const promises = [];
        let urls: string[] | File[] = values.imageUrls;
        if (typeof values.imageUrls[0] !== "string") {
          for (let i = 0; i < values.imageUrls.length; i++) {
            promises.push(storageImage(values.imageUrls[i] as File));
          }
          urls = await Promise.all(promises);
        }
        const res = await api.put(
          `/listing/update-listing/${currentUser?._id}/${listId}`,
          {
            values,
            imageUrls: [...urls],
          },
          { withCredentials: true },
        );
        navigate(`/show-listing/${res.data.listing._id}`);
        toast.success(CLIENT_MESSAGE.SUCCESS_LISTING_EDIT);
        toast.dismiss(TOAST_ID);
      } catch (error: any) {
        setFieldValue("imageUrls", []);
        toast.dismiss(TOAST_ID);
        toast.error(error?.response?.data?.message || "Server Error");
      }
    } else {
      toast.error(CLIENT_MESSAGE.FAILED_LISTING_PHOTO_UPLOAD);
    }
  };
  const storageImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          toast.info(CLIENT_MESSAGE.UPLOAD_STARTED, {
            toastId: TOAST_ID,
            hideProgressBar: true,
          });
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          toast.update(TOAST_ID, {
            render: `Uploading ${Math.round(progress)}%`,
          });
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        },
      );
    });
  };
  return {
    currentUser,
    initialFormikData,
    handleUpdate,
    updatedPictureList,
    handleChangeOfSelect,
  };
};
export default useUpdateListing;
