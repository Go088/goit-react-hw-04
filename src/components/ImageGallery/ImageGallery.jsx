import ImageCart from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onHandleImage }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, alt_description, urls: { small } }) => {
        return (
          <li key={id} onClick={onHandleImage}>
            <ImageCart url={small} id={id} alt={alt_description} />
          </li>
        );
      })}
    </ul>
  );
}
