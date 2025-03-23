import EmployeeSchema from '../models/EmployeeSchema.js';
// ✅ Get Salary Details
export const getSalaryDetails = async (req, res) => {
  try {
    const employee = await EmployeeSchema.findById(req.user.id).select('salary');
    res.json({ salary: employee.salary });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Increment Salary (Only HR/Manager)
export const incrementSalary = async (req, res) => {
  try {
    if (req.user.role !== 'HR' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const { employeeId, amount } = req.body;
    const employee = await EmployeeSchema.findByIdAndUpdate(
      employeeId,
      { $inc: { salary: amount } },
      { new: true }
    );

    res.json({ message: 'Salary incremented', salary: employee.salary });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Decrement Salary (Only HR/Manager)
export const decrementSalary = async (req, res) => {
  try {
    if (req.user.role !== 'HR' && req.user.role !== 'Manager') {
      return res.status(403).json({ message: 'Access Denied' });
    }

    const { employeeId, amount } = req.body;
    const employee = await EmployeeSchema.findById(employeeId);

    if (employee.salary - amount < 0) {
      return res.status(400).json({ message: 'Salary cannot be negative' });
    }

    employee.salary -= amount;
    await employee.save();

    res.json({ message: 'Salary decremented', salary: employee.salary });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
