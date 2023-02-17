import axios, { CancelTokenSource } from "axios";
import { Container, LinearProgress } from "@mui/material";
import { useState, useEffect, useCallback, useDeferredValue } from "react";
import api from "./utility/api";
import caller from "./utility/caller";
import searchContext from "./contexts";
import Table from "./components/table";
import Search from "./components/search";
import { BookInterface } from "./utility/interface";

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [finalResult, setFinalResult] = useState<BookInterface[]>([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const [progress, setProgress] = useState<boolean>(false);

  // handle search logic
  const searchApi = useCallback(
    async (searchTerm: string, cancelTokenSource: CancelTokenSource) => {
      setProgress(true);
      try {
        const result = await caller(
          `${api.SEARCH}${searchTerm}`,
          null,
          "GET",
          cancelTokenSource.token,
          setProgress
        );
        setFinalResult(result?.docs);
      } catch (error) {
        console.log(error);
      }
    },
    [setProgress, setFinalResult, caller]
  );

  // trigger search
  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    if (deferredSearchTerm) {
      searchApi(deferredSearchTerm, cancelTokenSource);
    }
    return () => {
      cancelTokenSource.cancel("Request canceled");
    };
  }, [deferredSearchTerm, searchApi]);

  return (
    <searchContext.Provider value={{ finalResult, setSearchTerm }}>
      <Container sx={{ mt: 5 }}>
        <Search />
        {progress ? <LinearProgress /> : <Table />}
      </Container>
    </searchContext.Provider>
  );
};

export default App;
