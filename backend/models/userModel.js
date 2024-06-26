import mongoose from "mongoose";
import bcrypt from"bcryptjs"
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
      default: "admin",
    },
  },
  { timestamps: true ,
    methods: {

      isPasswordMatch: async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      },
    },}
); // Include timestamps by default

userSchema.pre("save",async function(next){
  const user=this;
  if(this.isModified("password")){
    user.password=await bcrypt.hash(user.password,10);
  }
  next();
})


const User = mongoose.model("User", userSchema);

export default User;
