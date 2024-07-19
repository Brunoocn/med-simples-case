export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/${input}`, {
    cache: "no-cache",
    ...init,
  });

  const contentLength = res.headers.get("Content-Length");
  const result = contentLength === "0" ? null : await res.json();
  if (res.ok) {
    return result as T;
  } else {
    throw new Error(result.message);
  }
}
