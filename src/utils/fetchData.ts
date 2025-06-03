const API_URL = import.meta.env.VITE_API_URL as string;

export default async function fetchData(
  endpoint: string,
  method: string = "GET",
  body: unknown = null,
  token: string = "",
  type: string = "application/json"
): Promise<unknown> {
  const headers: Record<string, string> = {
    "Content-Type": type,
  };

  const finalEndpoint = `${API_URL}${endpoint}`;

  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response;

  if (method === "GET") {
    response = await fetch(finalEndpoint, {
      method,
      headers,
    });
  } else {
    const fetchOptions: RequestInit = {
      method,
      headers,
    };
    if (body) {
      fetchOptions.body = JSON.stringify(body);
    }
    response = await fetch(finalEndpoint, fetchOptions);
  }

  return response.json();
}
