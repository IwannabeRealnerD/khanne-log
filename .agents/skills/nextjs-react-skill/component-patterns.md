# React 컴포넌트 패턴

## Props 참조 방식

- **Props는 구조분해할당하지 않고 `props.` 형태로 참조합니다.**

  - Props를 구조분해할당하면 어떤 값이 props에서 온 것인지 코드에서 명확하지 않습니다.
  - `props.` 접두사를 사용하면 해당 값이 외부에서 전달된 것임을 명시적으로 알 수 있습니다.
  - 코드 가독성과 유지보수성이 향상됩니다.

- **예외: HTML element에 props를 전달할 때는 restProps 패턴을 사용할 수 있습니다.**
  - HTML element에 나머지 props를 전달하기 위해 구조분해 할당을 사용하는 경우는 허용됩니다.
  - 이 경우 컴포넌트에서 사용하는 props와 HTML element에 전달할 props를 분리하기 위해 구조분해 할당이 필요합니다.

## 사용 예시

### 기본 패턴

```tsx
// ❌ 나쁜 예: 구조분해할당 사용
interface Props {
  name: string;
  age: number;
  onClick: () => void;
}

const UserCard = ({ name, age, onClick }: Props) => {
  return (
    <div onClick={onClick}>
      <span>{name}</span>
      <span>{age}</span>
    </div>
  );
};

// ✅ 좋은 예: props. 참조 사용
interface Props {
  name: string;
  age: number;
  onClick: () => void;
}

const UserCard = (props: Props) => {
  return (
    <div onClick={props.onClick}>
      <span>{props.name}</span>
      <span>{props.age}</span>
    </div>
  );
};
```

### HTML element에 props 전달 (예외 허용)

```tsx
// ✅ 좋은 예: HTML element에 props 전달 시 restProps 패턴 사용 (예외 허용)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button = (props: ButtonProps) => {
  const { variant, ...restProps } = props;
  return (
    <button
      className={variant === "primary" ? "btn-primary" : "btn-secondary"}
      {...restProps}
    />
  );
};
```

## 장점

1. **명확성**: `props.` 접두사로 값의 출처가 명확합니다.
2. **가독성**: 코드를 읽을 때 어떤 값이 외부에서 전달된 것인지 쉽게 파악할 수 있습니다.
3. **유지보수성**: Props 구조가 변경되어도 참조 위치를 쉽게 찾을 수 있습니다.
