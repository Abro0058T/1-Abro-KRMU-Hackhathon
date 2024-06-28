import mongoose from "mongoose";
import bcrypt from "bcryptjs"
const teamMemberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
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
      enum: [ "contentWriter", "videoEditor"],
      default: "videoEditor",
    },remark:{
        type:String,
        default:""
    }
  },
  { timestamps: true ,
  
    methods: {
      /**
       * Check if password matches the user's password
       * @param {string} password
       * @returns {Promise<boolean>}
       */
      isPasswordMatch: async function (password) {
        const user = this;
        return bcrypt.compare(password, user.password);
      },
    },}
); // Include timestamps by default

teamMemberSchema.pre("save",async function(next){
  const user=this;
  if(this.isModified("password")){
    user.password=await bcrypt.hash(user.password,10);
  }
  next();
})


const TeamMember = mongoose.model("TeamMember", teamMemberSchema);

export default TeamMember;
