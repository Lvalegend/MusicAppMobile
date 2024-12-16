
import showToastApp from '@app-components/CustomToast/ShowToastApp';
import axios, { AxiosRequestConfig } from 'axios';

// Cấu hình mặc định của axios
const defaultHeaders = { 'Content-Type': 'application/json' };

// Hàm gọi API chung
const useCallAPI = async (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  url: string,
  showToast: boolean = false,
  token?: any,
  data?: any,
  config?: AxiosRequestConfig
): Promise<any> => {
  if (showToast === true) {
    try {
      const response = await axios({
        method,
        url,
        headers: {
          ...defaultHeaders,
          ...config?.headers,
          Authorization: token ? `Bearer ${token}` : undefined
        },
        data,
        ...config
      });
      if (response?.data) {
        console.log('respone: ', response?.data)
        showToastApp({
          type: 'success',
          title: 'Thành công!',
        });
        return response?.data
      }
      else {
        showToastApp({
          type: 'info',
          title: 'Không có dữ liệu trả về!',
        });
      }
    } catch (error: any) {
      console.log(`Error with ${method} request to ${url}:`, error);
      const status = error.response ? error.response.status : null;
      if (status >= 400 && status < 500) {
        showToastApp({
          type: 'error',
          title: 'Có lỗi xảy ra do người dùng!',
        });
      }
      else if (status >= 500) {
        showToastApp({
          type: 'error',
          title: 'Có lỗi xảy ra do hệ thống!',
        });
      }
      else {
        showToastApp({
          type: 'error',
          title: 'Có lỗi xảy ra!',
        });
      }
    }
  }
  else {
    try {
      const response = await axios({
        method,
        url,
        headers: {
          ...defaultHeaders,
          ...config?.headers,
          Authorization: token ? `Bearer ${token}` : undefined
        },
        data,
        ...config
      });
      if (response?.data) {
        console.log('respone: ', response?.data)
        return response?.data
      }
      else {
        console.log('no respone')
      }
    } catch (error: any) {
      console.log(`Error with ${method} request to ${url}:`, error);
    }
  }
};

export default useCallAPI;