const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please Proveide a username"],
  },
  email: {
    type: String,
    required: [true, "Please Provide an email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Provide a password"],
    minlength: 6,
    select: false,
  },
  dailyTask: [
    {
      task: String,
      checked: Boolean,
      priority: String,
      image: String,
    },
  ],
  randomTask: [
    {
      task: String,
      checked: Boolean,
      priority: String,
      image: String,
    },
  ],
  futureTask: [
    {
      task: String,
      checked: Boolean,
      priority: String,
      image: String,
      schelduledOn: Date,
      reminder: Boolean,
    },
  ],
  notes: [
    {
      text: String,
      image: String,
    },
  ],
  projects: {
    name: String,
    priority: String,
    deadline: Date,
    subproject: [
      {
        subname: String,
        checked: Boolean,
      },
    ],
    reminder: Boolean,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPasswords = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

UserSchema.methods.addDailyTodo = function (dailyTask) {
  this.dailyTask.push(dailyTask);
};
UserSchema.methods.addRandomTodo = function (randomTask) {
  this.randomTask.push(randomTask);
};
UserSchema.methods.addFutureTodo = function (futureTask) {
  this.futureTask.push(futureTask);
};
UserSchema.methods.addNotes = function (note) {
  this.notes.push(note);
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
