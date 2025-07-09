export default async function handler(req, res) {
  const datasetId = 'niuUFCEaBc25zmAXz'; // Replace with your actual dataset ID
  const apiKey = process.env.NEXT_PUBLIC_APIFY_API_KEY; // Should be in your GitHub/Vercel secrets

  try {
    const response = await fetch(
      `https://api.apify.com/v2/datasets/${datasetId}/items?clean=true&format=json&limit=25`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch TikTok data.');
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: err.message });
  }
}
