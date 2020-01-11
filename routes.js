const { Router } = require("express");
const { getVideos } = require("./youtube");

const router = Router();
const maxYoutubeVideosCount = 50;

router.get("/youtube", async (req, res) => {
  if (!req.query.videoCount)
    return res.status(400).json({ error: "Video count is required." });
  if (req.query.videoCount > maxYoutubeVideosCount)
    return res
      .status(400)
      .json({ error: `Video count must be <= ${maxYoutubeVideosCount}.` });

  const videos = await getVideos(req.query.videoCount);
  return res.status(200).json({ videos });
});

module.exports = router;
