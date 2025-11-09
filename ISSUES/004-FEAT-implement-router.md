## Description
SPA(Single Page Application)를 위한 클라이언트 사이드 라우터를 구현합니다. History API를 사용하여 페이지 전환 시 새로고침 없이 작동하도록 합니다.

## Todo
- [ ] Router 클래스 구현 (History API 기반)
- [ ] 동적 라우트 파라미터 지원 (`/product/:id`)
- [ ] `data-link` 속성 링크 클릭 처리 (이벤트 위임)
- [ ] 브라우저 뒤로가기/앞으로가기 지원 (popstate)
- [ ] URL 변경 시 페이지 새로고침 방지
- [ ] 404 fallback 라우트 처리
- [ ] E2E 테스트 통과 확인

## ETC
### E2E 테스트 요구사항 (e2e.advanced.spec.js)
- **SPA 네비게이션**: 페이지 전환 시 `window.loadFlag` 유지 (새로고침 안 됨)
- **브라우저 히스토리**: `page.goBack()`, `page.goForward()` 정상 작동
- **동적 라우팅**: `/product/85067212996` 형식 지원
- **URL 상태 유지**: URL 파라미터 기반 필터/검색 상태 복원
- **404 처리**: `/non-existent-page` → 404 페이지 표시

### 구현 방식
- History API (`pushState`, `popstate`)
- 라우트 매칭: 정규식 기반 패턴 매칭
- 컴포넌트 렌더링: 각 라우트별 렌더 함수 실행
