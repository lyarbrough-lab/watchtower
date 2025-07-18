// /api/reddit-scraper.js

export default async function handler(req, res) {
  const data = {
    message: "Reddit scraper is live and ready to rock",
    timestamp: new Date().toISOString()
  };
  res.status(200).json(data);
}
