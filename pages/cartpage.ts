import {Locator, Page} from 'playwright'

import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'

export default class homepage
{
    private page:Page;
    private cartPageHeader:Locator;
    private cartInventoryItems:Locator;
    private checkoutBtn:Locator;
    constructor(page:Page)
    {
        this.page = page;
        this.cartPageHeader = this.page.locator("//div[@data-test='secondary-header']/span[text()='Your Cart']")
        this.checkoutBtn = this.page.getByText('Checkout');
    }

    waitForPageVisibility = async()=>{
       await waitForVisibility(this.cartPageHeader,20000);
    }

    validateCartCountAndProceed = async(testProductList:string[])=>{
        
        if ((await this.page.locator("//div[@data-test='inventory-item']").all()).length == testProductList.length){
            console.log("Count of checkout cart items matching the product list chosen earlier");
            await clickElement(this.checkoutBtn);
        }else{
            console.log("Count of checkout cart items is not matching product list count");
        }
    }


}