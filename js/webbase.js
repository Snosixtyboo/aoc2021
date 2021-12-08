import * as load from "./load";
import hljs from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
hljs.registerLanguage('typescript', typescript);
import katex from 'katex';
class FileNotFoundError extends Error {
}
function readFileWeb(file) {
    return fetch(file).then(function (response) {
        if (!response.ok)
            throw new FileNotFoundError("404 " + file);
        return response.text();
    });
}
function addDescription(day, dayParagraph) {
    let dayDescDiv = document.createElement("div");
    dayDescDiv.id = "desc";
    let latexHTML = "";
    let lastEnd = 0;
    const regexp = /(?:\$(.*?)\$)/g;
    let match;
    while ((match = regexp.exec(day.desc)) !== null) {
        latexHTML += day.desc.substring(lastEnd, match.index);
        latexHTML += katex.renderToString(match[1]);
        lastEnd = regexp.lastIndex;
    }
    latexHTML += day.desc.substring(lastEnd, day.desc.length);
    dayDescDiv.innerHTML = latexHTML;
    dayParagraph.appendChild(dayDescDiv);
}
function addSource(day, dayParagraph) {
    let dayCodeDiv = document.createElement("div");
    dayCodeDiv.id = "code";
    let codeHeading = document.createElement("h2");
    codeHeading.innerHTML = "Solution for " + day.name;
    dayCodeDiv.append(codeHeading);
    let dayCode = document.createElement("pre");
    let daySrc = document.createElement("code");
    daySrc.appendChild(document.createTextNode(day.source));
    hljs.highlightElement(daySrc);
    dayCode.appendChild(daySrc);
    dayCodeDiv.appendChild(dayCode);
    dayParagraph.appendChild(dayCodeDiv);
}
function addRunnables(day, dayParagraph) {
    let runnablesDiv = document.createElement("div");
    runnablesDiv.id = "parts";
    let parts = [{ input: day.input, func: day.solve1 }, { input: day.input, func: day.solve2 }];
    for (let c = 0; c < 2; c++) {
        let runnableDiv = document.createElement("div");
        runnableDiv.id = "part";
        runnablesDiv.append(runnableDiv);
        let runnableHeading = document.createElement("h2");
        runnableHeading.innerHTML = "Input Part " + (c + 1).toString();
        let runnableInput = document.createElement("textarea");
        runnableInput.value = parts[c].input;
        let runnableRunDiv = document.createElement("div");
        runnableRunDiv.id = "partRun";
        let runnableOutput = document.createTextNode("???");
        let runnableRunButton = document.createElement("button");
        runnableRunButton.innerHTML = "Run!";
        runnableRunButton.onclick = () => {
            try {
                runnableOutput.textContent = parts[c].func(runnableInput.value);
            }
            catch (err) {
                alert("Whoops, that did not go well! Is the input perhaps malformed?");
            }
        };
        runnableRunDiv.append(runnableRunButton, document.createTextNode("   Output: "), runnableOutput);
        runnableDiv.append(runnableHeading, runnableInput, runnableRunDiv);
    }
    dayParagraph.append(runnablesDiv);
}
function createDay(day) {
    let dayParagraph = document.createElement("p");
    addDescription(day, dayParagraph);
    addSource(day, dayParagraph);
    addRunnables(day, dayParagraph);
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
let buttonRow = document.createElement("p");
document.body.appendChild(buttonRow);
let contentSpace = document.createElement("p");
document.body.appendChild(contentSpace);
Promise.allSettled(load.loadDays(readFileWeb)).then(function (days) {
    let c = document.createElement('canvas');
    c.height = 300;
    c.width = window.innerWidth;
    let ctx = c.getContext('2d');
    for (var x = 0; x < c.width; x++) {
        for (var y = 0; y < c.height; y++) {
            ctx.fillStyle = 'hsla(0, 0%, ' + (40 - (Math.random() * 35)) + '%,' + (1 - y / 300) + ')';
            ctx.fillRect(x, y, 1, 1);
        }
    }
    document.body.style.background = 'url(' + c.toDataURL() + ')';
    document.body.style.backgroundRepeat = "no-repeat";
    for (let day of days) {
        if (day.status == 'fulfilled')
            createDay(day.value);
        else
            console.log("Oh, cry me a river!");
    }
});
//# sourceMappingURL=webbase.js.map