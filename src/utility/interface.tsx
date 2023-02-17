export interface BookInterface {
  _version_: number;
  title: string;
  author_name: string[];
  first_publish_year: number;
  isbn: string[];
  number_of_pages_median?: number;
}

export interface SearchContextType {
  finalResult: BookInterface[];
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
