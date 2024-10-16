const express = require('express');
const router = express.Router();
const { validateToken } = require('../../middlewares/AuthMiddleware');

// 간편로그인 라우터
const GoogleRouter = require('./GoogleAuth');
router.use('/', GoogleRouter);
const KakaoRouter = require('./KakaoAuth');
router.use('/', KakaoRouter);
const GitHubRouter = require('./GitHubAuth');
router.use('/', GitHubRouter);

module.exports = router;