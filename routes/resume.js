const express = require('express');


// initialize router
const router = express.Router();


// resume page route
router.get('/', (req, res) => {
    res.render('resume/index');
});


// export router
module.exports = router;