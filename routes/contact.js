const express = require('express');


// initialize router
const router = express.Router();


// contact page route
router.get('/', (req, res) => {
    res.render('contact/index');
});


// export router
module.exports = router;