import fetch from 'node-fetch';

const subreddits = [
  'Glitch_in_the_Matrix',
  'synchronicity',
  'MandelaEffect',
  'conspiracy',
  'Christianity',
  'todayilearned'
];

const fetchRedditPosts = async (subreddit) => {
  const url = `https://www.reddit.com/r/${subreddit}/new.json?limit=20`;
  const response = await fetch(url);
  const data = await response.json();
  return data.data.children.map(post => ({
    subreddit,
    title: post.data.title,
    created: new Date(post.data.created_utc * 1000),
    url: post.data.url,
    text: post.data.selftext
  }));
};

const scrapeAll = async () => {
  let results = [];
  for (const sub of subreddits) {
    const posts = await fetchRedditPosts(sub);
    results = results.concat(posts);
  }
  console.log('Collected posts:', results.length);
  return results;
};

// Call the scraper when the file runs
scrapeAll().then(posts => {
  // For now, just print titles to the console
  posts.forEach(post => {
    console.log(`[${post.subreddit}] ${post.title}`);
  });
});
