import React from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_TEXT, INPUT_TEXT } from '../../../../constants';
import styles from './SearchBar.module.css';

const SearchBar = (props) => {
  const search = (event) => {
    props.search(event.target.value);
    if (event.target.value === '') {
      props.reset();
    }
  };

  const confirm = (event) => {
    event.preventDefault();
    props.confirmSearch();
  };
  return (
    <form onSubmit={confirm} onChange={search} className={styles.search}>
      <Input
        label={INPUT_TEXT.search_label}
        type={INPUT_TEXT.type_text}
        placeholder={INPUT_TEXT.search_placeholder}
      />
      <Button text={BUTTON_TEXT.search_text} />
    </form>
  );
};

export default SearchBar;
