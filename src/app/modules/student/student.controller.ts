import { Request, Response } from "express";
import { StudentServices } from "../student.service";
import Joi from "joi";

const createStudent = async (req: Request, res: Response) => {
  try {
    // crating validation using JOI
    const userNameSchema = Joi.object({
      firstName: Joi.string().trim().max(20).required().messages({
        "string.empty": "First name is required.",
        "string.max": "First name cannot be more than 20 characters.",
      }),
      middleName: Joi.string().optional(),
      lastName: Joi.string()
        .required()
        .pattern(/^[A-Za-z]+$/)
        .messages({
          "string.empty": "Last name is required.",
          "string.pattern.base":
            "Last name must contain only alphabetic characters.",
        }),
    });

    const guardianSchema = Joi.object({
      fatherName: Joi.string().required().messages({
        "string.empty": "Father's name is required.",
      }),
      fatherOccupation: Joi.string().required().messages({
        "string.empty": "Father's occupation is required.",
      }),
      fatherContactNo: Joi.string().required().messages({
        "string.empty": "Father's contact number is required.",
      }),
      motherName: Joi.string().required().messages({
        "string.empty": "Mother's name is required.",
      }),
      motherOccupation: Joi.string().required().messages({
        "string.empty": "Mother's occupation is required.",
      }),
      motherContactNo: Joi.string().required().messages({
        "string.empty": "Mother's contact number is required.",
      }),
    });

    const localGuardianSchema = Joi.object({
      name: Joi.string().required().messages({
        "string.empty": "Local guardian's name is required.",
      }),
      occupation: Joi.string().required().messages({
        "string.empty": "Local guardian's occupation is required.",
      }),
      contactNo: Joi.string().required().messages({
        "string.empty": "Local guardian's contact number is required.",
      }),
      address: Joi.string().required().messages({
        "string.empty": "Local guardian's address is required.",
      }),
    });

    const studentSchema = Joi.object({
      id: Joi.string().required().messages({
        "string.empty": "Student ID is required.",
      }),
      name: userNameSchema.required().messages({
        "any.required": "Student's full name is required.",
      }),
      gender: Joi.string().valid("male", "female").required().messages({
        "any.only": "Gender must be 'male' or 'female'.",
        "string.empty": "Gender is required.",
      }),
      dateOfBirth: Joi.string().optional(),
      email: Joi.string().email().required().messages({
        "string.email": "Invalid email address.",
        "string.empty": "Email address is required.",
      }),
      contactNo: Joi.string().required().messages({
        "string.empty": "Contact number is required.",
      }),
      emergencyContactNo: Joi.string().required().messages({
        "string.empty": "Emergency contact number is required.",
      }),
      bloodGroup: Joi.string()
        .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
        .optional(),
      presentAddress: Joi.string().required().messages({
        "string.empty": "Present address is required.",
      }),
      permanentAddress: Joi.string().required().messages({
        "string.empty": "Permanent address is required.",
      }),
      guardian: guardianSchema.required().messages({
        "any.required": "Guardian details are required.",
      }),
      localGuardian: localGuardianSchema.required().messages({
        "any.required": "Local guardian details are required.",
      }),
      profileImg: Joi.string().optional(),
      isActive: Joi.string().valid("Active", "Blocked").default("Active"),
    });

    const { student: studentData } = req.body;

    const { error, value } = studentSchema.validate(studentData);
    console.log(error, value);
    // will call service func to send this data

    const result = await StudentServices.createStudentIntoDB(studentData);

    // send response

    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentFromDB();

    res.status(200).json({
      success: true,
      message: "Student are retrieved successfully",
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: "Student is retrieved successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error,
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
