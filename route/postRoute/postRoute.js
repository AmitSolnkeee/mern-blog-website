const express = require('express');
const { postUserCtrl, fetchAllPostCtrl, updatePostCtrl } = require('../../controller/post/postCtrl');
const authMiddleware = require('../../middleware/authMiddleware');
const postRoute = express.Router();

postRoute.post('/', authMiddleware ,postUserCtrl);

postRoute.get('/',fetchAllPostCtrl);

postRoute.put('/:id',updatePostCtrl)

module.exports = {postRoute}