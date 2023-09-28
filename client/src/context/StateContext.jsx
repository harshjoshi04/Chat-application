import React, { createContext, useContext, useReducer } from "react";



export const StateContext = createContext();

export const StateProvider = ({ initialstate, reducer, children }) => {
    return (
        <StateContext.Provider value={useReducer(reducer, initialstate)}>
            {children}
        </StateContext.Provider>
    )
}

export const UseStateProvider = () => useContext(StateContext)

