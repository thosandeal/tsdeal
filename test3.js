async function inputGoogleSheet(subId1 = '', subId2 = '', subId3 = '', subId4 = '', subId5 = '', subId6 = '') {
    async function pppinput(selector, number, text) {
        const numberx = number - 1;
        const elements = await page.$$(selector);
        if (elements.length > numberx) {
            const elementHandle = elements[numberx];
            await page.evaluate((el) => el.value = '', elementHandle);
            await elementHandle.click();
            await page.keyboard.sendCharacter(text);

        } else {
        }
    }

    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScB82bM1zmvZ-h-jgENahEGk3GgfwmBicjfTZOOYJOwfn4QBw/viewform');
    await page.waitForTimeout(1000);
    await page.waitForSelector('div[data-should-execute-invisible-captcha-challenge="false"] span span');
    
    if (subId1) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 1, subId1);
    if (subId2) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 2, subId2);
    if (subId3) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 3, subId3);
    if (subId4) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 4, subId4);
    if (subId5) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 5, subId5);
    if (subId6) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 6, subId6);
    
    await pclick('div[data-should-execute-invisible-captcha-challenge="false"] span span', 1, 3000);
}
