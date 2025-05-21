import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    message: String,
    employeeId: mongoose.Schema.Types.ObjectId,
    date: Date,
});

export default mongoose.model("Notification", notificationSchema);
