import { jwtDecode } from 'jwt-decode'

const token =
	typeof window !== 'undefined' ? localStorage.getItem('access_token') : null

export const userId =
	typeof window !== 'undefined' && token ? jwtDecode(token) : null

export const api = 'https://instagram-api.softclub.tj/'

// Экспортируем token отдельно, так как userId и api уже экспортированы выше
export { token }
