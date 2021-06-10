const express= require("express");
const bodyparser= require("body-parser");
const app= express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
let items =[];
let work=[];
let tday;
let button= "";
//get req for root route
app.get("/", function(req,res){
  let day= new Date();
  let options={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
   tday= day.toLocaleDateString("en-US",options);
     res.render("list",{title: "main", item: items })

})
//get req for work route
app.get("/work", function(req,res){
  res.render("list",{title: "work",  item:work});
})
//this one for root items
app.post("/",function(req,res){
  let newitem= req.body.newItem;
   button=req.body.btn;
   if(button==="work"){
     work.push(newitem);
     res.redirect("/work");

   }
   else {
     items.push(newitem);
     res.redirect("/");
   }
})
//this one for work items


app.listen(3000,function(){
  console.log("server is running");
})
