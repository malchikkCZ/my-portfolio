const express = require('express');


// initialize router
const router = express.Router();


// home page route
router.get('/', (req, res) => {
    res.render('index');
});


// export router
module.exports = router;