const webhook = require("express").Router();

webhook.all('/app', (req, res)=> {
    console.log(req.body);
    const transferType = req.body;
    
    if(transferType.transferType == 'in'){
        console.log("Giao dịch thành công");

    }else 
        console.log("Giao dịch thất bại");
    
})

module.exports = webhook