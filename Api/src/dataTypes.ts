export interface SignUpBodyType {
  username?: string;
  email?: string;
  password?: string;
}

export interface SignInBodyType {
  email?: string;
  password?: string;
  keepMeSignedIn?: boolean;
}

export interface GoogleSignInControllerBodyType {
  name: string;
  email: string;
  photoUrl: string;
}
export interface userType {
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
export interface MongoListingDataType {
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
export interface updateUserControllerBody {
  username?: string;
  email?: string;
  password?: string;
  avatar?: string;
  tokenUserId: string;
}
export interface QueryParams {
  limit: string;
  startIndex: string;
  amenities?: string;
  type?: string;
  searchText?: string;
  sortBy?: string;
  roomType?: "furnished" | "un-furnished" | "semi-furnished" | undefined;
}
export interface SpecificationsType {
  bathroom: number;
  bedrooms: number;
  hall: number;
  regularPrice: number;
  discountedPrice: number;
}
export interface itemType {
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
export interface searchQueryType {
  name?: { $regex: string; $options: string };
  $text?: { $search: string };
  score: { $meta: "textScore" };
  roomType?: "furnished" | "un-furnished" | "semi-furnished" | undefined;
  type?: { $in: string[] };
  facilities?: { $in: string[] };
  address: { $regex: string; $options: "i" };
}

export interface JwtPayload {
  id: string;
  iat: number;
}
