// pages/api/tiktok-prophetic-events.js

export default async function handler(req, res) {
  try {
    const datasetId = 'niuUFCEaBc25zmAXz'; // Replace with actual dataset ID
    const apiKey = process.env.NEXT_PUBLIC_APIFY_API_KEY;

    const response = await fetch(`https://api.apify.com/v2/datasets/${datasetId}/items?clean=true`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) throw new Error('Failed to fetch TikTok data.');

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
