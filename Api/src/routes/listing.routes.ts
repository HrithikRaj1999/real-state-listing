import express from "express";
import {
  UpdateListProperty,
  createListing,
  deleteListing,
  getAllListings,
  getFilteredListings,
  getListingById,
} from "../controller/listing.controller";
import { verifyToken } from "../util/verifyUser";

export const listingRouter = express.Router();
listingRouter.post("/create", verifyToken, createListing);
listingRouter.put(
  "/update-listing/:userId/:listId",
  verifyToken,
  UpdateListProperty,
);
listingRouter.delete(
  "/delete-listing/:userId/:listId",
  verifyToken,
  deleteListing,
);
listingRouter.get("/show-listing/:listingId", getListingById);
listingRouter.get("/get-filtered-listings", getFilteredListings);
listingRouter.get("/get-searched-item", getFilteredListings);
listingRouter.get("/get-all-listings", getAllListings);
