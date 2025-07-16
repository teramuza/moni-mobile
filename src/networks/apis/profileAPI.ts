const getProfileURL = `/employee`;
const getAllEmployees = '/employee/all';
const getSAWScoreURL = (id: number) => `/employee/saw-score?profile_id=${id}`;

export default {
    getProfileURL,
    getAllEmployees,
    getSAWScoreURL,
};
