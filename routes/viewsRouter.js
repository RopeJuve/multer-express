import express from 'express';
import { getIndex } from '../controllers/viewsControllers.js';

const viewsRouter = express.Router();

viewsRouter.get("/", getIndex);


export default viewsRouter;