const student = {
  name: "Jan Ekdahl",
  email: "jan@bingo.com",
  city: "Malmö",
  major: "Frontend Developer",
  answers: [
    1,
    2,
    1,
    2,
    2,
    1,
    1,
    1,
    1,

  ]
};


const corporation = {
  name: "Färetag1",
  email: "företag@bango.com",
  city: "Malmö",
  requirements: "Frontend Developer",
  answers: [
    1,
    2,
    1,
    1,
    2,
    1,
    1,
    2,
    1,
  ]
  
};

function compareFunction(){
  let compatability = 0;
  for(let i = 0; i < corporation.answers.length; i++){
    if(corporation.answers[i] == student.answers[i]){
      console.log("yess")
      compatability++
      console.log(compatability)
    }
  }
  if(compatability >= 7){
    console.log('its a match')
  }else{
    console.log('no match')
  }
}
compareFunction()