const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "email đã tồn tại",
      });

    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({
      success: true,
      message: "Đăng ký thành công",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "xảy ra một số lỗi",
    });
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });
    console.log({checkUser})
    if (!checkUser)
      return res.json({
        success: false,
        message: "Người dùng không tồn tại! Vui lòng đăng ký trước",
      });

    const checkPasswordMatch = await bcrypt.compare(
      password,
      checkUser.password
    );
    if (!checkPasswordMatch)
      return res.json({
        success: false,
        message: "Sai password, vui long thu lai",
      });

    const token = jwt.sign(
      {
        id: checkUser._id,
        role: checkUser.role,
        email: checkUser.email,
        userName: checkUser.userName,
        avatar: checkUser?.avatar,
      },
      "CLIENT_SECRET_KEY",
      { expiresIn: "60m" }
    );

    res
      .cookie("token", token, {
        httpOnly: true, // Ngăn chặn truy cập từ JavaScript
        secure: false, // Đặt true nếu bạn sử dụng HTTPS
        sameSite: "Strict", // Ngăn chặn cookie được gửi trong các yêu cầu cross-site
      })
      .json({
        success: true,
        message: "Đăng nhập thành công",
        user: {
          email: checkUser.email,
          role: checkUser.role,
          id: checkUser._id,
          userName: checkUser.userName,
          avatar: checkUser?.avatar,
        },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "xảy ra một số lỗi",
    });
  }
};

//logout
const logoutUser = (req, res) => {
  res.clearCookie("token").json({
    success: true,
    message: "Đăng xuất thành công!",
  });
};

// auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      success: false,
      message: "Người dùng không hợp lệ!",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");

    // db
    // console.log({123: decoded})

    // req.user = await User.findOne({_id:  decoded._id});

    // console.log({456: req.user})
    req.user = decoded
    

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Người dùng không hợp lệ!",
    });
  }
};
// upload avatar

module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
