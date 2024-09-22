let dateFormat = "YYYY-MM-DD";
let dateFormatWithDay = "YYYY-MM-DD ddd";
let journalFileNames = dv.pages('"' + dv.current().file.folder + '"')
	.where(p => moment(p.file.name, dateFormat, true).isValid())
	.sort(p => p.date)
	.map(p => p.file.name);

let currentFileName = dv.current().file.name;
let currentFileFormatted = moment(currentFileName).format(dateFormatWithDay);
let currentFileIndex = journalFileNames.findIndex((name) => name == currentFileName);
let previousFileIndex = currentFileIndex == 0 ? -1 : currentFileIndex - 1;
let nextFileIndex = currentFileIndex == journalFileNames.length - 1 ? -1 : currentFileIndex + 1;

let thisNoteDate = moment(dv.current().file.name, dateFormat);
let yesterday = thisNoteDate.clone().subtract(1, 'days').format(dateFormat);
let yesterdayFormatted = thisNoteDate.clone().subtract(1, 'days').format(dateFormatWithDay);
let yesterdayLink = "[" + yesterdayFormatted + "](<" + dv.current().file.folder + "/" + yesterday + ">)";
let yesterdayCreateLink = "[" + yesterdayFormatted + " (create)](<" + dv.current().file.folder + "/" + yesterday + ">)";

let tomorrow = thisNoteDate.clone().add(1, 'days').format(dateFormat);
let tomorrowFormatted = thisNoteDate.clone().add(1, 'days').format(dateFormatWithDay);
let tomorrowLink = "[" + tomorrowFormatted + "](<" + dv.current().file.folder + "/" + tomorrow + ">)";
let tomorrowCreateLink = "[" + tomorrowFormatted + " (create)](<" + dv.current().file.folder + "/" + tomorrow + ">)";

var previousLink = yesterdayCreateLink
if (previousFileIndex != -1) {
    let previousFileName = journalFileNames[previousFileIndex];
    let previousFileFormatted = moment(previousFileName).format(dateFormatWithDay);
    let nearestPrevFileLink = "[" + previousFileFormatted + "](" + previousFileName + ")";
    if (previousFileName != yesterday) {
        previousLink = nearestPrevFileLink + " ← " + yesterdayCreateLink;
    } else {
	    previousLink = yesterdayLink;
    }
}

var nextLink = tomorrowCreateLink;
if (nextFileIndex != -1) {
	let nextFileName = journalFileNames[nextFileIndex];
	let nextFileFormatted = moment(nextFileName).format(dateFormatWithDay);
	let nearestNextFileLink = "[" + nextFileFormatted + "](" + nextFileName + ")";
	if (nextFileName != tomorrow) {
		nextLink = tomorrowCreateLink + " → " + nearestNextFileLink;
	} else {
		nextLink = tomorrowLink;
	}
}
dv.paragraph(previousLink + " ← " + currentFileName + " → " + nextLink);