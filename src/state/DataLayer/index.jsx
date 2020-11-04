import React, { createContext, useContext, useReducer } from "react";

export const DataLayerContext = createContext();

export function DataLayer({ initialState, reducer, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataLayerContext.Provider value={{ state, dispatch }}>
      {children}
    </DataLayerContext.Provider>
  );
}
export const useDataLayerValue = () => useContext(DataLayerContext);
