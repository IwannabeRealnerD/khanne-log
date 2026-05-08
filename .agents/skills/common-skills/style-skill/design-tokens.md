---
name: design-tokens
description: 색상 토큰, 타이포그래피, 유틸리티 클래스의 정확한 값을 확인할 때 참조합니다. bg-surface-*, text-contents-*, border-*, typo-* 클래스 사용 시, 다크모드 지원 여부 확인 시, 커스텀 유틸리티(center, word-wrap, scroll-hidden) 사용 시 참조합니다.
---

# 디자인 토큰 레퍼런스

> 이 문서는 [style-skill](./SKILL.md)의 상세 참조 문서입니다.

MDS(Moin Design System) 디자인 토큰의 상세 목록과 제약 사항입니다.

**Figma**: [Design System 2.0](https://www.figma.com/design/A6CoTaVtaVGl6vOFoPtkbU/Design-System-2.0?node-id=5033-11325&m=dev)

---

## 제약 사항

### 1. Border는 반드시 `border` 클래스와 함께 사용

Border 토큰은 색상만 지정하므로 `border` 클래스가 필요합니다.

```tsx
// ❌ 테두리가 보이지 않음
<div className="border-primary">테두리 없음</div>

// ✅ 올바른 사용
<div className="border border-primary">테두리 있음</div>
<div className="border-b border-primary">하단 테두리만</div>
```

### 2. Overlay는 배경으로만 사용

Overlay 토큰은 `bg-` prefix로만 사용합니다.

```tsx
// ✅ 배경으로 사용
<div className="bg-overlay-primary">모달 배경</div>

// ❌ 텍스트 색상으로 사용 금지
<div className="text-overlay-primary">잘못된 사용</div>
```

### 3. Typography는 typo 유틸리티 사용

`text-[14px]` 대신 `typo-14` 유틸리티를 사용합니다. font-size와 line-height가 함께 설정됩니다.

```tsx
// ❌ 하드코딩
<p className="text-[14px] leading-[18px]">텍스트</p>

// ✅ typo 유틸리티
<p className="typo-14-l2">텍스트</p>
```

### 4. 다크모드는 System Token으로만 지원

Core Color는 다크모드를 지원하지 않습니다. System Token을 사용해야 자동 전환됩니다.

```tsx
// ❌ 다크모드 미지원
<div className="bg-gray-50">고정 색상</div>

// ✅ 다크모드 자동 지원
<div className="bg-surface-secondary">Light: gray-50 → Dark: gray-900</div>
```

---

## Color Tokens

### Core Color (특수 케이스만 사용)

다크모드 미지원. System Token 사용 권장.

#### Grayscale

| Token      | 값      |
| ---------- | ------- |
| `black`    | #000000 |
| `white`    | #ffffff |
| `gray-50`  | #f9fafb |
| `gray-100` | #f3f5f8 |
| `gray-200` | #e6e9eb |
| `gray-300` | #dadddf |
| `gray-400` | #cad0d4 |
| `gray-500` | #85878a |
| `gray-600` | #6b6c74 |
| `gray-700` | #424648 |
| `gray-800` | #2f3133 |
| `gray-900` | #1a1b22 |

#### Primary

| Token         | 값      |
| ------------- | ------- |
| `primary-50`  | #ebf5ff |
| `primary-100` | #f0f8ff |
| `primary-200` | #ddeeff |
| `primary-300` | #b2d9ff |
| `primary-400` | #66b4ff |
| `primary-500` | #2393ff |
| `primary-600` | #0082ff |
| `primary-700` | #0066ff |
| `primary-800` | #193ab7 |
| `primary-900` | #001b81 |

#### Semantic Colors

- `red-50` ~ `red-900`
- `yellow-50` ~ `yellow-900`
- `green-50` ~ `green-900`
- `purple-50` ~ `purple-900`
- `indigo-50` ~ `indigo-900`
- `pink-50` ~ `pink-900`
- `orange-50` ~ `orange-900`

#### Opacity

| Token                    | 값                             |
| ------------------------ | ------------------------------ |
| `black-t5` ~ `black-t98` | rgba(0, 0, 0, 0.05~0.98)       |
| `white-t3` ~ `white-t98` | rgba(255, 255, 255, 0.03~0.98) |

---

### System Token (권장)

다크모드 자동 지원.

#### Surface (배경)

| Token               | Light       | Dark        |
| ------------------- | ----------- | ----------- |
| `surface-primary`   | white       | black       |
| `surface-secondary` | gray-50     | gray-900    |
| `surface-tertiary`  | gray-200    | gray-700    |
| `surface-accent1`   | primary-700 | primary-500 |
| `surface-accent2`   | gray-800    | gray-200    |
| `surface-blue`      | primary-50  | primary-900 |
| `surface-red`       | red-50      | red-900     |
| `surface-yellow`    | yellow-50   | yellow-900  |
| `surface-green`     | green-50    | green-900   |

```tsx
<div className="bg-surface-primary">기본 배경</div>
<div className="bg-surface-secondary">카드/섹션 배경</div>
<div className="bg-surface-accent1">CTA 버튼</div>
```

#### Contents (텍스트/아이콘)

| Token                | Light       | Dark        |
| -------------------- | ----------- | ----------- |
| `contents-primary`   | gray-900    | white       |
| `contents-secondary` | gray-700    | gray-400    |
| `contents-tertiary`  | gray-500    | gray-600    |
| `contents-tertiary2` | gray-300    | gray-800    |
| `contents-tertiary3` | white       | black       |
| `contents-white`     | white       | white       |
| `contents-blue`      | primary-700 | primary-500 |
| `contents-red`       | red-600     | red-500     |
| `contents-yellow`    | yellow-600  | yellow-400  |
| `contents-green`     | green-500   | green-400   |

```tsx
<p className="text-contents-primary">기본 텍스트</p>
<p className="text-contents-secondary">보조 텍스트</p>
<a className="text-contents-blue">링크</a>
<p className="text-contents-red">에러</p>
```

#### Border (테두리) - Utility

| Utility            | Light    | Dark      |
| ------------------ | -------- | --------- |
| `border-primary`   | gray-100 | gray-800  |
| `border-secondary` | gray-200 | gray-700  |
| `border-tertiary`  | gray-300 | gray-600  |
| `border-tertiary2` | black-t5 | white-t15 |

```tsx
<div className="border border-primary">기본 테두리</div>
<div className="border border-secondary">보조 테두리</div>
```

#### Hover (호버)

| Token             | Light       | Dark        |
| ----------------- | ----------- | ----------- |
| `hover-primary`   | primary-800 | primary-600 |
| `hover-secondary` | black       | gray-300    |
| `hover-tertiary`  | gray-200    | black       |
| `hover-tertiary2` | gray-100    | gray-800    |
| `hover-tertiary3` | black-t15   | white-t20   |
| `hover-visited`   | purple-600  | purple-600  |
| `hover-blue`      | primary-200 | primary-800 |

```tsx
<button className="bg-surface-accent1 hover:bg-hover-primary">버튼</button>
<div className="hover:bg-hover-tertiary2">리스트 아이템</div>
```

#### Focus

| Token   | Light    | Dark     |
| ------- | -------- | -------- |
| `focus` | gray-700 | gray-200 |

```tsx
<input className="ring-focus focus:ring-2" />
```

#### Overlay (오버레이) - 배경만 사용

| Token               | Light     | Dark      |
| ------------------- | --------- | --------- |
| `overlay-primary`   | black-t85 | black-t70 |
| `overlay-secondary` | black-t60 | black-t50 |
| `overlay-tertiary`  | black-t50 | black-t30 |
| `overlay-tertiary2` | black-t30 | black-t15 |
| `overlay-tertiary3` | black-t15 | black-t10 |

```tsx
<div className="bg-overlay-primary">모달 배경</div>
```

---

## Typography Tokens

### 기본 (Line Height 1:1)

단일 라인 텍스트용. font-size = line-height.

| Utility   | Size |
| --------- | ---- |
| `typo-10` | 10px |
| `typo-12` | 12px |
| `typo-14` | 14px |
| `typo-16` | 16px |
| `typo-18` | 18px |
| `typo-20` | 20px |
| `typo-24` | 24px |
| `typo-28` | 28px |
| `typo-32` | 32px |
| `typo-36` | 36px |
| `typo-40` | 40px |
| `typo-48` | 48px |
| `typo-56` | 56px |
| `typo-64` | 64px |
| `typo-80` | 80px |

### -l2 (약간 넓은 Line Height)

본문 텍스트용.

| Utility      | Size | Line Height |
| ------------ | ---- | ----------- |
| `typo-12-l2` | 12px | 16px        |
| `typo-14-l2` | 14px | 18px        |
| `typo-16-l2` | 16px | 20px        |
| `typo-18-l2` | 18px | 22px        |
| `typo-20-l2` | 20px | 26px        |
| `typo-24-l2` | 24px | 30px        |

### -l3 (넓은 Line Height)

긴 문단용.

| Utility      | Size | Line Height |
| ------------ | ---- | ----------- |
| `typo-12-l3` | 12px | 18px        |
| `typo-14-l3` | 14px | 20px        |
| `typo-16-l3` | 16px | 24px        |
| `typo-18-l3` | 18px | 28px        |
| `typo-20-l3` | 20px | 30px        |
| `typo-24-l3` | 24px | 36px        |

### 용도별 권장

| 용도       | 토큰                            |
| ---------- | ------------------------------- |
| 버튼, 라벨 | `typo-14`, `typo-16`            |
| 본문       | `typo-14-l2`, `typo-16-l2`      |
| 긴 문단    | `typo-14-l3`, `typo-16-l3`      |
| 소제목     | `typo-18`, `typo-20`            |
| 제목       | `typo-24`, `typo-28`, `typo-32` |
| 대형 제목  | `typo-40` ~ `typo-80`           |
| 캡션/힌트  | `typo-10`, `typo-12`            |

---

## Utility Classes

### 레이아웃

| Utility  | 설명                                                           |
| -------- | -------------------------------------------------------------- |
| `center` | `display: flex; align-items: center; justify-content: center;` |

### 텍스트

| Utility            | 설명                           |
| ------------------ | ------------------------------ |
| `word-wrap`        | 단어 단위 줄바꿈 (한글 친화적) |
| `list-lower-latin` | 알파벳 리스트 (a, b, c)        |
| `list-lower-roman` | 로마자 리스트 (i, ii, iii)     |

### 스크롤

| Utility           | 설명                    |
| ----------------- | ----------------------- |
| `scroll-hidden`   | 스크롤바 숨기기         |
| `scroll-shadow-x` | 수평 스크롤 그림자 효과 |

### 포커스

| Utility     | 설명                                      |
| ----------- | ----------------------------------------- |
| `unfocused` | 기본 포커스 링 설정                       |
| `focused`   | 포커스 링 활성화 (`ring-2 ring-offset-2`) |

```tsx
<button className="unfocused focus-visible:focused">버튼</button>
```

### Z-Index

Tailwind 기본 외 커스텀 값 지원.

```tsx
<div className="z-100">z-index: 100</div>
<div className="z-999">z-index: 999</div>
```
