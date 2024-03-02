import { Field, Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";
import css from "./SearchBar.module.css";

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <div className={css.searchBar}>
        <Form className={css.form}>
          <Field
            className={css.input}
            name="query"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
          <button className={css.button} type="submit">
            <IoSearchOutline className={css.icon} />
          </button>
        </Form>
      </div>
    </Formik>
  );
}
// Додати валідацію! Обов'язково!
