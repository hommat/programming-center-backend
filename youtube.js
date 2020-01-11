const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY
});

const channelsPlaylistIds = {
  "The Net Ninja": "UUW5YeuERMmlnqo4oq8vwUpg",
  "Ben Awad": "UU-8QAzbLcRglXeN_MY9blyw"
};

const playlistsIds = Object.keys(channelsPlaylistIds).map(
  key => channelsPlaylistIds[key]
);

module.exports.getVideos = async videoCount => {
  try {
    const playlistItemsPromiseArray = playlistsIds.map(id =>
      youtube.playlistItems.list({
        part: "snippet",
        playlistId: id,
        maxResults: videoCount
      })
    );

    const playlistItems = await Promise.all(playlistItemsPromiseArray);

    let videos = playlistItems
      .reduce((prev, curr) => [...prev, ...curr.data.items], [])
      .sort((a, b) => {
        return (
          new Date(b.snippet.publishedAt) - new Date(a.snippet.publishedAt)
        );
      })
      .slice(0, videoCount)
      .map(video => ({
        id: video.snippet.resourceId.videoId,
        title: video.snippet.title,
        publishedAt: video.snippet.publishedAt,
        channelTitle: video.snippet.channelTitle,
        thumbnails: video.snippet.thumbnails
      }));

    return videos;
  } catch (err) {
    console.log(err);
  }
};
