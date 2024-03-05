import { useEffect, useState } from "react";
import ImageGallery from "../ImageGallery/ImageGallery";
import { fetchImages } from "../images-api";
import SearchBar from "../SearchBar/SearchBar";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import ImageModal from "../ImageModal/ImageModal";
import toast, { Toaster } from "react-hot-toast";

export const App = () => {
  const [query, setQuery] = useState("");
  const [pictures, setPictures] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
        if (!fetchData.results.length) {
          toast.error("Sorry, no images for your request. Please try again!");
        }
        setPictures((prevImages) => {
          return [...prevImages, ...fetchData.results];
        });
        setTotalPages(fetchData.total_pages);
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

  const handleImage = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <Toaster position="top-right" />

      {error && <ErrorMessage />}
      {pictures.length > 0 && (
        <ImageGallery items={pictures} onHandleImage={handleImage} />
      )}
      {totalPages > page && pictures.length > 0 && !isLoading && (
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
