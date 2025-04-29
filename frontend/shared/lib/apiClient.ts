import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

// Tạo instance axios với cấu hình mặc định
const apiClient: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor cho request để đính kèm token xác thực
apiClient.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        // Lấy phiên người dùng hiện tại
        const session = await getSession();

        // Nếu có phiên và token, thêm vào header
        if (session?.user?.token) {
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${session.user.token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Hàm helper để gọi API
export const api = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await apiClient.get<T>(url, config);
        return response.data;
    },

    post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const response = await apiClient.post<T>(url, data, config);
        return response.data;
    },

    put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> => {
        const response = await apiClient.put<T>(url, data, config);
        return response.data;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response = await apiClient.delete<T>(url, config);
        return response.data;
    },
};

export default apiClient;