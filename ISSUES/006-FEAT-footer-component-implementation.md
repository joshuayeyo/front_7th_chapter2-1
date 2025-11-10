# 006 - FEAT - Footer 컴포넌트 구현

## Description

공통 Footer를 재사용 가능한 컴포넌트로 분리하여 코드 중복을 제거하고 일관성을 유지합니다. Toast와 달리 정적 콘텐츠이므로 간단한 함수형 컴포넌트로 구현합니다.

## Todo

- [ ] Footer 컴포넌트 생성 (`src/components/commons/Footer/index.js`)
- [ ] `CommonFooter()` 함수로 정적 Footer HTML 반환 구현
- [ ] `product-list-template.js`에서 기존 정적 Footer를 `CommonFooter()` 호출로 교체
- [ ] 절대경로 import 사용 (`@/components/commons/Footer`)
- [ ] JSDoc 문서화 추가
- [ ] 다른 템플릿 파일들에도 Footer 컴포넌트 적용
- [ ] 커밋 및 코드 리뷰

## ETC

- Toast(동적)와 달리 Footer는 정적 콘텐츠이므로 함수형으로 단순 구현
- 기존 하드코딩된 Footer HTML을 컴포넌트로 교체하여 유지보수성 향상
- 추후 Footer 디자인 변경 시 한 곳에서만 수정하면 전체 적용 가능
