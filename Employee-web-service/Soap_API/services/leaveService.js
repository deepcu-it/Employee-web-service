import { applyLeave, approveLeave } from '../controllers/leaveController.js';

const leaveService = {
  LeaveService: {
    LeaveServicePort: {
      ApplyLeave: async (args, callback) => {
        const result = await applyLeave({ body: args }, callback);
      },
      ApproveLeave: async (args, callback) => {
        const result = await approveLeave({ params: { leaveId: args.leaveId }, body: { status: args.status } }, callback);
      }
    }
  }
};

export default leaveService;