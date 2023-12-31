# 📸 찰칵(Chalkak) 📸

<img src="https://github.com/devkmins/Chalkak/assets/59950909/4bc081c3-3da6-4862-a8af-dbeb081c4297" alt="이미지 설명" width="100%">

<br />
<br />

## 목차

- [📸 찰칵(Chalkak) 📸](#-찰칵chalkak-)
  - [목차](#목차)
  - [프로젝트 소개](#프로젝트-소개)
  - [페이지 및 기능](#페이지-및-기능)
  - [반응형 페이지](#반응형-페이지)
  - [해결한 문제들](#해결한-문제들)
  - [고민](#고민)
  - [배운 것들](#배운-것들)
  - [개선하거나 추가해야 할 부분](#개선하거나-추가해야-할-부분)
  - [사용된 기술](#사용된-기술)
  - [컴포넌트](#컴포넌트)
  - [커스텀 훅](#커스텀-훅)
  - [유틸 함수](#유틸-함수)
  - [전역 상태](#전역-상태)
  - [라우터 설정](#라우터-설정)
  - [디렉토리 구조](#디렉토리-구조)
  - [커밋 컨벤션](#커밋-컨벤션)

<br />

## 프로젝트 소개

**찰칵(Chalkak)** 은 나의 시선을 타자에게 공유하고, 타자의 시선에서 세상을 바라보는 것을 추구하기 위한 사진 공유 사이트입니다.

- 디자인은 Unsplash 사이트를 참고하였습니다.

#### 배경

고등학교 3학년 시절, code.org의 What Most Schools Don't Teach라는 동영상을 보고 프로그래밍에 처음으로 발을 들였습니다. 그 당시에 HTML, CSS 강의를 듣고 Photograph라는 간단한 웹을 혼자 개발하였는데, 별 기능없는 웹이었기에 언젠가는 이 웹을 완성시키겠다는 생각을 지니고 있었습니다. 시간이 흘러 여러 기술들을 학습하였고, 첫 프로젝트를 무엇으로 할까라는 고민을 한 결과, 과거에 개발하였던 Photograph 웹을 완성시켜야겠다는 결론에 이르렀습니다.
찰칵 프로젝트는 프로그래밍에 처음 발을 들였던 그 순간의 Photograph 웹을 완성시키고자 하는 의의에서 시작되었습니다.

<p align="center">
  <img src="https://github.com/devkmins/Chalkak/assets/59950909/a3d5313c-1aa1-49da-ab10-15c4d50d94cf" alt="메인 gif" width="75%">
</p>
<p align="center">2020년에 개발하였던 Photograph</p>

<br />
<br />

## 페이지 및 기능

| 회원가입                                                                                                    | 계정 폐쇄                                                                                                   |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| ![회원가입](https://github.com/devkmins/Chalkak/assets/59950909/e655cf6a-2cce-4f26-8d01-31e40b282696) | ![계정 폐쇄](https://github.com/devkmins/Chalkak/assets/59950909/df206fa1-aa9e-43de-a11b-615bf3d969dd) |

#### 회원가입

- 로그인 되지 않은 사용자만 접속할 수 있는 회원가입 페이지입니다.
- 회원가입 페이지를 렌더링 할 때마다 스크롤이 상단에 위치하도록 설정하였습니다.
- 이름, 이메일, 아이디, 비밀번호, 비밀번호 확인을 각각 입력해야 하며, 이름이 너무 짧거나 너무 길 때, 이름의 앞뒤에 공백이 포함되어 있을 때, 사용자 이름이 너무 짧거나 너무 길 때, 사용자 이름에 공백이 포함되어 있을 때, 사용자 이름이 이미 존재할 때, 이메일이 형식에 맞지 않을 때, 이메일이 이미 존재할 때, 비밀번호와 비밀번호 확인이 일치하지 않을 때, 비밀번호가 형식에 맞지 않을 때, 비밀번호가 너무 짧거나 너무 길 때, 에러 메시지를 input 아래에 표시합니다.
- 비밀번호는 클라이언트 측에서 해싱하여 서버로 전달하고, 서버 측에서 한 번 더 해싱을 하여 DB에 저장합니다.
- 비밀번호를 숨겼다가 표시할 수도 있으며, 회원가입 텍스트 위의 아이콘을 클릭하여 메인 페이지로 이동할 수 있습니다.
- 성공적으로 회원가입을 완료하면 로그인 페이지로 이동하며, 회원가입이 완료되었다는 알림 메시지를 상단에 표시합니다.

#### 계정 폐쇄

- 로그인 된 사용자만 접속할 수 있는 계정 폐쇄 페이지입니다.
- 비밀번호를 입력하였을 때 클라이언트 측에서 해당 비밀번호를 해싱하고, DB에 저장된 해당 유저의 해싱 된 비밀번호와 비교하여 일치할 때 계정을 폐쇄합니다.
- 비밀번호가 일치하지 않는 경우에는 에러 메시지를 input 아래에 표시합니다.
- 정말 계정을 폐쇄할 것인지 묻는 경고를 표시하고, 확인을 누르면 사용자가 업로드한 모든 이미지들을 삭제합니다.

<br />

| 로그인                                                                                                  | 로그아웃                                                                                                   |
| ------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| ![로그인](https://github.com/devkmins/Chalkak/assets/59950909/c1bd5de9-2723-4cfd-84ab-fee4588a9711) | ![로그아웃](https://github.com/devkmins/Chalkak/assets/59950909/0d50e4ad-b4ae-416f-91ef-eae83a640722) |

#### 로그인

- 로그인 되지 않은 사용자만 접속할 수 있는 로그인 페이지입니다.
- 아이디 또는 이메일과 비밀번호를 입력해야 하며, 아이디 또는 이메일이 올바르지 않거나 비밀번호가 일치하지 않을 때 에러 메시지를 input 아래에 표시합니다.
- 로그인을 실패할 때마다 localStorage에 로그인 실패 횟수를 저장하며, 로그인을 10번 실패한 경우에는 5분 후에 localStorage의 값이 초기화되도록 설정하여, 5분 후에 로그인을 재시도 할 수 있게 설정하였습니다.
- 비밀번호를 숨겼다가 표시할 수도 있으며, 로그인 텍스트 위의 아이콘을 클릭하여 메인 페이지로 이동할 수 있습니다.
- 로그인 요청을 받고 인증이 되었을 때 세션을 설정하며, 사용자의 일부 정보가 담긴 쿠키를 전달 받습니다.
- 로그인이 완료되면 메인 페이지로 이동합니다.

#### 로그아웃

- 로그인 된 사용자만 사용할 수 있는 기능입니다.
- 브라우저에 저장된 쿠키를 제거하며 DB에 저장된 세션 정보 또한 제거합니다.
- 로그인 시에 세션 만료 기한에 맞춰 자동으로 로그아웃이 되도록 설정하였습니다.
- 로그아웃이 완료되면 메인 페이지로 이동하며, 로그아웃이 완료되었다는 알림 메시지를 상단에 표시합니다.

<br />

| 이미지 업로드                                                                                                     | 유저 프로필                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ![이미지 업로드](https://github.com/devkmins/Chalkak/assets/59950909/bcab05ee-d88e-4197-844f-f2b711872a8b) | ![유저 프로필](https://github.com/devkmins/Chalkak/assets/59950909/ed8adaa5-091e-4bca-a6b0-161bad34e15a) |

#### 이미지 업로드

- 로그인 된 사용자만 접속할 수 있는 이미지 업로드 페이지입니다.
- 드래그 앤 드롭 또는 파일 선택을 통해 이미지를 업로드할 수 있으며, 이미지가 업로드되면 하단에 선택된 이미지들이 렌더링 됩니다.
- 이미지 업로드 영역 아래에 렌더링 된 이미지의 위에 마우스를 올려 이미지를 취소할 수 있습니다.
- 이미지가 1개 이상 렌더링 되었을 때 왼쪽 상단의 뒤로 가기 아이콘을 클릭하면, 업로드가 취소될 수도 있다는 경고문이 표시됩니다.
- 경고문의 확인을 클릭하면 메인 페이지로 이동하고, 취소를 클릭하면 어떠한 동작도 발생하지 않습니다.
- 제목은 필수적으로 작성해야 하며, 해시태그란에 키워드를 입력하고 키보드의 엔터를 눌러 해시태그를 추가할 수 있습니다.
- 해시태그는 최대 5개까지 추가 가능하며, 추가된 해시태그 위에 마우스를 올려 해시태그를 제거하는 버튼을 클릭할 수 있습니다.
- 이미지를 제출하면 업로드가 완료될 때까지 이미지가 업로드 중이라는 간단한 애니메이션이 실행되는데, 이때 이미지를 webp로 변환하고, 이미지의 품질을 낮추며, 이미지의 원본 비율을 구해 이미지, 게시글 정보와 함께 서버로 전달하는 과정을 거칩니다.
- 업로드가 완료되면 메인 페이지로 이동합니다.

#### 유저 프로필

- 게시글 위에 마우스를 올려 사용자의 프로필 사진 또는 이름을 클릭하거나, 게시글을 클릭하여 상단에 표시된 사용자의 프로필 사진 또는 이름을 클릭해서 접속할 수 있는 유저 페이지입니다.
- 로그인 된 사용자는 헤더의 맨 우측 프로필 사진을 클릭하여 프로필 보기 메뉴를 통해 마이 페이지에 접속할 수 있습니다.
- 로그인 된 사용자가 마이 페이지에 접속하면 프로필 편집이라는 버튼을 표시하고, 해당 버튼을 클릭하면 프로필 편집 페이지로 이동시킵니다.
- 메인 페이지와 마찬가지로 무한 스크롤이 적용되어 이미지를 10개씩 렌더링하고, 스크롤이 맨 하단에 도달하였을 때 페이지 수를 증가시켜 새로운 이미지들을 렌더링합니다.
- 사용자의 프로필 이미지, 조회수, 좋아요 수를 구경할 수 있으며, 사용자가 업로드한 이미지 그리고 사용자가 좋아하는 이미지 또한 구경할 수 있습니다.
- 사진 위에 마우스를 올리면 해당 소유자의 프로필 이미지, 이름 그리고 해당 게시글 내에 몇 개의 이미지가 포함되어 있는지를 표시합니다.
- 메인 페이지와 마찬가지로 이미지을 클릭하였을 때, 그 당시의 스크롤 위치를 기억하고 변경된 페이지에서 뒤로 가기를 눌렀을 때 이전의 스크롤 위치로 이동합니다.
- 이미지를 클릭하면 게시글의 자세한 내용을 볼 수 있는 게시글 페이지로 이동합니다.

<br />

| 검색                                                                                                  | 검색 결과 없음                                                                                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| ![검색](https://github.com/devkmins/Chalkak/assets/59950909/22dd8304-ac7e-4158-97d2-043bba0375fa) | ![검색 시 게시글이 없을 때](https://github.com/devkmins/Chalkak/assets/59950909/7c6f3f73-fa56-49d1-ba56-5d010e1dec16) |

#### 검색

- 헤더에 위치한 검색란을 통해 키워드를 입력하고, 해당 키워드를 제목, 설명, 해시태그로 포함하는 게시글을 렌더링 하는 검색 페이지입니다.
- 메인 페이지, 유저 페이지와 마찬가지로 무한 스크롤이 적용되었습니다.
- 이미지를 클릭하여 게시글 페이지로 이동할 수 있습니다.
- 검색란을 클릭하면 아래에 최근 검색 모달이 표시되며, 최대 5개의 최근 검색한 키워드를 localStorage에 저장합니다.
- 최근 검색한 키워드가 최대 개수일 때 새로운 키워드를 입력하면, pop을 하여 맨 처음에 검색한 키워드를 제거하고 새로 검색한 키워드를 추가합니다.
- 최근 검색한 키워드를 클릭하여 검색을 할 수 있습니다.
- 검색 모달 내의 삭제를 클릭하여 최근 검색한 키워드들을 모두 제거할 수 있습니다.
- 최근 검색 모달은 검색란에 포커스 되어 있을 때에만 유효하며, 검색란과 최근 검색 모달 이외의 부분을 클릭하면 모달이 닫힙니다.
- 메인 페이지, 유저 페이지와 마찬가지로 이미지를 클릭하였을 때, 그 당시의 스크롤 위치를 기억하고 변경된 페이지에서 뒤로 가기를 눌렀을 때 이전의 스크롤 위치로 이동합니다.

#### 검색 결과 없음

- 키워드를 입력하고 검색을 하였을 시에, 해당 키워드를 포함하는 게시글이 존재하지 않는다면 렌더링 되는 페이지입니다.

<br />

| 게시글                                                                                              | 유사 게시글                                                                                                        |
| --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| ![게시글](https://github.com/devkmins/Chalkak/assets/59950909/c55e2cff-a1a6-46be-b2bd-f979fd33ada4) | ![유사 게시글들](https://github.com/devkmins/Chalkak/assets/59950909/0d3ef8d8-4b2c-4419-b8e6-53dd9610f5c5) |

#### 게시글

- 메인 페이지, 유저 페이지, 검색 페이지, 유사 게시글을 통해 접속할 수 있는 게시글 페이지입니다.
- 게시글 페이지를 렌더링 할 때마다 스크롤이 상단에 위치하도록 설정하였습니다.
- 게시글 소유자의 프로필 이미지, 이름, 여러 사진, 제목, 설명, 게시된 날짜, 조회 수, 해시태그, 좋아요 수를 확인할 수 있습니다.
- 로그인 된 사용자라면 게시글에 좋아요를 클릭할 수 있습니다.
- 이미지가 여러 장일 때 슬라이드나 드래그를 통해 이미지를 구경할 수 있으며, 이미지 아래의 점을 통해 이미지의 개수를 확인하고 구경할 수 있습니다.
- 해시태그를 클릭하여 해당 키워드를 검색할 수 있습니다.

#### 유사 게시글

- 게시글 페이지의 아래에 렌더링 되는 유사 게시글 기능입니다.
- 접속한 게시글 페이지의 제목, 설명, 해시태그를 포함하는 다른 게시글이 존재한다면 이를 렌더링하고 구경할 수 있습니다.
- 이미지를 클릭하여 게시글 페이지로 이동할 수 있으며, 마우스를 이미지 위에 올려 소유자 정보를 간단하게 확인할 수 있습니다.
- 메인 페이지, 유저 페이지, 검색 페이지와 마찬가지로 무한 스크롤이 적용되었습니다.
- 메인 페이지, 유저 페이지, 검색 페이지와 마찬가지로 이미지를 클릭하였을 때, 그 당시의 스크롤 위치를 기억하고 변경된 페이지에서 뒤로 가기를 눌렀을 때 이전의 스크롤 위치로 이동합니다.

<br />

| 게시글 수정                                                                                                     | 게시글 삭제                                                                                                  |
| --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| ![게시글 수정](https://github.com/devkmins/Chalkak/assets/59950909/b41ceae8-d2b8-40e4-b234-394f5bf67039) | ![게시글 삭제](https://github.com/devkmins/Chalkak/assets/59950909/607761b2-ea71-40d4-8c7c-07590b954a1e) |

#### 게시글 수정

- 로그인 된 사용자가 게시글 페이지에 접속하였을 때, 해당 게시글의 소유자와 로그인 된 사용자가 일치한다면 사용할 수 있는 기능입니다.
- 게시글의 제목, 설명, 해시태그가 표시되어 있으며 게시글을 업데이트하면 게시글이 업데이트되었다는 알림 메시지가 상단에 표시됩니다.

#### 게시글 삭제

- 로그인 된 사용자가 게시글 페이지에 접속하였을 때, 해당 게시글의 소유자와 로그인 된 사용자가 일치할 때 사용할 수 있는 기능입니다.
- 게시글의 이미지가 표시되며, 이 게시글을 삭제하겠다는 버튼을 클릭하면 정말 삭제할 것이냐는 경고 메시지를 표시합니다.
- 경고 메시지 내의 확인을 클릭하면 게시글이 삭제되고, 취소를 클릭하면 어떠한 동작도 발생하지 않습니다.

<br />

| 프로필 편집                                                                                                      | 비밀번호 변경                                                                                                        |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| ![프로필 편집](https://github.com/devkmins/Chalkak/assets/59950909/7a169d89-7287-404c-bc3f-caaacfded8b1) | ![비밀번호 변경](https://github.com/devkmins/Chalkak/assets/59950909/92a2347e-199f-4cb4-bc6e-04c44329ab5c) |

#### 프로필 편집

- 로그인 된 사용자만 접속할 수 있는 프로필 편집 페이지입니다.
- 유저 프로필에 접속하였을 때 해당 사용자와 로그인된 사용자가 일치하면 프로필 편집 버튼이 표시되고, 이 프로필 편집 버튼을 통해 프로필 편집 페이지로 접속할 수 있습니다.
- 또는 헤더의 맨 우측 사용자의 프로필 이미지를 클릭하여 계정 설정 메뉴를 통해 접속할 수 있습니다.
- 사용자의 프로필 이미지와 이름, 이메일, 사용자 이름 정보가 표시되어 있습니다.
- 사용자의 프로필 이미지는 프로필 이미지 변경을 클릭하여 파일을 선택함으로써 변경할 수 있습니다.
- 사용자의 프로필 이미지가 변경되면 헤더, 유저 페이지, 게시글 페이지, 유사 페이지 등 다양한 페이지에서 프로필 이미지가 동시에 변경됩니다.
- 이름, 이메일, 사용자 이름를 변경하면 계정이 업데이트 되었다는 알림 메시지가 상단에 표시됩니다.

#### 비밀번호 변경

- 로그인 된 사용자만 접속할 수 있는 비밀번호 변경 페이지입니다.
- 현재 비밀번호가 DB에 저장된 사용자의 비밀번호와 일치할 때 비밀번호를 변경할 수 있으며, 일치하지 않는 경우에는 에러 메시지를 input 아래에 표시합니다.
- 새 비밀번호와 새 비밀번호 확인이 일치하지 않는 경우에는 에러 메시지를 input 아래에 표시합니다.
- 비밀번호를 업데이트하면 비밀번호가 변경되었다는 알림 메시지가 상단에 표시됩니다.

<br />
<br />

## 반응형 페이지

| 메인 반응형                                                                                                       | 계정 폐쇄 반응형                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ![메인 반응형](https://github.com/devkmins/Chalkak/assets/59950909/281eb344-e06e-4e0a-923d-0a16ee531bac) | ![계정 폐쇄 반응형](https://github.com/devkmins/Chalkak/assets/59950909/aad08443-868b-4709-9ef9-022aa6f20700) |

#### 메인 반응형

- 모바일, 태블릿, 데스크탑에 따라 각각 반응형을 하였습니다.
- 데스크탑일 때에는 이미지가 3열로 렌더링 되도록 설정하였습니다.
- 태블릿일 때에는 이미지가 2열로 렌더링 되도록 설정하였습니다.
- 모바일일 때에는 이미지가 1열로 렌더링 되며, 소유자의 간단한 정보가 이미지 위에 표시되도록 설정하였습니다.
- 또한 모바일일 때에는 소개 사진이 화면에 가득 차게 설정하였고, 소개 글의 크기 또한 조정하였습니다.
- 모바일일 때 헤더의 맨 우측 아이콘을 통해 메뉴 모달을 표시하고 로그인 되지 않은 사용자가 로그인, 가입을 할 수 있도록 설정하였습니다.
- 또한 모바일일 때 헤더의 맨 우측 아이콘을 통해 메뉴 모달을 표시하고 로그인 된 사용자가 프로필 보기, 계정 설정, 업로드, 로그아웃을 할 수 있도록 설정하였습니다.
- 을 클릭하면
- 헤더의 메뉴 모달은 메뉴에 포커스 되어 있을 때에만 유효하며, 메뉴 모달 또는 메뉴 모달 이외의 부분을 클릭하면 모달이 닫힙니다.

#### 계정 폐쇄 반응형

- 모바일이냐 아니냐에 따라 반응형을 하였습니다.
- 모바일일 때에는 계정 메뉴가 상단으로 이동하며, text, input, button의 크기가 줄어듭니다.

<br />

| 유사 게시글 반응형                                                                                                              | 게시글 수정 반응형                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| ![유사한 게시글 반응형](https://github.com/devkmins/Chalkak/assets/59950909/447630db-e079-4d7b-a745-0fcdb3bacfe4) | ![게시글 수정 반응형](https://github.com/devkmins/Chalkak/assets/59950909/5654b88f-ea66-4833-b408-ad431b5e563f) |

#### 유사 게시글 반응형

- 메인 반응형과 마찬가지로 모바일, 태블릿, 데스크탑에 따라 각각 반응형을 하였습니다.

#### 게시글 수정 반응형

- 모바일, 태블릿, 데스크탑에 따라 각각 input과 button의 너비를 조정하는 반응형을 하였습니다.

<br />

| 회원가입 반응형                                                                                                          | 로그인 반응형                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| ![회원가입 반응형](https://github.com/devkmins/Chalkak/assets/59950909/ff3f485b-bada-49c6-9f5b-bc1dfd2aae7d) | ![로그인 반응형](https://github.com/devkmins/Chalkak/assets/59950909/8fed4f69-410c-4f74-aecf-e4d0c1ef742f) |

#### 회원가입 반응형

- 모바일이냐 아니냐에 따라 반응형을 하였습니다.
- 모바일일 때에는 사진이 사라지게 설정하였고, 모바일이 아닐 때에는 사진이 표시되도록 설정하였습니다.

#### 로그인 반응형

- 회원가입 반응형과 마찬가지로 모바일이냐 아니냐에 따라 반응형을 하였습니다.

<br />

| 이미지 업로드 반응형                                                                                                           | 유저 프로필 반응형                                                                                                          |
| ------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| ![이미지 업로드 반응형](https://github.com/devkmins/Chalkak/assets/59950909/4f85bb1c-a5ef-4b38-a164-7570bdafb029) | ![유저 프로필 반응형](https://github.com/devkmins/Chalkak/assets/59950909/8dbf0307-1771-455b-ad46-1831ae95f225) |

#### 이미지 업로드 반응형

- 모바일이냐 아니냐에 따라 반응형을 하였습니다.
- 모바일일 때에는 이미지 업로드 영역이 화면에 거의 가득 차게 설정하였고, 1행에 4개의 사진이 렌더링 되도록 설정하였습니다.
- 모바일이 아닐 때에는 1행에 5개의 사진이 렌더링 되도록 설정하였습니다.

#### 유저 프로필 반응형

- 메인 반응형, 유사 게시글 반응형과 마찬가지로 모바일, 태블릿, 데스크탑에 따라 각각 반응형을 하였습니다.

<br />

| 프로필 편집 반응형                                                                                                            | 비밀번호 변경 반응형                                                                                                              |
| ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| ![프로필 편집 반응형](https://github.com/devkmins/Chalkak/assets/59950909/19bda40e-569c-472d-ac81-da1592be733d) | ![비밀번호 변경 반응형](https://github.com/devkmins/Chalkak/assets/59950909/db878242-1832-4fc7-a101-b20cdd1e76ae) |

#### 프로필 편집 반응형

- 계정 폐쇄 반응형과 마찬가지로 모바일이냐 아니냐에 따라 반응형을 하였습니다.
- 모바일일 때에는 사용자의 프로필 이미지가 중앙에 위치하도록 설정하고, 그 아래에 input과 button을 위치시켰습니다.

#### 비밀번호 변경 반응형

- 계정 폐쇄 반응형, 프로필 편집 반응형과 마찬가지로 모바일이냐 아니냐에 따라 반응형을 하였습니다.

<br />

| 검색 반응형                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------ |
| ![검색 반응형](https://github.com/devkmins/Chalkak/assets/59950909/78ae46d9-4c89-4f5e-9893-77b5ce980c4c) |

#### 검색 반응형

- 메인 반응형, 유사 게시글 반응형, 유저 프로필 반응형과 마찬가지로 모바일, 태블릿, 데스크탑에 따라 각각 반응형을 하였습니다.

<br />
<br />

## 해결한 문제들

### 초기 렌더링, 이미지 렌더링 속도 문제

#### 발생한 부분

- 메인 페이지, 유저 페이지, 검색 페이지, 유사한 게시글에서 수많은 이미지들이 렌더링 될 때 느리게 렌더링 되는 성능 저하 문제가 발생하였습니다.

#### 원인

- 업로드된 이미지들이 페이지에 모두 렌더링 되는 것이 원인이었습니다.
- 고화질의 이미지들이 원본 그대로 업로드되어, 크기가 굉장히 큰 것이 원인이었습니다.

#### 해결 방법

- 무한 스크롤을 추가하여 이미지를 페이지당 10개씩 렌더링 하도록 설정함으로써 수많은 이미지가 한 번에 렌더링 되지 않도록 설정하였습니다.
- react-image-file-resizer 라이브러리를 사용하여 사용자가 이미지를 업로드하였을 때, 해당 jpg 이미지 파일을 webp로 변환하였습니다.
- webp로 변환된 이미지를 압축시켜 최적화하였습니다.
- 또한 이미지를 압축하는 과정에서 원본 이미지의 너비와 높이를 최대 공약수로 나눠 원본 이미지의 비율을 구하고, 이를 각각의 이미지들의 aspect-ratio로 설정하여 이미지의 크기와 높이를 브라우저가 빠르게 계산할 수 있도록 CLS를 개선하였습니다.

#### 결과

- 초기 렌더링 속도를 1.1초에서 0.9초로 개선하였습니다.
- 이미지 렌더링 시 발생한 성능 저하 문제를 해결하였습니다.
- Light House 성능 점수가 76점에서 85점으로 상승하였습니다.

<br />

### 성능 개선

#### 발생한 부분

- 사용하지 않는 자바스크립트 번들 사이즈가 큰 부분을 개선하고자 하였습니다.

#### 원인

- 종류별로 하나의 자바스크립트 파일에 아이콘 전체를 포함하고 있는 react-icons 라이브러리가 원인이었습니다.
- 반복적으로 사용되는 코드가 원인이었습니다.
- 실제로 사용되지 않는 컴포넌트가 다운되는 것이 원인이었습니다.

#### 해결 방법

- react-icons를 @react-icons/all-files 라이브러리로 대체하여 자바스크립트 번들 사이즈를 감소시켰습니다.
- 반복되는 타입, 상수, 컴포넌트, 훅을 공통 파일로 묶어 코드 수를 감소시켰습니다.
- react의 lazy를 사용하여 코드를 분할하였습니다.

#### 결과

- 자바스크립트 번들 사이즈가 1,849.2 KiB에서 684.4 KiB로 약 63% 감소하였습니다.
- Light House 성능 점수가 85점에서 97점으로 상승하였습니다.

<br />

<details open>
<summary ><h3>자잘한 문제들</h3></summary>

### 경로가 변경되어도 동일한 컴포넌트를 다시 렌더링 하지 않는 react router의 문제

#### 발생한 부분

- 마이 페이지(유저 페이지)에서 좋아요한 게시글의 소유자 이름을 클릭하여 유저 페이지로 이동하였을 때, 그리고 게시글 페이지에서 또 다른 게시글 페이지로 이동하였을 때, 각각 새로운 유저 페이지, 게시글 페이지를 렌더링 해야 하는데 컴포넌트가 렌더링 되지 않는 문제가 발생하였습니다.

#### 원인

- react-router-dom v6부터는 경로가 변경되더라도 동일한 컴포넌트 인스턴스를 리렌더링 하지 않도록 기본 동작이 변경되었습니다.
- 즉, 경로만 변경되고 동일한 컴포넌트는 다시 렌더링 하지 않기에 이러한 문제가 발생하였습니다.

#### 해결 방법

- 유저 페이지의 경우에는 username, 게시글 페이지의 경우에는 postId를 각각 저장하는 currentUserPageState, currentPostState 전역 상태를 생성하였습니다.
- username과 postId를 저장하는 이유는 각각 고유하므로 게시글과 유저를 구분하는 데에 사용할 수 있기 때문이었습니다.
- useEffect를 사용하여 username, postId가 각각 변경될 때, currentUserPageState, currentPostState 전역 상태를 각각 업데이트하였습니다.
- App 컴포넌트 내에서 라우트 element에 설정된 UserPage, DetailPost 컴포넌트의 key로 currentUserPageState, currentPostState를 각각 설정함으로써 동일한 컴포넌트가 여러 번 렌더링 될 때 각 컴포넌트의 인스턴스를 구분할 수 있도록 문제를 해결하였습니다.

<br />

### 회원가입이 단 한 번만 되는 문제

#### 발생한 부분

- 회원가입 페이지에서 회원가입을 한 번 시도한 이후에 새로운 계정을 하나 더 생성하려고 하면 에러가 생기는 문제가 발생하였습니다.

#### 원인

- 이전에 회원가입을 진행하고 나서 User 스키마를 변경하였는데, 이 때문에 기존의 데이터(수정하기 전의 스키마)의 index key의 값이 새로 생성하려는 데이터와 충돌하면서 에러가 발생하였습니다.

#### 해결 방법

- MongoServerError: E11000 duplicate key error collection: chalkak.users index: id_1 dup key: { id: null }와 같은 에러를 유심히 읽고 `db.users.getIndexes()`와 `db.users.dropIndex({id: 1})`를 사용하여 {id: 1}의 key를 가지는 부분을 제거함으로써 문제를 해결하였습니다.

<br />

### 스크롤을 하고 나서 컴포넌트를 렌더링 하였을 때 스크롤이 이전의 위치로 이동하는 문제

#### 발생한 부분

- 메인 페이지에서 스크롤을 아래로 내리고 회원가입을 클릭하면 Join 컴포넌트에서 이전의 스크롤 위치가 그대로 유지되는 문제가 발생하였습니다.
- 유저 페이지에서도 마찬가지로 문제가 발생하였습니다.

#### 원인

- 브라우저 자체의 동작인 것으로 보였습니다.

#### 해결 방법

- 메인 페이지나 회원가입 페이지 등이 처음 렌더링 될 때에는 useEffect와 `window.scrollTo(0, 0)`를 사용해서 스크롤이 최상단에 위치하도록 설정함으로써 문제를 해결하였습니다.

<br />

### 로그인을 하려고 할 때 회원가입이 완료되었다는 알림이 표시되는 문제

#### 발생한 부분

- 회원가입을 시도한 이후에 로그아웃을 하고 로그인을 하려고 로그인 페이지에 접속하면 회원가입이 완료되었다는 알림이 표시되는 문제가 발생하였습니다.

#### 원인

- 회원가입을 성공한 경우, sessionStorage에 isJoined라는 키를 true라는 값과 함께 저장하는데, sessionStorage 내의 값은 브라우저가 종료되지 않는 이상 유효하기 때문에 문제가 발생하였습니다.

#### 해결

- 로그인 페이지에서 sessionStorage 내에 isJoined 키가 존재할 때, 해당 키를 제거하도록 설정함으로써 문제를 해결하였습니다.
</details>

<br />

## 고민

### 세션 로그인에 대한 고민

- 프로젝트 초반에 로그인이 되었는가를 클라이언트, 서버에서 각각 어떻게 판별할 것인지에 대해 고민하였습니다.
- /login으로 GET 요청을 보내는 훅을 각각의 컴포넌트에서 불러오도록 설정, 서버에서 loggedIn 값을 쿠키에 저장, 전역 상태 사용 또는 서버에서 전달한 loggedIn 값을 localStorage에 저장, 이 3가지 방법을 떠올리게 되었고 이 중 서버에서 loggedIn 값을 쿠키에 저장, 전역 상태 사용을 선택하였습니다.
- /login으로 GET 요청을 보내는 훅을 여러 컴포넌트에서 불러온다면, 클라이언트 측에서는 여러 컴포넌트들에서 동일한 훅을 매번 사용하니 비효율적이며, 서버로 매번 요청이 가면 서버에 부담이 가기 때문에 선택하지 않았습니다.
- localStorage에 저장하는 방법은 DB에 저장한 세션이 만료 기한에 이를렀을 때 자동으로 만료되지 않기 때문에 선택하지 않았습니다.
- 때문에 로그인에 성공하였을 때 서버 측에서 세션에 `loggedIn=true` 값을 저장하여 전달하도록 설정하고, App 컴포넌트에서는 /login으로 요청을 보내 데이터를 전달받아 loggedIn 데이터를 전역 상태에 저장하도록 설정하였습니다.
- 또한 로그인된 사용자만 이용할 수 있는 기능을 통해 서버로 GET 요청을 보낼 때, `withCredentials: true` 설정을 통해 세션 내에 저장된 loggedIn 값을 추출하여 사용자가 로그인 되어 있는지 아닌지를 판별할 수 있게 되었습니다.

### 이미지 업로드, 게시글 생성 로직 병합에 대한 고민

- 기존에는 이미지를 먼저 업로드하고, 그 이후에 게시글의 내용을 작성하는 식으로 두 페이지가 나누어졌었는데 이를 병합할 것인가에 대하여 고민하였습니다.
- 사용자 입장에서 바라보았을 때, 이미지를 업로드하고 게시글을 생성하는 페이지로 이동하였을 때 분명히 선택한 이미지 중 취소를 하거나 다른 이미지를 추가하고 싶을 것이라는 생각이 들었습니다.
- 그런데 기존의 이미지 업로드 - 게시글 생성으로 이어지는 로직에서는 게시글 생성 페이지에서 뒤로 가기를 눌러도 이전의 이미지 업로드 페이지로 이동하지 않았고, 기존의 이미지 데이터들을 불러오지 않았습니다.
- 때문에 이미지 업로드와 게시글 생성 페이지를 병합하여 이미지 업로드와 게시글 생성을 한 번에 할 수 있도록 설정하였습니다.

### 게시글 좋아요에 대한 고민

- 처음에는 단순히 좋아요 수를 숫자로 지정하고, 이를 +1, -1 하면 된다고 생각하였습니다.
- 그러나 사용자가 좋아요를 눌렀을 때 좋아요 수가 이상하게 많이 감소되거나 증가하는 문제가 발생하게 되었습니다.
- 때문에 좋아요 수를 숫자가 아닌, 배열로 설정하여 사용자의 ObjectId를 저장하고, 사용자의 ObjectId가 좋아요 수 배열에 포함되어 있을 때 이를 제거함으로써 좋아요 취소를 할 수 있도록 설정하였습니다.

### 로그인 페이지에 대한 고민

- 로그인 페이지에서 마우스로 위아래를 쭉 당길 때 보이는 빈 여백이 사용자 입장에서 생각해 보았을 때 불편하였습니다.
- 때문에 `overflow: hidden`을 사용하여 마우스로 쭉 당길 수 없도록 설정하였습니다.

### 회원가입과 로그인 로직 분리에 대한 고민

- 기존에는 회원가입이 완료되면 로그인 또한 성공되도록 구현하였습니다.
- 그런데 회원가입을 할 때, 이미 존재하는 유저의 정보로 회원가입을 하면 로그인이 바로 되어 버리는 문제가 발생하였기에 회원가입과 로그인의 로직을 분리하였습니다.
- 이 고민을 하던 시기는 프로젝트 초기였기에 회원가입에 대한 예외 처리가 이루어지지 않았었고, 이 때문에 회원가입에서 문제가 발생하였는데도 로그인이 되어 버리는 문제가 발생하였던 것이었습니다.

### 경고 표시에 대한 고민

- 이미지 업로드를 취소하려고 하거나, 비밀번호를 변경하려고 하거나, 계정을 폐쇄하려고 하거나, 게시글을 제거하려고 할 때, 경고를 먼저 표시하면 사용자가 행할 수 있는 실수에 대비할 수 있을 것이라는 고민을 하게 되었습니다.
- 때문에 각각 간단하게 alert를 사용하여 사용자가 뒤로 가기, 제출 버튼을 클릭하였을 때 경고를 우선적으로 표시하도록 설정하였습니다.

### 게시글 수정 시에 사용자가 빈 내용을 제출하는 것에 대한 고민

- 사용자가 게시글 수정 시에 빈 내용을 제출할 수도 있기 때문에, 이에 대비하여 게시글 수정 시에 빈 내용을 제출하면 이전의 내용으로 저장하도록 설정하였습니다.

### 이미지 위에 마우스를 올렸을 때 표시하는 정보에 대한 고민

- 이미지 위에 마우스를 올렸을 때 어떤 정보들을 표시해야 할까에 대해 고민을 하였습니다.
- 이미지 위에 마우스를 올렸을 때 이미지를 드래그 또는 슬라이드를 하여 게시글의 이미지들을 구경할 수 있게 설정할까 고민하였으나, 수십 개 이상의 게시글들의 이미지를 화면에서 드래그 또는 슬라이드를 할 수 있게 설정한다면 성능 문제가 발생할 것이라는 생각이 들었습니다.
- 때문에 이미지 위에 마우스를 올리면 간단하게 소유자의 정보와 이미지의 개수만을 표시하도록 설정하였습니다.

### 스크롤 위치에 대한 고민

- 이미지를 클릭하여 게시글을 구경한 다음, 뒤로 가기를 클릭한 경우에는 이전의 스크롤 위치가 아닌 다른 위치로 이동하게 됩니다. 이미지를 무한 스크롤 하여 구경할 수 있는 찰칵 프로젝트의 경우에는 이미지들을 구경하다가 마음에 드는 이미지를 클릭하고 구경한 다음, 다시 뒤로 가기 버튼을 누르면 기존의 스크롤 위치로 이동해야 하기 때문에 스크롤 위치에 대한 고민을 하였습니다.
- 때문에 각 컴포넌트에 따라 뒤로 가기를 클릭하였는지에 대한 여부를 저장하는 전역 상태를 생성하였고, 이미지를 클릭하던 당시의 스크롤 위치를 기억하는 전역 상태를 생성하였습니다.
- 메인 페이지, 유저 페이지, 검색 페이지, 유사 게시글에서 이미지 위에 마우스를 올려 사용자의 프로필을 클릭하거나 게시글을 클릭하였을 때, 당시의 스크롤 위치를 기억하도록 설정하였습니다.
- 또한 페이지를 이동한 이후에 브라우저의 뒤로 가기를 누르면, 이를 감지하여 뒤로 가기를 클릭하였는지에 대한 여부를 저장하는 전역 상태를 업데이트하였고, 뒤로 가기를 클릭한 것이 맞을 때에는 저장된 스크롤 위치로 이동하도록 설정하였습니다.

### 로그인 보안에 대한 고민

- 만약 사용자가 로그인을 무수히 많이 시도하고 로그인을 실패한다면 어떻게 해야 하나라는 고민을 하였습니다.
- 로그인에 10번 실패하였ㅇ르 때에는 5분 후에 다시 로그인을 시도할 수 있도록 localStorage에 로그인 실패 횟수를 저장하고, 10번 실패하였을 때에는 로그인 동작은 금지하고 setTimeout을 사용하여 5분 후에 localStorage 내의 값이 초기화되도록 설정하였습니다.

### 회원가입 보안에 대한 고민

- 회원가입 시에 사용자의 정보를 서버로 전달하는 과정에서 사용자의 정보가 탈취될 수도 있겠다는 고민을 하였습니다.
- 때문에 회원가입 시에 비밀번호를 클라이언트에서 해싱하고, 전달받은 값을 서버에서 또 해싱하도록 설정하였습니다.

### 검색란에 입력한 키워드가 최근 검색 목록에 이미 존재할 때에 대한 고민

- 사용자의 입장에서 최근 검색 목록에 검색한 키워드와 동일한 검색어가 존재해도 동일한 키워드를 최근 검색 목록에 저장하면 불편하게 여길 것이라는 생각을 하였습니다.
- 떄문에 최근 검색 목록에 검색한 키워드와 동일한 검색어가 존재할 때 해당 검색어를 추가하지 않도록 설정하였습니다.

<br />

## 배운 것들

- 배포를 제외하고 프론트엔드, 백엔드를 모두 다뤄보며 프로젝트의 전체적인 과정을 홀로 경험하였고, 이를 통해 프론트엔드, 백엔드 간에 통신을 주고받는 REST API에 대해 알게 되었습니다.
- 하나의 서비스를 온전하게 사용자가 이용할 수 있도록 개발하는 것은 어려우며 많은 노력을 요구한다는 것을 알게 되었습니다.
- 이미지 파일 변환, 이미지 고유 크기 조절, CLS 개선, lazy loading을 통한 이미지 최적화 방법을 간단하게나마 알게 되었습니다.
- 사용자 경험에는 웹 사이트의 성능이 큰 영향을 끼친다는 점을 많은 이미지들을 이미지 최적화 없이 렌더링을 해보고 느끼게 되었습니다.
- 기획 시에 요구사항이나 라우터를 설정하고 개발을 하였으나, 나중에는 주먹구구식으로 개발을 하게 되었습니다. 때문에 설계할 당시에 전역 상태, 페이지, 재사용할 컴포넌트, 훅, 기능, 타입 등에 대한 설계가 이루어진다면 완성도가 높아진다는 걸 알게 되었습니다.
- 사용자의 행동을 예측해서(데이터에 기반하는 등), 이미지를 미리 로딩한다던가 데이터를 미리 요청받아 온다던가 하는 방식을 통해 성능을 끌어올릴 수도 있겠다는 것, 즉 성능에 대한 관점을 간단하게 알게 되었습니다.
- 또한 개발을 하던 당시에는 프로젝트가 마무리된 이후에 리팩토링을 하겠다는 생각을 가지고 반복적인 코드를 그냥 사용하곤 하였는데, 이후에 리팩토링을 통해 반복적인 코드나 타입, 상수, 폴더 및 파일 분리, 컴포넌트 재사용 등을 해보니, 시간이 상당히 소요되었고 이러한 과정은 개발을 할 때 제때제때 이루어져야 타인에게 민폐를 끼치지 않고 협업을 할 수 있겠다는 것을, 즉 나만 이해할 수 있는 코드가 아니라 다른 사람도 쉽게 이해할 수 있도록 코드가 작성되어야 한다는 것을 알게 되었습니다.

<br />

## 개선하거나 추가해야 할 부분

- AWS를 통해 배포
- 다양한 예외 처리
- 카카오톡, 네이버 로그인 구현
- 프론트엔드 최적화
- 다양한 애니메이션 추가
- 팔로잉, 팔로워 기능 추가
- 이메일 인증 기능 추가
- 비밀번호를 잊어버렸습니까 기능 추가
- 조회 수, 좋아요 수 데이터 시각화
- 404 처리
- 경로 정리
- drag and drop으로 사진 순서 변경
- CreatePost 제목에서 엔터를 누르면 해시태그가 제거되는 문제
- CreatePost, EditPost에서 해시태그 추가 시에 2개씩 추가되는 문제
  - 이는 한글로 해시태그를 추가할 때에만 발생하는 문제임.
  - 여러 자음과 모음을 조합해야 하는 키보드 설정 때문에 일어난 문제로 보임.
  - unsplash, pixabay에서도 같은 문제가 발생함.
- 로그인 10번 실패 처리 부분 개선
  - 만약 사용자가 localStorage의 값을 제거한다면 이는 무효화됨. 때문에 로그인에 실패할 때마다 서버로 요청을 보내어 로그인 실패 횟수를 업데이트하고 클라이언트에서는 사용자의 로그인 실패 횟수가 얼마인지를 전달받아 처리하도록 개선해 볼 수도 있을 듯함.
- 등등

<br />

## 사용된 기술

| React                                                                                                                                         | TypeScript                                                                                                                                                        | Recoil                                                                                                                   | React-Query                                                                                                                                                                    | React-Router-Dom                                                                                                                      |
| --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------- |
| <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png" width="100px" align="center" /> | <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" width="100px" align="center" /> | <img src="https://blog.kakaocdn.net/dn/A4ANT/btrHoMUAw6C/ikblOMCARWgVNDONK1My3k/img.png" width="100px" align="center" /> | <img src="https://images.velog.io/images/woohm402/post/b895eacd-1a78-4f08-b8a5-822d882807c9/emblem-light-628080660fddb35787ff6c77e97ca43e.svg" width="100px" align="center" /> | <img src="https://john015.netlify.app/static/7dc7201f0bd1562a1ce36ce2f07b3f0e/52d07/react-router.png" width="150px" align="center" /> |

| Styled-Components                                                                                                         | axios                                                                                                                                      | Node JS                                                                                                                                        | express                                                                                                                       | mongoDB                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://blog.kakaocdn.net/dn/bJnCEB/btrwJwIaH3z/K0E3JkariSbVpxDywoWw11/img.png" width="135px" align="center" /> | <img src="https://velog.velcdn.com/images/moonshadow/post/bc1ac3ba-9c3f-4695-8994-147ff8f85eaa/image.jpeg" width="100px" align="center" /> | <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToCOdtp1sfknhbhKKD93RrEG4PDinvpn6rDg&usqp=CAU" width="100px" align="center" /> | <img src="https://cdn.jsdelivr.net/gh/haneulee/haneulee.github.io/img/post/express/img-1.png" width="100px" align="center" /> | <img src="https://miro.medium.com/v2/resize:fit:512/1*doAg1_fMQKWFoub-6gwUiQ.png" width="100px" align="center" /> |

<br />

## 컴포넌트

<br />

## 커스텀 훅

<br />

## 유틸 함수

<br />

## 전역 상태

### authAtoms

| 상태의 이름      | 설명                                |
| ---------------- | ----------------------------------- |
| loggedInState    | 로그인이 되었는가를 판별하는 상태   |
| isLoggedOutState | 로그아웃이 되었는가를 판별하는 상태 |

### currentPostAtoms

| 상태의 이름          | 설명                                                                      |
| -------------------- | ------------------------------------------------------------------------- |
| currentPostState     | 라우트 매개변수의 변경을 위해 현재 게시글의 postId를 저장하는 상태        |
| currentUserPageState | 라우트 매개변수의 변경을 위해 현재 유저 프로필의 username을 저장하는 상태 |

### navigationBackAtoms

| 상태의 이름                 | 설명                                                                                                                |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| isBackToMainState           | 브라우저에서 뒤로 가기를 눌렀을 때 메인 페이지로 이동하는가를 판별하는 상태                                         |
| isBackToUserPageState       | 브라우저에서 뒤로 가기를 눌렀을 때 유저 페이지로 이동하는가를 판별하는 상태                                         |
| isBackToSearchPostListState | 브라우저에서 뒤로 가기를 눌렀을 때 검색 결과를 보여주는 페이지로 이동하는가를 판별하는 상태                         |
| isBackToSimilarPostsState   | 브라우저에서 뒤로 가기를 눌렀을 때 유사한 게시글들을 렌더링 하는 페이지(게시글 페이지)로 이동하는가를 판별하는 상태 |

### pageScrollAtoms

| 상태의 이름                        | 설명                                                                                                                                              |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| currentPostPageScrollState         | 메인 페이지에서 무한 스크롤을 통해 게시글을 렌더링 할 때 현재 페이지의 수가 어느 정도인가를 저장하는 상태                                         |
| currentUserPageScrollState         | 유저 페이지에서 무한 스크롤을 통해 게시글을 렌더링 할 때 현재 페이지의 수가 어느 정도인가를 저장하는 상태                                         |
| currentSimilarPostsPageScrollState | 유사한 게시글들을 렌더링 하는 페이지(게시글 페이지)에서 무한 스크롤을 통해 게시글을 렌더링 할 때 현재 페이지의 수가 어느 정도인가를 저장하는 상태 |

### scrollYStateAtoms

| 상태의 이름                | 설명                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| mainPageScrollYState       | 메인 페이지에서 스크롤을 내리다가 게시글을 클릭하였을 때, 해당 스크롤 Y의 위치를 기억하는 상태                                         |
| userPageScrollYState       | 유저 페이지에서 스크롤을 내리다가 게시글을 클릭하였을 때, 해당 스크롤 Y의 위치를 기억하는 상태                                         |
| searchPostListScrollYState | 검색 결과를 보여주는 페이지에서 스크롤을 내리다가 게시글을 클릭하였을 때, 해당 스크롤 Y의 위치를 기억하는 상태                         |
| similarPostsScrollYState   | 유사한 게시글들을 렌더링 하는 페이지(게시글 페이지)에서 스크롤을 내리다가 게시글을 클릭하였을 때, 해당 스크롤 Y의 위치를 기억하는 상태 |

### postEditedAtom

| 상태의 이름   | 설명                                  |
| ------------- | ------------------------------------- |
| isEditedState | 게시글을 수정하였는가를 판별하는 상태 |

### searchStateAtoms

| 상태의 이름        | 설명                                        |
| ------------------ | ------------------------------------------- |
| recentSearchState  | 최대 5개의 최근 검색 키워드를 저장하는 상태 |
| currentSearchState | 현재 검색한 키워드를 저장하는 상태          |

### sessionAtom

| 상태의 이름  | 설명                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| sessionState | session 내의 email, name, username, profileImage, socialOnly를 저장하는 상태 |

<br />

## 라우터 설정

### 클라이언트 라우터 설정

| 경로              | 설명                        |
| ----------------- | --------------------------- |
| /                 | 메인 페이지                 |
| /login            | 로그인                      |
| /join             | 회원가입                    |
| /account          | 계정 설정 및 프로필 변경    |
| /account/password | 비밀번호 변경               |
| /account/close    | 계정 폐쇄                   |
| /user/:id         | 유저 프로필                 |
| /user/:id/likes   | 유저가 좋아하는 게시글 목록 |
| /post/upload      | 게시글 업로드               |
| /post/:id         | 게시글                      |
| /search/:keyword  | 게시글 검색                 |

<br />

### 서버 라우터 설정

#### 글로벌 라우터

| 경로             | 설명        | HTTP 요청 메서드 |
| ---------------- | ----------- | ---------------- |
| /posts           | 메인 페이지 | GET              |
| /login           | 로그인      | GET, POST        |
| /join            | 회원가입    | POST             |
| /search/:keyword | 게시글 검색 | GET              |

#### 유저 라우터

| 경로         | 설명        | HTTP 요청 메서드 |
| ------------ | ----------- | ---------------- |
| /user/:uid   | 유저 페이지 | GET              |
| /user/logout | 로그아웃    | POST             |

#### 계정 라우터

| 경로                | 설명                 | HTTP 요청 메서드 |
| ------------------- | -------------------- | ---------------- |
| /account            | 프로필 수정          | PUT              |
| /account/close      | 계정 폐쇄            | DELETE           |
| /account/password   | 비밀번호 변경        | PATCH            |
| /account/profileImg | 프로필 이미지 업로드 | POST             |

#### 게시글 라우터

| 경로                | 설명               | HTTP 요청 메서드 |
| ------------------- | ------------------ | ---------------- |
| /post/upload        | 게시글 생성        | POST             |
| /post/upload/images | 이미지 업로드      | POST             |
| /post/:pid          | 게시글 조회        | GET              |
| /post/:pid/edit     | 게시글 수정        | PUT              |
| /post/:pid/views    | 게시글 조회수      | PUT              |
| /post/:pid/likes    | 게시글 좋아요 수   | PUT              |
| /post/:pid/delete   | 게시글 삭제        | DELETE           |
| /post/similarPosts  | 유사한 게시글 조회 | GET              |

<br />

## 디렉토리 구조

chalkak<br />
|-- client<br />
|-- |-- src<br />
|-- |-- |-- apis<br />
|-- |-- |-- assets<br />
|-- |-- |-- atoms<br />
|-- |-- |-- components<br />
|-- |-- |-- constants<br />
|-- |-- |-- hooks<br />
|-- |-- |-- pages<br />
|-- |-- |-- styles<br />
|-- |-- |-- types<br />
|-- |-- |-- utils<br />
|-- |-- |-- App.tsx<br />
|-- |-- |-- index.tsx<br />
|-- server<br />
|-- |-- controllers<br />
|-- |-- middlewares<br />
|-- |-- models<br />
|-- |-- routes<br />
|-- |-- types<br />
|-- |-- db.ts<br />
|-- |-- init.ts<br />
|-- |-- server.ts<br />
|-- .gitignore<br />
|-- package.json<br />
|\_\_ README.md

<br />

## 커밋 컨벤션

| 제목     | 설명                           |
| -------- | ------------------------------ |
| feat     | 새로운 기능 추가               |
| fix      | 버그, 에러 수정                |
| refactor | 리팩토링                       |
| design   | CSS 등 사용자 UI 디자인        |
| init     | 프로젝트 초기 생성             |
| remove   | 코드 제거 및 파일을 삭제       |
| edit     | 기존의 파일, 코드 수정 및 개선 |
| types    | 공통 타입 추가                 |
