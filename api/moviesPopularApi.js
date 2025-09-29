export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function handler() {
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
  );
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
