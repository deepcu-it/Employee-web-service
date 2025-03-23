import axios from "axios";

export const resolvers = {
    Todo: {
        user: async (todo) => {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${todo.userId}`);
            return response.data
        }
    },
    Query: {
        getTodos: async () => {
            const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
            return data;
        },
        getAllUsers: async () => {
            const response = await axios.get("https://jsonplaceholder.typicode.com/users");
            return response.data;
        },
        getUserById: async (parent, { id }) => {
            const response = await axios.get(
                `https://jsonplaceholder.typicode.com/users/${id}`
            );
            return response.data;
        },
    },
};