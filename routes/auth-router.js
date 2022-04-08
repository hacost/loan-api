const express = require('express');
const passport = require('passport');
const controller = require('../controllers/auth-controller');

const router = express.Router();
router.post('/login', passport.authenticate('local', { session: false }), controller.signToken);
//router.post('/recovery', controller.authentication);

module.exports = router;