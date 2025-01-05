import {playTest as test} from '../tests/hooks'
import { expect } from 'playwright/test';

import {get,post} from '../reusables/playwrightAPIDriver'
import {CreateRequest} from '../requestInterfaces/createRequest'
import testdata from '../testdata/testdata.json'


test('fetch user details',async()=>{
    let response = await get('/api/users?page=2');

    expect(response.status()).toBe(200);

    let responseBody = await response.json();
    
    expect(responseBody.data[0].first_name).toBe('Michael');

})

test('create user',async()=>{

    let requestBody:CreateRequest = {
        name:testdata.name,
        job:testdata.job
    }

    let response = await post('/api/users',requestBody);

    expect(response.status()).toBe(201);

    let responseBody = await response.json();

    expect(responseBody.name).toBe('morpheus');
    expect(responseBody.job).toBe('leader');
    expect(responseBody.id).toBeDefined();
})