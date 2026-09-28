Almost every real React app needs data from a server. In this post we'll load a list of users from a REST API, first with the browser's built-in **Fetch API** and then with **Axios**, and look at when each one makes sense.

## The data flow

A component that loads data usually needs three pieces of state:

1. the **data** itself,
2. whether it is still **loading**,
3. an **error**, if the request failed.

We start the request inside `useEffect` so it runs after the component renders, not during rendering.

## Using the Fetch API

`fetch` ships with every modern browser, so there is nothing to install.

```jsx
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setUsers)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort(); // cancel if the component unmounts
  }, []);

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Something went wrong: {error}</p>;

  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

> **Gotcha:** `fetch` only rejects on network failures. A `404` or `500` still resolves, so always check `res.ok` yourself.

## Using Axios

Install it first:

```bash
npm install axios
```

The same component with Axios:

```jsx
import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => setUsers(res.data)) // already parsed JSON
      .catch((err) => {
        if (!axios.isCancel(err)) setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  // …same JSX as before
}
```

Notice two things Axios does for you: it **parses JSON automatically** (`res.data`) and it **rejects on non-2xx status codes**, so you don't need the `res.ok` check.

## Posting data

```js
// fetch
await fetch("/api/users", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Ravi" }),
});

// axios
await axios.post("/api/users", { name: "Ravi" });
```

## A reusable Axios instance

For a real project, create one configured client and import it everywhere:

```js
// src/api.js
import axios from "axios";

export const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

## Which one should you use?

| | Fetch API | Axios |
|---|---|---|
| Install needed | No | Yes (~13 KB gzipped) |
| JSON parsing | Manual `res.json()` | Automatic |
| Rejects on 4xx/5xx | No | Yes |
| Interceptors | No | Yes |
| Timeouts | Via `AbortController` | `timeout` option |

**Rule of thumb:** use `fetch` for small apps and a few simple calls. Reach for Axios when you have many endpoints, auth tokens, or want interceptors and consistent error handling.

Watch the full walkthrough in the video above, and try both versions in your own project!
