# Styles

Using [styled-components](https://styled-components.com/)

```jsx
// scroll.style.tsx
import styled from "styled-components";
import { List } from "monolieta-virtual-scroll";

export const Scroll = styled(List)`
    &::-webkit-scrollbar {
        width: 16px;
    }

    &::-webkit-scrollbar-track {
        background-color: transparent;
    }

    &::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        border-radius: 100px;
        min-height: 30px;
        background-color: #000;
        background-clip: content-box;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #858585;
    }
`;

// index.tsx
import { Scroll } from "./scroll.style";
import ReactDOM from 'react-dom';

const Example = () => {
    const rows = new Array(50000).fill(0).map((_, i) => (
        <div key={i} syle={{ width: "100%", height: "100%" }}>
            {i}
        </div>
    ));

    return (
        <div style={{ width: "400px", height: "300px" }}>
            <Scroll rowHeight={100}>
                {rows}
            </Scroll>
        </div>
    );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```