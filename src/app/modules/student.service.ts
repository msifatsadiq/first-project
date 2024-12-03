import { Student } from "./student.model";
import { TStudent } from "./student/student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // static method
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User Already exists");
  }
  const result = await Student.create(studentData); //built in static method

  // const student = new Student(studentData);
  // if (await student.isUserExists(student.id)) {
  //   throw new Error("User Exists");
  // }
  // const result = await student.save();
  // return result;
};

const getAllStudentFromDB = async () => {
  const result = await Student.find();
  return result;
};
const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentFromDB,
  getSingleStudentFromDB,
};
