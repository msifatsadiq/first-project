import { model, Schema } from "mongoose";
import validator from "validator";
import {
  TGuardian,
  TlocalGuardian,
  TStudent,
  TUserName,
  StudentModel,
} from "./student/student.interface";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, "First name is required."],
    maxlength: [20, "First Name can not be more than 20 character"],
    // validator: {
    //   function(value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: "{VALUE} is not in capitalize format",
    // },
  },
  middleName: {
    type: String,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required."],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's occupation is required."],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's contact number is required."],
  },
  motherName: {
    type: String,
    required: [true, "Mother's name is required."],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's occupation is required."],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's contact number is required."],
  },
});

const localGuardianSchema = new Schema<TlocalGuardian>({
  name: {
    type: String,
    required: [true, "Local guardian's name is required."],
  },
  occupation: {
    type: String,
    required: [true, "Local guardian's occupation is required."],
  },
  contactNo: {
    type: String,
    required: [true, "Local guardian's contact number is required."],
  },
  address: {
    type: String,
    required: [true, "Local guardian's address is required."],
  },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "Student ID is required."],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [true, "Student's full name is required."],
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "Gender must be 'male' or 'female'.",
    },
    required: [true, "Gender is required."],
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: [true, "Email address is required."],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "{VALUE} is not a valid email",
    },
  },
  contactNo: { type: String, required: [true, "Contact number is required."] },
  emergencyContactNo: {
    type: String,
    required: [true, "Emergency contact number is required."],
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: {
    type: String,
    required: [true, "Present address is required."],
  },
  permanentAddress: {
    type: String,
    required: [true, "Permanent address is required."],
  },
  guardian: {
    type: guardianSchema,
    required: [true, "Guardian details are required."],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, "Local guardian details are required."],
  },
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["Active", "Blocked"],
    default: "Active",
  },
});

// creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });

  return existingUser;
};

// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
// 3. Create a Model.
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
