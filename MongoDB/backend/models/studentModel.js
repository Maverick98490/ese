const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prn: { type: String, required: true, unique: true },
    mobile: { type: String, required: true },
    branch: { type: String, required: true }
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
