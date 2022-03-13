const express = require('express');


// initialize router
const router = express.Router();


// portfolio page route
router.get('/', (req, res) => {
    res.render('portfolio/index');
});


// export router
module.exports = router;