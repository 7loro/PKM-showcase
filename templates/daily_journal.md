---
created: <% tp.file.creation_date("YYYY-MM-DD HH:mm:ss") %>
modified: <% tp.file.last_modified_date("YYYY-MM-DD HH:mm:ss") %>
tags:
  - journal/2024
date: <% tp.date.now("YYYY-MM-DD") %>
aliases:
---
# <% tp.date.now("YYYY-MM-DD ddd") %>
```dataviewjs
const data = await dv.io.load("templates/date_navigator_daily.js");
dv.executeJs(data)
```
### [[<% tp.date.now("YYYY") + "-W" + tp.date.now("WW") %>]]

> [!NOTE] Same day of other years
>```dataviewjs
>const data = await dv.io.load("templates/journal_daily_same_date.js");
>dv.executeJs(data)
>```

## Tasks this week
```tasks
(due after <% tp.date.weekday("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>) AND (due before <% tp.date.weekday("YYYY-MM-DD", 7, tp.file.title, "YYYY-MM-DD") %>)
(not done) AND (status.name does not include Rescheduled)
(path does not include archive) AND (path does not include 먹킷리스트)
group by due
hide due date
```

## Logs
- <% tp.file.cursor() %>
### Morning

### Afternoon

### Evening

## Retrospect
> [!info]
> inline field 활용
> work, personal, movie, book, article, video, learn, emotion, highlight

## Notes created today
```dataview
table dateformat(file.ctime, "yyyy-MM-dd HH:mm:ss") as "Created"
from ""
where file.cday = this.file.day
sort file.ctime desc
```

## Notes modified today
```dataview
table dateformat(file.mtime, "yyyy-MM-dd HH:mm:ss") as "Modified"
from ""
where file.mday = this.file.day
and file.cday != this.file.day
sort file.mtime desc
```
