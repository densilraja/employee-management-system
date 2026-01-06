const apiUrl = "http://localhost:8080/api/employees";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const roleInput = document.getElementById("role");
const salaryInput = document.getElementById("salary");

let selectedEmployeeId = null;

/* ADD or UPDATE */
function addEmployee() {

    if (!nameInput.value || !emailInput.value || !roleInput.value || !salaryInput.value) {
        alert("All fields are mandatory");
        return;
    }

    const employee = {
        name: nameInput.value,
        email: emailInput.value,
        role: roleInput.value,
        salary: salaryInput.value
    };

    // UPDATE
    if (selectedEmployeeId !== null) {
        fetch(`${apiUrl}/${selectedEmployeeId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        .then(() => {
            selectedEmployeeId = null;
            clearForm();
            loadEmployees();
        });

    // ADD
    } else {
        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employee)
        })
        .then(() => {
            clearForm();
            loadEmployees();
        });
    }
}

/* LOAD */
function loadEmployees() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const table = document.getElementById("employeeTable");
            table.innerHTML = "";

            data.forEach(emp => {
                table.innerHTML += `
                    <tr>
                        <td>${emp.id}</td>
                        <td>${emp.name}</td>
                        <td>${emp.email}</td>
                        <td>${emp.role}</td>
                        <td>${emp.salary}</td>
						<td>
						    <button class="btn btn-warning btn-sm me-1"
						        onclick="editEmployee(${emp.id}, '${emp.name}', '${emp.email}', '${emp.role}', ${emp.salary})">
						        Edit
						    </button>
						    <button class="btn btn-danger btn-sm"
						        onclick="deleteEmployee(${emp.id})">
						        Delete
						    </button>
						</td>

                    </tr>
                `;
            });
        });
}

/* EDIT (LOAD DATA INTO FORM) */
function editEmployee(id, name, email, role, salary) {
    selectedEmployeeId = id;
    nameInput.value = name;
    emailInput.value = email;
    roleInput.value = role;
    salaryInput.value = salary;
}

/* DELETE */
function deleteEmployee(id) {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    fetch(`${apiUrl}/${id}`, {
        method: "DELETE"
    }).then(() => loadEmployees());
}

/* CLEAR FORM */
function clearForm() {
    nameInput.value = "";
    emailInput.value = "";
    roleInput.value = "";
    salaryInput.value = "";
}

window.onload = loadEmployees;
