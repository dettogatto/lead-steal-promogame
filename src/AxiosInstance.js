import axios from 'axios';

const AxiosInstance = axios.create({
	baseURL: 'http://localhost/raccoonleaderboard',
	headers: {
		'Content-type': 'application/json'
	}
});

export default AxiosInstance;
