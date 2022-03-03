import { ref } from "vue";

export function useApi<T>(url: string, body?: string, method = "GET") {
  const response = ref<T>();
  const error = ref(null);
  const ok = ref(false);
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      ok.value = res.ok;
      return res.json() as Promise<T>;
    })
    .then((json) => (response.value = json as T))
    .catch((err) => (error.value = err));

  return { response, error, ok };
}

export function useRequestApi<T, R>(
  url: string,
  body: R | undefined,
  method = "POST"
) {
  const response = ref<T>();
  const error = ref(null);
  const ok = ref(false);
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  fetch(url, {
    method,
    headers,
    body: JSON.stringify(body),
  })
    .then((res) => {
      ok.value = res.ok;
      return res.json() as Promise<T>;
    })
    .then((json) => (response.value = json as T))
    .catch((err) => (error.value = err));

  return { response, error, ok };
}

export function useResponseApi<T>(url: string, method = "GET") {
  const response = ref<T>();
  const error = ref(null);
  const ok = ref(false);
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  fetch(url, {
    method,
    headers,
  })
    .then((res) => {
      ok.value = res.ok;
      return res.json() as Promise<T>;
    })
    .then((json) => (response.value = json as T))
    .catch((err) => (error.value = err));

  return { response, error, ok };
}
