import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelToken,
  CancelTokenSource,
} from "axios";

const pendingRequests: { [key: string]: CancelTokenSource } = {};

/**
 * @param api The path to the API endpoint, relative to the base URL.
 * @param formData The data to include in the request body (for POST, PUT, PATCH requests).
 * @param method The HTTP method to use for the request.
 * @returns The response data returned by the API endpoint.
 */
const caller = async <T = any>(
  api: string,
  formData: any = null,
  method: AxiosRequestConfig["method"] = "GET",
  cancelToken?: CancelToken,
  setProgress?: any
): Promise<T> => {
  const url: string = `${import.meta.env.VITE_BASEURL}${api}`;
  try {
    const source = axios.CancelToken.source();
    if (pendingRequests[url]) {
      pendingRequests[url].cancel();
    }
    pendingRequests[url] = source;
    const config: AxiosRequestConfig = {
      url,
      method,
      data: formData,
      cancelToken: cancelToken || source.token,
    };
    const response: AxiosResponse<T> = await axios(config);
    delete pendingRequests[url];
    if (response.data) {
      setProgress(false);
    }
    return response.data;
  } catch (error: any) {
    delete pendingRequests[url];
    throw error;
  }
};

export default caller;
