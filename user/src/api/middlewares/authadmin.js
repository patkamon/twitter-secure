const { ValidateSignature, ValidateSignatureAdmin } = require("../../utils");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignatureAdmin(req);

  if (isAuthorized) {
    return next();
  }
  return res.status(403).json({ message: "Not Admin Authorized" });
};
