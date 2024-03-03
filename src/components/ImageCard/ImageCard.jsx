import css from "./ImageCard.module.css";

export default function ImageCart({ item }) {
  return (
    <div className={css.wrap}>
      <img
        className={css.img}
        src={item.urls.small}
        alt={item.alt_descriptions}
        id={item.id}
      />
      <ul className={css.infoList}>
        <li>{item.user.first_name}</li>
        <li>{item.user.location}</li>
        <li className={css.info}>Likes {item.likes}</li>
      </ul>
    </div>
  );
}
