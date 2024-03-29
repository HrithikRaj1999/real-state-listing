import mongoose, { Schema } from "mongoose";
import { MongoListingDataType } from "../dataTypes";


const listingSchema = new Schema<MongoListingDataType>(
  {
    name: {
      type: String,
      text: true,
      required: true,
    },
    description: {
      type: String,
      text: true,
      required: true,
    },
    address: {
      type: String,
      text: true,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    facilities: {
      type: [{ type: String, text: true }],
      required: true,
    },
    specifications: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      text: true,
      required: true,
    },
    roomType: {
      type: String,
      text: true,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Listing = mongoose.model<MongoListingDataType>(
  "Listing",
  listingSchema,
); //Listing must Me L capital and singular so collection will be named automatically (l)isting(s))
