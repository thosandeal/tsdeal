
function pppinput(selector, number, text) {
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

}


//HÀM CLICK VÀO SELECTOR 
function pclick(element, so, time) {
    const ele = await page.$$(element);
    const ok = so - 1;// đã trừ đi 1
    await ele[ok]?.click();
    await page.waitForTimeout(time);
};
//await pclick('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]',2);
// await pclick(selector cần nhấn, selector thứ mấy, sau đó đợi mấy giây);

// HÀM ÚP ẢNH PUPUMAGE
function pupimage(selector, image) {

    await page.$eval('input.pptelement', (el, value) => { el.value = value; }, selector);
    await page.$eval('input.pptimage', (el, value) => { el.value = value; }, 'images/' + image); // nhập vào
    await page.waitForTimeout(1000);
    await page.click('button.pptrun'); // nhấn đăng ảnh
    await page.waitForTimeout(1000);
};
//await pupimage(slector cần úp , tên ảnh);
// HÀM KIỂM TRA VÀ CLICK
function pcheckclick(selector, time) {
    const elementHandle = await page.$(selector);
    if (elementHandle !== null) {
        await elementHandle.click();
        await page.waitForTimeout(time);
    };
};


//HÀM SPINTEXT
function spinText(spinText) {
    // Thay thế \r\r thành \n
    var result = spinText.replace(/\r\r/g, '\n');

    // Xử lý spintext
    result = result.replace(/{([^{}]+?)}/g, function (match) {
        var choices = match.slice(1, -1).split("|");
        return choices[Math.floor(Math.random() * choices.length)];
    });

    // Xử lý [r3]
    var icons = ['🍏', '🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🍈', '🥝', '🥑', '🍍', '🍒', '🍑', '🍆', '🍆', '🍆', '🍅', '🍠', '🍠', '🌼', '🌸', '🌺', '🏵️', '🌻', '🌷', '🌹', '🥀', '💐', '🌾', '🎋', '☘', '🍀', '🍃', '🍂', '🍁', '🌱', '🌿', '🎍', '🌵', '🌴', '🌳', '🌳', '🎄', '🍄', '💫', '⭐', '🌟', '✨', '⚡', '🔥', '💥', '☄️', '🌞', '🌞', '🍭', '🍧', '🍨', '🍦', '🥞', '🍰', '🎂', '🍬', '🍿', '🥃', '🍹', '♥️', '❤️', '💛', '💚', '💙', '👍', '👌️', '🎖️️', '🏅️', '🥇️', '🏆', '💎', '🎲', '🔔', '📣', '♻️', '💯', '♨️', '🌀', '✴️', '✳️', '✔️', '✅', '🔴', '🔵', '💘', '💟', '🐤'];
    result = result.replace(/\[r3\]/g, function () {
        return icons[Math.floor(Math.random() * icons.length)];
    });

    return result;
}


// HÀM CHECK XPATH CLICK
function pcheckclickx(xpath, number, time) {
    const elements = await page.$x(xpath);  // Tìm tất cả các phần tử khớp với XPath
    // Kiểm tra xem phần tử thứ 'number' có tồn tại hay không
    const numberx = number - 1;
    if (elements[numberx]) {
        // Nếu phần tử tồn tại, nhấn vào nó
        await elements[numberx].click();
        await page.waitForTimeout(time);
        console.log(`Phần tử thứ '${number}' của '${xpath}' tồn tại và đã được nhấn.`);
    } else {
        // Nếu phần tử không tồn tại, in ra thông báo
        console.log(`Phần tử thứ '${number}' của '${xpath}' không tồn tại.`);
    }
}

function gofanpage(puid) {
    console.log('lỗi 1');
    await page.waitForTimeout(1000);
    //>> CHỌN PAGE ĐĂNG BÀI CHUYỂN HƯỚNG BÀI VIẾT
    await page.goto('https://www.facebook.com/' + puid);
    await page.waitForTimeout(5000);
    // LÀM ADMIN FANPAGE
    while (true) {
        const dieukien = await page.$x('//span[text()="Bạn đang nghĩ gì?"]');

        if (dieukien.length > 0) { // nếu phần tử tồn tại tức đã là admin
            console.log('bạn đã là admin'); // thông báo làm admin 
            await page.waitForTimeout(2000);
            break; // hoàn thành và thoát khỏi vòng lặp
        } else {
            //ĐÓNG POPUP v1
            await pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thử
            await pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
            await pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
            await pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
            await pcheckclickx('//span[text()="Dùng Trang"]', 1, 2000);
            // LÀM ADMIN
            await pcheckclick('div[aria-label="Chuyển ngay"]', 10000); // kiểm tra néu có nút Chuyển thì nhấn vào sau đó đợi 1000ms
            await pcheckclick('div[aria-label="Chuyển"]', 1000); // kiểm tra nút Chuyển có tồn tại hay không có thì nhấn vào
            await pcheckclickx('//span[text()="Chuyển"]', 2, 5000) // kiểm tra nút Chuyển có tồn tại hay không có thì nhấn vào
            await pcheckclick('div[aria-label="Switch"]', 5000); // kiểm tra nút Switch có tồn tại hay không có thì nhấn vào
            await pcheckclick('div[aria-label="Dùng Trang"]', 1000); //kiểm tra nút Dùng trang có không , có thì nhấn vào
            await pcheckclick('div[aria-label="Cho phép tất cả cookie"][tabindex="0"]', 1000);
            await pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thử
            console.log("Nhấn nút làm admin");
            await page.setDefaultTimeout(3000);
            //ĐÓNG POPUP sau khi làm admin v2
            await pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
            await pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
            await pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
            await pcheckclickx('//span[text()="Dùng Trang"]', 1, 5000);

        }
        //ĐÓNG POPUP v2
        await pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thửF
        await pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
        await pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
        await pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
        await pcheckclickx('//span[text()="Dùng Trang"]', 1, 5000);

    }


}

