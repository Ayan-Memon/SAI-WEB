const tryCatch = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  };
};

export default tryCatch;
