import {Locator, Page} from 'playwright'

import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'

export default class homepage
{
    private page:Page;
    private pageHeader:Locator;
    private firstNameTxt:Locator;
    private lastNameTxt:Locator;
    private postalCodeTxt:Locator;
    private continueBtn:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.pageHeader = this.page.locator("//div[@data-test='secondary-header']/span[contains(text(),'Your Information')]");
        this.firstNameTxt = this.page.getByPlaceholder('First Name')
        this.lastNameTxt = this.page.getByPlaceholder('Last Name')
        this.postalCodeTxt = this.page.getByPlaceholder('Zip/Postal Code')
        this.continueBtn = this.page.locator('#continue')
    }

    waitForPageVisibility = async()=>{
        await waitForVisibility(this.pageHeader,20000);
    }

    fillInRequiredDetails = async(firstName:string,lastName:string,postalCode:string)=>{
        await fillText(this.firstNameTxt,firstName)
        await fillText(this.lastNameTxt,lastName)
        await fillText(this.postalCodeTxt,postalCode)
        await clickElement(this.continueBtn)
    }
}
