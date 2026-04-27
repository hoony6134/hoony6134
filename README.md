# Template SSR FE

GSA Infoteam SSR(Server-Side Rendering) 프론트엔드 프로젝트 템플릿.

## Tech Stack

| 분류                   | 라이브러리                            |
| ---------------------- | ------------------------------------- |
| 번들러                 | Vite (TanStack Start)                 |
| UI                     | React 19                              |
| 라우팅 / SSR           | TanStack Start (파일 기반)            |
| 서버 상태              | TanStack Query                        |
| 스타일                 | Tailwind CSS v4                       |
| 국제화                 | i18next + react-i18next + i18next-cli |
| 날짜                   | dayjs                                 |
| UI 문서                | Storybook                             |
| 런타임 / 패키지 매니저 | Bun                                   |
| 린트 / 포맷            | ESLint + Prettier                     |
| 테스트                 | Vitest                                |

## 시작하기

```bash
bun install
bun run dev        # 개발 서버 (localhost:5173)
bun run storybook  # Storybook (localhost:6006)
```

## 주요 스크립트

| 명령                     | 설명                             |
| ------------------------ | -------------------------------- |
| `bun run dev`            | 개발 서버 실행                   |
| `bun run build`          | 프로덕션 빌드                    |
| `bun run preview`        | 빌드 결과 미리보기               |
| `bun run storybook`      | Storybook 실행                   |
| `bun run lint`           | ESLint 검사                      |
| `bun run check`          | Prettier 포맷 + ESLint 자동 수정 |
| `bun run test`           | 단위 테스트                      |
| `bun run gen:api`        | OpenAPI 스키마 → 타입 생성       |
| `bun run gen:i18n`       | i18n 키 추출 + 타입 생성         |
| `bun run gen:i18n:watch` | i18n 키 추출 + 타입 생성 (watch) |

## 프로젝트 구조

```text
src/
├── routes/          # TanStack Router 파일 기반 라우트
├── features/        # 도메인별 피처 모듈
│   └── <feature>/
│       ├── models/       # 데이터 모델, API 타입
│       ├── viewmodels/   # 비즈니스 로직, 쿼리/훅
│       ├── views/        # UI 컴포넌트, 페이지
│       └── index.ts      # 공개 API
└── common/          # 피처 공통 코드
    ├── components/  # 재사용 UI 컴포넌트
    ├── lib/         # 라이브러리 설정 (api, dayjs, i18n)
    ├── utils/       # 유틸리티 함수
    └── const/       # 공통 상수
```

### 레이어 규칙 (MVVM)

```text
View → ViewModel → Model
```

- View는 Model에 직접 접근할 수 없습니다.
- ViewModel은 View(UI)를 참조할 수 없습니다.
- Model은 최하위 계층으로 ViewModel·View를 참조할 수 없습니다.

ESLint(`eslint-plugin-boundaries`)로 강제됩니다.

## 네이밍 컨벤션

- `src/` 하위 모든 파일·폴더는 **kebab-case** 사용
- 단, `src/routes/`는 TanStack Router 파일명 규칙을 따름 (`$id.tsx`, `_layout.tsx` 등)

## Storybook

- **다크 / 라이트 모드**: 툴바(🌙)에서 전환. `data-theme` 어트리뷰트로 제어되며 Tailwind `dark:` variant와 연동됩니다.
- **언어(i18n)**: 툴바(🌐)에서 `한국어` / `English` 전환. dayjs 로케일이 i18n과 자동으로 동기화됩니다.

## 국제화 (i18n)

[i18next-cli](https://github.com/i18next/i18next-cli)로 번역 키 추출과 타입 생성을 자동화합니다.

`bun run gen:i18n`을 실행하면 (`bun run build` 시 자동 포함) 내부적으로 두 단계를 순서대로 실행합니다.

```bash
i18next-cli extract   # 소스에서 번역 키 추출 → public/locales/{lang}/{ns}.json
i18next-cli types     # 번역 파일 → src/@types/i18next.d.ts, resources.d.ts
```

### 규칙

- **기본 네임스페이스**: `_` (변경 시 `i18next.config.ts`와 `src/common/lib/i18n.ts` 모두 수정)
- **네임스페이스 구분자**: `:` (예: `t('auth:login.title')`)
- **키 구분자**: `.`
- **기본 언어**: `ko` (Primary) / `en` (Secondary)
- 사용하지 않는 키는 자동 삭제됩니다 (`removeUnusedKeys: true`).
- 번역 파일 경로: `public/locales/{language}/{namespace}.json`

### 번역 추가 방법

소스에서 `t()` / `useTranslation()` / `<Trans>` 로 키를 사용한 뒤 `bun run gen:i18n`을 실행하면 `public/locales/ko/_.json`에 빈 값으로 키가 추가됩니다. 이후 각 언어 파일에 번역 값을 채웁니다.

```tsx
const { t } = useTranslation();
t('greeting.hello'); // 기본 네임스페이스(_)
t('auth:login.title'); // auth 네임스페이스
```

## API 타입 생성

[openapi-typescript](https://github.com/openapi-ts/openapi-typescript)로 Swagger/OpenAPI 스키마에서 TypeScript 타입을 생성합니다.

`bun run gen:api`를 실행하면 (`bun run build` 시 자동 포함) 환경 변수에 설정한 Swagger 엔드포인트에서 스키마를 받아 `src/@types/api-schema.ts`를 생성합니다.

필요한 환경 변수:

| 변수               | 설명                         |
| ------------------ | ---------------------------- |
| `SWAGGER_URL`      | Swagger JSON / YAML 파일 URL |
| `SWAGGER_USER`     | Basic Auth 사용자명          |
| `SWAGGER_PASSWORD` | Basic Auth 비밀번호          |

### 사용 규칙

생성된 `api-schema.ts`의 타입은 **직접 import하지 않습니다.**

```ts
// ❌ 금지
import type { components } from '@/@types/api-schema';

// ✅ 허용 — feature model 또는 src/common/lib/api.ts 내부에서만
import type { components } from '@/@types/api-schema';
```

각 피처의 `models/index.ts`에서 필요한 타입만 가공·재export하고, 다른 레이어는 그 타입을 사용합니다.

## 환경 변수

`.env.example`을 복사해 `.env.local`을 생성하세요.

```bash
cp .env.example .env.local
```

## GitHub Branch Ruleset

`.github/ruleset.json`에 기본 브랜치 보호 규칙이 정의되어 있습니다. 이 템플릿을 사용하는 레포에서는 해당 룰셋을 import해야 합니다.

**적용 방법**: GitHub 레포 → Settings → Rules → Rulesets → **Import a ruleset** → `.github/ruleset.json` 선택

적용되는 규칙:

| 규칙               | 설명                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------- |
| 브랜치 삭제 금지   | 기본 브랜치 삭제 불가                                                                    |
| Force push 금지    | non-fast-forward push 불가                                                               |
| 선형 히스토리 필수 | squash merge만 허용                                                                      |
| PR 필수            | 승인 2명, stale review 자동 해제, 마지막 push 후 재승인 필요, 모든 리뷰 스레드 해결 필수 |
| 상태 체크 필수     | `check-version` CI 통과 필요                                                             |
