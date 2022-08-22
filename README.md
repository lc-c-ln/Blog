# nts-08__-goddhqj8000
엔테크 서비스 SW 개발 - 사전 과제

# 기술 스택
- React, Typescript
- NodeJS, Express
- MySQL
- Heroku

# 프로젝트 이용방법

- https://nts-test-kch-app.herokuapp.com/

1. dev version
```
  1. git clone 
  2. npm run install
  3. 로컬 mySQL 환경에 맞추어 /server/config/congig.json 설정
  4. 로컬 mySQL에서 DDL 파일 실행시켜 DB 초기화
  - mysql -u root -p < server/schema.sql  
  5. cd server && npm run dev
  6. npm run start:client
```

2. 배포 virsion
```
  1. git clone
  2. npm run install
  2. npm run build
  3. npm run start:server
```
## 요구사항 진행 내용
1. ~~사용자는 게시글과 댓글을 읽을 수 있다.~~ 
2. ~~사용자는 게시글과 댓글을 작성할 수 있고, 텍스트만 가능하다.~~
3. ~~본인이 작성한 게시글은 수정 또는 삭제할 수 있다.~~
4. ~~본인 확인을 위한 비밀번호는 암호화하여 DB에 저장한다.~~
5. 게시글에는 해시태그 최대 5개를 등록할 수 있다.

6. ~~게시글 목록 화면에는 게시글 전체건수와 댓글 전체건수를 표시한다.~~
7. ~~게시글 목록에는 제목, 작성자, 작성일시, 댓글 수, 조회수, 좋아요수를 표시한다.~~
8. ~~게시글 목록에서 제목, 작성자, 해시태그, 내용을 선택하여 문자열을 검색할 수 있다.~~
9. ~~게시글 목록은 최신순으로 10개 또는 20개씩 페이징 처리한다.~~
10. ~~댓글은 게시글 본문 하단에 최신 5건을 노출하고, 5건씩 `더 보기`로 과거 댓글을 조회할 수 있다.~~

11. ~~게시글 목록에서 최근 3일 이내 등록된 글은 [New] 텍스트를 붙여 식별할 수 있다.~~
12. ~~게시글 목록에서 제목을 클릭하면 게시글 상세로 이동하고, 조회수를 갱신하고 건수를 확인할 수 있다.~~
13. ~~게시글 상세에서 `Like` 또는 `unlike`를 할 수 있고, Like 건수를 표시한다.~~
  - User Auth 기능이 없어, 개인 당 Like 건수의 제한을 둘 수가 없음.
14. ~~삭제 처리된 댓글은 `삭제된 댓글입니다.`라고 내용 대신 메시지를 노출한다.~~
 
