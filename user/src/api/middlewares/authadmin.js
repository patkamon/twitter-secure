const { ValidateSignature, ValidateSignatureAdmin } = require("../../utils");
const ErrorHandler = require("../../utils/error-handler");

module.exports = async (req, res, next) => {
  const isAuthorized = await ValidateSignatureAdmin(req);

  if (isAuthorized) {
    return next();
  }
  ErrorHandler({
    description: "user tried to use admin endpoint",
    name: "Wrong role",
  });
  return res.status(403).json({ message: "Not Admin Authorized" });
};
