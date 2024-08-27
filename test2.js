function inputGoogleSheet(subId1 = '', subId2 = '', subId3 = '', subId4 = '', subId5 = '', subId6 = '') {
    await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScB82bM1zmvZ-h-jgENahEGk3GgfwmBicjfTZOOYJOwfn4QBw/viewform'); // vào google sheet điền thông tin
    await page.waitForTimeout(1000);  // Đợi 3 giây
    await page.waitForSelector('div[data-should-execute-invisible-captcha-challenge="false"] span span'); // đợi cho element xuất hiện thì thực hiện hành động tiếp theo
    if (subId1) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 1, subId1);
    if (subId2) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 2, subId2);
    if (subId3) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 3, subId3);
    if (subId4) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 4, subId4);
    if (subId5) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 5, subId5);
    if (subId6) await pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 6, subId6);
    await pclick('div[data-should-execute-invisible-captcha-challenge="false"] span span', 1, 3000) // nhấn nút gửi và đợi 3000ms
}
