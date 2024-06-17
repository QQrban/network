const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8888";
console.log("Using BASE_URL:", BASE_URL);

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
