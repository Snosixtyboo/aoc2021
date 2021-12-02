import * as load from "./load";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
function readFileWeb(file) {
    return fetch(file).then(function (response) {
        if (!response.ok)
            throw Error("404 " + file);
        return response.text();
    });
}
let buttonRow = document.createElement("p");
document.body.appendChild(buttonRow);
let contentSpace = document.createElement("p");
document.body.appendChild(contentSpace);
function createDay(day) {
    let dayParagraph = document.createElement("p");
    dayParagraph.innerHTML = day.desc;
    let dayCode = document.createElement("pre");
    let daySrc = document.createElement("code");
    daySrc.innerHTML = day.source;
    dayCode.appendChild(daySrc);
    hljs.highlightElement(daySrc);
    dayParagraph.appendChild(dayCode);
    contentSpace.appendChild(dayParagraph);
    let button = document.createElement("button");
    button.innerHTML = day.name;
    button.onclick = function (ev) {
        for (let content of contentSpace.children)
            content.style.display = 'none';
        dayParagraph.style.display = 'initial';
    };
    button.click();
    buttonRow.appendChild(button);
}
Promise.allSettled(load.loadDays(readFileWeb)).then(function (days) {
    for (let day of days) {
        if (day.status == 'fulfilled')
            createDay(day.value);
        else
            console.log("Oh, cry me a river!");
    }
});
//# sourceMappingURL=webbase.js.map