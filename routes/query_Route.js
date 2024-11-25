const express = require('express');
const router = express.Router();
const { queries } = require('../controllers/query_Controller');
const { answers } = require('../controllers/query_Controller');
const { display_unanswered } = require('../controllers/query_Controller');
const { display_all_a } = require('../controllers/query_Controller');
const { display_all_s } = require('../controllers/query_Controller');

router.post('/query/queries', queries);
router.post('/query/answers', answers);
router.post('/query/unanswered', display_unanswered);
router.post('/query/display_all_a', display_all_a);
router.post('/query/display_all_s', display_all_s);

module.exports = router;