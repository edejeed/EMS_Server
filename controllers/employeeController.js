import Employee from "../model/Employee.js"
import checkNumberOfYears from "../middleware/salaryAlignment.js"

const addEmployee = async (req, res) => {

    try {
        const {
            Lastname,
            Firstname,
            position,
            jobType,
            division,
            hiringDate,
            salary,
        } = req.body;

        const existingFname = await Employee.findOne({ Firstname });
        const existingLname = await Employee.findOne({ Lastname });

        if(existingFname || existingLname){
            return res.status(400).json({success: false, error: "Employee already exists"})
        }

        const today = new Date();
        const hireDate = new Date(hiringDate);
        const diffYears = today.getFullYear() - hireDate.getFullYear();

        const newEmployee = new Employee({ 
            Lastname,
            Firstname,
            position,
            jobType,
            division,
            hiringDate,
            salary,
            threeYears: diffYears >= 3,
            sixYears: diffYears >= 6,
            nineYears: diffYears >= 9,
            twelveYears: diffYears >= 12
        });

        await newEmployee.save();
        return res.status(200).json({success: true, message: "Employee added successfully"})
    } catch (error) {
        console.log(error.message) 
        return res.status(500).json({success: false, error: "Server error"}) 
    }
    
}
const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        return res.status(200).json({success: true, employees})
    } catch (error) {
        console.log(error.message) 
        return res.status(500).json({success: false, error: "Server error"}) 
    }
}

const getEmployee = async (req, res) => {
    const {id} = req.params;
    try {
        const employee = await Employee.findById({_id: id});
        return res.status(200).json({success: true, employee})
    } catch (error) {
        return res.status(500).json({success: false, error: "Server error"}) 
    }
}

const updateEmployee = async (req, res) => {
    const {id} = req.params;

    try {
        const {
            Lastname,
            Firstname,
            position,
            jobType,
            division,
            hiringDate,
            salary,
        } = req.body;

        const employee = await Employee.findById({_id: id});
        if(!employee){
            return res.status(404).json({success: false, error: "Employee not found"})
        }
        
        const updateEmployee = await Employee.findByIdAndUpdate(
            id,
            {
                Lastname,
                Firstname,
                position,
                jobType,
                division,
                hiringDate,
                salary,
            }
        )

        if(!updateEmployee){
            return res.status(404).json({success: false, error: "Employee not found"})
        }

        return res.status(200).json({
            success: true,
            message: "Employee updated successfully",
        })

        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success: false, error: "Update employee server error"})  
    }
}

export {addEmployee, getEmployees, getEmployee, updateEmployee} 