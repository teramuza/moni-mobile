const getProfileURL = (id: number) => `/employee?id=${id}`;
const getSAWScoreURL = (id: number) => `/employee/saw-score?id=${id}`;

export default {
    getProfileURL,
    getSAWScoreURL,
};
