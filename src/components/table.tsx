import { useContext } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { BookInterface, SearchContextType } from "../utility/interface";
import searchContext from "../contexts";

const tableColumns: GridColDef[] = [
  { field: "title", headerName: "Book Title", flex: 1 },
  {
    field: "author_name",
    headerName: "Author(s) Name",
    flex: 1,
    valueGetter: (params) => params.row?.author_name?.join(", ") || "-",
  },
  {
    field: "first_publish_year",
    headerName: "Year book was first published",
    flex: 1,
    valueGetter: (params) => params.row?.first_publish_year || "-",
  },
  {
    field: "isbn",
    headerName: "ISBN number",
    flex: 1,
    valueGetter: (params) => params.row?.isbn?.join(", ") || "-",
  },
  {
    field: "number_of_pages_median",
    headerName: "Number of pages",
    flex: 1,
    valueGetter: (params) => params.row?.number_of_pages_median || "-",
  },
];

function Table() {
  const store = useContext<SearchContextType | null>(searchContext);
  const finalResult = store?.finalResult ?? [];
  return (
    <DataGrid
      rows={finalResult}
      columns={tableColumns}
      pageSize={10}
      rowsPerPageOptions={[10]}
      checkboxSelection={false}
      autoHeight
      disableColumnMenu
      disableSelectionOnClick
      getRowId={(row: BookInterface) => row?._version_}
    />
  );
}

export default Table;
