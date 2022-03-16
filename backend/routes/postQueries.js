import express from "express";
import { getTop100, getBySearch, getHighestTags } from "../controllers/postQueries.js";

const router = express.Router();

router.get('/search', getBySearch);
router.get('/getTop100', getTop100);
router.get('/getHighestTags', getHighestTags)

export default router;