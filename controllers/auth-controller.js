const authentication = async (req, res, next) => {
  try {
    res.json(req.user);
  } catch (error) {
    next(error);
  }
}

module.exports = {authentication};