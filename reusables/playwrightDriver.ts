import { BrowserContext,Page, chromium, firefox } from "playwright"
import {browserType,isHeadless} from '../config/testconfig.json'

let page:Page;
let browserContext:BrowserContext;

export const launchBrowser  = async():Promise<BrowserContext>=>
{
    let browser;
    
    if (browserType.toLowerCase() == "chrome")
    {
       browser = await chromium.launch({
            headless:isHeadless,
            channel:'chrome',
        });
    }else if (browserType.toLowerCase() == "firefox")
    {
        browser = await firefox.launch({
            headless:isHeadless
        });
    }

    let browserContext:BrowserContext =await browser.newContext()

    return browserContext;
}

export const closeBrowser = async(browserContext:BrowserContext)=>
{
    browserContext.pages().forEach(page => {
            if (page != null)
                page.close();
    });
}
