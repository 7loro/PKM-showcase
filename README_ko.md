[English](https://github.com/7loro/PKM-showcase) | [한글](https://github.com/7loro/PKM-showcase/blob/main/README_ko.md)

# 개요

Obsidian 에서 일일 노트를 기반으로 주간 노트 자동화를 하는 방법을 보여주는 vault 입니다.

# 스크린샷

<details>
  <summary>일일 노트 스크린샷 펼쳐보기</summary>
  <img width=800 src="https://github.com/user-attachments/assets/7900a746-ab39-4d57-b6f3-55b5fc955954"/>
</details>
<details>
  <summary>주간 노트 스크린샷 펼쳐보기</summary>
  <img width=800 src="https://github.com/user-attachments/assets/f0fe67a5-6755-48ff-9f89-7083367cef8e"/>
</details>

# 주요 기능 설명
- 일일 노트
	- 날짜 네비게이션
		- 이틀 전, 하루 전, 오늘, 내일
		- 마우스로 올려서 바로 보거나, 존재하지 않는 경우 파일을 바로 생성할 수 있습니다.
			- 일일 노트 위치에 파일이 생성되지만, template 은 직접 추가해주어야 합니다.
	- 주간 노트 바로가기
		- 없는 경우 파일이 파일이 생성되지만, template 은 직접 추가해주어야 합니다.
	- 다른 년도의 같은 날짜 노트
	- 이번 주 마감인데 완료되지 않은 테스크
	- Logs
		- 오늘 하루 시작 시 해야 될 일들을 계획해서 작성합니다.
	- Morning / Afternoon / Evening
		- 각 시간에 맞춰서 작성할 수 있는 공간입니다.
	- Retrospect
		- 주간 노트에 활용할 inline field 들을 적어놓습니다.
		- 각 시간 구역에 inline 필드로 작성해도 되고, 문서 내 어디에든 작성해도 됩니다.
	- 오늘 생성/수정한 노트 목록
- 주간 노트
	- 해당 주차에 해당 하는 일일 노트들의 [inline field](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields)를 수집하여 보여줍니다.
	- video 필드의 경우 youtube 썸네일, 제목, 채널명을 보여줍니다.
	- 주간 생성/수정한 노트 목록

# 사용 플러그인

- Templates
	- 일일 노트, 주간 노트의 템플릿 기능을 위해 사용
- [Calendar](https://github.com/liamcain/obsidian-calendar-plugin)
	- 한 주의 시작 설정을 월요일로 설정하기 위해 사용
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview)
	- 일일 노트에서 해당 날짜에 생성, 수정 된 노트 보여주기
	- 주간 노트에서 해당 주차에 있는 일일 노트들의 내용들을 모아보여 주는 용도로 사용
- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)
	- 일일 노트, 주간 노트 생성
- [Tasks](https://github.com/obsidian-tasks-group/obsidian-tasks)
	- 테스크 관리
- [Templater](https://github.com/SilentVoid13/Templater)
	- 템플릿과 함께 활용하여 날짜, 시간, 커서 위치를 설정합니다.

# 주요 설정

vault 에서 변경한 옵시디언 기본 및 플러그인 설정들입니다.
(선택 사항) 으로 표시 된 것들은 개인 취향입니다.
이외의 항목은 설정이 필요한 내용입니다.

- (선택 사항) 편집기
	- (선택 사항) 읽기 쉬운 행 길이 해제
	- (선택 사항) 문서 내 속성 - 소스
	- (선택 사항) 행 번호 표시
- 파일 및 링크
	- (선택 사항) 모든 파일 확장자명 인식
		- js 스크립트 파일들을 표시하기 위해 켰습니다.
- 코어 플러그인 - 템플릿
	- 템플릿 폴더 경로 설정
- 커뮤니티 플러그인
	- Calendar
		- Start week on : Monday
			- **월요일을 한 주 시작을 기준으로 작업하여, 일요일로 설정 원하는 경우 추가 수정이 함께 필요합니다.**
		- (선택 사항) Show week number
	- Dataview
		- Enable JavaScript queries
		- Enable inline JavaScript queries
	- Templater
		- Template folder location
			- 템플릿 폴더 경로와 동일하게 설정
		- Automatic jump to cursor
			- `<% tp.file.cursor() %>` 을 통해 해당 위치로 커서를 자동으로 옮기는 용도로 사용됩니다.
	- Periodic Notes
		- Daily Notes
			- Daily Note Template
				- templates/daily_journal.md 로 설정
			- Note Folder
				- journals/2024 로 일일 노트 경로 설정
		- Weekly Notes
			- Weekly Note Template
				- templates/weekly_journal.md 로 설정
			- Note Folder
				- journals/2024 로 주간 노트 경로 설정
	- Tasks
		- 추가 설정 필요 없음

# CSS

- .obsidian/snippets 에 있는 항목으로 좀 더 나은 사용성을 위해 추가하였습니다.
- 설정 - 테마 - CSS 스니펫에서 설정 가능합니다.
	- checkbox-done-no-strikethrough
		- 체크 박스에서 완료 처리 된 항목에 줄이 생기는 것이 보기 불편하여 제거합니다.
	- retrospect-dataview
		- 주간 노트에서 dataview 를 좀 더 보기 좋게 만들어줍니다.

# 참고

- https://www.youtube.com/watch?v=jUmOKkJq8xw
- https://www.youtube.com/watch?v=5k4LfCVY0yQ
- https://www.youtube.com/watch?v=5Uxj0XgMp0k
