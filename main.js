let companyArray = [];
let selectedCompany = [];

function resizeIframe() {
  var bodyHeight = document.body.scrollHeight;
  window.parent.postMessage({ height: bodyHeight }, '*');
}

function showResults(val) {
    let res = document.getElementById("result");

    if(document.getElementById('companyname').value === ''){
     res.style.display = "none";
    }


    res.innerHTML = '';
    if (val == '') {
      return;
    }
    let list = '';
    fetch(`https://sea-lion-app-lccwh.ondigitalocean.app/companies/getCompaniesMain?companyname=${val}`, {method: 'GET', crossDomain: true}).then(
     function (response) {
       return response.json();
     }).then(function (data) {
        for (let i=0; i<data.items.length; i++) {
         list += `<li class="company" onclick=setCompany(${i})>` + 
         data.items[i].title + ' | ' + data.items[i].company_number + '<div class="companyAddress">' + data.items[i].address_snippet + "</div>" +
         '</li>'; 
       }
       res.style.border = '2px solid #ccc'
       res.innerHTML = '<ul>' + list + '</ul>';
       res.style.display = "block"
       companyArray = data.items;
       return true;
     }).catch(function (err) {
       console.warn('Something went wrong.', err);
       return false;
     });


  }

  function setCompany (index){
   
    selectedCompany = companyArray[index];
    console.log(selectedCompany)
    let companyNameField = document.getElementById("cname");
    //let companyAddressField = document.getElementById("caddress");
    let companyPostcode = document.getElementById("cpostcode");
    let companyAddressOne = document.getElementById("caddressOne");
    let companyAddressTwo = document.getElementById("caddressTwo");
    let companyAddressThree = document.getElementById("caddressThree");

    let companyDetails = document.getElementById("companyDetails");
    companyDetails.style.display = "block";

    if(companyNameField && companyAddressOne && companyAddressTwo && companyAddressThree && companyPostcode){
      companyNameField.value = formatTitle(selectedCompany.title);
      //companyAddressField.value = selectedCompany.address_snippet;
      companyAddressOne.value = selectedCompany.address.premises + " " + selectedCompany.address.address_line_1;
      companyAddressTwo.value = selectedCompany.address.address_line_2 == null ? selectedCompany.address.locality : selectedCompany.address.address_line_2;
      companyAddressThree.value = selectedCompany.address.region == null ? (selectedCompany.address.country == null ? "" : selectedCompany.address.country) 
        : selectedCompany.address.region; 
      companyPostcode.value = selectedCompany.address.postal_code;

    }


    document.getElementById("companyname").value = ""; 
    let res = document.getElementById("result");
    res.innerHTML = '';
    res.style.display = "none";
    validateField('cname');
    resizeIframe();
  }

  function formatTitle(sentence) {

    const words = sentence.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
    }
    return words.join(" ");
}

let calculateTotalDebt = () => {
  let firstMortgage = Number(document.getElementById("firstmortgage").value.replace(/\,/g,''));
  let secondMortgage = Number(document.getElementById("secondmortgage").value.replace(/\,/g,''));
  let otherCharges = Number(document.getElementById("othercharges").value.replace(/\,/g,''));

  const total = firstMortgage + secondMortgage + otherCharges;
  return total;
}

const capitalizeFirstLetter=  (input) =>{
  const textInput = document.getElementById(input);
  const inputValue = textInput.value.trim();

  // Check if the input value is not empty
  if (inputValue.length > 0) {
      // Capitalize the first letter and concatenate the rest of the string
      const capitalizedValue = inputValue.charAt(0).toUpperCase() + inputValue.slice(1);
      return capitalizedValue;
     
  }

  return inputValue;
}

