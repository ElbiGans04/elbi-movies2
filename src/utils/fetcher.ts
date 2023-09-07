export default function fetcher(url: string) {
  return fetch(url, {
    headers: {
      accept: "application/json",
      Authorization:
        `Bearer ${process.env.REACT_APP_API_KEY}`,
    },
  }).then((res) => res.json());
}
