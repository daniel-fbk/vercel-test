export const config = {
  runtime: "edge",
  regions: ["fra1"],
};

export default async function handler() {
  try {
    const apiKey = Deno.env.get("API_KEY");
    if (!apiKey) throw new Error("API_KEY is missing");

    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
    );

    if (!response.ok)
      throw new Error(`TMDB responded with status ${response.status}`);

    const data = await response.json();

    return new Response(JSON.stringify(data.results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("moviesPopularApi error:", err);

    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
