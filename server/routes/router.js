const express = require('express');
const router = express.Router();
const work_type = require('../models/work_type');

router.route("/create").post((req,res) =>{
    const work1_name = req.body.work1_name;
    const work2_name = req.body.work2_name;
    const work3_name = req.body.work3_name;

    const newWork =new work_type({
        work1_name,
        work2_name,
        work3_name
    })
    console.log(newWork, "toimiiko");
    newWork.save();

})
module.exports = router;