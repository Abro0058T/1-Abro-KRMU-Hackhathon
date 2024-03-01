import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8, // Enforce a minimum password length for security
    },
    role: {
      type: String,
      enum: ["admin", "contentWriter", "videoEditor"],
      default: "videoEditor",
    },
  },
  { timestamps: true }
); // Include timestamps by default

const User = mongoose.model("User", userSchema);

export default User;
