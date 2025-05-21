import mongoose from "mongoose";

const employeeMilestoneNotificationSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",  
    required: true,
  },
  milestone: {
    type: String, 
    required: true,
  },
  milestoneDate: {
    type: Date,
    required: true,
  },
});

const EmployeeMilestoneNotification = mongoose.model(
  "EmployeeMilestoneNotification",
  employeeMilestoneNotificationSchema
);

export default EmployeeMilestoneNotification;
