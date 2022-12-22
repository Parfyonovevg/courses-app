export const mockedCoursesList = [
  {
    id: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
    title: 'JavaScript',
    description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived
not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`,
    creationDate: '8/3/2021',
    duration: 160,
    authors: [
      '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
      'f762978b-61eb-4096-812b-ebde22838167',
    ],
  },
  {
    id: 'b5630fdd-7bf7-4d39-b75a-2b5906fd0916',
    title: 'Angular',
    description: `Lorem Ipsum is simply dummy text of the printing and
typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    creationDate: '10/11/2020',
    duration: 210,
    authors: [
      'df32994e-b23d-497c-9e4d-84e4dc02882f',
      '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
    ],
  },
];

export const mockedAuthorsList = [
  {
    id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
    name: 'Vasiliy Dobkin',
  },
  {
    id: 'f762978b-61eb-4096-812b-ebde22838167',
    name: 'Nicolas Kim',
  },
  { id: 'df32994e-b23d-497c-9e4d-84e4dc02882f', name: 'Anna Sidorenko' },
  {
    id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
    name: 'Valentina Larina',
  },
];

export const BUTTON_TEXT = {
  logout_text: 'Logout',
  show_course_text: 'Show course',
  add_new_course_text: 'Add new course',
  create_new_course_text: 'Create course',
  search_text: 'Search',
  add_author_text: 'Add author',
  delete_author_text: 'Delete author',
  create_author_text: 'Create author',
};

export const INPUT_TEXT = {
  type_text: 'text',
  type_number: 'number',

  search_placeholder: 'Enter course name or id',

  new_course_title_label: 'Title',
  new_course_title_placeholder: 'Enter title',

  new_course_description_label: 'Description',
  new_course_description_placeholder: 'Enter description',

  new_course_author_label: 'Add author',
  new_course_author_placeholder: 'Enter author name',

  new_course_duration_label: 'Duration',
  new_course_duration_placeholder: 'Enter course duration in minutes',
};
