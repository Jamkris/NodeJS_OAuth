# 프로젝트 설정

## 프로젝트 생성

```bash
git clone https://github.com/Jamkris/NodeJS_OAuth.git server
```

## 모듈 설치

```bash
npm install
```

## 환경변수 설정

```bash
PORT = '서버 포트'

DB_ID = 'DB 아이다'
DB_PW = "DB 비밀번호"
DB_POST = "DB 호스트"
DB_PORT = "3306"
DB_SCHEMA = "DB 스키마이름"

CLIENT_ORIGIN = '프론트엔드 주소'
SERVER_ORIGIN = '백엔드 주소'

SECRET_KEY = "JWT SECRET"
ACCESS_EXPIRED = "엑세스토큰 만료일자(3d)"
REFRESH_EXPIRED = "리프레쉬토큰 만료일자(1y)"

SESSEION_SECRET = "SESSEION SECRET"

GOOGLE_CLIENT_ID = "Google Client ID"
GOOGLE_CLIENT_SECRET = "Google Client Secret"

GITHUB_CLIENT_ID = "GitHub Client ID"
GITHUB_CLIENT_SECRET = "GitHub Client Secret"

KAKAO_CLIENT_ID = "Kakao Client ID"
KAKAO_CLIENT_SECRET = "Kakao Client Secret"
```

## 실행

```bash
npm run start
```

## API 명세서
```
Google
login : GET /auth/google
callback : GET /auth/google/callback
fail : GET /auth/google/fail
authstate : GET /auth/google/authstate
logout : GET /auth/google/logout

GitHub
login : GET /auth/github
callback : GET /auth/github/callback
fail : GET /auth/github/fail
authstate : GET /auth/github/authstate
logout : GET /auth/github/logout

Kakao
login : GET /auth/kakao
callback : GET /auth/kakao/callback
fail : GET /auth/kakao/fail
authstate : GET /auth/kakao/authstate
logout : GET /auth/kakao/logout
```