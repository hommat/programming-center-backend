const axios = require("axios");
const { getVideos } = require("./youtube");
const { badRequest } = require("./errror");

const maxYoutubeVideosCount = 50;
const maxRedditPosts = 30;

module.exports.getYoutubeVideos = async ({ query: { videoCount } }, res) => {
  if (!videoCount) return badRequest(res, "Video count is required.");
  if (videoCount > maxYoutubeVideosCount) {
    return badRequest(res, `Video count must be <= ${maxYoutubeVideosCount}.`);
  }

  const videos = await getVideos(videoCount);
  return res.status(200).json(videos);
};

module.exports.getGithubRepos = async (req, res) => {
  const endPoint = "https://api.github.com/users/hommat/repos?sort=created";
  const repos = await axios.get(endPoint);
  const filteredRepos = repos.data.filter(repo => !repo.fork);
  const mappedRepos = filteredRepos.map(
    ({ id, name, html_url, homepage, description }) => ({
      id,
      name,
      description,
      githubURL: html_url,
      deployURL: homepage
    })
  );

  res.status(200).json(mappedRepos);
};

module.exports.getRedditPosts = async (
  { query: { limit = 20, sub = "reactjs", after } },
  res
) => {
  if (limit > maxRedditPosts) {
    return badRequest(res, `Limit must be <= ${maxRedditPosts}.`);
  }

  const query = `https://www.reddit.com/r/${sub}/.json?limit=${limit}`;
  if (after) query += `&after=${after};`;

  const redditRes = await axios.get(query);
  const posts = redditRes.data.data.children;
  const mappedPosts = posts.map(post => ({
    title: post.data.title,
    score: post.data.ups,
    name: post.data.name
  }));

  res.status(200).json(mappedPosts);
};
