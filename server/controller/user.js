const { passwordHash } = require("../helper");
const User = require("../models/userDB");
const updateSchema = require("../validation/user/update");

const updateUser = async (req, res) => {
  try {
    const { success, errors } = updateSchema.safeParse(req.body);
    if (!success) return res.status(422).json({ error: errors[0].message });

    if (req.body.password) {
      const hash = await passwordHash(req.body.password);
      req.body.password = hash;
    }
    await User.findOneAndUpdate({ _id: req.user._id }, req.body);

    return res.status(202).json({ success: "User updated successfully" });
  } catch (err) {
    return res.status(500).json({ error: "Internal server problem", err });
  }
};

// https://stackoverflow.com/questions/3305561/how-to-query-mongodb-with-like
// https://stackoverflow.com/questions/7382207/mongooses-find-method-with-or-condition-does-not-work-properly

const findUser = async (req, res) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      _id: { $ne: req.user._id },
      $or: [
        { firstname: { $regex: filter } },
        { lastname: { $regex: filter } },
      ],
    });
    if (!users) {
      return res.status(404).json({ error: "Users not found" });
    }
    return res.status(200).json({ users: users });
  } catch (err) {
    return res.status(500).json({ error: "Internal server problem" });
  }
};

module.exports = {
  updateUser,
  findUser,
};
