// pacakges and module imports
const router = require('express').Router();
const apiRoutes = require('./api');

// /api route set up
router.use('/api', apiRoutes);

// wrong route warning
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;