import {Locator, Page} from 'playwright'

import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'

export default class homepage
{
    private page:Page;
    private firstNameTxt:Locator;
    private lastNameTxt:Locator;
    private postalCodeTxt:Locator;
    private continueBtn:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.firstNameTxt = this.page.getByPlaceholder('First Name')
        this.lastNameTxt = this.page.getByPlaceholder('Last Name')
        this.postalCodeTxt = this.page.getByPlaceholder('Zip/Postal Code')
        this.continueBtn = this.page.locator('#continue')
    }

    fillInRequiredDetails = async(firstName:string,lastName:string,postalCode:string)=>{
        await fillText(this.firstNameTxt,firstName)
        await fillText(this.lastNameTxt,lastName)
        await fillText(this.postalCodeTxt,postalCode)
        await clickElement(this.continueBtn)
    }
}
