export const HTTP_STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

export const HTTP_STATUS_MESSAGE = {
  OK: "Operation was successful",
  CREATED: "Resource was successfully created",
  NO_CONTENT: "Request was successful, but there's no content to return",
  BAD_REQUEST:
    "The server couldn't understand the request. Please check your input",
  UNAUTHORIZED:
    "Access denied. Authentication required or credentials are invalid",
  FORBIDDEN:
    "Access forbidden. You don't have permission to access this resource",
  NOT_FOUND: "The requested resource was not found on the server",
  INTERNAL_SERVER_ERROR:
    "Internal server error. Something went wrong on our end",
  BAD_GATEWAY:
    "Bad gateway. The server received an invalid response from the upstream server or gateway",
  SERVICE_UNAVAILABLE:
    "Service unavailable. The server is temporarily unable to handle the request. Please try again later",
  GATEWAY_TIMEOUT: "Gateway timeout. The request took too long and timed out",
  CONFLICT:
    "Conflict. The request conflicts with the current state of the server's resources",
  UNPROCESSABLE_ENTITY:
    "Unprocessable Entity. The request is well-formed but semantically incorrect",
  NOT_IMPLEMENTED:
    "Not Implemented. The server does not support the functionality required to fulfill the request",
  METHOD_NOT_ALLOWED:
    "Method Not Allowed. The HTTP method used in the request is not allowed for the requested resource",
  REQUEST_TIMEOUT:
    "Request Timeout. The server timed out waiting for the request",
};

export const MESSAGES = {
  WRONG_ID: "Id is null or Wrong",
  SERVER_RUNNING: "Server is running on port : ",
  SERVER_RES: "HELLO SERVER IS CONNECTED HAVE FUN",
  MONGO_CON_ERROR: "Error while connecting mongodb",
  USER_NOT_FOUND: "User Does not exits",
  MONGO_CONNECTED: "Mongo DB Connected Successfully",
  UNAUTHORIZED: "Unauthorized",
  FORBIDDEN: "FORBIDDEN",
  MISSING_PARAMETERS: "All Fields Are Required",
  EMAIL_USED: "Email Already Used",
  SUCCESS_REGISTERED: "User Registered Successfully",
  FAILED_SIGNIN: " Kindly enter correct password and email ",
  SUCCESS_SIGNIN: "User Signed In Successfully",
  SUCCESS_DELETE: "User Deleted Successfully",
  SUCCESS_LOGOUT: "User Logged Out Successfully",
  SUCCESS_UPDATE: "User Updated Successfully",
  ENDPOINT_NOT_FOUND: "There is no Route ,  Endpoint Not Found",
  SUCCESS_LISTING: "User cist created Successfully",
  SUCESS_LISTING_GATHERED: "Listing Gathered Successfully",
};
export const ROOMTYPE = ["furnished", "un-furnished", "semi-furnished"];
export const DEFAULT_EXPIRATION = 3600;
