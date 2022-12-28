export const dateGenerator = () => {
  const year = new Date().getFullYear();
  const month = new Date().getMonth() + 1;
  const day = new Date().getDate();
  return `${day}.${month}.${year}`;
};
