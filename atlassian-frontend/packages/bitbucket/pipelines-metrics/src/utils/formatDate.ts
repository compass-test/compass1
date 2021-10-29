const formatDate = (d: string) => {
  const date = new Date(d);
  let hr = date.getHours();
  let min: string | number = date.getMinutes();
  let sec: string | number = date.getSeconds();
  if (min < 10) {
    min = '0' + min;
  }
  if (sec < 10) {
    sec = '0' + sec;
  }
  let ampm = 'AM';
  if (hr > 12) {
    hr -= 12;
    ampm = 'PM';
  }
  return `${hr}:${min}:${sec} ${ampm}`;
};

export default formatDate;
