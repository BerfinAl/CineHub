// app/components/UserContext.tsx
"use client";

import React, { createContext, useContext, useState } from "react";

// Create the actual context
const UserContext = createContext({
  user: null,
  initialWatchedMoviesList: [],
  initialWatchlistMovies: [],
  initialFavMovies: [],
});

// Create a Provider that receives "user" as a prop from the server
export function UserProvider({
  initialWatchedMoviesList,
  initialWatchlistMovies,
  initialFavMovies,
  user,
  children,
}) {
  return (
    <UserContext.Provider
      value={{
        initialWatchedMoviesList,
        initialWatchlistMovies,
        initialFavMovies,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// Helper hook to use in client components
export function useUser() {
  return useContext(UserContext);
}
