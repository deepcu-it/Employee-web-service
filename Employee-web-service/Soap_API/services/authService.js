import { register, login, updatePassword } from '../controllers/authController.js';

const authService = {
  AuthService: {
    AuthServicePort: {
      Register: async (args, callback) => {
        const result = await register({ body: args });
        callback(null, result);
      },
      Login: async (args, callback) => {
        const result = await login({ body: args });
        callback(null, result);
      },
      UpdatePassword: async (args, callback) => {
        const result = await updatePassword({ body: args });
        callback(null, result);
      }
    }
  }
};

export default authService;