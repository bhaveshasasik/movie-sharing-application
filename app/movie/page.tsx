'use client';

import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useSearchParams } from "next/navigation";

const GET_DATA = gql`
  query Query($movieId: ID!) {
    movie(id: $movieId) {
      id
      name
      description
    }
  }
`;

const Home = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { loading, error, data } = useQuery(GET_DATA, {
    variables: { movieId: id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Render your component using the data
  return (
    <div>
      <div>Id: {id}</div>
      <div>{data.movie.name}</div>
      <div>{data.movie.description}</div>
    </div>
  );
};

export default Home;
