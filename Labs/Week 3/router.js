let express = require('express');
let router = express.Router();
let url = require('url')
let db =[];
let dbSize=10;




router.get('/getallitems', function (req, res) {
    res.send(generateList());
});
router.get('/newItem', function (req, res) {
    let curUrl = req.url;
    let q = url.parse(curUrl, true).query;
    console.log(q);

    insertItem(q.name,q.count,q.cost);
    res.send(generateList());
});
router.get('/getwarehousevalue', function (req, res) {
    res.send(''+totalValue());
});
router.get('/removeitemid/:id', function (req, res) {

    deleteItem(req.params.id);
    res.send(generateList());
})
router.get('/removeitemname/:name', function (req, res) {

    deleteItemName(req.params.name);
    res.send(generateList());
})
const deleteItemName = (name)=>{
    console.log('running')
    if (db.length>0){
        let newDb=[]
        let i =0;
        do {
            item=db[i]
            i++
            if (item.name==name){
                deleteItem(item.id)
            }
        } while (item.name!=name && i<db.length)
        

    }
    
}
const insertItem = (name,count,cost) => {
    let newId;
    // For when database is full
    if(db.length==dbSize){
        dbSize=dbSize+10
    }
    do {
        newId= Math.round(Math.random()*dbSize);
    } while (db.filter(item => item.id==newId).length!=0)

    let newItem = {
        id: newId,
        name: name,
        count: count,
        cost: cost
    }
    console.log(newId)
    db.push(newItem);
    
}

const deleteItem = (idNum) => {
    db=db.filter(item => item.id!=idNum)
    console.log(db)
}
function generateList() {
    let st = 'Id  Name  Count  Cost   Total  </br>';
    db.map(item => st += item.id + ' | ' + item.name + ' | ' + item.count + ' | ' + item.cost + ' | ' + item.count*item.cost + '</br>');
    return st;
}

const totalValue = () => {
    if (db.length>0){
        return sum(db.map((item)=>item.cost*item.count));
    }
    else{
        return 0;
    }
}

const sum = (arr) => {
    return arr.reduce((accum,curr)=>accum+curr);
}

//export this router 
module.exports = router;