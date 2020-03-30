const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.status(200).json({
        message: "Order's Get request accepted!"
    });
});

router.post('/',(req,res) => {
    const {name, id} = req.body;
    res.status(200).json({
        message: "Post request accepted!",
        data: {
            id,
            name    
        }
    });
});

router.patch('/', (req,res) =>{
    res.status(200).json({
        message: "Update request accepted!"
    });
});

router.delete('/', (req,res) =>{
    res.status(200).json({
        message: "Removal request accepted!"
    });
});

router.get('/:id',(req,res,next) =>
{
    const id = req.params.id;
    res.status(200).json({
        message: `Order's Get ID ${id} request accepted!`
    })
}
)

module.exports = router;