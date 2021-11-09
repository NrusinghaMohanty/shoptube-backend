const express = require('express');
var bodyParser = require('body-parser')
const mongoose = require("mongoose")
var cors = require('cors')

const app = express();
app.use(bodyParser.json())
app.use(cors());

const videosrouter = require("./route/videos.route.js")
const likedvideosrouter = require("./route/likedvideo.route.js")
const watchlaterrouter = require("./route/watchlater.route.js")
const playlistrouter = require("./route/playlist.route.js")
const historyrouter = require
("./route/history.route.js")

const { dbconnection } = require("./db/db.js")

dbconnection()


app.use("/videos", videosrouter)
app.use("/likevideo", likedvideosrouter)
app.use("/watchlater", watchlaterrouter)
app.use("/playlists", playlistrouter)
app.use("/history", historyrouter)


app.get('/', (req, res) => {
  res.json({ text: 'Hello world' })
});

/**
 * 404 Route Handler
 * Note: DO not MOVE. This should be the last route
 */
app.use((req, res) => {
  res.status(404).json({ success: false, message: "route not found on server, please check" })
})

/**
 * Error Handler
 * Don't move
 */
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "error occured, see the errMessage key for more details", errorMessage: err.message })
})
app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'), () => {
  console.log('server started');
});
