const express = require('express');
const router = express.Router();
const userHelpers = require('../helpers/users');

router.route('/').post(userHelpers.createUser);
router.route('/:userId/food').post(userHelpers.createFoodRecord);
router.route('/:userId/food/:foodRecordId').patch(userHelpers.updateFoodRecord);

module.exports = router;