import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

import { vercelAPIAxiosInstance } from '@/utils/vercelAPIAxiosInstance'

/**
 * A generalized function to make HTTP requests using Axios.
 *
 * @param url - The endpoint URL to make the request to.
 * @param options - Optional Axios request configuration options (method, headers, data, etc.).
 * @param operation - A descriptive string for the type of operation (e.g., 'fetching projects', 'creating project').
 * @returns - A promise that resolves to an AxiosResponse containing the response data.
 *
 * @throws - Throws an error if the request fails, with the error message logged to the console.
 */
export const vercelAPI = async <T = any>(
  url: string,
  options: AxiosRequestConfig = {},
  operation: string = 'operation',
): Promise<AxiosResponse<T>> => {
  try {
    const headers = {
      ...options.headers,
    }

    // Make the HTTP request using the Axios instance and provided options.
    const response: AxiosResponse<T> = await vercelAPIAxiosInstance(url, {
      ...options,
      headers,
    })

    // Return the full Axios response object.
    return response
  } catch (error: any) {
    // Check if the error is an AxiosError.
    if (axios.isAxiosError(error)) {
      // Log an error message specific to Axios errors, including response details if available.
      console.error(
        `Axios error during ${operation}:`,
        error.message,
        'Response:',
        error.response,
      )
    } else {
      // Log a general error message for non-Axios errors.
      console.error(`General error during ${operation}:`, error)
    }

    // Rethrow the error to allow further handling upstream.
    throw error
  }
}
