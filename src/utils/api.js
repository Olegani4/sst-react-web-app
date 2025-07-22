export const apiFetch = async (URL, method = 'GET', headers = {}) => {
    const config = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
    };

    try {
        const response = await fetch(`${URL}`, config);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};