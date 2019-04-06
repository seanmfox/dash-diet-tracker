const express = require('express');
const router = express.Router();
const userHelpers = require('../helpers/users');

router.route('/').post(userHelpers.createUser);
router.route('/:userId/food').post(userHelpers.createFoodRecord);
router.route('/:userId/food/:foodRecordId').patch(userHelpers.updateFoodRecord);
router.route('/:userId/activity').post(userHelpers.createActivity);
router
	.route('/:userId/activity/:activityId')
	.delete(userHelpers.deleteActivity);

module.exports = router;
