// Validation Form Inputs before submitting data

function validateForm() {
  var name = document.getElementById("name").value;
  var age = document.getElementById("age").value;
  var adress = document.getElementById("adress").value;
  var email = document.getElementById("email").value;

  if (name == "") {
    alert("Name is required");
    return false;
  }

  if (age == "") {
    alert("Age is required");
  } else if (age < 1) {
    alert("Age must not be zero or less than zero ");
    return false;
  }

  if (adress == "") {
    alert("Adress is required");
    return false;
  }

  if (email == "") {
    alert("Email is required");
    return false;
  } else if (!email.includes("@")) {
    alert("Invalid email adress");
    return false;
  }

  return true;
}

// function to show data

function showData() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  var data = "";

  peopleList.forEach((element, index) => {
    data += "<tr>";
    data += "<td>" + element.name + "</td>";
    data += "<td>" + element.age + "</td>";
    data += "<td>" + element.adress + "</td>";
    data += "<td>" + element.email + "</td>";
    data +=
      '<td class="text-center"> <button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Delete</button> <button onclick="updateData(' +
      index +
      ')" class="btn btn-warning m-2">Edit</button></td>';
    data += "</tr>";
  });

  document.querySelector("tbody").innerHTML = data;
}

// Loads all data from local storage when document or page loaded
document.onload = showData();

// function to add data to local storage

function AddData() {
  // if form is validate
  if (validateForm() == true) {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var adress = document.getElementById("adress").value;
    var email = document.getElementById("email").value;

    var peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.push({
      name: name,
      age: age,
      adress: adress,
      email: email,
    });

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();

    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("adress").value = "";
    document.getElementById("email").value = "";
  }
}

// function to delete data from local storage

function deleteData(index) {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  peopleList.splice(index, 1);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

// function to update data in local storage

function updateData(item) {
  // submit button will hide and update button will show for updating of data in local storage
  document.getElementById("submit").style.display = "none";
  document.getElementById("update").style.display = "block";

  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }

  document.getElementById("name").value = peopleList[item].name;
  document.getElementById("age").value = peopleList[item].age;
  document.getElementById("adress").value = peopleList[item].adress;
  document.getElementById("email").value = peopleList[item].email;

  document.querySelector("#update").onclick = function () {
    if (validateForm() == true) {
      peopleList[item].name = document.getElementById("name").value;
      peopleList[item].age = document.getElementById("age").value;
      peopleList[item].adress = document.getElementById("adress").value;
      peopleList[item].email = document.getElementById("email").value;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));

      showData();

      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("adress").value = "";
      document.getElementById("email").value = "";

      // update button will hide and submit button will show after updating of data in local storage
      document.getElementById("submit").style.display = "block";
      document.getElementById("update").style.display = "none";
    }
  };
}
