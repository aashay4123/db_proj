const { ObjectId } = require("mongoose").Types;

export const getUser = catchAsync(async (req, res, next) => {
  let data = "no data";
  if (req.user.role === "user") {
    const id = new ObjectId(req.user._id);
    data = (await Users.findById(id)) ?? "";
  }
  // else if (req.user.role === "admin") {
  // data = await Admin.findById(req.user.id);
  // }

  res.status(200).send({ user: data });
});

export const logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 2 * 1000),
    maxAge: -1,
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  res.status(200).json({ status: "success" });
};
