import { RequestHandler } from "express";
import {
  DEFAULT_EXPIRATION,
  HTTP_STATUS_CODES,
  HTTP_STATUS_MESSAGE,
  MESSAGES,
  ROOMTYPE,
} from "../constants/data";
import { Listing } from "../models/listing.model";
import createHttpError from "http-errors";
import { redisClient } from "../../server";
import { getOrSetCache } from "../util/redis";
import { MongoListingDataType, QueryParams, itemType, searchQueryType } from "../dataTypes";
export const createListing: RequestHandler<
  unknown,
  unknown,
  MongoListingDataType,
  unknown
> = async (req, res, next) => {
  try {
    const newList = await Listing.create(req.body);

    // Convert _id to a simple string ID
    const simpleIdList = { ...newList.toObject(), _id: newList._id.toString() };

    // Retrieve existing listings from Redis
    const listings = await redisClient.get("listings");
    const allListings = listings ? JSON.parse(listings) : [];

    // Add the updated listing with the simple ID to the array
    allListings.push(simpleIdList);

    // Update Redis cache
    await redisClient.setex(
      "listings",
      DEFAULT_EXPIRATION,
      JSON.stringify(allListings)
    );
    // Respond with the updated listings
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: MESSAGES.SUCCESS_LISTING,
      listing: simpleIdList,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteListing: RequestHandler<
  { userId: string; listId: string },
  unknown,
  { tokenUserId: string },
  unknown
> = async (req, res, next) => {
  const { tokenUserId } = req.body;
  const { userId, listId } = req.params;
  try {
    if (tokenUserId !== userId) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    await Listing.findByIdAndDelete(listId);
    const listings = await redisClient.get("listings");
    const AllListings = (listings ? JSON.parse(listings) : null)?.filter(
      (list: MongoListingDataType) => listId !== list._id
    );
    redisClient.set("listings", JSON.stringify(AllListings));
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const UpdateListProperty: RequestHandler<
  { userId: string; listId: string },
  unknown,
  { tokenUserId: string; values: itemType; imageUrls: string },
  unknown
> = async (req, res, next) => {
  const { tokenUserId, values, imageUrls } = req.body;
  const { userId, listId } = req.params;
  try {
    if (tokenUserId !== userId) {
      return next(
        createHttpError(
          HTTP_STATUS_CODES.UNAUTHORIZED,
          HTTP_STATUS_MESSAGE.UNAUTHORIZED
        )
      );
    }
    const updatedListing = await Listing.findByIdAndUpdate(
      listId,
      { ...values, imageUrls },
      { new: true }
    );
    const listings = await redisClient.get("listings");
    const AllListings = listings ? JSON.parse(listings) : null;
    const updatedListings = AllListings?.map((list: any) => {
      if (list._id === updatedListing?.toObject()._id.toString())
        return {
          ...updatedListing?.toObject(),
          _id: updatedListing?.toObject()._id.toString(),
        };
      else return { ...list };
    });
    redisClient.setex(
      "listings",
      DEFAULT_EXPIRATION,
      JSON.stringify(updatedListings)
    );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Updated Successfully",
      listing: updatedListing,
    });
  } catch (error) {
    next(error);
  }
};

export const getListingById: RequestHandler<
  { listingId: string },
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { listingId } = req.params;
  try {
    // const listing = await Listing.findById(listingId);
    const listings = await redisClient.get("listings");
    const AllLisitings = JSON.parse(listings!);
    const lisiting = AllLisitings.find((item: MongoListingDataType) => {
      return item?._id === listingId;
    });
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "Listing Retrieved Successfully",
      listing: lisiting,
    });
  } catch (error) {
    next(error);
  }
};

export const getFilteredListings: RequestHandler<
  unknown,
  unknown,
  unknown,
  QueryParams
> = async (req, res, next) => {
  try {
    const { query } = req;
    const { searchText, limit, startIndex, sortBy, type, amenities, roomType } =
      query;
    const [sortField, sortOrder] = sortBy
      ? sortBy.split("_")
      : ["createdAt", "asc"];
    const intLimit = parseInt(limit, 10) || 4;
    const intStartIndex = parseInt(startIndex, 10) || 0;
    const searchQuery: any = {};
    if (searchText) {
      searchQuery.$text = { $search: searchText || "" };
    }
    if (type) searchQuery.type = type;
    if (roomType && ROOMTYPE.includes(roomType)) {
      searchQuery.roomType = roomType as searchQueryType["roomType"];
    }
    const andFilters = [];
    // Only add the $and filter if there are any conditions to apply
    if (amenities) {
      const amenitiesArray = amenities.split(",").filter((item) => item !== "");

      // Now use $all to ensure all amenities must be present
      const amenitiesCondition = { facilities: { $all: amenitiesArray } };

      // If there are other conditions, you should push this to the andFilters array
      andFilters.push(amenitiesCondition);
    }
    if (andFilters.length > 0) {
      searchQuery.$and = andFilters;
    }
    const filteredListing = await Listing.find(searchQuery)
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
      .limit(intLimit)
      .skip(intStartIndex);

    if (!filteredListing.length) {
      // No results found, trigger a 404 with a custom error message.
      return next(
        createHttpError(HTTP_STATUS_CODES.NOT_FOUND, "No More Results")
      );
    }

    // Successfully found listings, return them with a 200 status code.
    return res.status(HTTP_STATUS_CODES.OK).json({
      success: true,
      message: "Search completed successfully",
      listings: [...filteredListing],
    });
  } catch (error) {
    next(error);
  }
};

export const getAllListings: RequestHandler<
  unknown,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  try {
    // Retrieve listings from Redis or the database
    const listings = await getOrSetCache(
      "listings",
      async () => await Listing.find({})
    );
    return res.status(HTTP_STATUS_CODES.OK).send({
      success: true,
      message: "All Listings Retrieved Successfully",
      listings: listings ? JSON.parse(listings) : null,
    });
  } catch (error) {
    next(error);
  }
};
export const getSearchedListings: RequestHandler<
  unknown,
  unknown,
  unknown,
  QueryParams
> = async (req, res, next) => {
  try {
    const { query } = req;
    const { searchText, limit, startIndex } = query;
    const intLimit = parseInt(limit, 10) || 6;
    const intStartIndex = parseInt(startIndex, 10) || 0;
    const searchedItem = await Listing.find({
      $text: { $search: searchText || "" },
    })
      .limit(intLimit)
      .skip(intStartIndex);

    return res.status(HTTP_STATUS_CODES.CREATED).send({
      success: true,
      message: "searched successfully",
      listings: [...searchedItem],
    });
  } catch (error) {
    next(error);
  }
};
