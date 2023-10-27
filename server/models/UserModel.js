const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw Error("Uzupełnij wszystkie pola");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email nie jest poprawny");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Hasło nie spełnia wymagań złożoności");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Konto z tym emailem już istnieje");
  }

  const salt = await bcrypt.genSalt(10);

  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("Uzupełnij wszystkie pola");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Niepoprawny email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Niepoprawne hasło");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
