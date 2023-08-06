var nameInput = document.getElementById("nameInput")
var welcomeSpace = document.getElementById("welcomeSpace")
var emailInput = document.getElementById("emailInput")
var passInput = document.getElementById("passInput")
var signUp = document.getElementById("signupBtn")
var signin = document.getElementById("signinBtn")
var valid = document.getElementById("valid")
var invalid = document.getElementById("invalid")
var inemailInput = document.getElementById("inemailInput")
var inpassInput = document.getElementById("inpassInput")



var accountList = []
accountList = localStorage.getItem("account")

function addAccount(event) {
    event.preventDefault()

    // console.log(accountList)
    // console.log(emailInput.value)
    // console.log("Before")

    if (validName() && validUrl()) {

        if (!accountList.includes(emailInput.value)) {

            accountList.push(emailInput.value);

            // console.log(accountList)
            // console.log(emailInput.value)

            var account = {
                name: nameInput.value,
                mail: emailInput.value,
                pass: passInput.value
            }

            valid.innerHTML = "Success"
            valid.classList.add("text-success")
            valid.classList.remove("d-none")
            invalid.classList.add("d-none")

            accountList.push(account)
            localStorage.setItem("account", JSON.stringify(accountList))

            accountClear()
            window.location.href = "signin.html";

        } else {
            invalid.innerHTML = "This Account already Exists"
            wrongINputs()
        }
    } else {
        invalid.innerHTML = "Invalid Name or email"
        wrongINputs()
    }
}

function validUrl() {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailInput.value);
}


function validName() {
    var regex_name = /.{3}/;
    return regex_name.test(nameInput.value);
}


function accountClear() {
    nameInput.value = ""
    emailInput.value = ""
    passInput.value = ""
}



if (localStorage.getItem("account")) {
    accountList = JSON.parse(localStorage.getItem("account"));

} else {
    accountList = [];
}



signin?.addEventListener("click", function login() {


    var account = {
        mail: inemailInput.value.trim(),
        pass: inpassInput.value
    };

    if (account.mail == "" || account.pass == "") {
        invalid.innerHTML = "All Inputs are required to login"
        wrongINputs()
    }


    var existingAccount = accountList.find(function (item) {
        return item.pass === account.pass && item.mail === account.mail;

    });


    if (existingAccount) {

        invalid.innerHTML = "Success"
        invalid.classList.add("text-success")
        invalid.classList.remove("d-none")
        window.location.href = "index.html";
        localStorage.setItem("existingAccount", existingAccount.name)
    } else if (existingAccount == undefined) {
        invalid.innerHTML = "Incorrect email or password"
        wrongINputs()

    }

});



function wrongINputs() {
    invalid.classList.add("text-danger")
    invalid.classList.remove("d-none")
    valid.classList.add("d-none")
}

