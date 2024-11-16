import {Locator, Page} from 'playwright'
import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'

export default class homepage
{
    private page:Page;
    private actualSubTotalText:Locator;
    private taxText:Locator;
    private finishBtn:Locator;
    private pageHeader:Locator;

    constructor(page:Page)
    {
        this.page = page;
        this.pageHeader = this.page.locator("//div[@data-test='secondary-header']/span[contains(text(),'Overview')]");
        this.actualSubTotalText = this.page.locator("//div[@data-test='total-label']")
        this.taxText = this.page.locator("//div[@data-test='tax-label']")
        this.finishBtn = this.page.getByRole('button',{name:"Finish",exact:true})
    }

    waitForPageVisibility = async()=>{
        await waitForVisibility(this.pageHeader,20000);
    }

    returnCalculatedPrice = async (testdata:string[])=>{
        let priceArray:number[] = []
        let calculatedTotalPrice:number = 0
        

        for(let itemName of testdata){

          let actualPriceText = await this.page.locator(`//div[a[div[contains(text(),'${itemName}')]]]//div[@class='item_pricebar']/div`).textContent()
          
          let priceNum = parseFloat(actualPriceText!=null ?actualPriceText.slice(1,actualPriceText.length) : "0");

          priceArray.push(priceNum);
        }

        priceArray.forEach(element => {
            calculatedTotalPrice += element;
        });

        let taxString  = await this.taxText.textContent();

        calculatedTotalPrice = calculatedTotalPrice + parseFloat(taxString!=null?taxString.slice(taxString.indexOf("$")+1):"0")
        return calculatedTotalPrice;
    }

    returnActualPrice = async()=>{
        let actualTotalPrice:number = 0

        let priceString = (await this.actualSubTotalText.textContent())
        actualTotalPrice = parseFloat(priceString!=null? priceString.slice(priceString.indexOf("$")+1):"0");

        return actualTotalPrice;
    }
    
    clickFinish = async ()=>{
        await clickElement(this.finishBtn)
    }
}