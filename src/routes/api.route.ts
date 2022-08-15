import express from 'express';
import api_controller from '../controllers/api.controller';
import fileExistance from '../middlewares/fileExistance.middleware';
import fileCached from '../middlewares/fileCached.middleware';

const API_Router = express.Router();

//= GET: images resize endpoint
API_Router.get('/images', fileExistance, fileCached, api_controller.getAndResizeImage);


export default API_Router;