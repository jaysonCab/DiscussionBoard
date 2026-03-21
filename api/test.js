// Example of testing the REST API in server.js using axios

const axios = require('axios');

// We'll need to use axios inside an async function if we want to use await
async function test()
{
  // we can use try-catch to handle any errors
  try {
	  
    // make a request to the API to fetch all items
    const response1 = await axios.get('http://localhost:3000/api');

    // Output the response from the API
    console.log(response1.data);

    // Try a delete
    const response2 = await axios.delete("http://localhost:3000/api/1");

    // Output the response from the API
    console.log(response2.data);
	
    // make a request to the API to fetch all items
    const response3 = await axios.get('http://localhost:3000/api');

    // Output the response from the API
    console.log(response3.data);
	    

  } catch (error) {
    console.error(error);
  }	
}

// call our test function
test();
