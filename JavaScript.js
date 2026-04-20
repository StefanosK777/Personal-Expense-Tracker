let total = 0;

function addExpense() {
    const nameInput = document.getElementById("name");
    const amountInput = document.getElementById("amount");
    const category = document.getElementById("category");// Get the table body
    const table = document.getElementById("expenseTable");

    //Read input values
    const name = nameInput.value.trim();
    const amount = Number(amountInput.value);
    const selectedCategory = category.value;

    if (!name || amount <= 0) {
        alert("Please enter a valid expense name and amount.");
        return;
    }


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
    cell2.innerText = selectedCategory;
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
        row.remove();
    }
    cell5.appendChild(delBtn);


    // Update total
    total += amount;
    document.getElementById("total").innerText = total;


    // Clear input fields
    nameInput.value = "";
    amountInput.value = "";
}


//Login / Signup
// Show login form
function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("signupForm").style.display = "none";
}

// Show signup form
function showSignup() {
    document.getElementById("signupForm").style.display = "block";
    document.getElementById("loginForm").style.display = "none";
}

// Signup
function signup() {
    const user = document.getElementById("signupUser").value.trim();
    const pass = document.getElementById("signupPass").value.trim();

    if (user === "" || pass === "") {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("username", user);
    localStorage.setItem("password", pass);

    alert("Account created! Please log in.");
}

// Login
function login() {
    const user = document.getElementById("loginUser").value;
    const pass = document.getElementById("loginPass").value;

    const savedUser = localStorage.getItem("username");
    const savedPass = localStorage.getItem("password");

    // Default admin account
    const defaultUser = "admin";
    const defaultPass = "1234";

    if (
        (user === savedUser && pass === savedPass) ||
        (user === defaultUser && pass === defaultPass)
    ) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful!");
        window.location.href = "index.html";
    } else {
        alert("Invalid username or password");
    }
}

// Check login on page load
window.onload = function () {
    const loggedIn = localStorage.getItem("loggedIn");
    const currentPage = window.location.pathname.split("/").pop();

    if (currentPage != "login.html" && loggedIn !== "true") {
        window.location.href = "login.html";
    }
};

// Logout
function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}
