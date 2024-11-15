import homepage from '../pages/homepage'
import cartpage from '../pages/cartpage'
import informationpage from '../pages/informationpage'

import testdata from '../testdata/testdata.json'
import {playTest as test, page} from '../tests/hooks'


test('Validate product title sort order ZtoA',async ()=>{
    
    let homePage = new homepage(page);

    await homePage.waitForPageHeaderAvailability();
    
    //grab product titles and sort in descending alphabetic order
    await homePage.getArrayProductTitles();
    
    //Select sort order z to a
    await homePage.selectOption("ztoa")
    
    //Verify sorting order
    await homePage.verifySortOrderZToA()
})

test('Validate price sort order high to low',async()=>{
    let homePage = new homepage(page);

    await homePage.waitForPageHeaderAvailability();

    //grab product prices and sort in descending numeric order
    await homePage.getArrayProductPrice();

    //Sort in descending price order via UI
    await homePage.selectOption("hightolow");

    //Verify sorting order
    await homePage.verifySortOrderHighToLow();

})

test('Validate User Checkout Journey',async()=>{
    let homePage = new homepage(page);
    let cartPage = new cartpage(page);
    let informationPage = new informationpage(page);

    await homePage.addProductsToCart(testdata.productNames);
    await homePage.checkoutWithAddedProducts();
    
    await cartPage.waitForPageVisibility();
    await cartPage.validateCartCountAndProceed(testdata.productNames);

    await informationPage.fillInRequiredDetails(testdata.FirstName,testdata.LastName,testdata.PostalCode);
})