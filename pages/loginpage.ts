import {Locator, Page} from 'playwright'
import testconfig from '../config/testconfig.json'
import {clickElement,fillText,waitForVisibility} from '../reusables/uihelper'


export default class loginpage
{
    private page:Page;
    private textLoginUserName:Locator 
    private textPassword:Locator 
    private btnLogin:Locator
    private loginContainer:Locator

    constructor(page:Page)
    {
        this.page = page;
        this.textLoginUserName = this.page.locator('#user-name')
        this.textPassword = this.page.locator('#password');
        this.btnLogin = this.page.locator('#login-button');
        this.loginContainer = this.page.locator('#login_button_container');
    }

    waitForLoginPage = async()=>
    {
        await waitForVisibility(this.loginContainer,20000);
    }

    loginUser = async()=>
    {
        await fillText(this.textLoginUserName,testconfig.userName);
        await fillText(this.textPassword,testconfig.password);
        await clickElement(this.btnLogin);
    }
}


