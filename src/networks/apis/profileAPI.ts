const getProfileURL = `/employee`;
const getSAWScoreURL = (id: number) => `/employee/saw-score?profile_id=${id}`;

export default {
    getProfileURL,
    getSAWScoreURL,
};
