export const useNotification = () => {
  function statusNotification(status: { value: boolean }, message: string) {
    status.value = true;
    message;
    const DURATION = 2000;
    setTimeout(() => {
      status.value = false;
    }, DURATION);
  }

  return {
    statusNotification,
  };
};
