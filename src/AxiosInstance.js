import axios from 'axios';

const AxiosInstance = axios.create({
	baseURL: 'http://localhost/apis/leaderboard/',
	headers: {
		'Content-type': 'application/json'
	}
});

export default AxiosInstance;
