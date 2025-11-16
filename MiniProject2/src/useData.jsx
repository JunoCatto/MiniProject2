import { useReducer } from "react";

const initialState = {
  data: null,
  isLoading: false,
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, isLoading: true, error: null };
    case "FETCH_DATA_SUCCESS":
      return { ...state, isLoading: false, data: action.payload };
    case "FETCH_DATA_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export function useData() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = (url) => {
    if (!url) return;

    dispatch({ type: "FETCH_DATA" });

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`Internal Server Error: ${res.status}`);
        return res.json();
      })
      .then((data) => dispatch({ type: "FETCH_DATA_SUCCESS", payload: data }))
      .catch((err) =>
        dispatch({ type: "FETCH_DATA_FAILURE", payload: err.message })
      );
  };

  return { ...state, fetchData };
}
