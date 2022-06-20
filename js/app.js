// CODE EXPLAINED channel

//Select the elements - constants
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//variables
let LIST, id;

// get item from local storagwe
let data = localStorage.getItem("TODO");

// check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length; //set the id to the last one in the List
  loadList(LIST); // load the ist to the user interface (computer)
}else{
  // if data is not empty
  LIST = [];
  id = 0;
}

//load items to the users interface (comp)
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

//clear the local storagwe
clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

//show todays date
const options = {weekday : "long", month:"short", day:"numeric"};
const today = new Date();

dateElement.innerHTML = today.toLocaleDateString("en-US",  options);

//add to do function
function addToDo(toDo, id, done, trash){
  if(trash){ return; }
//. checks if osmething is done or not
  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class="item">
                  <i class="fa ${DONE} co" job="complete" id=${id}> </i>
                  <p class="text ${LINE}"> ${toDo} </p>
                  <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                </li>
                `;
  const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}

//add an item to the list user the enter key
document.addEventListener("keyup",function(even){
  if(event.keyCode == 13){
    const toDo = input.value;

    //if the input is not empty
    if(toDo){
      addToDo(toDo, id, false, false);

      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false
      });

      //add item to local storage (this code must be added where the LIST array is updated)
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value= "";
  }
});

//complete to do (complete button)
function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do (trash button)
function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

//target items created dynamically
list.addEventListener("click", function(event){
  const element = event.target; //return the clikced element inside List
  const elementJob = element.attributes.job.value;
  // complete or delete to do list item

  if(elementJob == "complete"){
    completeToDo(element);
  }else if(elementJob == "delete"){
    removeToDo(element);
  }

  //add item to local storage (this code must be added where the LIST array is updated)
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
