# Todolist

## 프로젝트 설명

Shadcn UI 공식문서의 CLI를 통해 NEXT.js 프로젝트를 생성합니다. 하기에 작성한 명령어를 통해 설치해줍니다. 또한, 모든 기본 설정을 통해 진행하였습니다.\
단, 컬러 테마는 본인의 취향에 맞게 선택해주십시오. - npx shadcn@latest init -

해당 프로젝트는 NEXT.js (14버전)과 Supabase, 그리고 Markdown Editor 라이브러리를 사용하여 CRUD(Create, Read, Update, Delete) 기능을 구현한 나만의 TODO-LIST 및 TODO-BOARD를 구현해보는 예제 프로젝트입니다.

해당 프로젝트는 전적으로 Shadcn UI 디자인 시스템을 사용하여 UI/UX 개발을 진행하였습니다.\
해당 프로젝트의 디자인은 전적으로 필자(구디사는 개발자)의 개인 작업물이며, 무단 복제 배포를 금지합니다.

그러나 `코드의 재사용 및 배포는 전적으로 모든 영역에서 허용`합니다. 감사합니다.\
그러면 프로젝트 개발을 위한 `프로젝트 생성`, `개발환경 세팅` 등과 같은 각 단계별 커리큘럼을 작성해보도록 하겠습니다.

## 프로젝트 환경설정

1. Shadcn UI 공식문서의 CLI를 통해 NEXT.js 프로젝트를 생성합니다. 하기에 작성한 명령어를 통해 설치해줍니다. 또한, 모든 기본 설정을 통해 진행하였습니다.\
   단, 컬러 테마는 본인의 취향에 맞게 선택해주십시오.

   - npx shadcn@latest init
   - 전반적인 폰트는 Google Font의 `Noto Sans KR` 폰트를 사용했습니다. (feat. app > layout.tsx 파일 참조)
   - 필수 컴포넌트 설치

     - `npx shadcn@latest add alert-dialog`
     - `npx shadcn@latest add button`
     - `npx shadcn@latest add calendar`
     - `npx shadcn@latest add card`
     - `npx shadcn@latest add checkbox`
     - `npx shadcn@latest add dialog`
     - `npx shadcn@latest add input`
     - `npx shadcn@latest add popover`
     - `npx shadcn@latest add progress`
     - `npx shadcn@latest add toast`
     - `npx shadcn@latest add separator`
     - `npx shadcn@latest add label`

   - SASS/SCSS 설치: `npm i sass`
   - React 마크다운 에디터 설치: `npm i @uiw/react-markdown-editor`
   - Supabase 연동을 위한 라이브러리 설치: `npm install @supabase/supabase-js`

2. 프로젝트 구조

   - App Router 기반 페이지 라우팅이 이루어지니 만큼 `app` 폴더 하위에는 페이지에 관련된 파일이 위치합니다.
   - `public` 폴더를 따로 생성하여 assets와 styles 폴더를 생성하였습니다.
     - assets: 정적 자원을 관리합니다. (예: 이미지, 아이콘, 폰트 등)
     - styles: CSS 파일을 관리합니다. (해당 프로젝트는 교육과정이니 만큼 Tailwind CSS와 SCSS를 섞어 진행합니다.)
   - `components` 폴더에서는 해당 프로젝트에서 사용되는 UI를 관리하는 폴더입니다.

     - `ui`: Shadcn UI에서 제공되는 Base UI 설치되어 관리됩니다.
     - `common`: 비교적 큰 UI 및 기능을 담당하고 있는 UI를 관리합니다.

   - `hooks`: 같은 기능을 여러 곳에서 사용하는 함수들을 관리

     - `api`: Supabase에서 제공되는 CRUD 로직을 바탕으로 해당 프로젝트에 맞게 커스텀
     - `use-email`: 이메일 양식 Validation Check
     - `use-toast`: Toast UI

   - `lib`: Shadcn UI를 사용하기 위한 utils 함수 및 Supabase 연동을 위한 서버 생성 코드 관리
   - `stores` : Jotai를 사용해서 전역으로 사용하는 State(상태 값) 관리
   - `types`: 타입 관리

   - Supabase 연동을 위한 개인의 API_KEY와 BASE_URL은 `.env.local` 파일에서 관리되기 때문에 깃허브에 따로 업로드 되지 않습니다. Supabase 공식문서를 참고하세요.

