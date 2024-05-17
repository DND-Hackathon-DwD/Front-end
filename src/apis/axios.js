// url: string,
//   auth: boolean,
//   options?: RequestInit,
//   responseType?: 'json' | 'text' | 'blob' | 'formData' | 'arrayBuffer'

const axiosWithErrorHandler = async (url, auth, options = undefined, responseType = undefined) => {
  let axiosConfig = {
    headers: {
      ...(options?.body instanceof FormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' }),
      ...(auth && { Authorization: `Bearer ${localStorage.getItem('token')}` }),
      ...(options?.headers || {}),
    },
  };

  if (options?.method === 'GET') {
    axiosConfig.params = options?.body;
  } else {
    axiosConfig.data = options?.body;
  }

  const response = await axios(url, axiosConfig);

  if (!response.ok) {
    const body = await response.json();
    throw new Error(body.message);
  }
  const responseData = response[responseType ?? 'json']();

  return responseData;
}