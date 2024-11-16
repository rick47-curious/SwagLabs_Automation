import homepage from '../pages/homepage'
import cartpage from '../pages/cartpage'
import informationpage from '../pages/informationpage'
import checkoutOverviewpage from '../pages/checkoutoverviewpage'
import finalcheckoutpage from '../pages/finalcheckoutpage'

import testdata from '../testdata/testdata.json'
import {playTest as test, page} from '../tests/hooks'
import { expect } from 'playwright/test'


test('Validate product title sort order ZtoA',{tag:'@smoke'},async ()=>{
    
    let homePage = new homepage(page);

    await homePage.waitForPageHeaderAvailability();
    
    //grab product titles and sort in descending alphabetic order
    await homePage.getArrayProductTitles();
    
    //Select sort order z to a
    await homePage.selectOption("ztoa")
    
    //Verify sorting order
    expect(await homePage.verifySortOrderZToA(),{message:'Verify list order'})
    .toBe(true);
    
})

test('Validate price sort order high to low',{tag:'@smoke'},async()=>{
    let homePage = new homepage(page);

    await homePage.waitForPageHeaderAvailability();

    //grab product prices and sort in descending numeric order
    await homePage.getArrayProductPrice();

    //Sort in descending price order via UI
    await homePage.selectOption("hightolow");

    //Verify sorting order
    expect(await homePage.verifySortOrderHighToLow(),{message:'Verify list order'})
    .toBe(true);

})

test('Validate User Checkout Journey',{tag:'@e2e'},async()=>{
    let homePage = new homepage(page);
    let cartPage = new cartpage(page);
    let informationPage = new informationpage(page);
    let checkoutOverviewPage = new checkoutOverviewpage(page);
    let finalcheckoutPage = new finalcheckoutpage(page);

    await homePage.addProductsToCart(testdata.productNames);
    await homePage.checkoutWithAddedProducts();
    
    await cartPage.waitForPageVisibility();

    expect(await cartPage.validateCartCountAndProceed(testdata.productNames),
    {message:'Cart count validation'})
    .toBe(true);
    

    await informationPage.waitForPageVisibility();
    await informationPage.fillInRequiredDetails(testdata.FirstName,testdata.LastName,testdata.PostalCode);
     
    await checkoutOverviewPage.waitForPageVisibility();
    
    expect(await checkoutOverviewPage.returnCalculatedPrice(testdata.productNames),
    {message:"Price calculation validation"}).toBe(await checkoutOverviewPage.returnActualPrice())

    await checkoutOverviewPage.clickFinish();

    await finalcheckoutPage.waitForPageVisibility();
    expect(await finalcheckoutPage.returnSuccessMessage(),{message:'Success Message validation'})
    .toBe(true); 

})