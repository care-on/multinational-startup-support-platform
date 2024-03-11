module.exports = (err, req, res, next) => {
  res.send({ msg: err.message });
};
