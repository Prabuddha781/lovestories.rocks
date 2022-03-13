import express from "express";
import { getTop100, getRomantic, getSexy, getBySearch, getHighestTags } from "../controllers/postQueries.js";

const router = express.Router();

//Queries
router.get('/search', getBySearch);
router.get('/getSexy', getSexy);
router.get('/getTop100', getTop100);
router.get('/getRomantic', getRomantic);
router.get('/getHighestTags', getHighestTags)

// router.get('/getDocumentCount', getDocumentCount);

export default router;