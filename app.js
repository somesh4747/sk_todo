let container = document.getElementsByClassName("container")[0];
const text_box = document.getElementById("input-field");
const btn = document.getElementById("btn");

function addToDo() {
  const label = document.createElement("label"); //
  const input = document.createElement("input"); //
  const to_do_delete = document.createElement("input"); //

  to_do_delete.setAttribute('type','button') //setting type attribute
  to_do_delete.setAttribute('value','x')

  to_do_delete.addEventListener("click", del); // event for deleting to do s

  input.setAttribute("type", "checkbox");

  input.classList.add("input-box"); //adding class to input 
  input.addEventListener("click", checked);

  label.innerHTML = text_box.value; //todo name will be textbox name
  label.classList.add("to-do-label");
  label.appendChild(input); // inserting the input into label
  label.appendChild(to_do_delete);

//   label.style.display = "block"; // adding css using javascript

  container.appendChild(label);

  text_box.value = "";
  
}

btn.addEventListener("click", addToDo);

// document.getElementsByClassName('to-do-label')[0].lastChild.checked

let input_class = document.getElementsByClassName("to-do-label");  // getting the to do html collection

// -----------------another method---------------------------------
// function checked(e) {
//     console.log(e.target.parentNode)
   
//     if(e.target.parentNode.style.backgroundColor != 'red'){
//         e.target.parentNode.style.backgroundColor = 'red'
//     }
//     else{
//         e.target.parentNode.style.backgroundColor = 'white'
//     }
// }


//----------------------------------------------------------------


function checked() {

  for (let i of input_class) {
    if (i.children[0].checked == true) {
      i.style.textDecoration = "line-through";
      i.style.backgroundColor = "gray";
      i.lastChild.style.backgroundColor = "grey";

    } else {
      i.style.textDecoration = "none";
      i.style.backgroundColor = "";
      i.lastChild.style.backgroundColor = "";

    }
  }
}


function del(e){
    e.target.parentNode.remove()
    

}