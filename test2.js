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

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function reverseString(string) {
        return string.split('').reverse().join('');
    }

    function clickLink(page, selector) {
    return page.click(selector);
    }

    return {spinText, capitalizeFirstLetter, reverseString,clickLink};
