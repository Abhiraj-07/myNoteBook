const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema  = new Schema({
  firstName: {
    type:  String,
    require:true,
  },
  lastName: {
    type:  String,
    require:true,
  },
  gender: {
    type:  String,
    require:true,
  },
  age: {
    type:  Number,
    require:true,
  },
  email:  {
    type:  String,
    unique:true,
    require:true,
  },
  password: {
    type:  String,
    require:true,
  }
});

module.exports  =mongoose.model('user',UserSchema)