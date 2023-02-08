let container = document.getElementsByClassName("container")[0];
let to = document.getElementsByClassName("to-do")[0];

const text_box = document.getElementById("input-field");
const btn = document.getElementById("btn");

function addToDo(text) {
  container = document.getElementsByClassName("container")[0];
  const label = document.createElement("label"); //
  const input = document.createElement("input"); //
  const to_do_delete = document.createElement("input"); //

  to_do_delete.setAttribute("type", "button"); //setting type attribute
  to_do_delete.setAttribute("value", "x");

  to_do_delete.addEventListener("click", delete_to_do); // event for deleting to do s

  input.setAttribute("type", "checkbox");

  input.classList.add("input-box"); //adding class to input
  input.addEventListener("click", checked);

  label.innerHTML = text; //todo name will be textbox name
  label.classList.add("to-do-label");
  label.appendChild(input); // inserting the input into label
  label.appendChild(to_do_delete);

  //   label.style.display = "block"; // adding css using javascript

  container.appendChild(label);

  text_box.value = "";
}

// document.getElementsByClassName('to-do-label')[0].lastChild.checked

let main_label_to_do = document.getElementsByClassName("to-do-label"); // getting the to do html collection

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

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC6rkD6OTcj2fjBC_Mj1_8HY7sCf-I7k4",
  authDomain: "sk-testing-firebase.firebaseapp.com",
  databaseURL: "https://sk-testing-firebase-default-rtdb.firebaseio.com",
  projectId: "sk-testing-firebase",
  storageBucket: "sk-testing-firebase.appspot.com",
  messagingSenderId: "808376070055",
  appId: "1:808376070055:web:5c7e1440a50c50efa39082",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  get,
  child,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-database.js";

const database = getDatabase(app);

function checked(e) {
  const container = e.target.parentNode.parentElement; //  it selects the container
  let number = null;
  // console.log(container.children[0].firstChild);
  for (let i in container.children) {
    if (container.children[i].firstChild == e.target.parentNode.firstChild) {
      number = i;
      break;
    }
  }
  // console.log(number);

  let isChecked = false;
  // console.log(e.target.parentElement.children[0].checked)
  if (e.target.parentElement.children[0].checked == true) {
    isChecked = true;
    cc();
    // console.log('tooooooooooooooo');
  } else {
    isChecked = false;
    cc();
  }


  function cc() {
    get(child(ref(database), "toDo/")).then((snapshot) => {
      // console.log(snapshot.val())
      let data = snapshot.val();

      let item = Object.keys(data)[number];

      let dd = {};
      dd["/toDo/" + item + "/" + "checked"] = isChecked;

      return update(ref(database), dd);
    });
  }

  // }
}



// to delete from database

function delete_to_do(e) {
  const container = e.target.parentNode.parentElement; //  it selects the container
  let number = null;
  // console.log(container.children[0].firstChild);
  for (let i in container.children) {
    if (container.children[i].firstChild == e.target.parentNode.firstChild) {
      number = i;
      break;
    }
  }
  // console.log(number);

  get(child(ref(database), "toDo/")).then((snapshot) => {
    // console.log(snapshot.val())
    let data = snapshot.val();

    let item = Object.keys(data)[number];

    remove(ref(database, "toDo/" + item));
  });
}

// sending data to database
function send_data() {

  if(text_box.value == ""){
    alert("Enter to do")
  } else{
    const postListRef = ref(database, "toDo/");
    const newPostRef = push(postListRef);
    set(newPostRef, {
      todo: text_box.value,
      checked: false,
    });

    text_box.value = "";

    // remove_container()
    refresh();
  }
}
window.setTimeout(refresh,100)
// window.setInterval(refresh,3000)
refresh(); // it will run on refresh

function refresh() {
  const todos = ref(database, "toDo/");
  onValue(todos, (snapshot) => {
    remove_container(); //removing the container

    const data = snapshot.val();
    // console.log(data);
    if (snapshot.exists()) {
      for (let i in Object.keys(data)) {
        addToDo(data[Object.keys(data)[i]].todo); //then adding the to do items
        // console.log(data[Object.keys(data)[i]].checked);
        document.getElementsByClassName("input-box")[i].checked =
          data[Object.keys(data)[i]].checked;
      }
      for (let i of main_label_to_do) {
        if (i.children[0].checked == true) {
          i.style.textDecoration = "line-through";
          i.style.backgroundColor = "gray";
          i.style.color = "white";
          i.lastChild.style.backgroundColor = "grey";
        } else {
          i.style.textDecoration = "none";
          i.style.backgroundColor = "";
          i.lastChild.style.backgroundColor = "";
        }
      }
      document.getElementsByClassName('no-data')[0].innerHTML = ""

      // console.log("refresh");
    }else{
      document.getElementsByClassName('no-data')[0].innerHTML = "No to do available"
      console.log(snapshot.exists());

    }
  });
 
}

function remove_container() {
  let conn = document.getElementsByClassName("container")[0];
  //  console.log(conn)
  conn.remove();
  let con = document.createElement("div");
  con.classList.add("container");
  to.appendChild(con);
}

btn.addEventListener("click", send_data);
