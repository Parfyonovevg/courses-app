export const pipeDuration = (duration: number) => {
  let hours = Math.floor(duration / 60).toString();
  let minutes = (duration % 60).toString();
  if (hours.length < 2) {
    hours = '0' + hours;
  }
  if (minutes.length < 2) {
    minutes = '0' + minutes;
  }

  return { hours, minutes };
};
