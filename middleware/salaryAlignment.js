import cron from "node-cron";
import Employee from "../model/Employee.js";
import EmployeeMilestoneNotification from "../model/milestoneNotification.js"; 

const scheduleAnniversaryCheck = () => {
  // Run every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    try {
      const employees = await Employee.find();
      const today = new Date();

      for (let employee of employees) {
        const hiringDate = new Date(employee.hiringDate);
        const diffYears = today.getFullYear() - hiringDate.getFullYear();
        const sameMonthAndDay =
          today.getMonth() === hiringDate.getMonth() &&
          today.getDate() === hiringDate.getDate();

        if (!sameMonthAndDay) continue; // Only check if it's the exact anniversary date

        if (diffYears === 3 && !employee.threeYears) {
          await Employee.findByIdAndUpdate(employee._id, { threeYears: true });
          await saveMilestoneNotification(employee, "3 years", today);
        }

        if (diffYears === 6 && !employee.sixYears) {
          await Employee.findByIdAndUpdate(employee._id, { sixYears: true });
          await saveMilestoneNotification(employee, "6 years", today);
        }

        if (diffYears === 9 && !employee.nineYears) {
          await Employee.findByIdAndUpdate(employee._id, { nineYears: true });
          await saveMilestoneNotification(employee, "9 years", today);
        }

        if (diffYears === 12 && !employee.twelveYears) {
          await Employee.findByIdAndUpdate(employee._id, { twelveYears: true });
          await saveMilestoneNotification(employee, "12 years", today);
        }

        await employee.save();
      }
    } catch (error) {
      console.error("Error updating employee anniversaries:", error);
    }
  });
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
