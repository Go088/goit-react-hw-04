import ImageCart from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ items, onHandleImage }) {
  return (
    <ul className={css.list}>
      {items.map((item) => {
        return (
          <li key={item.id} onClick={onHandleImage}>
            <ImageCart item={item} />
          </li>
        );
      })}
    </ul>
  );
}
