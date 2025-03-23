import express from 'express';
import { register, login, updatePassword } from './controllers/authController.js';
import { getMyProfile, updateProfile, deleteProfile } from './controllers/profileController.js';
import { getSalaryDetails, incrementSalary, decrementSalary } from './controllers/salaryController.js';
import { checkIn, checkOut, updateAttendance, getAttendanceByDate, getTodayAttendance, getEmployeeAttendance } from './controllers/attendanceController.js';
import { applyLeave, approveLeave } from './controllers/leaveController.js';
import { getMyPerformanceReview, givePerformanceReview } from './controllers/performanceController.js';

const router = express.Router();
const app = express();

// Authentication
router.post('/register', register);
router.post('/login', login);
router.put('/update-password', updatePassword);

// Profile
router.get('/my-profile', getMyProfile);
router.put('/update-profile', updateProfile);
router.delete('/delete-profile', deleteProfile);

// Salary
router.get('/salary-details', getSalaryDetails);
router.put('/salary/increment',incrementSalary);
router.put('/salary/decrement',decrementSalary);

// Attendance
router.post('/attendance/check-in', checkIn);
router.post('/attendance/check-out', checkOut);
router.put('/attendance/update', updateAttendance);
router.get('/attendance/:date', getAttendanceByDate);
router.get('/attendance/today', getTodayAttendance);
router.get('/attendance/employee/:employeeId', getEmployeeAttendance);

// Leave
router.post('/leave/apply', applyLeave);
router.put('/leave/approve/:leaveId', approveLeave);

// Performance
router.get('/performance/my-review', getMyPerformanceReview);
router.post('/performance/review/:employeeId', givePerformanceReview);


export { router, app };
