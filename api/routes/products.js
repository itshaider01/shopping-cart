const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>
{
    res.status(200).json({
        message: "Get request accepted!"
    })
}
)

router.post('/',(req,res,next) =>
{
    res.status(200).json({
        message: "Post request accepted!"
    });
    next();
}
)

router.get('/:id',(req,res,next) =>
{
    const id = req.params.id;
    res.status(200).json({
        message: `Get ID ${id} request accepted!`
    })
}
)

module.exports = router;