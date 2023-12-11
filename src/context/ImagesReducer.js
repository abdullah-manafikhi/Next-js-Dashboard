const ProductsReducer = (state, action) => {

  switch (action.type) {
    case "SET_IMAGES":
      return {
        ...state,
        images: action.payload,
      };
    case "SET_HERO_IMAGES":
      return {
        ...state,
        heroImages: action.payload,
      };
      break;
    case "SET_SORT_VALUE":
      return {
        ...state,
        sortByValue: action.payload,
      };
    case "SET_ASCENDING":
      return {
        ...state,
        ascending: action.payload,
      };
    case "SET_SELECTED_IMG":
      return {
        ...state,
        selectedImg: action.payload,
      };
    case "SET_SELECTED_HERO_IMAGE":
      return {
        ...state,
        selectedHeroImage: action.payload,
      };
    case "ADD_SLIDE":
      return {
        ...state,
        heroImages: [...state.heroImages, { ID: action.payload, images: "No Image", link: "" }],
      };
    default:
      return {
        ...state,
      };
      break;
  }
};

export default ProductsReducer;