//**FUNTION TẠO GR
function taogr(pname, pvitri, pbanner) {

    //tạp biến pname
    // let pname; // khai báo biến pname mới sài đc

    await page.goto('https://www.facebook.com/groups/create/');
    console.log('lỗi 1a');
    await page.waitForTimeout(2000); // đợi 1s
    // await page.waitForSelector('input[maxlength="75"]'); // đợi selector xuất hiện
    console.log('lỗi 1');

    await pppinput('input[maxlength="75"]', 1, pname); // nhập tên gr
    console.log('lỗi 2');
    await pclick('label[aria-label="Chọn quyền riêng tư"]', 1, 2000); //nhận vào quyền riêng tư
    await pcheckclickx('//span[text()="Công khai"]', 2, 1000); // chọn quyền riêng tư
    await pcheckclickx('//span[text()="Công khai"]', 1, 1000); // chọn quyền riêng tư
    await pclick('div[aria-label="Tạo"] span span', 1, 1000); // nhấn nút tạo

    // vòng lặp nhấn vào nút Tạo mỗi 1 giây tới khi biến mất
    while (true) {
        const buttonElementHandle = await page.$x('//span[text()="Tạo"]');
        if (buttonElementHandle.length > 0) {
            await buttonElementHandle[0].click(); // Nhấp vào nút
            await page.waitForTimeout(500); // Đợi 1 giây hoặc một khoảng thời gian nhất định
            const loi_tao_gr = await page.$x('//span[text()="Đã xảy ra lỗi khi tạo nhóm."]');
            if (loi_tao_gr.length > 0) {
                console.log('loi tao gr roi dkm');
                throw new Error('B');
            }
        } else {
            console.log('đã biết mất nút tạo')
            await page.waitForTimeout(2000);
            await page.waitForTimeout(1000);
            await page.waitForXPath('//span[contains(text(),"File phương tiện")]'); // đợi chữ file phương tiện xuất hiện
            console.log('Đã tạo gr xong');
            break; // Nếu không tìm thấy nút, thoát khỏi vòng lặp
        }
    }



    //**TẠO ẢNH BÌA GROUND**/
    await page.waitForTimeout(1000);
    await pupimage('input[type="file"]', pbanner);// up ảnh bìa
    await page.waitForTimeout(5000);
    await page.waitForXPath('//span[text()="Lưu thay đổi"]'); // đợi chữ lưu thay đổi xuất hiện
    await pcheckclickx('//span[text()="Lưu thay đổi"]', 2, 5000); // nhấn vào chữ lưu thay đổi
    console.log('chỉnh sửa bìa xong');

    //** TỐI ƯU GROUP
    const currentUrl = page.url(); // lấy link url hiện tại
    const newUrl = currentUrl + '/edit';
    await page.goto(newUrl); // đến trang chỉnh sửa để tối ưu gr


    // nhấn vào nút đợi slector xuất hiện thì edit
    await page.waitForTimeout(10000);
    await page.waitForXPath('//span[contains(text(), "Quản lý cài đặt nâng cao")]');    //đợi cho XPath xuất hiện


    // click chỉnh sửa quyền đăng bài
    await page.click('div[aria-label="Chỉnh sửa cách phê duyệt bài viết"]');
    await page.waitForTimeout(1000); // đợi 1s để hiển thị bảng tuỳ chỉnh
    await pcheckclickx('//span //span[text() = "Bật"]', 1, 1000); // nhấn nút lưu vị trí
    await pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
    await page.waitForTimeout(3000);

    // sửa đối tượng tham gia nhóm
    await page.click('div[aria-label="Chỉnh sửa ai có thể tham gia nhóm"]');// nhấn vào nút "cài đặt tham gia nhóm"
    await page.waitForTimeout(1000); // đợi 1s để hiện tuỳ chỉnh
    await pcheckclickx('//span[text() = "Trang cá nhân và Trang"]', 1, 1000); // nhấn nút lưu vị trí
    await pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
    await page.waitForTimeout(3000);

    // chỉnh sửa vị trí nhóm, kiểm tra có vị trí thì mới thực hiện
    if (pvitri) {
        await page.click('div[aria-label="Chỉnh sửa vị trí"]'); // nhấn voà chỉnh sửa vị trí
        await page.waitForTimeout(1000); // đợi 1s để hiện bảng
        await page.type('label[aria-label="Vị trí nhóm"]', pvitri); // nhập vị trí
        await page.waitForTimeout(2000); // đợi 2s để hiển thị đề xuất
        await page.click('li[aria-selected="false"][role="option"]'); // chọn li đầu tiên làm vị trí
        await page.waitForTimeout(2000); // đợi 2s để xác nhận
        await pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
    }

    // END FUNTION DANGPOSTPAGE
}

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
function goVanBan(selector, text) {
    const spans = await page.$$(selector);

    for (let span of spans) {
        // Bôi đen nội dung hiện tại trong span
        await span.click({ clickCount: 3 }); // Click 3 lần để bôi đen toàn bộ nội dung

        // Nhập vào 'đây là văn bản mới' với tốc độ nhanh nhất
        await page.keyboard.type(text, { delay: 0 });
    }
}
