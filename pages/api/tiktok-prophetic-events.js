// /pages/api/tiktok-prophetic-events.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests are allowed' });
  }

  const { hashtags } = req.body;

  try {
    const response = await fetch('https://api.apify.com/v2/acts/lyarbrough-lab~my-actor /run-sync-get-dataset-items?token=' + process.env.APIFY_API_KEY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        search: hashtags.join(', '),
        limit: 10
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error('Apify error:', error);
    res.status(500).json({ error: 'Server error while fetching TikTok data' });
  }
}
