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

<video controls src="video-attachments/20241117-0739-36.3365030.mp4" title="ReportDashboard"></video>

<video controls src="video-attachments/20241117-0743-31.6988865.mp4" title="Test details"></video>