/**
 * Send an HTTP request that expects a JSON response.
 * @param {string} url 
 * @param {object} options 
 */
export async function requestJson(url, options) {
    const response = await fetch(url, options);
    const { status, statusText } = response;
    if (200 <= status && status < 300) {
        return await response.json();
    }
    else {
        throw new Error(`${status} ${statusText}`);
    }
}

