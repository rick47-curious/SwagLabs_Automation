# Swag Lab automation solution


## Instructions
1.  Clone the solution form github - https://github.com/rick47-curious/SwagLabs_Automation/tree/main

2. Make sure Node.js is installed in the system

3. Make sure that you are in the right folder path where the project is downloaded or placed

4. After making sure step 3, Run command - `npm install` to install all the required packages in local machine

5. Run command - `npx playwright install` , if playwright is not already installed.

6. Run tests by either by tags or name of tests - 
> Based on tags - `npm run smoketest`  , `npm run e2etest`. Tag name should be used without quotes

> Based on name of tests - `npx playwright test -g '{name of test}'`. Make sure you give single quotes with the name of test

> If you want to run all the tests - `npx playwright test`

7. For headless execution, change the boolean `isHeadless` to true

## Pre-requisite

1. Playwright does not need browsers pre-installed , just run the tests!

2. Navigate to config folder and key in the password to login to the application

3. The framework was built with a handful of libraries - playwright core, playwright/test, ortoni-report

## Sample execution report 

![image](https://github.com/user-attachments/assets/d702d18a-17a5-41e2-8376-fc3dce45a6ff)

![image](https://github.com/user-attachments/assets/47490a63-7b5d-41d9-bfea-37ceab525a78)

![image](https://github.com/user-attachments/assets/2d9b85d6-e05c-45ef-b308-38fd43652524)


