export async function handler(event) {
  const apiKey = process.env.API_KEY;
  const { id } = event.queryStringParameters;

  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}`
  );
  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
