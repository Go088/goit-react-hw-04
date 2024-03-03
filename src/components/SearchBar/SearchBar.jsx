import { Field, Form, Formik } from "formik";
import { IoSearchOutline } from "react-icons/io5";
import css from "./SearchBar.module.css";
import toast, { Toaster } from "react-hot-toast";

export default function SearchBar({ onSearch }) {
  return (
    <Formik
      initialValues={{ query: "" }}
      onSubmit={(values, actions) => {
        if (!values.query) {
          toast.error("You need to enter a search term");
        }
        onSearch(values.query);
        actions.resetForm();
      }}
    >
      <div className={css.searchBar}>
        <Form className={css.form}>
          <div>
            <Toaster position="top-right" />
          </div>
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
