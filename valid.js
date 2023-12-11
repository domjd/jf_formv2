// Function to check if an email is valid using a regular expression
function isValidEmail(email) {
    // Regular expression for a simple email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function resizeIframe() {
    var bodyHeight = document.body.scrollHeight;
    window.parent.postMessage({ height: bodyHeight }, '*');
  }
// Initialize the error object
const errors = {
    title: false,
    firstname: false,
    lastname: false,
    email: false,
    mobilenumber: false,
    relationshiptocompany: false,
    companytype: false,
    amountrequired: false,
    loanterm: false,
    purposeofloan: false,
    describeloanpurpose: false,
    typeofproperty: false,
    propertyvalue: false,
    firstmortgage: false,
    secondmortgage: false,
    othercharges: false,
    cname: false,
    bankaccount: false,
    property: false,
};

// Real-time validation function for individual fields
function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}error`);
    const errorHeader = document.getElementById('error-header');
    console.log(errorElement);


    // Example validation for the "title" field (you can adapt it for other fields)
    if (fieldId === 'title') {
        if (field.value.length > 4 || !/^[a-zA-Z]+$/.test(field.value)) {
            errors.title = true;
            errorElement.textContent = 'Invalid Title.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.title = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }


    if (fieldId === 'firstname') {
        if (field.value.length < 2 || !/^[a-zA-Z]+$/.test(field.value)) {
            errors.firstname = true;
            errorElement.textContent = 'Invalid first name.';
            errorElement.style.display="inline-block";

            field.classList.add("input-error");
        } else {
            errors.firstname = false;
            errorElement.textContent = '';
            errorElement.style.display="none";

            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'lastname') {
        if (field.value.length < 2 || !/^[a-zA-Z]+$/.test(field.value)) {
            errors.lastname = true;
            errorElement.textContent = 'Invalid Last name.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.lastname = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

        // Example validation for the "fname" field (you can adapt it for other fields)
        if (fieldId === 'email') {
            if (!isValidEmail(field.value)) {
                errors.email = true;
                errorElement.textContent = 'Invalid Email.';
                errorElement.style.display="inline-block";
                field.classList.add("input-error");
            } else {
                errors.email = false;
                errorElement.textContent = '';
                errorElement.style.display="none";
                field.classList.remove("input-error");
            }
        }

        if (fieldId === 'mobilenumber') {
            if (field.value.length < 11 || !/^\d{11}$/.test(field.value)) {
                errors.mobilenumber = true;
                errorElement.textContent = 'Invalid Mobile Number.';
                errorElement.style.display="inline-block";
                field.classList.add("input-error");
            } else {
                errors.mobilenumber = false;
                errorElement.textContent = '';
                errorElement.style.display="none";
                field.classList.remove("input-error");
            }
        }

        
    if (fieldId === 'propertyvalue') {
        let propertyValue = document.getElementsByName("propertyvalue")[0].value;
        // Call the validateEmail function and store the result
        propertyValue= propertyValue.replace(/\,/g,'')
        propertyValue=Number(propertyValue);

        if (propertyValue < 100000 || /^[a-zA-Z]+$/.test(field.value)) {
            errors.propertyvalue = true;
            errorElement.textContent = 'Property Value Must Be Over £100,000.';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.propertyvalue = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'firstmortgage') {
        if (field.value ==="" || /^[a-zA-Z]+$/.test(field.value)) {
            errors.firstmortgage = true;
            errorElement.textContent = 'Invalid Mortgage';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.firstmortgage = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'secondmortgage') {
        if (field.value ==="" || /^[a-zA-Z]+$/.test(field.value)) {
            errors.secondmortgage = true;
            errorElement.textContent = 'Invalid Mortgage';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.secondmortgage = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }


    if (fieldId === 'othercharges') {
        if (field.value ==="" || /^[a-zA-Z]+$/.test(field.value)) {
            errors.othercharges = true;
            errorElement.textContent = 'Invalid Charge';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.othercharges = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'cname') {
        if (field.value ==="") {
            errors.cname = true;
            errorElement.textContent = 'Invalid Charge';
            errorElement.style.display="inline-block";
            field.classList.add("input-error");
        } else {
            errors.cname = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
            field.classList.remove("input-error");
        }
    }

    if (fieldId === 'bankaccount') {
        if (field.checked === false) {
            errors.bankaccount = true;
            errorElement.textContent = 'Bank Account Confirmation is required Charge';
            errorElement.style.display="inline-block";
        } else {
            errors.backaccount = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
        }
    }
    
    if (fieldId === 'property') {
        if (field.checked === false) {
            errors.property = true;
            errorElement.textContent = 'Property Confirmation is required';
            errorElement.style.display="inline-block";
        } else {
            errors.property = false;
            errorElement.textContent = '';
            errorElement.style.display="none";
        }
    }


    resizeIframe();    


    // Enable/disable submit button based on errors
    const submitButton = document.querySelector('button[type="submit"]');
    let hasErrors = Object.values(errors).some(error => error);
    submitButton.disabled = hasErrors;
    if(hasErrors){
        submitButton.textContent = "Please Fix Your Errors";
        errorHeader.style.display = "inline-block";
        
    } else {
        submitButton.textContent = "Submit";
        errorHeader.style.display = "none";
    }
}

// Attach real-time validation to each input's "input" event
document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('input', function () {
        validateField(this.id);
    });
});

// Additional event listeners or functions as needed...


