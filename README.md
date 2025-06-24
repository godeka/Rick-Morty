# Rick & Morty Explorer

애니메이션 Rick & Morty의 캐릭터, 로케이션, 에피소드를 탐색할 수 있는 웹앱입니다. <br/>
React + TypeScript + Vite 기반의 SPA로 구성했으며, GraphQL + Apollo Client로 데이터 요청을 처리하고, Tailwind CSS 및 Shadcn 으로 UI를 구현했습니다.

<br/>

## ⚙️ 개발 환경

- **라이브러리**: React @19.1.0 (with Vite @6.3.0)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS (v3)
- **UI 컴포넌트**: [Shadcn](https://ui.shadcn.com) (Tailwind CSS 기반)
- **데이터 통신**: GraphQL + Apollo Client 
- **API**: [Rick & Morty GraphQL API](https://rickandmortyapi.com/graphql)

<br/>

## 🗂️ 폴더 구조

```
src/
├── components/
│ ├── sections/ # 탭별 섹션 UI 컴포넌트 (Characters, Locations, Epidsodes)
│ ├── shared/   # 공통 UI 컴포넌트 (Pagination, SearchField 등)
│ └── ui/       # Shadcn 에서 추가된 컴포넌트
├── graphql/     # GraphQL 쿼리 파일
├── hooks/       # 커스텀 훅 파일
├── types/       # 타입 정의 파일
├── App.tsx
├── main.tsx
├── ...
```

<br/>

## 🧠 주요 의사결정 사항

- **GraphQL 사용**: 필요한 데이터만 선택적으로 요청할 수 있어 효율적이며, Apollo Client를 통해 캐싱과 상태 관리도 가능
- **Shadcn 사용**: tailwind css 기반의 컴포넌트 모음. 간단한 웹페이지이므로, 필요한 컴포넌트만 가져와서 사용 가능한 shadcn이 적합하다고 판단 (번들 크기 최적화)
- **로딩/에러 처리**: 데이터 로딩 중에는 Skeleton(shadcn) 표시, 에러 발생 시 재시도(refetch) 버튼 표시 -> 데이터가 보이지 않을 때에도 사용자에게 적절한 피드백 제공
- **타입 통합 관리**: 컴포넌트별 props 타입을 제외한 모든 타입을 `types/rickmorty.types.ts` 파일에 선언하여 효율적인 타입 관리
- **페이징**: 정보를 찾기 적합하며 정돈된 인상을 주는 페이지네이션으로 구현 (graphql api에 page 전달, UI는 shadcn의 Pagination 컴포넌트 사용)
- **필터/검색**: graphql api에 filter 인자를 통해 필터링 구현 -> 상태값이 변할 때마다 실시간 데이터 refetch.
```
1) 캐릭터, 로케이션, 에피소드 모두 name으로 검색 가능 - shadcn의 Input
2) 캐릭터는 status(alive/dead/unknown)로도 필터링 가능 - shadcn의 Select
```
- **부가 기능**:
```
1) 다크 모드 - ThemeProvider로 구현
2) 즐겨찾기 기능 - 섹션별 아이템 즐겨찾기하여 즐겨찾기 목록 따로 볼 수 있게 구현
3) 새로고침 시에도 탭 상태, 페이지 상태, 즐겨찾기 목록 유지 - localStorage에 저장하여 구현. (필터링 상태는 초기화되는 것이 낫다고 판단하여 제외)
```


<br/>

## 🐛 Known Issues (개선 예정)

- 데이터 페칭 중에 페이지네이션의 번호가 사라지는 이슈
- 특정 카드가 화면 높이를 넘어서 잘려보이는 이슈 

<br/>

## 📄 참고사항

- 이 프로젝트는 과제 용도로 작성되었으며, 일부 코드는 AI 도구(ChatGPT, Cursor AI)와 각 기술 스택 공식 문서를 참고하여 작성되었습니다.  
  AI 사용한 코드는 주석으로 출처를 명시하였습니다.
