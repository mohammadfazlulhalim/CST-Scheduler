## File Locations
Tests should go into the __"\_\_tests\_\_"__ directory.  
Route files should go into the __"routes"__ directory, and views into the __"views"__ directory.  
Object class files should go into the __"private\\javascript"__ directory.  
Database files should go into the __"private\\database"__ directory.

## Runnable Scripts
To run all tests, you can run __"npm test"__ in the console or find the test script in __"package.json"__.  
To start the Electron program, you can run __"npm start"__ in the console or find the start script in __"package.json"__.

## After each git pull
After each time you run a git pull, run __"npm i"__ in the console to ensure all packages from "package.json" are installed.  

## Set Up Linter
To set up the linter in WebStorm 2023, go to __File > Settings__ and search __"lint"__.  
Click the __"Automatic ESLint configuration"__ radio button and the __"Run eslint --fix on save"__ checkbox.