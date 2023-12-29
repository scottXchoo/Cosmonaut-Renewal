# COSMonaut 리뉴얼

## To Do List
- 전체 튜토리얼 진행 (영상 하나)
  - 막히는 부분 바로바로 해결
  - 계속해서 기록 남기기
  - Server 몇 번 요청했는지도 체크 (비교를 위해)
- AS-IS 아키텍처 작성
  - 폴더 구조
  - API 요청 순서
  - 문제점 파악
- TO-BE 아키텍처 작성
  - 최대한 꼼꼼하게 적기
  - 리서치 많이 하기 (Tailwind? StyleX?)
 
## 메모장
- 블로그에 리뉴얼 과정 포스팅 예정
  - AS-IS와 비교하며 어디가 변했는지 넣기


# Docker Compose Testbed

## 1) Set .env in cosmonaut-api folder

```sh
HOST_ADDR=0.0.0.0
PORT=3334
LOCAL_RUST_SET=false
SESS_SECRET=YOURSECRETKEYGOESHERE
REQ_TIMEOUT=130000
RUST_TIMEOUT=120000
TS_NODE_PROJECT=./tsconfig.prod.json
FRONT_HOST_ADDR="http://127.0.0.1:8080"
FRONT_MAIN_ADDR=/
FRONT_LOGIN_ADDR=/signUp
OAUTH_REDIRECT="http://127.0.0.1:8080"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
REDISHOST=redis-sess
REDISPORT=6379
PGHOST=pgdb
PGPORT=5432
PGUSER=ljs
PGPASSWORD=secret
PGDATABASE=cosmonaut
```

#### For maximum timeout of HTTP request (ms) :

Set `REQ_TIMEOUT`

#### For maximum timeout of CosmWasm project build (ms) :

Set `RUST_TIMEOUT`

#### For OAuth registration

Set `GOOGLE_*` and `GITHUB_*`

#### For OAuth redirect from provider (optional) :

Set `OAUTH_REDIRECT` only when you use proxy server

#### For redirect address based on user login status:

Set `FRONT_MAIN_ADDR`, `FRONT_LOGIN_ADDR`

#### For CORS:

Set `FRONT_HOST_ADDR`

#### For DB:

Set `PG*` for PostgreSQL connection and `REDIS*` for Redis connection. You can customize those values as needed.

## 2) Set .env in cosmonaut-frontend folder (optional)

```sh
REACT_APP_API_ADDR=http://127.0.0.1:8080
```

## 3) Run

Set `BUILD_ENV` args in `compose.yml` according to your situation ( production / development )

```sh
# Pull cosmo-rust image
docker pull tkxkd0159/cosmo-rust:latest

# Build react
# if you want rebuild react code, execute a script without 'new'
./react-build.sh [new]

# Build api-server
docker compose build

# Start app
docker compose up
```

## \* Reset

```sh
docker compose down
docker volume rm cosmonaut_pgdb cosmonaut_cosmproj cosmonaut_cargo cosmonaut_cosmbase
```
