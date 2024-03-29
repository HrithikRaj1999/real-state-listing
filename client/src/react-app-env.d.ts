/// <reference types="react-scripts" />

interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
interface QueryParams {
  limit: string;
  startIndex: string;
  amenities?: string;
  type?: string;
  searchText?: string;
  sortBy?: string;
  roomType?: "furnished" | "un-furnished" | "semi-furnished" | undefined;
}

interface searchQueryType {
  name?: { $regex: string; $options: string };
  $text?: { $search: string };
  score: { $meta: "textScore" };
  roomType?: "furnished" | "un-furnished" | "semi-furnished" | undefined;
  type?: { $in: string[] };
  facilities?: { $in: string[] };
  address: { $regex: string; $options: "i" };
}
interface MongoListingDataType {
  _id?: string;
  name?: string;
  description?: string;
  address?: string;
  type?: string;
  phone?: string;
  roomType?: string;
  specifications?: SpecificationsType;
  facilities?: string[];
  imageUrls?: string[];
  userRef?: string;
}
interface updateUserControllerBody {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  tokenUserId: string;
}
interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
interface PictureUploadListingDataType {
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: File[];
  userRef?: string;
}
interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOk: () => void;
  title: string | ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  header?: ReactNode;
  okLabel?: string;
  className?: string;
}
interface modalPropsType {
  src: string | undefined;
  alt: string;
  onClose: () => void;
}
interface FeatureSectionProps {
  regularListings: itemType[] | null;
}

interface ModalPropsType {
  showModal: boolean;
  title?: string;
  info?: string;
  okLabel?: string;
  showOkLabel?: boolean;
  cancelLabel?: string;
  showCancelLabel?: boolean;
  children?: React.ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  onOk?: () => void;
  onCancel?: () => void;
}
interface OffersSectionpropsType {
  offerListings: itemType[] | null;
}
interface propType {
  searchedData: itemType[];
}
interface propTypes {
  item: itemType;
}
interface SearchValuesType {
  searchText: string;
  sortBy: string;
  type: string[];
  amenities: string[];
  roomType: string;
}
interface SearchProviderProps {
  children: React.ReactNode;
}
interface SearchContextType {
  searchedLisitingData: itemType[];
  setSearchedLisitingData: React.Dispatch<React.SetStateAction<itemType[]>>;
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}
interface itemType {
  _id?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: string[];
}
interface SingleListProps {
  item: itemType;
}
interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
interface FormDataType {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
}
interface ListingType {
  _id?: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  type: string;
  specifications: SpecificationsType;
  roomType: string;
  facilities: string[];
  imageUrls: string[];
  userRef: string;
}
interface userType {
  username: string;
  email: string;
  avatar: string;
  _id?: string;
  createdAt?: string;
  listings?: itemType[];
  updatedAt?: string;
  password?: string;
  token: string;
}
interface UserSliceType {
  currentUser: userType | null;
  error: any;
  loading: boolean;
  keepMeSignedIn: boolean;
}
interface State {
  email: string;
  password: string;
  passwordVisible: boolean;
}

interface Action {
  type: "SET_EMAIL" | "SET_PASSWORD" | "TOGGLE_PASSWORD_VISIBILITY";
  payload: any;
}
interface SignUpState {
  username: string;
  email: string;
  password: string;
  loading: boolean;
  error: any;
  passwordVisible: boolean;
}

interface SignUpAction {
  type:
    | "SET_USER_NAME"
    | "SET_EMAIL"
    | "SET_PASSWORD"
    | "SET_LOADING"
    | "SET_ERROR"
    | "TOGGLE_PASSWORD_VISIBILITY";
  payload: any;
}

interface CookieContextProps {
  isCookieChecked: boolean;
}

interface CookieProviderProps {
  children: ReactNode;
}
