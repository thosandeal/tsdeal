const myFunctions = {
    pppinput: async function(selector, number, text) {
        const numberx = number - 1;
        const elements = await page.$$(selector); // Lấy danh sách phần tử theo selector
        if (elements.length > numberx) {
            const elementHandle = elements[numberx];
            await page.evaluate((el) => el.value = '', elementHandle); // làm trống ô nhập liệu trước khi điền
            await elementHandle.click();
            await page.keyboard.sendCharacter(text); // nhập nội dung
            console.log(`Đã nhập nội dung vào ${selector} thứ ${numberx}`);
        } else {
            console.log(`Không tìm thấy ${selector} thứ ${numberx}`);
        }
    },

    inputGoogleSheet: async function(subId1 = '', subId2 = '', subId3 = '', subId4 = '', subId5 = '', subId6 = '') {
        await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScB82bM1zmvZ-h-jgENahEGk3GgfwmBicjfTZOOYJOwfn4QBw/viewform'); // vào google sheet điền thông tin
        await page.waitForTimeout(1000);  // Đợi 1 giây
        await page.waitForSelector('div[data-should-execute-invisible-captcha-challenge="false"] span span'); // đợi cho element xuất hiện thì thực hiện hành động tiếp theo
        if (subId1) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 1, subId1);
        if (subId2) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 2, subId2);
        if (subId3) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 3, subId3);
        if (subId4) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 4, subId4);
        if (subId5) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 5, subId5);
        if (subId6) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 6, subId6);
    }
};

globalThis.myFunctions = myFunctions;
