'use client';

import React, { ReactNode } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Define the type for the children prop
interface AppProps {
  children: ReactNode;
}

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache()
});

// Use the defined type for the props
function App({ children }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {children}
    </ApolloProvider>
  );
}

export default App;
