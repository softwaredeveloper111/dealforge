import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: [true, "Username is required"],
      unique: true,
      match: [
        /^[a-zA-Z_][a-zA-Z0-9_]{2,19}$/,
        "Username must be 3-20 characters, start with a letter or underscore, and contain only letters, numbers, or underscores",
      ],
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
      required: [true, "Email is required"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },

    passwordHash: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    totalSessions: {
      type: Number,
      default: 0,
      min: [0, "totalSessions cannot be negative"],
    },

    /** Sabse best deal — highest discount % ever achieved */
    bestScore: {
      type: Number,
      default: null,
      min: [0, "bestScore cannot be negative"],
    },
  },
  { timestamps: true }
);



/** Hash password before saving — only if modified */
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();
  this.passwordHash = await bcrypt.hash(
    this.passwordHash,
    Number(process.env.HASH_SALT_ROUNDS) || 10
  );
  next();
});




/** Compare plain password with stored hash */
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.passwordHash);
};



/** Never expose passwordHash in API responses */
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;