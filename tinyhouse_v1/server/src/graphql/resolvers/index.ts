import merge from "lodash.merge";
import { listingResolvers } from "./Listing/listingResolvers";

export const resolvers = merge(listingResolvers);

/*
Example usage in the future with more resolvers being necessary

import { bookingResolvers } from "./Booking";
import { listingResolvers } from "./Listing";
import { userResolvers } from "./User";

export const resolvers = merge(bookingResolvers, listingResolvers, userResolvers);
*/
