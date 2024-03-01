import css from "./ImageCard.module.css";

export default function ImageCart({ url, id, alt }) {
  return (
    <div className={css.wrapper}>
      <img src={url} alt={alt} id={id} />
    </div>
  );
}
