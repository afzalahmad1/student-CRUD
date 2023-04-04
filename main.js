let form = document.getElementById("form")
let StudentName = document.getElementById("name")
let StudentEmail = document.getElementById("email")
let StudentGrade = document.getElementById("grade")
let StudentAge = document.getElementById("age")
let StudentDegree = document.getElementById("degree")
let errorMsg = document.getElementById("msg")
let tableBody = document.getElementById("table-body");
/*
form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (StudentName.value === "") {
        console.log("failure");
        // show error msg below
        errorMsg.innerText = "Task cannot be blank."
    } else {
        console.log("success");
        console.log(StudentName.value)
        errorMsg.innerText = "";
        // save the data in localstorage
      //  saveData()

    }
}*/

let students = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
})

function saveData(){
    if(StudentName.value == '' || StudentEmail.value=='' || StudentAge.value=='' || StudentGrade.value=='' || StudentDegree.value==''){
        alert("Please fill All field");
        return;
    }

    let student = {
        ID:0,
        Name: StudentName.value,
        Email: StudentEmail.value,
        Grade: StudentGrade.value,
        Age: StudentAge.value,
        Degree: StudentDegree.value
    };
    students.push(student);
    localStorage.setItem('students',JSON.stringify(students));
    showStudents();
    console.log(students);
}
function showStudents() {
    tableBody.innerHTML = '';
    students.map((student,idx) => {
      //let row = document.createElement('tr');
      /*row.innerHTML = `
        <td>${student.ID}</td>
        <td>${student.Name}</td>
        <td>${student.Email}</td>
        <td>${student.Age}</td>
        <td>${student.Grade}</td>
        <td>${student.Degree}</td>
        <td>
        <i onclick="editTask(this)" class="bi bi-pencil-square"></i>
        <i onclick="deleteTask(${student.ID},this)" class="bi bi-trash"></i>
      </td>
      `;
      tableBody.appendChild(row);
      return tableBody;*/
      return(tableBody.innerHTML += `<tr>
        <td id=${idx}>${student.ID=idx}</td>
        <td>${student.Name}</td>
        <td>${student.Email}</td>
        <td>${student.Age}</td>
        <td>${student.Grade}</td>
        <td>${student.Degree}</td>
        <td>
        <i onclick="editTask(${student.ID},this)" class="bi bi-pencil-square"></i>
        <i onclick="deleteTask(this)" class="bi bi-trash"></i>
      </td>
      </tr>`)
    });
    resetForm();
  }

  function resetForm(){
    StudentName.value = "";
    StudentAge.value = "";
    StudentGrade.value = "";
    StudentDegree.value = "";
    StudentEmail.value = "";
  }

  let deleteTask = (e) => { 
    // removes the element from the UI
    e.parentElement.parentElement.remove()
    // remove it from the student array
    students.splice(e.parentElement.parentElement.id, 1)
    // update localstorage
    localStorage.setItem("students", JSON.stringify(students))
    console.log(students);
}


function editTask(studentId,e) {
    let selectedTask = e.parentElement.parentElement;
    var button;
    console.log(e.parentElement.parentElement);
    students.forEach((student)=>{
        if(student.ID == studentId){

            document.getElementById('name').value = student.Name;
            document.getElementById('email').value = student.Email;
            document.getElementById('age').value = student.Age;
            document.getElementById('grade').value = student.Grade;
            document.getElementById('degree').value = student.Degree;

            StudentName.value =selectedTask.children[1].innerHTML;
            StudentEmail.value =selectedTask.children[2].innerHTML;
            StudentAge.value =selectedTask.children[3].innerHTML;
            StudentGrade.value =selectedTask.children[4].innerHTML;
            StudentDegree.value =selectedTask.children[5].innerHTML;
        }
        
    })

    // setting the value
    //delete old student and update new student
    deleteTask(e);
}


/*
function search(){
    var input = document.getElementById('search');
    //let searchStudent = [];
    students.forEach((student)=>{
        if(student.Name==input.value || student.Email==input.value || student.Degree==input.value){
            searchedStudent(student);
        }
    })

}
function searchedStudent(student){
    console.log(student);
}*/

function search() {
    var input, filter, table, tr, td, i, txtValue, txtValue1, txtValue2;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("table-body");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        td1 = tr[i].getElementsByTagName("td")[2];
        td2 = tr[i].getElementsByTagName("td")[5];

        if (td || td1 || td2) {
            txtValue = td.textContent || td.innerText;
            txtValue1 = td1.textContent || td1.innerText;
            txtValue2 = td2.textContent || td2.innerText;

            if (txtValue.toUpperCase().indexOf(filter) > -1 || txtValue1.toUpperCase().indexOf(filter) > -1 || txtValue2.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            }

            else {
                tr[i].style.display = "none";
            }

        }
    }
}

(() => {
    // whenever page loads this function is called
    // fetching the data from localstorage
    students = JSON.parse(localStorage.getItem("students")) || [];
    console.log(students);

    // show the tasks
    showStudents()
})();