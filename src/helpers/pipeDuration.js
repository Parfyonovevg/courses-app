export const pipeDuration = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return { hours, minutes };
};
