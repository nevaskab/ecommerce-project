import axios from "axios";

type ApiErrorResponse = {
  message?: string;
  error?: string;
};

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorResponse>(error)) return fallback;

  if (!error.response) {
    return "Could not reach the API. Check that the backend is running and the API URL is correct.";
  }

  if (error.response.status === 401) {
    return "Your session has expired. Please sign in again.";
  }

  if (error.response.status === 404) {
    return "This API route is not available on the configured backend. Restart the local backend or deploy the latest server changes.";
  }

  return error.response.data?.message ?? error.response.data?.error ?? fallback;
}
