function requiredInsProf() {
    var empt = document.forms["formInsProf"]["ra"].value;
    var empt2 = document.forms["formInsProf"]["nome"].value;

    if (empt == "" || empt2 == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        alert('Code has accepted : you can try another');
        return true;
    }
}
function requiredInsAlu() {
    var empt = document.forms["formInsAlu"]["ra"].value;
    var empt2 = document.forms["formInsAlu"]["nome"].value;

    if (empt == "" || empt2 == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        alert('Code has accepted : you can try another');
        return true;
    }
}

function requiredEditProf() {
    var empt = document.forms["formEditProf"]["ra"].value;
    var empt2 = document.forms["formEditProf"]["nome"].value;
    var empt3 = document.forms["formEditProf"]["old"].value;

    if (empt == "" || empt2 == "" || empt3 == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        alert('Code has accepted : you can try another');
        return true;
    }
}
function requiredEditAlu() {
    var empt = document.forms["formEditAlu"]["ra"].value;
    var empt2 = document.forms["formEditAlu"]["nome"].value;
    var empt3 = document.forms["formEditAlu"]["old"].value;

    if (empt == "" || empt2 == "" || empt3 == "") {
        alert("Please input a Value");
        return false;
    }
    else {
        alert('Code has accepted : you can try another');
        return true;
    }
}