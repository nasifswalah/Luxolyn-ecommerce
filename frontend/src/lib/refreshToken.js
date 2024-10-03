// import { useDispatch, useSelector } from 'react-redux';
// import axios from '../lib/axios';
// import { startCheckingAuth, stopCheckingAuth, refreshTokenFailure } from '../store/userSlice';
// import { logout } from '../../../backend/controllers/auth.controller';

// const { checkingAuth } = useSelector((state) => state.user);
// const dispatch = useDispatch()

// const refreshToken = async() => {
//     if(checkingAuth) return;

//     dispatch(startCheckingAuth());
//     try {
//         const response = await axios.post("/auth/refresh-access");
//         dispatch(stopCheckingAuth());
//         return response.data;
//     } catch (error) {
//         dispatch(refreshTokenFailure());
//         throw error;
//     }
// }

// let refreshPromise = null;

// axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) => {
// 		const originalRequest = error.config;
// 		if (error.response?.status === 401 && !originalRequest._retry) {
// 			originalRequest._retry = true;

// 			try {
				
// 				if (refreshPromise) {
// 					await refreshPromise;
// 					return axios(originalRequest);
// 				}

				
// 				refreshPromise = refreshToken();
// 				await refreshPromise;
// 				refreshPromise = null;

// 				return axios(originalRequest);
// 			} catch (refreshError) {
				
// 				logout();
// 				return Promise.reject(refreshError);
// 			}
// 		}
// 		return Promise.reject(error);
// 	}
// );