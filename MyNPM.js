function getDate(){
  let day= new Date();
  let options={
    weekday: "long",
    day: "numeric",
    month: "long"
  };
   tday= day.toLocaleDateString("en-US",options);
   return tday;
}
