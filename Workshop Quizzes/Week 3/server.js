let express =require('express')
let app =express()
 

app.get('/math/max/:a/:b', (req,res)=> {
let a=req.params.a;
let b=req.params.b;
res.send("Output: "+Math.max(a,b));
})
 

app.get('/math/multi/:a/:b', (req,res)=>{
let a=req.params.a;
let b=req.params.b;
res.send("Output: "+a*b);
})
//will say unknown for any page. if it needed unknown for an unknown operand it would be /math/*/multi/:a/:b
// there was a typo in the question so this was confusing. thought I would specify what I had done just to be safe
// when using non numbers as parameters it will return NaN. It wasn't specified whether this should be Unknown Operation or not
app.get('/*', (req,res)=>{
res.send('Unknown operation')
})



app.listen(8080);