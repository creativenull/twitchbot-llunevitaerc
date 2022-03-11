import { ref } from "vue";

export async function useApi<Req, Res>(
  url: string,
  body?: Req | undefined,
  method = "GET"
) {
  const response = ref<Res>();
  const error = ref<string>("");
  const ok = ref(false);
  const headers = {
    accept: "application/json",
    "content-type": "application/json",
  };

  try {
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
    });

    if (res.status >= 400 && res.status < 500) {
      throw new Error(await res.text());
    }

    if (!res.ok) {
      throw new Error("Failed to fetch!");
    }

    ok.value = res.ok;
    response.value = (await res.json()) as Res;

    return { response, error, ok };
  } catch (err) {
    if (err instanceof Error) {
      error.value = err.message;
    } else {
      error.value = "Oops, something went wrong!";
    }

    return { response, error, ok };
  }
}

export async function useGetRequest<Req, Res>(
  url: string,
  body?: Req | undefined
) {
  return await useApi<Res, Req>(url, body, "GET");
}

export async function usePostRequest<Req, Res>(
  url: string,
  body?: Req | undefined
) {
  return await useApi<Res, Req>(url, body, "POST");
}
