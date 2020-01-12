module.exports.badRequest = (res, errorText) => {
  return res.status(400).json({ error: errorText });
};
