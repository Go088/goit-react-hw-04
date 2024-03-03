import css from "./ImageCard.module.css";

export default function ImageCart({ item }) {
  return (
    <div className={css.wrapper}>
      <img src={item.urls.small} alt={item.alt_descriptions} id={item.id} />
    </div>
  );
}
