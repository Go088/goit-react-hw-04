import ImageCart from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items }) {
  return (
    <ul className={css.list}>
      {items.map(({ id, alt_description, urls: { small } }) => {
        return (
          <li key={id}>
            <ImageCart url={small} id={id} alt={alt_description} />
          </li>
        );
      })}
    </ul>
  );
}
