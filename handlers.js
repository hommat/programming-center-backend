const { getVideos } = require("./youtube");
const { badRequest } = require("./errror");

const maxYoutubeVideosCount = 50;

module.exports.getYoutubeVideos = async ({ query: { videoCount } }, res) => {
  if (!videoCount) return badRequest(res, "Video count is required.");
  if (videoCount > maxYoutubeVideosCount) {
    return badRequest(res, `Video count must be <= ${maxYoutubeVideosCount}.`);
  }

  const videos = await getVideos(videoCount);
  return res.status(200).json({ videos });
};
