export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function handler(request) {
  const apiKey = process.env.API_KEY;
  const id = new URL(request.url).searchParams.get("id");
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`
  );
  const data = await response.json();
  return new Response(JSON.stringify(data));
}
