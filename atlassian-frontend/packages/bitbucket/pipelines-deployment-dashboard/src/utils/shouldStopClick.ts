const shouldStopClick: any = (element: any) => {
  if (!element || !element.dataset || !element.parentNode) {
    return false;
  }
  if (element.dataset.stopClick) {
    return true;
  }
  return shouldStopClick(element.parentNode);
};

export default shouldStopClick;
