    function spinText(text) {
        const icons = ['🍏','🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🍈','🥝','🥑','🍍','🍒','🍑','🍆','🍅','🍠','🌼','🌸','🌺','🏵️','🌻','🌷','🌹','🥀','💐','🌾','🎋','☘','🍀','🍃','🍂','🍁','🌱','🌿','🎍','🌵','🌴','🌳','🎄','🍄','💫','⭐','🌟','✨','⚡','🔥','💥','☄️','🌞','🍭','🍧','🍨','🍦','🥞','🍰','🎂','🍬','🍿','🥃','🍹','♥️','❤️','💛','💚','💙','👍','👌️','🎖️️','🏅️','🥇️','🏆','💎','🎲','🔔','📣','♻️','💯','♨️','🌀','✴️','✳️','✔️','✅','🔴','🔵','💘','💟','🐤'];
        return text.replace(/\\r\\r/g, '\\n')
            .replace(/{([^{}]+?)}/g, (_, choices) => choices.split("|")[Math.floor(Math.random() * choices.split("|").length)])
            .replace(/\\[r3\\]/g, () => icons[Math.floor(Math.random() * icons.length)]);
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
