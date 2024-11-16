function showSignup() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('signupForm').style.display = 'block';
}

function showLogin() {
    document.getElementById('signupForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

function login() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

function signup() {
    document.getElementById('authPage').style.display = 'none';
    document.getElementById('mainApp').style.display = 'block';
}

function logout() {
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('authPage').style.display = 'block';
}

function switchTab(tab) {
    document.querySelectorAll('.tab').forEach(button => {
        button.classList.remove('active');
    });
    document.querySelectorAll('.tab-content').forEach(tabContent => {
        tabContent.style.display = 'none';
    });

    document.querySelector(`.tab[onclick="switchTab('${tab}')"]`).classList.add('active');
    document.getElementById(tab + 'Tab').style.display = 'block';
}

// Add more functions for the application flow
// Continue from previous JavaScript code...

// Loan Application
function reviewApplication() {
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        amount: document.getElementById('amount').value,
        purpose: document.getElementById('purpose').value,
        term: document.getElementById('term').value
    };

    if (!formData.fullName || !formData.email || !formData.amount || !formData.purpose || !formData.term) {
        alert('Please fill in all fields');
        return;
    }

    document.getElementById('applicationForm').style.display = 'none';
    document.getElementById('reviewPage').style.display = 'block';
    document.getElementById('step1').classList.remove('active');
    document.getElementById('step1').classList.add('completed');
    document.getElementById('step2').classList.add('active');

    document.getElementById('reviewDetails').innerHTML = `
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Loan Amount:</strong> $${formData.amount}</p>
        <p><strong>Loan Purpose:</strong> ${formData.purpose}</p>
        <p><strong>Loan Term:</strong> ${formData.term} months</p>
    `;
}

function backToApplication() {
    document.getElementById('reviewPage').style.display = 'none';
    document.getElementById('applicationForm').style.display = 'block';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step1').classList.add('active');
    document.getElementById('step1').classList.remove('completed');
}

function submitLoan() {
    const loan = {
        id: Date.now(),
        userId: currentUser.id,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        amount: document.getElementById('amount').value,
        purpose: document.getElementById('purpose').value,
        term: document.getElementById('term').value,
        status: 'Pending'
    };

    loans.push(loan);
    localStorage.setItem('loans', JSON.stringify(loans));

    alert('Loan application submitted successfully!');
    resetApplicationForm();
    document.getElementById('reviewPage').style.display = 'none';
    document.getElementById('applicationForm').style.display = 'block';
    document.getElementById('step2').classList.remove('active');
    document.getElementById('step3').classList.add('active');
}

function resetApplicationForm() {
    document.getElementById('loanForm').reset();
    document.getElementById('step1').classList.add('active');
    document.getElementById('step1').classList.remove('completed');
    document.getElementById('step3').classList.remove('active');
}

// Display Loans
function displayLoans() {
    const loanTableBody = document.getElementById('loanTableBody');
    loanTableBody.innerHTML = '';

    const userLoans = loans.filter(loan => loan.userId === currentUser.id);
    userLoans.forEach(loan => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${loan.fullName}</td>
            <td>$${loan.amount}</td>
            <td>${loan.purpose}</td>
            <td>${loan.term} months</td>
            <td class="status-${loan.status.toLowerCase()}">${loan.status}</td>
            <td><button onclick="editLoan(${loan.id})">Edit</button> <button onclick="deleteLoan(${loan.id})">Delete</button></td>
        `;
        loanTableBody.appendChild(row);
    });
}

function editLoan(loanId) {
    // Implement loan editing functionality here
}

function deleteLoan(loanId) {
    loans = loans.filter(loan => loan.id !== loanId);
    localStorage.setItem('loans', JSON.stringify(loans));
    displayLoans();
}
