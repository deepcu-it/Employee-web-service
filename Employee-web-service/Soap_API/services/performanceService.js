import { getMyPerformanceReview, givePerformanceReview } from '../controllers/performanceController.js';

const performanceService = {
  PerformanceService: {
    PerformanceServicePort: {
      GetMyPerformanceReview: async (args, callback) => {
        const result = await getMyPerformanceReview({ user: { id: args.userId } }, callback);
      },
      GivePerformanceReview: async (args, callback) => {
        const result = await givePerformanceReview({ params: { employeeId: args.employeeId }, body: { review: args.review, rating: args.rating } }, callback);
      }
    }
  }
};

export default performanceService;