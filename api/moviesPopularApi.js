export async function handler() {
  const apiKey = process.env.API_KEY;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data.results),
  };
}
