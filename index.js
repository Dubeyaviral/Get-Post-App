console.log("Here  is the JS");

//Utility Functions:
//1. Utility function to get DOM element from string
function getElementFromString(string){
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//Initialize  no of parameters
let addedParamCount = 0;

// Hide the parameters Box initially
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

// If the user clicks on params box hide JSON box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
    document.getElementById("requestJsonBox").style.display = "none";
    document.getElementById("parametersBox").style.display = "block";
});

// If the user clicks on json box , hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
    document.getElementById("parametersBox").style.display = "none";
    document.getElementById("requestJsonBox").style.display = "block";
});

//If user clicks on + button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {

    let params = document.getElementById("params");

    let string = `<div class="row g-3 my-2">
                     <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount +2}</label>
                     <div class="form-group col-md-4">
                         <input type="text" class="form-control" id="parameterKey${addedParamCount +2}" placeholder="Enter parameter ${addedParamCount +2} Key"
                             aria-label="First name">
                     </div>
                     <div class="form-group col-md-4">
                         <input type="text" class="form-control" id="parameterValue${addedParamCount +2}" placeholder="Enter parameter ${addedParamCount +2} Value"
                             aria-label="Last name">
                     </div>
                     <div class="col-sm">
                         <button class="btn btn-primary deleteParam"> - </button>
                     </div>
                  </div>`;

    //   convert the element string to DOM mode
    let paramElement = getElementFromString(string);
        params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button
    let deleteParam  = document.getElementsByClassName('deleteParam');
    for(item of deleteParam){
        item.addEventListener('click', (e)=>{
            //Add a confirmation box to confirm parameter deletion
          
            e.target.parentElement.parentElement.remove();
           
        })
    }

  addedParamCount++;
});

//IF user clicked in the submit button
let submit = document.getElementById('submit');
submit.addEventListener('click',()=>{
    //show please wait in the response box to request patience from the user
    // document.getElementById('responseJsonText').value = "Please wait.. Fetching response...";
    document.getElementById("responsePrism").innerHTML = "Please wait.. Fetching response...";


    //Fetch all the values which user has entered
    let url =  document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;

    

    // If user has selected params instead of json, collect all the parameters in an object
    if(contentType =='params'){
        data ={};
        for(let i=0;i<addedParamCount + 1;i++){
            if(document.getElementById('parameterKey' + (i+1)) != undefined)
                {
                let key = document.getElementById('parameterKey' + (i+1)).value;
                let value = document.getElementById('parameterValue' + (i+1)).value;
                data[key]=value;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('requestJsonText').value;
    }

    //Log all the values in console for debugging
    console.log("URL is ", url);
    console.log("requestType is ", requestType);
    console.log("contentType is ",contentType);
    console.log("Data is ", data);

    // if the request type is POST, invoke fetch api to create a post request
    if(requestType=='GET'){
        fetch(url, {
            method : 'GET',
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method : 'POST',
            body : data,
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById("responseJsonText").value = text;
            document.getElementById("responsePrism").innerHTML = text;
            Prism.highlightAll();
        });
    }

});