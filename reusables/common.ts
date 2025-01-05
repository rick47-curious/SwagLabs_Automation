import AxeBuilder from "@axe-core/playwright";
import { Page } from "playwright/test";


// Function to sort alphabetically in descending order (Z to A)
export const sortalphaDescending = (names: string[]): string[] => {
    return names.sort((a, b) => b.localeCompare(a));
};

export const sortnumDescending = (nums:number[])=>{
    return nums.sort((a,b) => b - a);
}

//Compare two arrays of same length
export const compareArrays = (array1:any,array2:any):boolean=>{

    if (array1.length != array2.length)
        return false;

    for (let i=0;i<array1.length;i++){
        if (array1[i] != array2[i])
            return false;
    }

    return true;
}

export async function checkAccessibility(page: Page,accessibilityReports: any[]) {
    const axeBuilder = new AxeBuilder({ page });
    const results = await axeBuilder.analyze();
    if (results.violations.length > 0) {
        console.error('Accessibility violations:', results.violations);
    }
    accessibilityReports.push({
        url: results.url,
        violations: results.violations
    });
    
    
}

