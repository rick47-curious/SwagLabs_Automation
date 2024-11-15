import {Locator, Page} from 'playwright'

import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'
import {sortalphaDescending,sortnumDescending,compareArrays} from '../reusables/common'
export default class homepage
{
    private page:Page;
    private pageHeader:Locator;
    private filterDrodpdown:Locator;
    private checkoutCart:Locator;
    private sortedProductNameList:string[];
    private sortedProductPriceList:number[];
    constructor(page:Page)
    {
        this.page = page;
        this.pageHeader = page.locator("//div[text()='Swag Labs']");
        this.filterDrodpdown = page.locator("//select[@data-test='product-sort-container']")
        this.checkoutCart = page.locator("//a[@data-test='shopping-cart-link']")
    }

    waitForPageHeaderAvailability = async()=>{
        await waitForVisibility(this.pageHeader,20000);
    }

    selectOption = async(optionType:string)=>{
        if (optionType.toLowerCase().includes("atoz"))
            await this.filterDrodpdown.selectOption({value:'az'})
        else if (optionType.toLowerCase().includes("ztoa"))
            await this.filterDrodpdown.selectOption({value:'za'})
        else if (optionType.toLowerCase().includes("lowtohigh"))
            await this.filterDrodpdown.selectOption({value:'lohi'})
        else if (optionType.toLowerCase().includes("hightolow"))
            await this.filterDrodpdown.selectOption({value:'hilo'})
    }

    getArrayProductTitles = async()=>{
        let productNameList = await this.page.locator("//div[@data-test='inventory-item-name']").allTextContents();
        this.sortedProductNameList = sortalphaDescending(productNameList);
    }

    verifySortOrderZToA = async()=>{
        let productTitlesArray = await this.page.locator("//div[@data-test='inventory-item-name']").allTextContents();

        if (compareArrays(productTitlesArray,this.sortedProductNameList))
            console.log("Product list is sorted in Z to A order")
        else
            console.log("Product list is not sorted in Z to A order")

    }

    verifySortOrderHighToLow = async()=>{
        let numsProductArray:number[] = [];

        (await this.page.locator("//div[@data-test='inventory-item-price']").allTextContents()).forEach((product)=>{
            numsProductArray.push(Number(product.slice(1,product.length-1)));
        })
        
        if (compareArrays(numsProductArray,this.sortedProductPriceList))
            console.log("Product list is sorted in high to low order")
        else
            console.log("Product list is not sorted in high to low order")
    }

    getArrayProductPrice = async()=>{
        let productPriceList:number[] = [];

        (await this.page.locator("//div[@data-test='inventory-item-price']").allTextContents()).forEach((product)=>{
             productPriceList.push(Number(product.slice(1,product.length-1)))
         })

        this.sortedProductPriceList = sortnumDescending(productPriceList)
    }

   addProductsToCart = async (listofItems:string[])=>{
        
        for(const itemName of listofItems){
            await clickElement(this.page.locator(`//div[a[div[contains(text(),'${itemName}')]]]//parent::div//button`));
        }
   }

   checkoutWithAddedProducts = async()=>{
    clickElement(this.checkoutCart);
   }
}