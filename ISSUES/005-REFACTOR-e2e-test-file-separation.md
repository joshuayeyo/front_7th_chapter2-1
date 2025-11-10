# 005 - REFACTOR - E2E 테스트 파일 분리

## Description

하나의 파일에 모여있던 E2E 테스트들을 기능별로 개별 파일로 분리하여 관리하기 쉽도록 구조를 개선합니다. Playwright 모범 사례에 따라 테스트 파일을 모듈화합니다.

## Todo

- [ ] 기존 `e2e.basic.spec.js`에서 테스트들을 `e2e/basics/` 폴더로 분리
- [ ] `1-init-N-basics.spec.js` - 초기화 및 기본 기능 테스트
- [ ] `2-search-N-filterings.spec.js` - 검색 및 필터링 테스트
- [ ] `3-states.spec.js` - 상태 유지 및 복원 테스트
- [ ] `4-product-details.spec.js` - 상품 상세 페이지 테스트
- [ ] `5-carts.spec.js` - 장바구니 기능 테스트
- [ ] `6-infinite-scrolls.spec.js` - 무한 스크롤 테스트
- [ ] `7-modal-N-interactions.spec.js` - 모달 및 UI 인터랙션 테스트
- [ ] 각 파일에 serial 모드 설정 및 E2EHelpers import 경로 수정
- [ ] `package.json`에서 `test:e2e:basic` 스크립트 수정
- [ ] 분리 후 테스트 실행 확인

## ETC

- 테스트 파일 분리로 관리 및 디버깅 용이성 향상
- 각 기능별 독립적인 테스트 실행 가능
- Playwright 권장사항에 따른 구조 개선