## 기존 프로젝트 기능

[TASK]

- `TASK 생성`: Add New Page 버튼 클릭 시, TASK 생성
- `TASK 검색`: Supabase "tasks" DB 테이블 내에 존재하는 TASK 필터링
- `TASK 조회` : useParam의 id값을 추출하여 DB의 primary key와 비교하여 TASK 조회
- `TASK 삭제`: `/board/:id` 페이지의 `삭제` 버튼 클릭 시, TASK 삭제
- `TASK 수정`: title, start_date, end_date 필수 값을 param으로 사용하여 Update

[BOARD]

- `BOARD 생성`: Add New Board 버튼을 눌렀을 때, BOARD 생성 (단, boards 컬럼을 task 테이블에서 관리하기 때문에 insert 방식이 아닌 update 방식을 사용)
- `BOARD 조회`: `task_id`를 기준으로 Supabase의 `.eq()` 함수를 사용하여 특정 task_id 값 기준으로 task만 조회하여 boards 추출
- `BOARD 삭제`: `task_id`를 기준으로 Supbase의 `.eq()` 함수를 사용하여 특정 task_id 값 기준으로 task를 조회한 후 boards를 업데이트
- `BOARD 수정`: task의 title이 있을 경우, BOARD의 버튼 UI의 텍스트를 Add Contents -> Update Contents로 분기 처리한 후, `생성`과 동일하게 업데이트

## 기존 프로젝트 Develop - Auth 추가

[회원가입]

1. 회원가입 UI 생성
2. 필수 입력 값(Required Field): `Email` & `Password`
3. 회원가입 버튼을 눌렀을 때, 각각의 `필수 입력 값`에 대해서 Vallidation 체크
   - 이메일 양식이 맞는지, use-email.ts 훅을 사용하여 Validation 체크
   - 비밀번호 최소 길이 혹은 최대 길이 정하기
   - 유저 중복 확인 (Supabase에서 자동으로 반환)
4. 위 상기 사항의 이슈가 없을 경우, 회원가입 진행

[로그인]

1. 로그인 UI 생성
2. 필수 입력 값(Required Field): `Email` & `Password`
3. 로그인 버튼을 눌렀을 때, 각각의 `필수 입력 값`에 대해서 Vallidation 체크
4. 이메일 양식이 맞는지, 직접 구현 예정(정규식 활용)

   - 이메일 양식이 맞는지, use-email.ts 훅을 사용하여 Validation 체크
   - 유저 존재 확인 (Supabase DB에 로그인을 시도한 User가 있는지 자동으로 반환)
     - 만약에 있으면 비밀번호 동일여부 체크
     - 만약에 없으면 "가입된 계정이 없습니다." 에러 이셉션 반환
     - 위 이셉션 메시지는 Supabase에서 자동으로 반환

5. 로그인 성공 시, 반환 된 데이터 Jotai Store에 저장 -> Jotai Persistence를 사용하여 `atomWithStorage` 함수 사용하여 로컬 스토리지에 User 데이터 저장, -> 새로고침 했을 때, 유저(User) 데이터 유지

[로그인 후]

1. 로그인 후, 쿠키에 담긴 user 데이터를 기준으로 middleware.ts 파일에서 페이지 리다이렉션 관리
   - 비로그인 시, `board/:path*` 페이지(콘텐츠 페이지) 접근 불가
   - 로그인 시, 쿠키에 user 데이터가 있다면, `로그인 페이지("/")` 접근 방지
   - task 생성 및 board 생성은 해당 유저에 관련된 TASK에서만 CRUD 기능 권한 및 관리
   - 존재하지 않는 task에 접근하였을 경우, `not-found 페이지("/not-found")` 페이지로 리다이렉션
2. 유저 프로필 수정(닉네임, 휴대폰 번호 변경) 그리고 해당 값은 `빈 값` 허용
3. 이 모든 기능은 Jotai Store에서 관리하는 userAtom 데이터를 참조
4. 비밀번호 변경 기능은 Supabase에서 제공되는 updateUser 메서드를 통해 user_metadata를 관리하여 활용
   - 이메일로 발송된 Reset Confirm 메일을 통해 `비밀번호 변경 페이지("/password-setting")` 접근하여 기능 수행
