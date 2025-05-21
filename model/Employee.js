import mongoose from "mongoose";
import { Schema } from "mongoose";

const EmployeeSchema = new Schema({
    Lastname: {
    type: String,
    required: true,
    trim: true
  },
  Firstname: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  jobType: {
    type: String,
    required: true,
    required: true
  },
  division: {
    type: String,
    required: true,
    trim: true
  },
  hiringDate: {
    type: Date,
    required: true
  },
  salary: {
    type: Number,
    required: true,
  },
  threeYears: {
    type: Boolean
  },
  sixYears: {
    type: Boolean
  },
  nineYears: {
    type: Boolean
  },
  twelveYears: {
    type: Boolean
  }
  
});

const Employee = mongoose.model('Employee', EmployeeSchema);
export default Employee;