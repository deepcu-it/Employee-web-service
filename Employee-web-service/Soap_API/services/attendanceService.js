import { checkIn, checkOut } from '../controllers/attendanceController.js';

const attendanceService = {
  AttendanceService: {
    AttendanceServicePort: {
      CheckIn: async (args, callback) => {
        const result = await checkIn({ user: { id: args.userId } }, callback);
      },
      CheckOut: async (args, callback) => {
        const result = await checkOut({ user: { id: args.userId } }, callback);
      }
    }
  }
};

export default attendanceService;