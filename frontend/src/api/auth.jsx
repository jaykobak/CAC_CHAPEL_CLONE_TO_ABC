import client from "./client";

const makeApiRequest = async (method, endpoint, data) => {
    try {
        const response = await client.request({
            method,
            url: endpoint,
            data // add the data parameter to the request options
        });
        return { data: response.data, status: response.status };
    } catch (error) {
        const { response } = error;
        if (response?.data) {
            return { data: response.data, status: response.status };
        }
        return { error: error.message || error };
    }
};

const buildQueryString = (params) => {
    if (typeof params === 'string') return params;

    if (params && typeof params === 'object') {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(params)) {
            if (value !== undefined && value !== null && value !== '') {
                searchParams.append(key, value);
            }
        }
        return searchParams.toString();
    }

    return '';
};

export const loginUser = async (data) => {
    const response = await makeApiRequest('POST', '/auth/login', data);
    return response;
};
