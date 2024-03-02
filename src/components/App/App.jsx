import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../images-api";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";

export const App = () => {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();

  useEffect(() => {
    if (query === "") {
      return;
    }
    async function getData() {
      try {
        setModalIsOpen(false);
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
    // scroll.scrollTo(0);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleImage = (image) => {
    setModalIsOpen(true);
    setSelectedImage(image);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      {error && <ErrorMessage />}
      {pictures.length > 0 && (
        <ImageGallery items={pictures} onHandleImage={handleImage} />
      )}
      {pictures.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      {isLoading && <Loader />}
      {modalIsOpen && (
        <ImageModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
    </div>
  );
};
