let dateFormat = "YYYY-[W]WW";
let journalFileNames = dv.pages('"' + dv.current().file.folder + '"')
    .where(p => moment(p.file.name, dateFormat, true).isValid())
    .sort(p => p.date)
    .map(p => p.file.name);

let currentFileName = dv.current().file.name;
let currentFileIndex = journalFileNames.findIndex((name) => name == currentFileName);
let previousFileIndex = currentFileIndex == 0 ? -1 : currentFileIndex - 1;
let nextFileIndex = currentFileIndex == journalFileNames.length - 1 ? -1 : currentFileIndex + 1;

let thisNoteDate = moment(dv.current().file.name, dateFormat);
let lastWeek = thisNoteDate.clone().subtract(1, 'weeks').format(dateFormat); // 이전 주
let lastWeekLink = "[" + lastWeek + "](<" + dv.current().file.folder + "/" + lastWeek + ">)";
let lastWeekCreateLink = "[" + lastWeek + " (create)](<" + dv.current().file.folder + "/" + lastWeek + ">)";

let nextWeek = thisNoteDate.clone().add(1, 'weeks').format(dateFormat); // 다음 주
let nextWeekLink = "[" + nextWeek + "](<" + dv.current().file.folder + "/" + nextWeek + ">)";
let nextWeekCreateLink = "[" + nextWeek + " (create)](<" + dv.current().file.folder + "/" + nextWeek + ">)";

var previousLink = lastWeekCreateLink;
if (previousFileIndex != -1) {
    let previousFileName = journalFileNames[previousFileIndex];
    let previousFileFormatted = moment(previousFileName).format(dateFormat);
    let nearestPrevFileLink = "[" + previousFileFormatted + "](" + previousFileName + ")";
    if (previousFileName != lastWeek) {
        previousLink = nearestPrevFileLink + " ← " + lastWeekCreateLink;
    } else {
        previousLink = lastWeekLink;
    }
}

var nextLink = nextWeekCreateLink;
if (nextFileIndex != -1) {
    let nextFileName = journalFileNames[nextFileIndex];
    let nextFileFormatted = moment(nextFileName).format(dateFormat);
    let nearestNextFileLink = "[" + nextFileFormatted + "](" + nextFileName + ")";
    if (nextFileName != nextWeek) {
        nextLink = nextWeekCreateLink + " → " + nearestNextFileLink;
    } else {
        nextLink = nextWeekLink;
    }
}
dv.paragraph(previousLink + " ← " + currentFileName + " → " + nextLink);
