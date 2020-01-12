const { Router } = require("express");
const { getYoutubeVideos } = require("./handlers");

const router = Router();

router.get("/youtube", getYoutubeVideos);

module.exports = router;
