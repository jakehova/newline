import React from "react";
import { server } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  ListingsData
} from "./types";

const LISTINGS = `
    query listings{
        listings {
            id 
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
        }
    }
`;

const DELETE_LISTING = `
mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
        id
    }
}
`;

interface Props {
  title: string;
}

export const Listings = (props: Props) => {
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
    console.table(data.listings);
  };

  const deleteListing = async () => {
    const { data } = await server.fetch<
      DeleteListingData,
      DeleteListingVariables
    >({
      query: DELETE_LISTING,
      variables: {
        id: "5e02a8bf31c2e306402d9fe4"
      }
    });

    console.table(data);
  };

  return (
    <div>
      <h2>{props.title}</h2>
      <button type="button" onClick={fetchListings}>
        Query Listings
      </button>

      <button type="button" onClick={deleteListing}>
        Delete Listing
      </button>
    </div>
  );
};
