const API_URL = import.meta.env.VITE_API_URL as string;

export default async function fetchData(
  endpoint: string,
  method: string = "GET",
  body: unknown = null,
  token: string = "",
  type: string = "application/json"
): Promise<{ message: string | Record<string, unknown>; success: boolean }> {
  const headers: Record<string, string> = {
    "Content-Type": type,
  };

  const finalEndpoint = `${API_URL}${endpoint}`;

  if (token) headers["Authorization"] = `Bearer ${token}`;

  let response: Response;

  try {
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

    const contentType = response.headers.get("content-type");

    if (contentType && contentType.includes("application/json")) {
      const data = await response.json();
      return {
        message:
          typeof data === "object" && data !== null && "message" in data
            ? data.message
            : data,
        success: response.ok,
      };
    } else {
      const text = await response.text();
      return {
        message: text,
        success: response.ok,
      };
    }
  } catch (error) {
    return {
      message: (error as Error).message,
      success: false,
    };
  }
}
