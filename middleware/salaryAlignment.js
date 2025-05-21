import cron from "node-cron";
import Employee from "../model/Employee.js";
import EmployeeMilestoneNotification from "../model/milestoneNotification.js"; 

const scheduleAnniversaryCheck = () => {
  setTimeout(async () => {
    try {
      const employees = await Employee.find();
      const today = new Date();
      for (let employee of employees) {
        
        const hiringDate = new Date(employee.hiringDate);
        const diffYears = today.getFullYear() - hiringDate.getFullYear();
  
        if (diffYears >= 3) {
          const milestoneDate = new Date(hiringDate);
          milestoneDate.setFullYear(hiringDate.getFullYear() + 3);
          await Employee.findByIdAndUpdate(employee._id, { threeYears: true });
          await saveMilestoneNotification(employee, "3 years", milestoneDate);
        }
  
        if (diffYears >= 6) {
          const milestoneDate = new Date(hiringDate);
          milestoneDate.setFullYear(hiringDate.getFullYear() + 6);
          await Employee.findByIdAndUpdate(employee._id, { sixYears: true });
          await saveMilestoneNotification(employee, "6 years", milestoneDate);
        }
  
        if (diffYears >= 9 ) {
          const milestoneDate = new Date(hiringDate);
          milestoneDate.setFullYear(hiringDate.getFullYear() + 9);
          await Employee.findByIdAndUpdate(employee._id, { nineYears : true });
          await saveMilestoneNotification(employee, "9 years", milestoneDate);
        }
  
        if (diffYears >= 12 ) {
          const milestoneDate = new Date(hiringDate);
          milestoneDate.setFullYear(hiringDate.getFullYear() + 12);
          await Employee.findByIdAndUpdate(employee._id,{ twelveYears : true });
          await saveMilestoneNotification(employee, "12 years", milestoneDate);
        }
  
        await employee.save();
      }
    } catch (error) {
      console.error("Error updating employee anniversaries:", error);
    }
  } , 1000);
};

// Function to save milestone notification
const saveMilestoneNotification = async (employee, milestone, milestoneDate) => {
  try {
    const existingNotification = await EmployeeMilestoneNotification.findOne({
      employee: employee._id,
      milestone: milestone
    });

    if (existingNotification) {
      return; 
    }

    // Save new milestone if it doesn't exist
    const notification = new EmployeeMilestoneNotification({
      employee: employee._id,  
      milestone: milestone,
      milestoneDate: milestoneDate,
    });

    await notification.save();
  } catch (error) {
    console.error("Error saving milestone notification:", error);
  }
};

export default scheduleAnniversaryCheck;
