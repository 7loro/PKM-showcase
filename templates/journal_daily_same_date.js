let journalFolder = "journals";  // 폴더 경로 설정
let currentFile = dv.current().file;
let currentDate = moment(currentFile.name, "YYYY-MM-DD");  // 파일 이름을 날짜로 파싱
let todayMonth = currentDate.month() + 1;  // Moment.js에서 월은 0부터 시작하므로 +1
let todayDay = currentDate.date();

let entries = dv.pages('"' + journalFolder + '"')
    .where(p => moment(p.file.name, "YYYY-MM-DD").month() + 1 == todayMonth)
    .where(p => moment(p.file.name, "YYYY-MM-DD").date() == todayDay)
    .where(p => p.file.path != currentFile.path)
    .where(p => p.file.name.length == 10)
    .sort(p => p.file.day, 'desc');

dv.list(entries.file.link);

