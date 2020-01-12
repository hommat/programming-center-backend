const axios = require("axios");
const { getVideos } = require("./youtube");
const { badRequest } = require("./errror");

const maxYoutubeVideosCount = 50;

module.exports.getYoutubeVideos = async ({ query: { videoCount } }, res) => {
  if (!videoCount) return badRequest(res, "Video count is required.");
  if (videoCount > maxYoutubeVideosCount) {
    return badRequest(res, `Video count must be <= ${maxYoutubeVideosCount}.`);
  }

  const videos = await getVideos(videoCount);
  return res.status(200).json(videos);
};

const githubEndPoint = "https://api.github.com/users/hommat/repos?sort=created";

module.exports.getGithubRepos = async (req, res) => {
  const repos = await axios.get(githubEndPoint);
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
