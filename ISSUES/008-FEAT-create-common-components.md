## Description

<!-- 이슈에 대한 간단한 설명을 작성해주세요 -->

공통 컴포넌트(Header, CartIcon, SearchBar, Spinner)를 체계적으로 구현하고 하드코딩된 UI 요소들을 컴포넌트 기반으로 리팩토링

현재 각 템플릿에 하드코딩된 헤더, 장바구니 아이콘, 스피너 등을 재사용 가능한 컴포넌트로 교체하여 유지보수성과 일관성을 개선

## Todo

- [ ] Spinner 컴포넌트 완성 (SVG/Circle 타입, 다양한 크기/색상 지원)
- [ ] CartIcon 컴포넌트 props 기반 동적 개수 표시 구현
- [ ] Header 컴포넌트 동적 제목 및 장바구니 연동 완성
- [ ] SearchBar 컴포넌트 이벤트 처리 완료
- [ ] product-list-template.js 하드코딩 제거
- [ ] product-detail-templates.js 하드코딩 제거
- [ ] 모든 컴포넌트 mount 함수 정리
- [ ] main.js에서 컴포넌트 통합 마운트
- [ ] 동적 데이터 업데이트 테스트

## ETC

<!-- 추가 정보나 참고사항이 있다면 작성해주세요 -->

- 특히 CartIcon의 장바구니 개수가 하드코딩되어 있어 props로 받도록 수정 필요
- Header 컴포넌트도 현재 개별 템플릿마다 다른 설정을 하고 있어 통일 필요
- Spinner는 현재 작업 중이며 아직 커밋되지 않은 상태
- 글로벌 인스턴스 패턴을 활용한 상태 관리 고려
