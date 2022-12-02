const setEstimateDisplay = (estimate) => {
	document.getElementById('estimate').textContent = estimate;
};


const updateValue = () => {
	let parameters = {};
	const defaults = capacity_estimator.getDefaultValues();
  
  //Loop through the HTML inputs and gather the values needed to pass to the estimator
  for ( var key of Object.keys(defaults) ){
  	parameters[key] = document.getElementById(key).value; // most of the objects we just take the value
    
    console.log(key, parameters[key]);  // but for the checkbox, we need to get the .checked value
    if (parameters[key] == "on" || parameters[key] == "true"){
    	parameters[key] = document.getElementById(key).checked;
    }
  }
  
	const estimate = capacity_estimator.calculateSprintCapacity( parameters ) ;
	setEstimateDisplay(estimate);
};



const defaults = capacity_estimator.getDefaultValues();
const inputs = Array.from( document.querySelectorAll('input') );
inputs.forEach(e => {
	//set their on change event to fire the update function
  e.addEventListener('input', updateValue);
  
  //set the default values on the UI
  if (defaults[e.id] == true || defaults[e.id] == "true"){ 
    e.checked = "checked";	// if its a boolean & true, assume its a checkbox & set it
  }
  e.value = defaults[e.id]; // otherwise assume its a text input and update the value (won't affect the checkbox)
});

// Make a first run, so we can see the value. 
const estimate = capacity_estimator.calculateSprintCapacity( defaults );
setEstimateDisplay( estimate );

