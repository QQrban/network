const BASE_URL = "http://localhost:8888";

export async function fetchFromServer(
  endpoint: string,
  options?: RequestInit
): Promise<any> {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
