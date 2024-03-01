import css from "./App.module.css";
import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../images-api";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

export const App = () => {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getData() {
      try {
        setIsLoading(true);
        setError(false);
        const fetchData = await fetchImages(query, page);
        setPictures((prevImages) => {
          return [...prevImages, ...fetchData];
        });
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    getData();
  }, [query, page]);

  const handleSearch = (newQuery) => {
    setQuery(newQuery);
    setPage(1);
    setPictures([]);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <div className={css.container}>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {pictures.length > 0 && <ImageGallery items={pictures} />}
      {pictures.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <b>Loading images...</b>}
    </div>
  );
};
