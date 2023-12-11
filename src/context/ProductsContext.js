import { createContext, useReducer } from "react";
import ProductsReducer from "./ProductsReducer";
import { data } from "../data/products";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const initialState = {
    products: [],
    searchRes: [],
    autoComplete: [],
    prodCount: 0,
    product: {},
    searchVal: "",
    prodCount: 0,
    familys: [],
    brands: [],
    isLoading: false,
    popularSection: {},
  };

  const [state, dispatch] = useReducer(ProductsReducer, initialState);

  const onSearchChange = (e, isProds) => {
    const { value } = e.target;

    if (value.length > 2) {
      dispatch({ type: "SET_SEARCH_VAL", payload: value });
      let result = [];
      let regex = new RegExp(value, "mig");

      data.products.forEach((prod, index) => {
        if (
          prod.BRAND.search(regex) !== -1 ||
          prod.FAMILY.search(regex) > -1 ||
          prod.CLASSIFICATION.search(regex) > -1 ||
          prod.ar_classification.search(regex) > -1 ||
          prod.DESCRIPTION.search(regex) > -1 ||
          prod.ORIGIN.search(regex) > -1
        ) {
          result.push(prod);
        }
      });

      if (isProds) {
        // setting the state for empty because nextjs cache is mixing up images
        dispatch({ type: "SET_PRODUCTS", payload: { products: [] } });
        setTimeout(() => {
          dispatch({ type: "SET_PRODUCTS", payload: { products: result } });
        }, 100);
      } else {
        dispatch({ type: "SET_SEARCH_RESULT", payload: result });
      }
    } else if (value.length === 0) {
      onReset(e.target);
    }
  };

  const onReset = (searchInput) => {
    searchInput.value = "";
    dispatch({ type: "SET_SEARCH_VAL", payload: "" });
    dispatch({ type: "SET_PRODUCTS", payload: { products: [] } });
    setTimeout(() => {
      dispatch({ type: "SET_PRODUCTS", payload: { products: data.products } });
    }, 100);
    dispatch({ type: "SET_SEARCH_RESULT", payload: [] });
  };

  return (
    <ProductsContext.Provider
      value={{ state, dispatch, onSearchChange, onReset }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
