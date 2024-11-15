import {BrowserContext, Page, test as playTest} from '@playwright/test'
import { closeBrowser, launchBrowser } from '../reusables/playwrightDriver'
import loginpage from '../pages/loginpage'
import testconfig from '../config/testconfig.json'


let browserContext: BrowserContext;
let page:Page;

playTest.beforeAll(async ()=>{
   browserContext = await launchBrowser();

   browserContext.setDefaultTimeout(testconfig.defaultTimeout);
   browserContext.setDefaultNavigationTimeout(testconfig.defaultNavTimeout);
})

playTest.beforeEach(async()=>{
    page = await browserContext.newPage();
    
    let loginPage = new loginpage(page);
    await page.goto('https://www.saucedemo.com/');
    
    await loginPage.waitForLoginPage();
    await loginPage.loginUser();
})

playTest.afterAll(async ()=>{
 await closeBrowser(browserContext);
})


export {playTest,page};