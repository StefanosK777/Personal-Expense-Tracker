let total = 0;

function addExpense() {
    const name = document.getElementById("name").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const category = document.getElementById("category").value;

    if (!name || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }

    // Get the table body
    const table = document.getElementById("expenseTable");

    // Create a new row at the bottom
    const row = table.insertRow(-1); // -1 ensures it goes to the bottom

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);//Date/time
    const cell5 = row.insertCell(4); // Delete button

    //Current date and time
    const now = new Date();
    const dateTimeStr = now.toLocaleString('en-GB'); //For ex. "3/12/2026, 10:23:45 AM"


    //Expense data
    cell1.innerText = name;
    cell2.innerText = category;
    cell3.innerText = "$" + amount;
    cell4.innerText = dateTimeStr;

    //Create Delete Button
    const delBtn = document.createElement("button");
    delBtn.innerText = "Delete";
    delBtn.style.background = "#e53935";
    delBtn.style.color = "white";
    delBtn.style.border = "none";
    delBtn.style.padding = "5px 10px";
    delBtn.style.borderRadius = "5px";
    delBtn.style.cursor = "pointer";

    //Delete row & update total
    delBtn.onclick = function () {
        // Get amount from the cell (remove $ sign)
        const rowAmount = Number(cell3.innerText.replace("$", ""));
        total -= rowAmount;
        document.getElementById("total").innerText = total;
        table.deleteRow(row.rowIndex - 1);
    }
    cell5.appendChild(delBtn);


    // Update total
    total += amount;
    document.getElementById("total").innerText = total;

    // Clear input fields
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
}


//Login / Signup
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

function showSignup() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}

function signup() {
    const user = document.getElementById("signupUser").value;
    const pass = document.getElementById("signupPass").value;


    if (user === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }
    //save account
    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Acount created! Please log in.");
}
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");


    if (user === savedUser && pass === savedPass) {
        alert("Login succesful!");
    }
    else {
        alert("Invalid username or password");
    }
}

//Login
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    if (user === savedUser && pass === savedPass) {
        localStorage.setItem("loggedIn", "true"); // lowercase
        alert("Login successful!");
    } else {
        alert("Invalid username or password");
    }
}

// Logout
function logout() {
    localStorage.removeItem("loggedIn"); // match the key exactly
    alert("Logged out successfully.");
    location.reload(); // reload page
}

window.onload = function () {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn !== "true") {
        //User is not logged in, redirect to login page
        window.location.href = "login.html";
    }
}

function logout() {
    localStorage.removeItem("loggedIn"); //remove session
    
    window.location.href = "login.html"; //Go to login page.
}
