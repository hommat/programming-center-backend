const { google } = require("googleapis");

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YOUTUBE_API_KEY
});

const channelsPlaylistIds = {
  "The Net Ninja": "UUW5YeuERMmlnqo4oq8vwUpg",
  "Ben Awad": "UU-8QAzbLcRglXeN_MY9blyw",
  "Traversy Media": "UU29ju8bIPH5as8OGnQzwJyA",
  "Basarat Ali": "UUGD_0i6L48hucTiiyhb5QzQ",
  BookMark: "UUtoBjWAGbdlf9FdeQF3Be9Q",
  Codegrid: "UU7pVho4O31FyfQsZdXWejEw",
  DarkCode: "UUD3KVjbb7aq2OiOffuungzw",
  "Devon Crawford": "UUDrekHmOnkptxq3gUU0IyfA",
  "freeCodeCamp.org": "UU8butISFwT-Wl7EV0hUK0BQ",
  "Julio Codes": "UUeHWTyAKBv_WnW8gsEKGECw",
  "Kurs Reacta": "UU9b88oZkSb3gAWybsVIM6eg",
  "Online Tutorials": "UUbwXnUipZsLfUckBPsC7Jog",
  "Online web ustaad": "UU8xTHK97Ng__KZvGcO_K7CA",
  overment: "UU_MIaHmSkt9JHNZfQ_gUmrg",
  "The Coding Train": "UUvjgXvBlbQiydffZU7m1_aw"
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
