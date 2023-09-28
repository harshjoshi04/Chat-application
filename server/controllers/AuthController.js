import User from "../model/UserModel.js";

export const cheackUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.json({ msg: "Email is required", status: false });
    const user = await User.findOne({ email });
    if (!user) return res.json({ msg: "User Not Found ", status: false });
    return res.json({ msg: "User Found", status: true, data: user });
  } catch (er) {
    next(er);
  }
};

export const OnbordUser = async (req, res) => {
  try {
    const { email, name, about, image: profilePicture } = req.body;
    if (!email || !name) {
      return res.send("Email,Name and Image is Required...");
    }
    const r = new User({
      name,
      email,
      profilePicture,
      about,
    });
    const data = await r.save();
    return res.json({ msg: "Success", status: true, data });
  } catch (er) {
    console.log(er);
  }
};

export const LoginUser = async (req, res) => {
  try {
    const { email } = req.body;
    const result = await User.findOne({ email });
    if (result) {
      return res.json(result);
    } else return res.status(404).send("User Not Found");
  } catch (er) {
    if (er) {
      return res.status(501).send(er);
    }
  }
};
export const UploadImageServer = async (req, res) => {
  try {
    let data = req.file.path;
    return res.send({ image: data });
  } catch (er) {
    return res.status(501).send(er);
  }
};

export const GetAllUsers = async (req, res) => {
  try {
    let { query } = req.query;
    let users = await User.find({}).sort({ name: "asc" });
    if (query) {
      users = users.filter(({ email }) => {
        return query != email;
      });
    }
    let userGroup = {};
    users.forEach((data) => {
      const userInfo = data.name.charAt(0).toUpperCase();
      if (!userGroup[userInfo]) {
        userGroup[userInfo] = [];
      }
      userGroup[userInfo].push(data);
    });
    return res.status(200).send({ users: userGroup });
  } catch (error) {
    return res.status(501).send(error);
  }
};
