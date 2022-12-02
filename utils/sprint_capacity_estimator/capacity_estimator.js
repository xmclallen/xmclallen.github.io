const capacity_estimator = {
  getDefaultValues:  () => {
    return {
      daysInSprint:   8,
      numOfEngineers: 5,
      daysOutPerEngineer: 1,
      additionalDaysOut:  0,
      hoursPerDay: 8, 
      percentOfDayActuallyWorking : 0.65,
      roundToNearestDay: true
    }
  }, 


  roundToNearest: (value, nearest) => {
    const wholeParts = Math.floor(value / nearest)
    return wholeParts * nearest
  }, 

  calculateSprintCapacity : (opts) => {
    // Convert the json obj (which stores numbers as strings) to floats.
    const daysInSprint   = parseFloat(opts.daysInSprint)
    const numOfEngineers = parseFloat(opts.numOfEngineers)
    const daysOutPerEngineer = parseFloat(opts.daysOutPerEngineer)
    const additionalDaysOut  = parseFloat(opts.additionalDaysOut)
    const hoursPerDay    = parseFloat(opts.hoursPerDay);
    const percentOfDayActuallyWorking   = parseFloat(opts.percentOfDayActuallyWorking);
    
    // Begin actual calculations
    const maxDays = daysInSprint * numOfEngineers;
    const daysOut = (daysOutPerEngineer * numOfEngineers) + additionalDaysOut;
    const actualDays = maxDays - daysOut;
    
    const hourlyCapacity = actualDays * hoursPerDay;
    
    const hoursEstimate = hourlyCapacity * percentOfDayActuallyWorking;
    
    const roundedHoursEstimate = capacity_estimator.roundToNearest( hoursEstimate, hoursPerDay) 
    
    // Determine which estimate to use -- JSON.parse because the String "true" isn't interpreted as a boolean
    const finalEstimate = JSON.parse(opts.roundToNearestDay)  ? roundedHoursEstimate : hoursEstimate;
      
    return finalEstimate;
  }
}
