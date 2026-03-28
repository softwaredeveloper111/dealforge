import mongoose  from "mongoose";
import bcrypt from "bcryptjs"


const userSchema = new mongoose.Schema({

username:{
  type:String,
  trim:true,
  required:[true,"username should be required"],
  unique:[true,"username must be unique"],
  matches:[/^[a-zA-Z_][a-zA-Z0-9_]{2,19}$/,"username should be 3-20 characters long and start with a letter or underscore contain only letters, numbers and underscores"]
},
email:{
  type:String,
  trim:true,
  required:[true,"email should be required"],
  unique:[true,"email must be unique"],
  matches:[/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,"email should be valid"]
},
passwordHash:{
  type:String,
  required:[true,"password must be requird"],
  select:false,
},

totalSession:{
  type:Number,
  default:0,
  validate(value){
    if(value<0){
      throw new Error("totalSession should be greater than 0")
    }
  }
},

bestScore:{
  type:Number,
  default:null,
}


},{timestamps:true})




userSchema.pre("save",async function(){

let user = this;
if(user.isModified("passwordHash")){
  user.passwordHash = await bcrypt.hash(user.passwordHash,Number(process.env.HASH_SALT_ROUNDS));
}
})


userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password,this.passwordHash);
}



userSchema.methods.toJSON = function(){
  const user = this.toObject();
  delete user.passwordHash;
  return user;
}






const userModel = mongoose.model("User",userSchema);





export default userModel