import {BrowserContext, Page, test as playTest} from '@playwright/test'
import { unlink, writeFileSync } from 'fs';
import { launchBrowser,closeBrowser } from '../reusables/playwrightDriver'
import { checkAccessibility } from '../reusables/common'
import loginpage from '../pages/loginpage'
import testconfig from '../config/testconfig.json'


let browserContext: BrowserContext;
let page:Page;
let accessibilityReports: any[] = [];

playTest.beforeAll(async ()=>{

  unlink('./accessibilityReports/accessibilityReport.json',()=>{});

  browserContext = await launchBrowser();
  browserContext.setDefaultTimeout(testconfig.defaultTimeout);
  browserContext.setDefaultNavigationTimeout(testconfig.defaultNavTimeout);
})

playTest.beforeEach(async()=>{
    page = await browserContext.newPage();

    await page.goto(testconfig.url);  
   
    page.on('framenavigated', async () => {
      await checkAccessibility(page,accessibilityReports);
    });

    let loginPage = new loginpage(page);
    
    await loginPage.waitForLoginPage();
    await loginPage.loginUser();
})

playTest.afterAll(async ()=>{
  await closeBrowser(browserContext);

  // Save the accessibility reports to a file or attach to the final report
  process.on('exit', () => {
    writeFileSync('./accessibilityReports/accessibilityReport.json', JSON.stringify(accessibilityReports, null, 2),{ flag: "w"});
 })
});


export {playTest,page};