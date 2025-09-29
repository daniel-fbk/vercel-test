export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function handler(request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title");
  const apiKey = process.env.API_KEY;

  if (!title) {
    return new Response(JSON.stringify({ error: "Missing title parameter" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${title}&api_key=${apiKey}`
  );
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
