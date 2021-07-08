const express= require("express");
const bodyparser= require("body-parser");
const mongoose= require("mongoose");
const app= express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
mongoose.connect("mongodb://localhost:27017/todoDB",{useNewUrlParser:true,useUnifiedTopology:true})
const todoSchema= new mongoose.Schema({
  item:{
    type:String,
    required: true
  }
});
const listSchema= new mongoose.Schema({
  name: String,
  content:[todoSchema]
})
const List= mongoose.model("Data",listSchema);
//let work=[];
//let tday;
let items=[];
const Todo= mongoose.model("List",todoSchema);
 const first = new Todo({
  item:"Brush my Teeth"
})
const second= new Todo({
  item:"Have a coffee"
})
const third = new Todo({
  item:"start your coding"
})
items=[first, second, third];
/* Todo.deleteMany({item:["Brush my Teeth","start your coding"]}, function(err, result){
  (err)?console.log(err):console.log(result);
}) */

let button= "";
//get req for root route
app.get("/", function(req,res){
  /* Todo.find({},function(err,result){
    if (result.length===0) {
      Todo.insertMany([first, second, third], function(err){
      (err)? console.log(err):console.log("insertion successful");
      res.redirect("/");
    })
  }else {
    res.render("list",{title: "Main", items: result })
  }
})*/
Todo.find({},function(err,result){
  res.render("list",{title: "Main", items: result })
})


})
app.get("/:routeName",function(req,res){
  let route= req.params.routeName;

  List.findOne({name:route},function(err,root){
    if(!err){
    if(!root){
    let list1= new List({
        name: route,
        content:items
      })
      list1.save()
      res.redirect("/"+route);

    }else{
    res.render("list",{title: root.name, items: root.content })
  }
}
  })
})
//get req for work route
/* app.get("/work", function(req,res){
  res.render("list",{title: "Work",  item:work});
}) */
//this one for root items
app.post("/",function(req,res){
  let newitem= req.body.newItem;
  button=req.body.btn;
  let itm= new Todo({
    item: newitem
  })
  if(button==="Main"){
  itm.save();
  res.redirect("/");
}else {
  List.findOne({name:button},function(err,foundList){
    if(!err){
    foundList.content.push(itm);
    foundList.save();
    res.redirect("/"+button);
  }
  })
}
   })
    app.post("/delete",function(req,res){
      console.log(req.body);
     const checkedItem=req.body.button;
     Todo.findByIdAndRemove(checkedItem,function(err){
       (err)?console.log(err):res.redirect("/");
     })
   })
   /* if(button==="work"){
     work.push(newitem);
     res.redirect("/work");

   }
   else {
     items.push(newitem);
     res.redirect("/");
   } */

//this one for work items


app.listen(3000,function(){
  console.log("server is running");
})
