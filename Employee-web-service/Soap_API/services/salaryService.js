import { getSalaryDetails, incrementSalary, decrementSalary } from '../controllers/salaryController.js';

const salaryService = {
  SalaryService: {
    SalaryServicePort: {
      GetSalaryDetails: async (args, callback) => {
        const result = await getSalaryDetails({ user: { id: args.userId } }, callback);
      },
      IncrementSalary: async (args, callback) => {
        const result = await incrementSalary({ user: { id: args.userId }, body: args }, callback);
      },
      DecrementSalary: async (args, callback) => {
        const result = await decrementSalary({ user: { id: args.userId }, body: args }, callback);
      }
    }
  }
};

export default salaryService;