// Error handling function
function handleValidationErrors(errors) {
  console.log(errors);
  const errorNames = Object.keys(errorsObject)
  errors.forEach((error, index) => {
    if(errorNames.includes(error.field)){
      errorsObject[error.field] = true;
    }
    const field = document.getElementById(`${error.field}`);
      const fieldError = document.getElementById(`${error.field}error`);
      console.log(fieldError);
      if (fieldError) {
          fieldError.style.display = "inline-block";
          field.classList.add("input-error");
          fieldError.textContent = error.message;
      }
  });
      const errorHeader = document.getElementById('error-header');
      const submitButton = document.querySelector('button[type="submit"]');
      console.log(errorsObject); 
      //errorHeader.style.display = "inline-block";
      submitButton.disabled = true;
      submitButton.textContent = "Please Fix Your Errors"
      resizeIframe();
      document.getElementById(errors[0].field).parentElement.parentElement.scrollIntoView({ behavior: "smooth", block: "start"});
    //updateSubmitButtonState();
}


window.onload = function() {
  let leadForm = document.getElementById("leadform");
  let loader = document.getElementById("loader");

  let descLoan = document.getElementById("describeLoan");

  descLoan.style.display = "none";
  resizeIframe();

  
/*     // Get the URL parameters
    const urlParams = new URLSearchParams(window.location.search);
  
    // Get the value of the 'firstname' parameter
    const firstname = urlParams.get('firstname');
  
    // Set the value of the form field
    if (firstname) {
      const firstnameField = document.getElementById('firstname');
      firstnameField.value = firstname;
    } */

  


  let loanPurpose = document.getElementsByName("purposeofloan")[0];

  loanPurpose.addEventListener("change",(e) => {
    console.log(loanPurpose.value);
    if(loanPurpose.value === "Other"){
      descLoan.style.display = "block";
      resizeIframe();
    } else{
      descLoan.style.display = "none";
      resizeIframe();
    }
  });

  easyNumberSeparator({
    selector: '.number-separator',
    separator: ','
})

const submitForm = async () => {

  const companyUrl = selectedCompany.links && selectedCompany.links.self
  ? "https://find-and-update.company-information.service.gov.uk" + selectedCompany.links.self
  : "";


  const formData = {
    "title": document.getElementById("title").value,
    "firstname": capitalizeFirstLetter("firstname"),
    "lastname": capitalizeFirstLetter("lastname"),
    "email": document.getElementById("email").value,
    "mobilenumber":document.getElementById("mobilenumber").value,
    "amountrequired": document.getElementById("amountrequired").value,
    "termrequired": document.getElementById("termrequired").value,
    "purposeofloan": document.getElementById("purposeofloan").value,
    "descloan": document.getElementById("descloan").value,
    "propertytype": document.getElementById("propertytype").value,
    "propertyvalue": Number(document.getElementById("propertyvalue").value.replace(/\,/g,'')),
    "firstmortgage": Number(document.getElementById("firstmortgage").value.replace(/\,/g,'')),
    "secondmortgage": Number(document.getElementById("secondmortgage").value.replace(/\,/g,'')),
    "othercharges": Number(document.getElementById("othercharges").value.replace(/\,/g,'')),
    "totaldebt": calculateTotalDebt(),
    "companyname": selectedCompany.title ?? "",
    "companyNumber": selectedCompany.company_number ?? "",
    "companyStatus": selectedCompany.company_status ?? "",
    "companytype": document.getElementById("companytype").value,
    "companyDescription": selectedCompany.description ?? "",
    "companyurl": companyUrl,
    "addressone": document.getElementById("caddressOne").value,
    "addresstwo": document.getElementById("caddressTwo").value,
    "addressthree": document.getElementById("caddressThree").value,
    "companypostcode": document.getElementById("cpostcode").value,
    "relationshiptocompany": document.getElementById("relationshiptocompany").value,
    "companypostcode": document.getElementById("cpostcode").value,
    "confirmations": [document.getElementById('bankaccount').checked,document.getElementById('property').checked]
  } 

  try {
      const response = await fetch('https://sea-lion-app-lccwh.ondigitalocean.app/jotform/submitmainform', {headers: {"Content-Type":"application/json"},
      method: "POST",body: JSON.stringify(formData)});

      if (!response.ok) {
          if (response.status === 400) {
              const errorResponse = await response.json();
              handleValidationErrors(errorResponse.errors);
              //document.getElementById("error-header").scrollIntoView();
          } else {
              throw new Error(`Server responded with ${response.status}`);
          }
      } else {
          const successMessage = await response.text();
          window.top.location.href = 'https://equiddy.com/thank-you/';
          //alert(successMessage);
      }
  } catch (error) {
      console.error('Error:', error.message);
  }

  return false; // Prevent the form from submitting in the traditional way

}

 
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("button pressed");
    submitForm();
    
/*     // Select the email input element by its name
    var propertyValue = document.getElementsByName("propertyvalue")[0].value;
    // Call the validateEmail function and store the result
    propertyValue= propertyValue.replace(/\,/g,'')
    propertyValue=Number(propertyValue);
    console.log(propertyValue);
    var valid = propertyValue > 100000;
    // If the result is false, prevent the default submission and show an alert
    if (!valid) {
      e.preventDefault();
      document.getElementById("propertyvalue").style.border = "1px solid red";
      document.getElementById("propertyvaluesublabel").style.color = "red";
      document.getElementById("propertyvaluelabel").scrollIntoView();
    } else {
      leadForm.style.display = "none";
      loader.style.display = "inline-block"
       const formData = {
        "title": document.getElementById("title"),
        "firstName": capitalizeFirstLetter(document.getElementById("fname")),
        "lastName": capitalizeFirstLetter(document.getElementById("lname")),
        "email": document.getElementById("email").value,
        "mobilenumber":document.getElementById("mobilenumber").value,
        "amountRequired": document.getElementById("amountrequired").value,
        "termrequired": document.getElementById("loanterm").value,
        "purposeofloan": document.getElementById("purposeofloan").value,
        "descloan": document.getElementById("describeloanpurpose").value,
        "propertytype": document.getElementById("typeofproperty").value,
        "propertyvalue": Number(document.getElementById("propertyvalue").value.replace(/\,/g,'')),
        "firstmortgage": Number(document.getElementById("firstmortgage").value.replace(/\,/g,'')),
        "secondmortgage": Number(document.getElementById("secondmortgage").value.replace(/\,/g,'')),
        "othercharges": Number(document.getElementById("othercharges").value.replace(/\,/g,'')),
        "totaldebt": calculateTotalDebt(),
        "companyname": selectedCompany.title,
        "companyNumber": selectedCompany.company_number,
        "companyStatus": selectedCompany.company_status,
        "companyType": document.getElementById("companytype").value,
        "companyDescription": selectedCompany.description,
        "companyurl": "https://find-and-update.company-information.service.gov.uk" + selectedCompany.links.self,
        "addressone": document.getElementById("caddressOne").value,
        "addresstwo": document.getElementById("caddressTwo").value,
        "addressthree": document.getElementById("caddressThree").value,
        "companypostcode": document.getElementById("cpostcode").value,
        "relationshiptocompany": document.getElementById("relationshiptocompany").value,
        "companypostcode": document.getElementById("cpostcode").value,
        "confirmations": [document.getElementById('bankaccount').checked,document.getElementById('property').checked]
      } 
   
    
      // handle submit
        fetch(`https://sea-lion-app-lccwh.ondigitalocean.app/jotform/submitmainform`,
      {headers: {"Content-Type":"application/json"},method: "POST",body: JSON.stringify(formData)})
      .then(response => response.json())
      .then(data => {
        if(data.success){
          window.top.location.href = 'https://equiddy.com/thank-you/';
        } else {
          alert("Error, form not submitted")
        }
      })  

    } */

    // Form submission function





 
  }); 
  

}


