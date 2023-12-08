let companyArray = [];
let selectedCompany = [];

function resizeIframe() {
  var bodyHeight = document.body.scrollHeight;
  window.parent.postMessage({ height: bodyHeight }, '*');
  console.log("message sent");
}

function showResults(val) {
    let res = document.getElementById("result");

    if(document.getElementById('q').value === ''){
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


    document.getElementById("q").value = ""; 
    let res = document.getElementById("result");
    res.innerHTML = '';
    res.style.display = "none";
    resizeIframe();
  }

  function formatTitle(sentence) {

  const words = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }
  return words.join(" ");
}




window.onload = function() {
  let leadForm = document.getElementById("leadform");
  let loader = document.getElementById("loader");

  let descLoan = document.getElementById("describeLoan");

  descLoan.style.display = "none";
  resizeIframe();

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
leadForm.addEventListener("submit", (e) => {
  // Select the email input element by its name
  var propertyValue = document.getElementsByName("propertyvalue")[0].value;
  // Call the validateEmail function and store the result
  propertyValue= propertyValue.replace(/\,/g,'')
  propertyValue=Number(propertyValue);
  console.log(propertyValue);
  var valid = propertyValue > 100000;
  // If the result is false, prevent the default submission and show an alert
  if (!valid) {
    e.preventDefault();
    alert("Please enter a property value of at least £100,000");
  }

})
 
  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    leadForm.style.display = "none";
    loader.style.display = "inline-block"
    const formData = {
      "firstName": document.getElementById("fname").value,
      "lastName": document.getElementById("lname").value,
      "email": document.getElementById("email").value,
      "mobilenumber":document.getElementById("mobilenumber").value,
      "amountRequired": document.getElementById("amountrequired").value,
      "termrequired": document.getElementById("loanterm").value,
      "purposeofloan": document.getElementById("purposeofloan").value,
      "descloan": document.getElementById("describeloanpurpose").value,
      "propertytype": document.getElementById("typeofproperty").value,
      "propertyvalue": document.getElementById("propertyvalue").value,
      "firstmortgage": document.getElementById("firstmortgage").value,
      "secondmortgage": document.getElementById("secondmortgage").value,
      "othercharges": document.getElementById("othercharges").value,
      "totaldebt": document.getElementById("othercharges").value,
      "companyname": selectedCompany.title,
      "companyNumber": selectedCompany.company_number,
      "companyStatus": selectedCompany.company_status,
      "companyDescription": selectedCompany.description,
      "companyurl": "https://find-and-update.company-information.service.gov.uk" + selectedCompany.links.self,
      "addressone": document.getElementById("caddressOne").value,
      "addresstwo": document.getElementById("caddressTwo").value,
      "addressthree": document.getElementById("caddressThree").value,
      "companypostcode": document.getElementById("cpostcode").value,
      "relationshiptocompany": document.getElementById("relationshiptocompany").value,
      "companypostcode": document.getElementById("describeloanpurpose").value,
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
 
  }); 
  

}


