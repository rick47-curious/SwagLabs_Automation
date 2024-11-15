import { Locator } from 'playwright';


export const clickElement = async(locator:Locator)=>
{
    await locator.click();
}

export const fillText = async(locator:Locator,text:string)=>
{
    await locator.fill(text);
}

export const waitForVisibility = async(locator:Locator,timeoutInMillisecond:number)=>
{
    await locator.waitFor(
    {
        state:'visible',
        timeout:timeoutInMillisecond
    });
}