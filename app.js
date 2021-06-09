const express= require("express");
const bodyparser= require("body-parser");
const app= express();
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
let items =[];
app.get("/", function(req,res){
  let day= new Date();
  let options={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
  let tday= day.toLocaleDateString("en-US",options);
  res.render("list",{day: tday, item: items })
})
app.post("/",function(req,res){
  let newitem= req.body.newItem;
  items.push(newitem);
  res.redirect("/");

})

app.listen(3000,function(){
  console.log("server is running");
})
