function mergeObjectsWithArrayValuesFn(obj1, obj2) {
    // Create a new object to hold the result
    let result = {...obj1};
  
    // Iterate through the keys of the second object
    Object.keys(obj2).forEach(key => {
      // If both objects have the same key and the values are arrays, concatenate them
      if (result.hasOwnProperty(key) && Array.isArray(result[key]) && Array.isArray(obj2[key])) {
        result[key] = [...result[key], ...obj2[key]];
      } else {
        // Otherwise, add or overwrite the key in the result
        result[key] = obj2[key];
      }
    });
  
    return result;
  }

module.exports = {mergeObjectsWithArrayValues:mergeObjectsWithArrayValuesFn}