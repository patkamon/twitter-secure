const { ValidateSignature, ValidateSignatureAdmin } = require("../../utils");
const ErrorHandler = require("../../utils/error-handler");

module.exports = async (req, res, next) => {
  const data = await ValidateSignatureAdmin(req);

  if (data.verify) {
    return next();
  }
  ErrorHandler({
    data: data,
    description: "user tried to use admin endpoint",
    name: "Wrong role",
  });
  return res.status(403).json({ message: "Not Admin Authorized" });
};
