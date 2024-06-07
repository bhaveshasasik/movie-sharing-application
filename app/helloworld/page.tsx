'use client';

import React from 'react';
import {gql} from '@apollo/client';
import {useQuery} from '@apollo/experimental-nextjs-app-support/ssr';

const GET_DATA = gql`
  query Query($movieId: ID!) {
    movie(id: $movieId) {
      id
      name
    }
  }
`;

export default function Home() {
  const {loading, error, data} = useQuery(GET_DATA, {
    variables: {movieId: "0"}, // Provide the movieId variable here
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render your component using the data
  return <div>{data.movie.name}</div>; // Access 'movie' directly instead of 'movies'
}