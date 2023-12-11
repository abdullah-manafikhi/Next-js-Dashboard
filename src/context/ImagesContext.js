import { createContext, useReducer } from "react";
import ImagesReducer from "./ImagesReducer";
import Tools from '../images/tools-4.svg'

const ImagesContext = createContext();

export const ImagesProvider = ({ children }) => {
  const initialState = {
    images: [],
    sortByValue: "createdAt",
    ascending: false,
    selectedImg: { name: "test", url: Tools.src },
    heroImages: [],
    selectedHeroImage: { images: "No Image" },
  };


  const [state, dispatch] = useReducer(ImagesReducer, initialState);

  return (
    <ImagesContext.Provider value={{ state, dispatch }}>
      {children}
    </ImagesContext.Provider>
  );
};

export default ImagesContext;
