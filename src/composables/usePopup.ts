export const usePopup = () => {
  function popupStatus(
    status: { value: boolean },
    message: string,
    duration: number
  ) {
    status.value = true;
    message;
    const DURATION = duration;
    setTimeout(() => {
      status.value = false;
    }, DURATION);
  }

  return {
    popupStatus,
  };
};
