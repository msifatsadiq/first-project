import { z } from "zod";

// Define the UserName schema
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required.")
    .max(20, "First Name cannot be more than 20 characters."),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .min(1, "Last name is required.")
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: "Last name must contain only alphabets.",
    }),
});

// Define the Guardian schema
const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required."),
  fatherOccupation: z.string().min(1, "Father's occupation is required."),
  fatherContactNo: z.string().min(1, "Father's contact number is required."),
  motherName: z.string().min(1, "Mother's name is required."),
  motherOccupation: z.string().min(1, "Mother's occupation is required."),
  motherContactNo: z.string().min(1, "Mother's contact number is required."),
});

// Define the Local Guardian schema
const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required."),
  occupation: z.string().min(1, "Local guardian's occupation is required."),
  contactNo: z.string().min(1, "Local guardian's contact number is required."),
  address: z.string().min(1, "Local guardian's address is required."),
});

// Define the main Student schema
const studentValidationSchema = z.object({
  id: z.string().min(1, "Student ID is required."),
  name: userNameValidationSchema,
  gender: z.enum(["male", "female"], {
    errorMap: () => ({ message: "Gender must be 'male' or 'female'." }),
  }),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .min(1, "Email address is required.")
    .email("Invalid email address."),
  contactNo: z.string().min(1, "Contact number is required."),
  emergencyContactNo: z
    .string()
    .min(1, "Emergency contact number is required."),
  bloodGroup: z
    .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
    .optional(),
  presentAddress: z.string().min(1, "Present address is required."),
  permanentAddress: z.string().min(1, "Permanent address is required."),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["Active", "Blocked"]).default("Active"),
});

export default studentValidationSchema;
