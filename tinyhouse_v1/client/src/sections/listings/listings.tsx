import React from "react";
import { server, useQuery } from "../../lib/api";
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
  const { data } = useQuery<ListingsData>(LISTINGS);

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
  };

  const listings = data ? data.listings : null;

  const listingList = listings ? (
    <ul>
      {listings?.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}
            <button type="button" onClick={() => deleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{props.title}</h2>
      {listingList}
    </div>
  );
};
