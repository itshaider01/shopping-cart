const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>
{
    res.status(200).json({
        message: "Order's Get request accepted!"
    })
}
)

router.post('/',(req,res,next) =>
{
    res.status(200).json({
        message: "Order's Post request accepted!"
    })
}
)

router.get('/:id',(req,res,next) =>
{
    const id = req.params.id;
    res.status(200).json({
        message: `Order's Get ID ${id} request accepted!`
    })
}
)

module.exports = router;