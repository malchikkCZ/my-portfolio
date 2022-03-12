const express = require('express');


// initialize router
const router = express.Router();


// home page route
router.get('/', (req, res) => {
    res.send('Hello World');
});


// export router
module.exports = router;