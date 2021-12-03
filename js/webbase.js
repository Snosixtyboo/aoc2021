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
    let dayCodeDiv = document.createElement("div");
    dayCodeDiv.id = "code";
    let codeHeading = document.createElement("h2");
    codeHeading.innerHTML = "Solution for Part 1 & 2";
    dayCodeDiv.append(codeHeading);
    let dayCode = document.createElement("pre");
    let daySrc = document.createElement("code");
    daySrc.innerHTML = day.source;
    hljs.highlightElement(daySrc);
    dayCode.appendChild(daySrc);
    dayCodeDiv.appendChild(dayCode);
    dayParagraph.appendChild(dayCodeDiv);
    let challengesDiv = document.createElement("div");
    challengesDiv.id = "challenges";
    let inputs = [day.input1, day.input2];
    for (let c = 0; c < 2; c++) {
        let challengeDiv = document.createElement("div");
        challengeDiv.id = "challenge";
        challengesDiv.append(challengeDiv);
        let challengeHeading = document.createElement("h2");
        challengeHeading.innerHTML = "Input Part " + (c + 1).toString();
        challengeDiv.append(challengeHeading);
        let challengeInput = document.createElement("textarea");
        challengeInput.value = inputs[c];
        challengeDiv.append(challengeInput);
    }
    dayParagraph.append(challengesDiv);
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