// HÀM INPUT NỘI DUNG VÀO Ô
const mfp = {
    pppinput: async function (selector, number, text) {
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
    //** HÀM KIÊRM TRA CHECKPOINT
    pcheckpoint: async function () {
        const urlpage = page.url();
        if (urlpage.includes("checkpoint") || urlpage.includes("login")) {
            console.log("Nick bị checkpoint");
            return 'cp';

            // throw new Error('C');
        } else {
            console.log("Nick live");
            return 'live';
        }
    },

    // HÀM INPUT NỘI DUNG VÀO Ô V2
    pppinputv2: async function (selector, number, text) {
        const numberx = number - 1;
        const spans = await page.$$(selector);
        // Kiểm tra xem có ít nhất hai phần tử không
        const span = spans[numberx]; // Lấy phần tử thứ hai (chỉ mục bắt đầu từ 0)
        await span.click({ clickCount: 3 }); // Click 3 lần để bôi đen toàn bộ nội dung
        await page.keyboard.press('Backspace');// Xóa văn bản đã bôi đen
        await page.keyboard.sendCharacter(text);    // Nhập vào nội dung mới
    },
    //HÀM CLICK VÀO SELECTOR 
pclick: async function(element, so, time, note = '') {

    const ele = await page.$$(element);
    const ok = so - 1; // đã trừ đi 1
    if (ele[ok]) {
        await ele[ok].click();
        console.log(`${note}  > "${element}" số ${so} > Đã click.`);
    } else {
        console.log(`${note}  > "${element}" số ${so} > Không tồn tại.`);
    }
    await page.waitForTimeout(time);
},

    //await pclick('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]',2);
    // await pclick(selector cần nhấn, selector thứ mấy, sau đó đợi mấy giây);

    // HÀM ÚP ẢNH PUPUMAGE
    pupimage: async function (selector, image) {

        await page.$eval('input.pptelement', (el, value) => { el.value = value; }, selector);
        await page.$eval('input.pptimage', (el, value) => { el.value = value; }, 'images/' + image); // nhập vào
        await page.waitForTimeout(1000);
        await page.click('button.pptrun'); // nhấn đăng ảnh
        await page.waitForTimeout(1000);
    },
    //await pupimage(slector cần úp , tên ảnh);
    // HÀM KIỂM TRA VÀ CLICK
    pcheckclick: async function (selector, time) {
        const elementHandle = await page.$(selector);
        if (elementHandle !== null) {
            await elementHandle.click();
            await page.waitForTimeout(time);
        };
    },


    //HÀM SPINTEXT
    spinText: async function (spinText) {
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
    },


    // HÀM CHECK XPATH CLICK
    pcheckclickx: async function (xpath, number, time) {
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
    },

    gofanpage: async function (puid) {
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
                await this.pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thử
                await this.pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
                await this.pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
                await this.pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
                await this.pcheckclickx('//span[text()="Dùng Trang"]', 1, 2000);
                // LÀM ADMIN
                await this.pcheckclick('div[aria-label="Chuyển ngay"]', 10000); // kiểm tra néu có nút Chuyển thì nhấn vào sau đó đợi 1000ms
                await this.pcheckclick('div[aria-label="Chuyển"]', 1000); // kiểm tra nút Chuyển có tồn tại hay không có thì nhấn vào
                await this.pcheckclickx('//span[text()="Chuyển"]', 2, 5000) // kiểm tra nút Chuyển có tồn tại hay không có thì nhấn vào
                await this.pcheckclick('div[aria-label="Switch"]', 5000); // kiểm tra nút Switch có tồn tại hay không có thì nhấn vào
                await this.pcheckclick('div[aria-label="Dùng Trang"]', 1000); //kiểm tra nút Dùng trang có không , có thì nhấn vào
                await this.pcheckclick('div[aria-label="Cho phép tất cả cookie"][tabindex="0"]', 1000);
                await this.pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thử
                console.log("Nhấn nút làm admin");
                await page.setDefaultTimeout(3000);
                //ĐÓNG POPUP sau khi làm admin v2
                await this.pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
                await this.pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
                await this.pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
                await this.pcheckclickx('//span[text()="Dùng Trang"]', 1, 5000);

            }
            //ĐÓNG POPUP v2
            await this.pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo Dùng thửF
            await this.pcheckclickx('//span[text()="Tiếp"]', 2, 2000);
            await this.pcheckclickx('//span[text()="Chấp nhận"]', 2, 2000);
            await this.pcheckclickx('//span[text()="Cho phép tất cả cookie"]', 1, 2000);
            await this.pcheckclickx('//span[text()="Dùng Trang"]', 1, 5000);

        }


    },

    // vào group
    gogroup: async function (puidgr) {
        await page.goto('https://www.facebook.com/groups/' + puidgr);
        await page.waitForTimeout(5000);
        // await page.waitForXPath('//span[contains(text(),"File phương tiện")]', { visible: true, timeout: 5000 }); // đợi chữ file phương tiện xuất hiện
    },

    //**FUNCTION RAMDOM */

    ramdomtext: function (number) {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        let result = '';

        for (let i = 0; i < number; i++) {
            const randomIndex = Math.floor(Math.random() * alphabet.length);
            const randomCharacter = alphabet[randomIndex];
            result += randomCharacter;
        }

        return result;
    },

    //**FUNTION TẠO GR
    taogr: async function (pname, pvitri, pbanner) {

        //tạp biến pname
        // let pname; // khai báo biến pname mới sài đc

        await page.goto('https://www.facebook.com/groups/create/');

        console.log('lỗi 1a');
        await page.waitForTimeout(2000); // đợi 1s
        await page.waitForXPath('//span[text()="Xem trước trên máy tính"]', { visible: true, timeout: 5000 });
        console.log('lỗi 1');

        await this.pppinput('input[maxlength="75"]', 1, pname); // nhập tên gr
        console.log('lỗi 2');

        // chọn quyền bằng được thì thôi
        while (true) {
            // Chờ cho Promise từ page.$x được giải quyết và lấy kết quả
            const quyenRiengTu = await page.$x('//span[text()="Công khai"]');
            // Kiểm tra xem có phần tử nào được tìm thấy không
            if (quyenRiengTu.length > 0) {
                break;
            } else {
                console.log('adsd');
                await this.pcheckclickx('//label[@aria-label="Chọn quyền riêng tư"]', 1, 2000);
                await this.pcheckclickx('//span[text()="Công khai"]', 2, 1000);
                await this.pcheckclickx('//span[text()="Công khai"]', 1, 1000);
            }
            await this.pcheckpoint();
        }
        await this.pclick('div[aria-label="Tạo"] span span', 1, 1000); // nhấn nút tạo

        // Nếu nút tạo chưa biến mất tức là đang chưa tạo được, tiến hành gr
        while (true) {
            // hàm này gặp 1 lỗi nếu như nhất nút Tạo mà nút tạo không biến mất ngay lập tức , đến khi vòng lặp lặp lần tiếp theo nút đăng biến mất nhưng vẫn click vào selector thì sẽ gây ra lỗi
            const buttonElementHandle = await page.$x('//span[text()="Tạo"]');
            console.log('đang bị cái éo gì ?');
            await this.pcheckclickx('//span[text()="Tạo"]', 1, 3000);
            if (buttonElementHandle.length > 0) {
                await page.waitForTimeout(500); // Đợi 1 giây hoặc một khoảng thời gian nhất định
                const datTen = await page.$x('//span[text()="Chọn tên nhóm."]'); //chua đặt tên
                const errTen = await page.$x('//span[text()="Đã có nhóm dùng tên đó rồi. Hãy thử dùng tên khác."]'); // tên lỗi
                const loi_tao_gr = await page.$x('//span[text()="Đã xảy ra lỗi khi tạo nhóm."]');

                //** Kiểm tra bị chặn */
                const biChan = await page.$x('//span[text()="Bạn tạm thời bị chặn"]');
                if (biChan.length > 0) {
                    console.log('Bị chặn đăng');
                    throw new Error('B');
                }
                //** Kiểm tra nick có bị ban tạo gr không */
                const khongChoTaoGr = await page.$x('//span[text()="Giờ bạn chưa dùng được tính năng này"]'); // không cho tao gr
                if (khongChoTaoGr.length > 0) {
                    console.log('nick bị hạn chế tạo gr AAAAAAAAAAAAA');
                    throw new Error('BanGr'); // xử lý lỗi B
                }
                // Chưa nhập  tên nhóm
                if (datTen.length > 0) {
                    await this.pppinputv2('input[maxlength="75"]', 1, pname); // nhập tên gr
                    await page.waitForTimeout(500);
                }

                //**kiểm tra phát sinh lỗi và xử ly*/
                if (loi_tao_gr.length > 0) {
                    console.log('loi tao gr roi dkm');
                    await this.pcheckclickx('//span[text()="Đã xảy ra lỗi khi tạo nhóm."]/following::div[@aria-label="Đóng"]', 1, 1000); // đóng popup lại rồi mới xử lý tiếp được
                    // nếu không sảy ra 2 lỗi trên
                    if (errTen.length < 0 && datTen.length < 0) {
                        console.log('CHỨC NĂNG TẠO GR BỊ KHOÁ');
                        throw new Error('B'); // xử lý lỗi B
                    }
                }

                // Kiểm tra xem lỗi đã có người dùng tên gr
                if (errTen.length > 0) {
                    console.log('tên gr bị trùng tiến hành đặt lại tên');
                    await this.pppinputv2('input[maxlength="75"]', 1, (pname + " 4" + ramdomtext(2))); // thêm ramdom ký tự vào cuối tên
                    await page.waitForTimeout(500);
                    console.log('đã chạy tới 2222222222');
                    await buttonElementHandle[0].click(); // Nhấp vào nút tạo
                    console.log('ĐÃ NHẤN ĐƯỢC NÚT TJAO SÔ 111111111111');
                    await page.waitForTimeout(5000);
                }

                //** Kiểm tra xem fanpage này còn cho tạo gr không */
                const idFanBanGr = await page.$x('//span[text()="Đã xảy ra lỗi"]');
                await page.waitForTimeout(1500);
                if (idFanBanGr.length > 0) {
                    console.log('Fan page này đã bị khoá tạo gr rồi : Đã xảy ra lỗi');
                    throw new Error('B');
                }

            } else {
                console.log('đã biết mất nút tạo')
                await page.waitForTimeout(2000);
                break; // Nếu không tìm thấy nút, thoát khỏi vòng lặp
            }
            await this.pcheckpoint();
        }


        await page.waitForTimeout(1000);
        await page.waitForXPath('//span[contains(text(),"File phương tiện")]'); // đợi chữ file phương tiện xuất hiện
        console.log('Đã tạo gr xong');





        //**TẠO ẢNH BÌA GROUND**/
        await page.waitForTimeout(1000);
        await this.pupimage('input[type="file"]', pbanner);// up ảnh bìa
        await page.waitForTimeout(5000);
        await page.waitForXPath('//span[text()="Lưu thay đổi"]'); // đợi chữ lưu thay đổi xuất hiện
        await this.pcheckclickx('//span[text()="Lưu thay đổi"]', 2, 5000); // nhấn vào chữ lưu thay đổi
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
        await this.pcheckclickx('//span //span[text() = "Bật"]', 1, 1000); // nhấn nút lưu vị trí
        await this.pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
        await page.waitForTimeout(3000);

        // sửa đối tượng tham gia nhóm
        await page.click('div[aria-label="Chỉnh sửa ai có thể tham gia nhóm"]');// nhấn vào nút "cài đặt tham gia nhóm"
        await page.waitForTimeout(1000); // đợi 1s để hiện tuỳ chỉnh
        await this.pcheckclickx('//span[text() = "Trang cá nhân và Trang"]', 1, 1000); // nhấn nút lưu vị trí
        await this.pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
        await page.waitForTimeout(3000);

        // chỉnh sửa vị trí nhóm, kiểm tra có vị trí thì mới thực hiện
        if (pvitri) {
            await page.click('div[aria-label="Chỉnh sửa vị trí"]'); // nhấn voà chỉnh sửa vị trí
            await page.waitForTimeout(1000); // đợi 1s để hiện bảng
            await page.type('label[aria-label="Vị trí nhóm"]', pvitri); // nhập vị trí
            await page.waitForTimeout(2000); // đợi 2s để hiển thị đề xuất
            await page.click('li[aria-selected="false"][role="option"]'); // chọn li đầu tiên làm vị trí
            await page.waitForTimeout(2000); // đợi 2s để xác nhận
            await this.pcheckclickx('//span[text() = "Lưu"]', 2, 1000); // nhấn nút lưu vị trí
        }

        // END FUNTION DANGPOSTPAGE
    },

    inputGoogleSheet: async function (subId1 = '', subId2 = '', subId3 = '', subId4 = '', subId5 = '', subId6 = '') {
        await page.goto('https://docs.google.com/forms/d/e/1FAIpQLScB82bM1zmvZ-h-jgENahEGk3GgfwmBicjfTZOOYJOwfn4QBw/viewform'); // vào google sheet điền thông tin
        await page.waitForTimeout(1000);  // Đợi 3 giây
        await page.waitForSelector('div[data-should-execute-invisible-captcha-challenge="false"] span span'); // đợi cho element xuất hiện thì thực hiện hành động tiếp theo
        if (subId1) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 1, subId1);
        if (subId2) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 2, subId2);
        if (subId3) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 3, subId3);
        if (subId4) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 4, subId4);
        if (subId5) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 5, subId5);
        if (subId6) await this.pppinput('input[type="text"][autocomplete="off"][dir="auto"]', 6, subId6);
        await pclick('div[data-should-execute-invisible-captcha-challenge="false"] span span', 1, 3000) // nhấn nút gửi và đợi 3000ms
    },

    // HÀM KIỂM TRA NỘI DUNG
    noidung: async function (text) {
        const hasText = await page.evaluate((text) => {
            // Chuyển đổi cả nội dung trang web và văn bản cần tìm kiếm về dạng chữ thường
            const bodyTextLower = document.body.textContent.toLowerCase();
            const searchTextLower = text.toLowerCase();
            return bodyTextLower.includes(searchTextLower);
        }, text);
        return hasText;
    },

    // chọn nick chính
    chonNickChinh: async function () {
        while (true) {
            await page.goto('https://www.facebook.com/settings/?tab=language');
            await page.waitForTimeout(5000);
            const currentUrl = page.url();
            // / Kiểm tra xem URL có chứa từ khóa 'language' không
            if (currentUrl.includes('language')) {
                console.log('Đã chọn lại nick chính');
                break;
            } else {
                console.log('Đang chọn lại nick chính');
                await this.pcheckclickx('//div[@role="banner"] //*[@data-visualcompletion="ignore-dynamic"]', 1, 2000); // nhấn vào chọn nick
                await this.pcheckclickx('//div[@role="list"] //*[@role="listitem"] //*[@data-visualcompletion="ignore-dynamic"]', 1, 3000); // chọn nick chính
            }
            await pcheckpoint();

        }
    },

    // chọn ngôn ngữ tiếng việt
    doiNgonNgu: async function () {

        while (true) {
            // nếu đã là tiếng việt thi out luôn
            await page.goto('https://www.facebook.com/settings/?tab=language');
            await page.waitForTimeout(5000);
            if (await noidung('tiếng việt') || await noidung('nhóm') || await noidung('quản lý')) {
                console.log('Nội dung đã là tiếng việt');
                break;
            }
            // nếu chưa phải thì vào được trang language mới đổi được ngôn ngữ
            const currentUrl = page.url();
            if (currentUrl.includes('language')) {
                // kiểm tra url có phải trang thay đổi ngôn ngữ chưa
                console.log('url đã là trang đổi ngôn ngữ');
            } else {
                // nếu chưa phải url đổi ngôn ngữ thì vào trang đổi ngôn nguwx
                await chonNickChinh(); // chọn lại chính chính rồi vào lại langeue
                await page.goto('https://www.facebook.com/settings/?tab=language');
                await page.waitForXPath('//div[@role="main"] //*[@role="button"][@tabindex="0"]', { timeout: 5000 });
                await page.waitForTimeout(1000);
                console.log('Vào được trang đổi ngôn ngữ thành công');
            }
            // tiến hành đổi ngôn nguwxF

            await page.waitForTimeout(3000);
            await this.pcheckclickx('//div[@role="main"] //*[@role="button"][@tabindex="0"]', 1, 1000);
            await this.pcheckclickx('//div[@aria-expanded="false"][@aria-haspopup="listbox"]', 1, 1000); // nhấn vào tuỳ chọn ngôn ngữ
            await this.pcheckclickx('//div[@aria-hidden="false"] //span[text()="Tiếng Việt"]', 1, 2000); // nếu có 2 phần tử thì nhấn cái thứ 2
            await this.pcheckclickx('//div[@role="button"][@tabindex="0"] //div //div //div //span //span', 2, 2000); // lưu thay đổi
            await this.pcheckclickx('//div[@role="dialog"] //*[@aria-hidden="false"] //*[@role="button"] //span', 1, 2000);

            await this.pcheckpoint(); // kiểm tra checkpoint vòng lawjpF

        }

    },


    //>> NHẤN ĐĂNG SẢN PHẨM V2
    clickpostfb: async function () {
        while (true) {
            // Tìm phần tử có text là "Đăng" và nhấn
            const submitButtons = await page.$x('//span[text()="Đăng"]');
            if (submitButtons.length === 2) {
                await submitButtons[1].click(); // Nhấn vào phần tử thứ 2 nếu có 2 phần tử
            } else if (submitButtons.length === 1) {
                await submitButtons[0].click(); // Nhấn vào phần tử đầu tiên nếu chỉ có 1 phần tử
            } else {
                console.log('Không tìm thấy phần tử nút "Đăng".');
            }

            try {
                // Chờ xem phần tử có text là "Đang đăng" có xuất hiện không
                await page.waitForXPath('//span[text()="Đang đăng"]', {
                    timeout: 3000
                });
                console.log('Đã click nút Đăng')
                await page.waitForTimeout(2000);
                let element = await page.$x("//span[contains(text(), 'Đang đăng')]");
                while (element.length > 0) {
                    console.log('Đang đợi đăng xong..');
                    await this.pcheckclick('div[aria-label="Đăng bài viết gốc"]', 500); //kiểm tra nút Dùng trang có không , có thì nhấn vào
                    await this.pcheckclickx('//span[text()="Lúc khác"]', 1, 500);
                    await this.pcheckclickx('//span[text()="Đăng bài viết gốc"]', 1, 500);
                    await page.waitForTimeout(500); // Đợi trong 1 giây
                    element = await page.$x("//span[contains(text(), 'Đang đăng')]"); // Kiểm tra lại phần tử
                }
                console.log('NHẤN ĐĂNG BÀI HOÀN TẤT');
                break;
            } catch (error) {
                // Nếu phần tử không xuất hiện, thông báo nhấn lại
                console.log('Nhấn lại.');
                await this.pcheckclickx('//span[text()="Lúc khác"]', 1, 500);
                await this.pcheckclickx('//span[text()="Đăng bài viết gốc"]', 1, 500);
            }
        }
    },



    ppostpage: async function (ppost, pimage, pvitri) {

        //>> NHẤN VÀO KHỞI CHẠY BÀI VIẾT
        await page.waitForTimeout(1000); // đợi 1000ms
        console.log("tiến hàng post bài");
        await page.waitForTimeout(1000); // đợi 1000ms
        //await pclick('div[role="button"] span[style="-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;"]',1,3000); // nhấn vào selector và đợi 3 giây
        await this.pclick('div[role="button"] span[style="-webkit-box-orient: vertical; -webkit-line-clamp: 2; display: -webkit-box;"]', 1, 3000); // nhấn vào selector và đợi 3 giây
        await this.pcheckclick('div[aria-label="Xong"]', 2000);
        //>> CHỌN VỊ TRÍ BÀI ĐĂNG
        await this.pclick('img[style="height: 24px; width: 24px;"]', 3, 1000); // nhấn vào biểu tượng icon số 3 và đợi 1000ms
        await page.type('input[aria-label="Bạn đang ở đâu?"]', pvitri);
        await page.waitForTimeout(2000);
        await page.click('li[aria-selected="false"][role="option"]'); // nhấn vào lid đầu tiên
        await page.waitForTimeout(1000);

        //>> ĐĂNG ẢNH POST
        await this.pclick('img[style="height: 24px; width: 24px;"]', 1, 2000); // nhấn vào selector icon đăng ảnh để đợ ô input ảnh xuất hiện
        await this.pclick('img[style="height: 24px; width: 24px;"]', 1, 2000); // nhấn thêm lần nữa cho chắc cú
        await this.pupimage('input[type="file"][accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"][multiple]', pimage); // đăng ảnh post lên
        await page.waitForXPath('//span[text()="hoặc kéo và thả"]', { hidden: true }); // đợi hoặc kéo và thả biến mất // đã đang ảnh lên
        await page.waitForTimeout(1000);

        //>> COPY DÁN NỘI DUNG BÀI VIẾT
        // giải mã hoá \r\r thành \n
        const ppostgiaimahoa = await this.spinText(ppost);

        //await page.type('div[aria-label="Tạo bài viết công khai..."]', ppostgiaimahoa); //post bài viết theo dạng type
        await this.pppinput('div[aria-label="Bạn đang nghĩ gì?"]', 1, ppostgiaimahoa); // copy paset bài viết vào ô có chữ "Bạn đang nghĩ gì"
        await page.waitForTimeout(2000); // đợi 1000ms giây


        await this.clickpostfb(); // đăng bài và xửa lý đăng
        await page.waitForTimeout(3000); // đợi thêm 3s để cho chắc cú
        //>> CHECK LỖI ĐĂNG BÀI
        await this.pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo
        let checkerrpost = await page.$x('//span[text()="Bạn đang nghĩ gì?"]');
        if (checkerrpost.length > 0) {
            console.log('ĐĂNG BÀI VIẾT THÀNH CÔNG');

        } else {
            console.log('lỗi đăng bài viết để thử lại');
            // throw new Error('A'); // nếu là lỗi A thì sẽ chạy lại vòng lặp
        }
        await page.waitForTimeout(1000);
        //>> LẤY LINK BÀI VỪA ĐĂNG
        await page.waitForTimeout(3000);  // Đợi 3 giây
        const elements = await page.$$('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]');
        // Kiểm tra số lượng các thành phần được chọn.
        if (elements.length >= 2) {
            // Nếu có hai thành phần hoặc hơn, nhấn vào thành phần thứ hai.
            await elements[1].click();
        } else if (elements.length === 1) {
            // Nếu chỉ có một thành phần, nhấn vào thành phần đó.
            await elements[0].click();
        } else {
            await this.pclick('span[dir="auto"] span span span a[role="link"][tabindex="0"]', 2, 1000);
            // Nếu không có thành phần nào được chọn, thông báo lỗi.
            console.log('Không tìm thấy thành phần nhấn vào selector đặc biệt');
        }
        await this.pcheckclick('div[aria-label="Rời khỏi"][tabindex="0"]', 1000); // kiểm tra xem có hàm này không . có thì nhấn vào
        await page.waitForTimeout(1000); // đợi 1s để cho chắc chắn là đã nhấn vào element 
        await page.waitForSelector('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]'); // đợi cho element link post xuất hiện
    },


    ppostgroup: async function (ppost, pimage, pvitri) {

        //>> NHẤN VÀO KHỞI CHẠY BÀI VIẾT
        await this.pcheckclickx('//span[contains(text(), "Bạn viết gì đi...")]', 1, 5000);
        console.log('tới  3a1');

        //>> CHECK IN BÀI VIẾT
        let elements = await page.$x('//div[@aria-label="Check in"]'); // kiểm tra xpth có chữ check in
        if (elements.length > 0) {
            await this.pcheckclickx('//div[@aria-label="Check in"]', 1, 2000);
        } else {
            await this.pcheckclickx('//div[@role="dialog"] //div[@aria-label="Xem thêm" and @role="button"]', 1, 2000);
            await this.pcheckclickx('//span[text()="Check in"]', 1, 2000)
        }

        console.log('tới  3a2');
        await page.type('input[aria-label="Bạn đang ở đâu?"]', pvitri);
        await page.waitForTimeout(2000);
        await page.click('li[aria-selected="false"][role="option"]'); // nhấn vào lid đầu tiên
        await page.waitForTimeout(1000);
        console.log('tới  4a');

        //>> ĐĂNG ẢNH POST
        // chú thích : một số group facebook nó tự có sẵn element input ảnh post bài viết , nếu mà nhấn vào sẽ hiện bảng thao tác .
        const elementExistence = await page.$('input[type="file"][accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"][multiple]');


        if (elementExistence) {
            console.log('Elemen input ảnh post có sẵn chỉ cần input');
            await this.pupimage('input[type="file"][accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"][multiple]', pimage); // đăng ảnh post lên
            await page.waitForTimeout(3000);

            //>> COPY DÁN NỘI DUNG BÀI VIẾT
            const ppostgiaimahoa = await this.spinText(ppost); // giải mã hoá \r\r thành \n và spintext
            //await page.type('div[aria-label="Tạo bài viết công khai..."]', ppostgiaimahoa); //post bài viết theo dạng type
            await this.pppinput('div[aria-label="Tạo bài viết công khai..."]', 2, ppostgiaimahoa); // copy paset bài viết vào ô có chữ "Bạn đang nghĩ gì" chọn cái thứ 2
            await page.waitForTimeout(2000); // đợi 1000ms giây


        } else {
            console.log('Elemen input ảnh post không có sẵn phải thao tác tay.');
            await pclick('img[style="height: 24px; width: 24px;"]', 1, 2000); // nhấn vào selector icon đăng ảnh để đợ ô input ảnh xuất hiện
            await pclick('img[style="height: 24px; width: 24px;"]', 1, 2000); // nhấn thêm lần nữa cho chắc cú
            await this.pupimage('input[type="file"][accept="image/*,image/heif,image/heic,video/*,video/mp4,video/x-m4v,video/x-matroska,.mkv"][multiple]', pimage); // đăng ảnh post lên
            await page.waitForXPath('//span[text()="hoặc kéo và thả"]', {
                hidden: true
            }); // đợi hoặc kéo và thả biến mất // đã đang ảnh lên
            await page.waitForTimeout(3000);
            //>> COPY DÁN NỘI DUNG BÀI VIẾT
            const ppostgiaimahoa = await spinText(ppost); // giải mã hoá \r\r thành \n và spintext
            //await page.type('div[aria-label="Tạo bài viết công khai..."]', ppostgiaimahoa); //post bài viết theo dạng type
            await this.pppinput('div[aria-label="Tạo bài viết công khai..."]', 1, ppostgiaimahoa); // copy paset bài viết vào ô có chữ "Bạn đang nghĩ gì" chọn cái thứ 1
            await page.waitForTimeout(2000); // đợi 1000ms giây

        }



        //>> NHẤN ĐĂNG SẢN PHẨM V2
        await this.clickpostfb(); // đăng bài và xửa lý đăng
        await page.waitForTimeout(3000); // đợi thêm 3s để cho chắc cú
        //>> CHECK LỖI ĐĂNG BÀI
        await this.pcheckclick('div[aria-label="Đóng"]', 1000) // tắt thông báo
        let checkerrpost = await page.$x('//span[text()="Bạn viết gì đi..."]');
        if (checkerrpost.length > 0) {
            console.log('ĐĂNG BÀI VIẾT THÀNH CÔNG');

        } else {
            console.log('lỗi đăng bài viết để thử lại');
            throw new Error('B'); // nếu là lỗi A thì sẽ chạy lại vòng lặp
        }
        await page.waitForTimeout(1000);




        //>> LẤY LINK BÀI VỪA ĐĂNG
        async function clicklinkpost() {
            await page.waitForTimeout(3000);  // Đợi 3 giây
            const elements = await page.$$('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]');
            // Kiểm tra số lượng các thành phần được chọn.
            if (elements.length >= 2) {
                // Nếu có hai thành phần hoặc hơn, nhấn vào thành phần thứ hai.
                await elements[1].click();
            } else if (elements.length === 1) {
                // Nếu chỉ có một thành phần, nhấn vào thành phần đó.
                await elements[0].click();
            } else {
                await this.pclick('span[dir="auto"] span span span a[role="link"][tabindex="0"]', 2, 1000);
                // Nếu không có thành phần nào được chọn, thông báo lỗi.
                console.log('Không tìm thấy thành phần nhấn vào selector đặc biệt');
            }
        };
        await this.clicklinkpost(); // click vào linkpost
        await this.pcheckclick('div[aria-label="Rời khỏi"][tabindex="0"]', 1000); // kiểm tra xem có hàm này không . có thì nhấn vào
        await page.waitForTimeout(5000); // đợi 1s để cho chắc chắn là đã nhấn vào element 
        await page.waitForSelector('div[aria-posinset="1"][role="article"] span[dir="auto"] span span span a[role="link"][tabindex="0"]'); // đợi cho element link post xuất hiện


    },
    convertData: function(inputText) {
        // Tách nội dung từ inputText
        const inputData = inputText.trim().split('\n').map(line => line.split('//##//'));

        // Tạo đối tượng data để chứa các mảng con
        const data = {};

        // Lấy tên cột từ hàng đầu tiên
        const columnNames = inputData[0];

        // Tạo mảng con cho mỗi cột
        columnNames.forEach((columnName, index) => {
            data[columnName] = inputData.slice(1).map(row => row[index]);
        });

        return data;
    },
   postPageGroup: async function(pcode, puid, puidgr, ppost, pimage, pvitri) {
    //>> CHỌN PAGE ĐĂNG BÀI CHUYỂN HƯỚNG BÀI VIẾT
    await this.gofanpage(puid); // làm admin fanpage
     console.log('lỗi 333');
    await this.ppostpage(ppost, pimage, pvitri);
         console.log('lỗi 444');

    const urlpostpage = await page.url(); // lấy link post hiện tại
    await this.gogroup(puidgr);
    await this.ppostgroup(ppost, pimage, pvitri);
    const urlpostgroup = await page.url(); // lấy link post hiện tại
    await this.inputGoogleSheet(pcode, puid, puidgr, urlpostpage, urlpostgroup, "đăng page group"); // nhập id

},
    runpostPageGroup: async function(start, data) {
    let startIndex = 0;

    if (typeof start === 'number') {
        startIndex = Math.max(0, start - 1);
    } else if (start === undefined || start === '') {
        startIndex = 0;
    } else if (typeof start === 'string') {
        startIndex = data.pcode.indexOf(start);
        if (startIndex === -1) {
            startIndex = 0;
        }
    }
console.log(`Vòng lặp thứ ${startIndex + 1} với post ${data.pcode[startIndex]}`);
    for (let i = startIndex; i < data.pcode.length; i++) {
        let errorOccurred;
        do {
            errorOccurred = false;
            try {
                await this.postPageGroup(data.pcode[i], data.puid[i], data.puidgr[i], data.ppost[i], data.pimage[i], data.pvitri[i]);
                console.log('Vòng lặp đang tiếp tục');
            } catch (error) {
                if (error.message === 'A') {
                    errorOccurred = true;
                    console.log('Gặp lỗi "A", thử lại...');
                } else {
                    await page.evaluate(() => {
                        window.onbeforeunload = null;
                    });
                }
            }
        } while (errorOccurred);
    }
},
    goVanBan: async function (selector, text) {
    const spans = await page.$$(selector);

    for (let span of spans) {
        // Bôi đen nội dung hiện tại trong span
        await span.click({ clickCount: 3 }); // Click 3 lần để bôi đen toàn bộ nội dung

        // Nhập vào 'đây là văn bản mới' với tốc độ nhanh nhất
        await page.keyboard.type(text, { delay: 0 });
    }
},
toiUuPage:async function (pcode, puid, pavatar, pbanner, pcity, pzip, pvitri, pphonev1, pphonev2, pmail, pweb, pmess) {

    //>> CHỌN PAGE ĐĂNG BÀI CHUYỂN HƯỚNG BÀI VIẾT
    await this.gofanpage(puid); // làm admin fanpage

    //**ẢNH BÌA VÀ AVATAR */

    //**tạo avatar */
    await this.pcheckclickx('//div[@aria-label="Cập nhật ảnh đại diện"]', 1, 1000);
    await this.pupimage('div[aria-label="Chọn ảnh đại diện"] input[type="file"]', pavatar);
    await page.waitForTimeout(5000);
    await page.waitForXPath('//span[text()="Lưu"]'); // đợi chữ lưu thay đổi xuất hiện
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 5000); // Lưu

    // **tạo ảnh bìa*/
    await this.pupimage('input[type="file"]', pbanner);
    await page.waitForTimeout(5000);
    await page.waitForXPath('//span[text()="Lưu thay đổi"]'); // đợi chữ lưu thay đổi xuất hiện
    await this.pcheckclickx('//span[text()="Lưu thay đổi"]', 2, 5000); // nhấn vào chữ lưu thay đổi

    //** SỬA PHẦN 1 */
    await page.goto('https://www.facebook.com/profile.php?id=' + puid + '&sk=about_contact_and_basic_info');
    await page.waitForTimeout(5000);
    // **sửa địa chỉ pcity
    await this.pcheckclickx('//span[text()="Thêm địa chỉ của bạn"]', 1, 1000);
    await this.pppinput('input[aria-label="Thành phố/Thị xã"]', 1, pcity);
    await page.waitForTimeout(2000);
    await this.pcheckclick('li[aria-selected="false"][role="option"]', 1000);
    await this.pppinput('label[aria-label="Mã ZIP"]', 1, pzip.toString());
    await this.pppinput('label[aria-label="Khu vực"]', 1, pcity);
    await this.pcheckclickx('//span [text()="Lưu"]', 1, 3000); // lưu 

    // **khu vực dịch vụ
    await this.pcheckclickx('//span[text()="Thêm khu vực dịch vụ"]', 1, 1000);
    for (let i = 0; i < 3; i++) {
        await this.pppinput('input[aria-label="Khu vực dịch vụ"]', 1, pvitri);
        await page.waitForTimeout(2000);
        await this.pcheckclick('li[aria-selected="false"][role="option"]', 1000);
    }
    await this.pcheckclickx('//span [text()="Lưu"]', 1, 3000); // lưu 

    //** thêm mail */
    await this.pcheckclickx('//span[text()="Thêm email"]', 1, 1000);
    await this.pppinput('label[aria-label="Email"]', 1, pmail);
    await page.waitForTimeout(2000);
    await this.pcheckclickx('//span [text()="Lưu"]', 1, 3000); // lưu 

    //**Thêm một trang web*/
    await this.pcheckclickx('//span[text()="Thêm một trang web"]', 1, 1000);
    await this.pppinput('label[aria-label="Địa chỉ trang web"]', 1, pweb);
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 3000); // lưu 

    //**Thêm giờ mở cửa*/
    await this.pcheckclickx('//span[text()="Thêm giờ mở cửa"]', 1, 1000);
    await this.pcheckclickx('//span[text()="Luôn mở cửa"]', 1, 1000);
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 3000); // lưu 

    // **Thêm khoảng giá*/
    await this.pcheckclickx('//span[text()="Thêm khoảng giá"]', 1, 1000);
    await this.pcheckclickx('//input[@aria-checked="false"]', 1, 1000);
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 3000); // lưu 

    //**Thêm số điện thoại*/
    await this.pcheckclickx('//span[text()="Thêm số điện thoại"]', 1, 1000);
    await this.pcheckclickx('//div[@aria-expanded="false"][@aria-haspopup="menu"] //div //span', 1, 1000);
    await this.pppinput('input[aria-invalid="false"][aria-label="Tìm kiếm"]', 1, pphonev1.toString());
    await this.pcheckclickx('//div[@aria-checked="false"][@role="menuitemradio"]', 1, 1000);
    await this.pppinput('label[aria-label="Số điện thoại"]', 1, pphonev2.toString());
    await page.waitForTimeout(2000);
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 3000); // lưu 


    //** SỬA PHẦN 2 */
    await page.goto('https://www.facebook.com/' + puid + '/page_completion_meter/?ref=comet_profile_plus_self_view');
    await page.waitForTimeout(5000);
    //**Whatsapp */
    await this.pcheckclickx('//span[text()="Liên kết WhatsApp"] //following::span[text()="Xem thêm"]', 1, 3000);
    await this.pcheckclickx('//span[text()="Thông tin này không áp dụng cho Trang của tôi"]', 1, 1000);

    //**Mời bạn bè */
    await this.pcheckclickx('//span[text()="Mời bạn bè"] //following::span[text()="Xem thêm"]', 1, 3000);
    await this.pcheckclickx('//span[text()="Bỏ qua và đánh dấu là hoàn tất"]', 1, 1000);

    //**Thêm nút hành động */
    await this.pcheckclickx('//span[text()="Thêm nút hành động"] //following::span[text()="Thêm nút"]', 1, 3000);
    await this.pcheckclickx('//span[text()="Dùng thử"]', 1, 1000);
    await this.pcheckclickx('//span[text()="Tìm hiểu thêm"] //following::span[text()="Mở một trang web"]', 1, 3000);
    await this.pcheckclickx('//span[text()="Tiếp"]', 1, 3000); // lưu 
    await this.pcheckclickx('//span[text()="Thêm liên kết đến trang web"]', 1, 1000);
    await this.pppinput('label[aria-label="Thêm liên kết đến trang web"]', 1, pweb);
    await page.waitForTimeout(1000);
    await this.pcheckclickx('//span[text()="Lưu"]', 1, 3000); // lưu 


    //** EDIT MESS */

    // Lấy uid fanpage 
    const puidv2 = await page.evaluate(() => {
        let regex = /"PAGE_MESSAGING_MAILBOX_ID":"(\d+)"/;
        let matches = document.body.innerHTML.match(regex);
        return matches ? matches[1] : 'not found';
    });

    const pmessok = await spinText(pmess);
    for (let i = 0; i < 3; i++) {
        await page.goto('https://business.facebook.com/latest/inbox/automated_responses?asset_id=' + puidv2 + '&automation_template=instant_reply&partnership_messages=false&launch_onboarding=false&auto_open_saved_replies=false&auto_open_order_tip=false');
        await page.waitForTimeout(5000);
        const checktl = await page.$x('//div[text()="Tin trả lời nhanh"]');
        if (checktl.length > 0) {
            console.log('Đã hiện bảng seting mess');
            break;
        } else {
            console.log('không tồn tải phải load lại');
        }
    }

    try {
        console.log('tiền hành edit mess');
        await this.pcheckclickx('//input[@aria-checked="false"][@aria-label="Đang tắt"]', 1, 1000);
        await this.pcheckclickx('//input[@aria-disabled="false"][@aria-label="Tắt"]', 1, 1000);
        await this.goVanBan('span[data-text="true"]', pmessok);
        await this.pcheckclickx('//div[text()="Lưu thay đổi"]', 1, 3000);
    }
    catch (e) {
        console.log('lỗi cc');
    }


    //** Báo cáo */
    await this.inputGoogleSheet(pcode, puid,puidv2,"Tối fanpage hoàn tất");

},
   
    
runToiUuPage:async function(data) {
    for (let i = 0; i < data.pcode.length; i++) {
        let errorOccurred;
        // sưqr dụng vòng lặp do while thực hiện câu lệnh ít nhất một lần trước khi kết thúc , nếu sảy ra lỗi thì trả về true để lặp lại
        do {
            errorOccurred = false;
            try {
                await toiUuPage(data.pcode[i], data.puid[i], data.pavatar[i], data.pbanner[i], data.pcity[i], data.pzip[i], data.pvitri[i], data.pphonev1[i], data.pphonev2[i], data.pmail[i], data.pweb[i], data.pmess[i]);
                // (pcode,puid,pname,pvitri,pbanne)
                console.log('vòng lặp đang tiếp theo');
            } catch (error) {
                if (error.message === 'A') {
                    errorOccurred = true; // nếu true thì nó sẽ lặp lại , nếu false thì nó kết thúc
                    console.log('Gặp lỗi "A", thử lại...');
                } else {
                    await page.evaluate(() => {
                        window.onbeforeunload = null;
                    });
                }
            }
        } while (errorOccurred);
    }
},
    
}
globalThis.mfp = mfp;
