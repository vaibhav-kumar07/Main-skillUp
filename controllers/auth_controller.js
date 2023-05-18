const auth_service = require("../services/auth_services");

exports.createUser = async function (req, res) {
  try {
    console.log("In Auth controller");
    const { userName, email, password, role, phoneNumber } = req.body;
    let id = await auth_service.createNewUser({
      userName,
      email,
      password,
      role,
      phoneNumber,
    });
    res.status(201).send({ message: "successfully created a new User", id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
};

exports.logout = async (req, res, next) => {
  try {
    let loggedInUser = req.loggedInUser;
    await auth_service.logout(loggedInUser._id);
    res.status(200).send({ message: "Logged out successfully" });
  } catch (error) {
    handleErrors(error, next);
  }
};

exports.verifyToken = async (req, res, next) => {
  try {
    console.log("In Auth controller  ", req.headers);
    const authHeader = req.headers["authorization"];
    if (!authHeader)
      throw new Error({ message: "Access Denied. Please send Token" });

    const token = authHeader.split(" ")[1];
    if (!token)
      throw new Error({ message: "Access Denied. Please send Token" });
    console.log("token " + token);

    const user = await auth_service.verifyToken(token);
    req.loggedInUser = user;
    next();
  } catch (error) {
    handleErrors(error, next);
  }
};
