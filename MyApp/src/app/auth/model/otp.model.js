import {model,Schema} from "mongoose";

const otpSchema = new Schema({

code: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 6
},
email:{
    type: String,
    required: true,
    lowercase: true,
    trim: true
},
expiresAt:{
    type: Date,
    required: true,
    index:{expires:0}
}

},{
    timestamps: {
        createdAt: true,
        updatedAt: true
    }

})
// tre2a tanya mfhoma aktar

//otpSchema.index({createdAt:1},{expireAfterSeconds:600})

export const OTP = model('OTP',otpSchema);
