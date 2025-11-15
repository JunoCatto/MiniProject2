import { useReducer, useEffect } from "react";
// Setting up initial state
const initialState = {
  data: [],
  isLoading: false,
  error: null,
};
// Setting up reducer to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case "FETCH_DATA_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case "FETCH_DATA_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
// Main hook to fetch data
export function useData(url) {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    dispatch({ type: "FETCH_DATA" });
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "FETCH_DATA_SUCCESS", payload: data });
        console.log("Data fetched from server:", data);
      })
      .catch((err) => {
        dispatch({ type: "FETCH_DATA_FAILURE", payload: err });
        console.log(err);
      });
  }, [url]);
  // Returning state and dispatch
  return {
    data: state.data,
    isLoading: state.isLoading,
    error: state.error,
  };
}
