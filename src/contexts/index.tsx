import { createContext } from "react";
import { SearchContextType } from "../utility/interface";

const searchContext = createContext<SearchContextType | null>(null);

export default searchContext;
