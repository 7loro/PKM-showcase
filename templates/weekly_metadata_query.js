/**
 * 여러 필드를 한 번에 추출하여 날짜별로 반환하는 함수
 * @param {string} targetDirectory - 데이터를 가져올 디렉토리 경로
 * @param {string} dateFormat - 파일 이름에 포함된 날짜 형식
 * @param {Array<string>} fieldNames - 추출할 필드명 리스트
 * @param {string} [sortOrder="desc"] - 정렬 순서, "desc"는 최근 순, "asc"는 오래된 순
 * @param {string} [weekStart="monday"] - 주의 시작 요일, "monday" 또는 "sunday" (기본값: "monday")
 */
async function fetchMultipleFields(targetDirectory, dateFormat, fieldNames, sortOrder = "desc", weekStart = "monday") {
    const thisYear = parseInt(dv.current().file.name.substring(0, 4)); // 'YYYY'에서 연도 추출
    const thisWeek = parseInt(dv.current().file.name.substring(6, 8)); // 'WXX'에서 주차 추출

    const targetPath = targetDirectory.startsWith('"') ? targetDirectory : `"${targetDirectory}"`;

    // 필드 패턴을 여러 개 처리할 수 있게 생성 (백링크 포함)
    const fieldPatterns = fieldNames.map(fieldName => new RegExp(`\\[${fieldName}::\\s*([^\\[]+|\\[\\[[^\\]]+\\]\\])]`, 'g'));

    // 한 주의 시작을 일요일로 명시적으로 설정
    moment.updateLocale('en', {
        week: {
            dow: weekStart === "sunday" ? 0 : 1, // 주의 시작: 일요일(0) 또는 월요일(1)
            doy: 6  // 1월 1일이 포함된 주가 1주차가 되도록 설정
        }
    });

    // 파일 내용을 순회하면서 필드를 추출
    let pageResults = await Promise.all(
        dv.pages(targetPath)
            .where(p => {
                const fileName = p.file.name;
                if (fileName.length === 10) {
                    const fileWeek = moment(fileName, dateFormat).week();
                    const fileYear = moment(fileName, dateFormat).year();
                    return fileWeek === thisWeek && fileYear === thisYear;
                }
                return false;
            })
            .map(async p => {
                const content = await dv.io.load(p.file.path); // 파일 내용을 불러옴
                const fileData = {
                    date: p.file.name,
                    filePath: p.file.path,
                };

                // 각 필드에 대해 정규식 패턴을 적용해 값을 추출
                for (const [index, fieldName] of fieldNames.entries()) {
                    const pattern = fieldPatterns[index];
                    let match;

                    // 비디오 필드를 처리할 때는 processVideoField 호출
                    if (fieldName === 'video' && p.video != null) {
                        fileData[fieldName] = await processVideoField(p.video);
                    } else {
                        while ((match = pattern.exec(content)) !== null) {
                            if (!fileData[fieldName]) {
                                fileData[fieldName] = [];
                            }
                            fileData[fieldName].push(match[1].trim());
                        }
                    }
                }

                return fileData;
            })
    );

    // 정렬
    pageResults = pageResults.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.date.localeCompare(b.date); // 오래된 순
        } else {
            return b.date.localeCompare(a.date); // 최근 순
        }
    });

    return pageResults;
}

/**
 * 유튜브 비디오 필드를 처리하는 함수
 * @param {Array|string} videoField - 비디오 URL 배열 또는 단일 URL
 * @returns {Promise<Array>} - 처리된 비디오 HTML을 반환
 */
async function processVideoField(videoField) {
    let media = [];

    if (Array.isArray(videoField)) {
        // 비디오 필드가 배열일 경우
        await Promise.all(
            videoField.map(async _video => {
                const data = await requestUrl({ url: 'https://youtube.com/oembed?url=' + _video + '&format=json' });
                media.push('<div style="display: flex; align-items: center;"><a href="' + _video + '"><img width="180" src="' + data.json.thumbnail_url + '"></a><div style="margin-left: 10px;"><a href="' + _video + '">' + data.json.title + '</a><div><a href="' + data.json.author_url + '">' + data.json.author_name + '</a></div></div></div>');
            })
        );
    } else {
        // 비디오 필드가 단일 URL일 경우
        const data = await requestUrl({ url: 'https://youtube.com/oembed?url=' + videoField + '&format=json' });
        media.push('<div style="display: flex; align-items: center;"><a href="' + videoField + '"><img width="180" src="' + data.json.thumbnail_url + '"></a><div style="margin-left: 10px;"><a href="' + videoField + '">' + data.json.title + '</a><div><a href="' + data.json.author_url + '">' + data.json.author_name + '</a></div></div></div>');
    }

    return media;
}

// 전역에서 접근 가능하도록 등록
window.fetchMultipleFields = fetchMultipleFields;
