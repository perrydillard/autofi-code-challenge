# autofi-code-challenge

After cloning the repository you will need to run yarn or npm to install the dependencies. Once that completes you should verify the configuration values are set appropriately based on the documentation below, including the creation of the .env file. Once satisfied with the configuration values you can start the server by running 'yarn start'.
Next you can load the index.html into a browser which will allow you to select a file to upload and process.

Since the size of the csv file is potentially large I'm choosing to go with a stream solution for reading, parsing and transforming the csv file.

I use yarn as my package manager, but using npm should work as well.

##### Modules used:
* config - Full featured application configuration
* csv-parser - powerful streaming csv file parsing
* dotenv - Used in conjunction with config
* express - Main http server
* express-fileupload - Used to handle file upload instead of reinventing the wheel
* fs-extra - I always use this over plain fs as there are some conveniences
* http-status - http status code constants for consistency
* lodash - Convenient helpers
* nanoid - Used for creating unique filename prefixes to avoid duplicate file upload names
* jest - Only a dev dependency for testing

##### Output Schema
This is simply defined in the config/default.js and is just an array of column titles in the order we want them. The output values will correspond to the order the column names appear in the array.

##### For unit test and test coverage you can run:
* yarn test
* yarn coverage

Assumptions
* Output format is .csv as I'm foregoing the writing to a database as I've run out of time
* Since there were no test datasets provided I created 4 test sets
  * Set 1 is a perfect match to the output schema
  * Set 2 includes all fields in the output schema but in different order
  * Set 3 includes less fields with missing values defaulted to empty tring
  * Set 4 includes fields not matching any key in the expected output schema which are ignored
  * note: I created a fifth dataset that contained 90k records just for a little performance testing but did not include in the repo.

* The following value in default.js should be configured for your environment. It is the final destination for the uploaded file. The processed version of the file will be in the same place.
  * fileDestinationPath - Current default value on my MacBook Pro is '/usr/local/share/AutoFi'
* Additionaly the initial temporary upload directory can be set with the following config value:
  * tempFileDir - Current default value on my MacBook Pro is '/tmp/' 

The REST endpoint is /api/csvupload
* Method: POST
* The endpoint expects a customerId field that contains the 'provider name' as well as a file input named csvFile. I've provided an index.html for testing convenience.
  * The name of the input fields are configurable in the config/default.js file and should be self explanatory.
  
.env file contents - Below are the values expected to be set
  * NODE_ENV - Should be one of [test,development,production]
  * PORT - The port for the Express server to listen on

##### The development values I used were
* NODE_ENV=development
* PORT=5000
