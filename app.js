const express= require("express");
const body= require("body-parser");
const mongoose = require("mongoose");
const _=require("lodash");
const app= express();
app.set("view engine","ejs");
app.use(express.static("public"))
app.use(body.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser:true,useUnifiedTopology:true,useFindAndModify:false})
const todoSchema= new mongoose.Schema({
  item:String
});
const routeSchema= new mongoose.Schema({
  name:String,
  content:[todoSchema]
})
const Routelist= mongoose.model("Route",routeSchema);
const Todo= mongoose.model("List",todoSchema);
const item1= new Todo({
  item:"welcome to this TodoList"
})
const item2= new Todo({
  item:"You can enter ur items below"
})
const item3= new Todo({
  item:"delete items by pressing -->"
})
const defaultItems= [item1,item2,item3];

app.get("/",function(req,res){
  Todo.find({},function(err,result){
    if (result.length===0) {
      Todo.insertMany([item1, item2, item3], function(err){
      (err)? console.log(err):console.log("insertion successful");
      res.redirect("/");
    })
  }else {
    res.render("list",{title: "Main", items: result })
  }
})

})
app.get("/:route",function(req,res){
  const root= _.capitalize(req.params.route);

 Routelist.findOne({name:root},function(err,rootlist){
   if(rootlist){

     res.render("list",{title: rootlist.name, items: rootlist.content })
   }else{
     const rootRoute= new Routelist({
       name:root,
       content:defaultItems
     })
     rootRoute.save();
     res.redirect("/"+root);
   }
 })

})
//when user input new items in the list
app.post("/",function(req,res){
  const input= req.body.newItem;
  const btnvalue= req.body.btn;
  const newitm= new Todo({
    item:input
  })
  if(btnvalue==="Main"){
    newitm.save();
    res.redirect("/");
  }else{
  Routelist.findOne({name:btnvalue},function(err,result){
  if(result){
  result.content.push(newitm)
  result.save();
  res.redirect("/"+btnvalue);
  }
})
}
})


//when user tried to delete item from his list
app.post("/delete",function(req,res){
  const id= req.body.button;
  const rootinfo=req.body.rootinfo;
  if(rootinfo==="Main"){
    Todo.findByIdAndRemove({_id:id},function(err){
      (err)?console.log(err):res.redirect("/");
    })
  }else{
  Routelist.findOneAndUpdate({name:rootinfo},{$pull:{content:{_id:id}}},function(err,result){
     result.save();
     res.redirect("/"+rootinfo);

   })
  }
  })

app.listen(3000, function(){
  console.log("server started");
})
