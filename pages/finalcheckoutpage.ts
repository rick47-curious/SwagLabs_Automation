import {Locator, Page} from 'playwright'
import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'

export default class homepage
{
    private page:Page;
    private pageHeader:Locator;
    private successMessage:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.pageHeader = this.page.locator("//div[@data-test='secondary-header']/span[contains(text(),'Checkout: Complete!')]");
        this.successMessage = this.page.getByRole('heading',{name:'Thank you for your order!',exact:true})
    }

    waitForPageVisibility = async()=>{
        await waitForVisibility(this.pageHeader,20000)
    }

    returnSuccessMessage = async()=>{
        return this.successMessage.isVisible();
    }


}