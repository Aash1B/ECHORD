const express = require("express");
const router = express.Router();
const { authenticateRequest } = require("../authMiddleware");

const {
    getAllSongs,
    streamSong,
    toggleLikeSong,
} = require("../controllers/songController");

const expressAuth = async (req, res, next) => {
    try {
        await authenticateRequest(req);
        next();
    } catch (error) {
        res.status(error.statusCode || 401).json({ error: error.message });
    }
};

router.get("/", getAllSongs);

// NEW
router.get("/:id/stream", streamSong);
router.post("/:id/like", expressAuth, toggleLikeSong);

module.exports = router;