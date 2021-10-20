# monolieta-virtual-scroll

Component for rendering large lists

## Getting started

Install `monolieta-virtual-scroll` using yarn or npm

```shell
yarn add monolieta-virtual-scroll
```

```shell
npm install monolieta-virtual-scroll -P
```
## Grid

```jsx
import { Grid } from "monolieta-virtual-scroll";

export default () => {
    const rows = new Array(1000)
        .fill(0)
        .map((_, i) => <div key={i}>{i}</div>);

    return (
        <div style={{ width: "300px", height: "100vh" }}>
            <Grid 
                columnCount={2} 
                rowHeight={100} 
                rowWidth={100} 
                padding={4}>
                {rows}
            </Grid>
        </div>
    )
}
```

## List

```jsx
import { List } from "monolieta-virtual-scroll";

export default () => {
    const rows = new Array(1000)
        .fill(0)
        .map((_, i) => <div key={i}>{i}</div>);

    return (
        <div style={{ width: "300px", height: "100vh" }}>
            <List height={300} width={300}>
                {rows}
            </Grid>
        </div>
    )
}
```
