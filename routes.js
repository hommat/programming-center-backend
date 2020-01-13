const { Router } = require("express");
const {
  getYoutubeVideos,
  getGithubRepos,
  getRedditPosts
} = require("./handlers");

const router = Router();

router.get("/youtube", getYoutubeVideos);
router.get("/github", getGithubRepos);
router.get("/reddit", getRedditPosts);

module.exports = router;
