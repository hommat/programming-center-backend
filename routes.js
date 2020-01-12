const { Router } = require("express");
const { getYoutubeVideos, getGithubRepos } = require("./handlers");

const router = Router();

router.get("/youtube", getYoutubeVideos);
router.get("/github", getGithubRepos);

module.exports = router;
