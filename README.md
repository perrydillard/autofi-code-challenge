# autofi-code-challenge

Since the size of the csv file is potentially large I'm choosing to go with a stream solution for reading, parsing and transforming the csv file.

Modules used:
I've chosen Express as the main module for implementation of the REST endpoint as it is the most popular and well supported by a large community.
In addition I will use an express plugin for handling the file upload.

I've chosen to use the config module for application configuration as it is a popular, flexible and well supported module.

For testing I've chosen Jest

Assumptions
* Output format is .csv as I'm foregoing the writing to a database as I've run out of time
* Since there were no test datasets provided I created 4 test sets
  * Set 1 is a perfect match to the output schema
  * Set 2 includes all fields in the output schema but in different order
  * Set 3 includes less fields with missing values defaulted to empty tring
  * Set 4 includes fields not matching any key in the expected output schema which are ignored

The REST endpoint is /api/csvupload
* Method: POST
* The endpoint expects a customerId field that contains the 'provider name' as well as a file input named csvFile. I've provided an index.html for testing convenience. The 
