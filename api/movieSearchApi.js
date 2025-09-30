export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function handler(request) {
  const apiKey = process.env.API_KEY;
  const title = new URL(request.url).searchParams.get("title");
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
  );
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
