const ProductsReducer = (state, action) => {

    switch (action.type) {
      case "SET_PRODUCTS":
        return {
          ...state,
          products: action.payload.products,
          prodCount: action.payload.products.length
        };
        case "SET_SEARCH_RESULT":
        return {
          ...state,
          autoComplete: action.payload,
        };
        break;
        case "SET_BRANDS":
        return {
          ...state,
          brands: action.payload.brands
        };
        break;
        case "SET_FAMILYS":
        return {
          ...state,
          familys: action.payload.familys
        };
        break;
        case "DELETE":
        return {
          ...state,
          products: action.payload.products,
          prodCount: action.payload.products.length
        };
        case "SET_SEARCH_VAL":
        return {
          ...state,
          searchVal: action.payload,
        };
      default:
        return {
          ...state,
        };
        break;
    }
  };
  
  export default ProductsReducer;
  