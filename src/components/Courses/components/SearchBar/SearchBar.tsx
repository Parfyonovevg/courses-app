import React from 'react';
import Button from '../../../../common/Button/Button';
import Input from '../../../../common/Input/Input';
import { BUTTON_TEXT, INPUT_TEXT } from '../../../../constants';
import styles from './SearchBar.module.css';

const SearchBar: React.FC<{
  search: (text: string) => void;
  reset: () => void;
  confirmSearch: () => void;
}> = (props) => {
  const search = (event: React.ChangeEvent<HTMLFormElement>) => {
    props.search(event.target.value);
    if (event.target.value === '') {
      props.reset();
    }
  };

  const confirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.confirmSearch();
  };
  return (
    <form onSubmit={confirm} onChange={search} className={styles.search}>
      <Input
        type={INPUT_TEXT.type_text}
        placeholder={INPUT_TEXT.search_placeholder}
      />
      <Button text={BUTTON_TEXT.search_text} />
    </form>
  );
};

export default SearchBar;
