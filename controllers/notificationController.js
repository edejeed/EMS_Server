import EmployeeMilestoneNotification from "../model/milestoneNotification.js";

const milestoneNotification = async (req, res) => {
    try {
        const notifications = await EmployeeMilestoneNotification.find()
            .populate("employee", "Firstname Lastname hiringDate");

        if (!notifications.length) {
            return res.status(200).json({ success: true, message: "No milestone notifications found", data: [] });
        }
        const milestoneData = notifications.map(notification => ({
            employeeName: `${notification.employee.Firstname} ${notification.employee.Lastname}`,
            milestoneYears: notification.milestone, 
            reachedDate: notification.milestoneDate, 
        }));

        return res.status(200).json({ success: true, data: milestoneData });
    } catch (error) {
        console.error("Error fetching milestone notifications:", error);
        return res.status(500).json({ success: false, error: "Server error" });
    }
};

export { milestoneNotification };
