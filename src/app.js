export const dva = {
  config: {
    onError(e) {
      e.preventDefault();
      console.error('dva_error_', e.message);
    },
  },
};
