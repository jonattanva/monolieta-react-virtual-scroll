# List

List (rows) of elements

## Attributes
| Property                | Type              | Required   | Description          |
| ----------------------- | ----------------- | :--------: | -------------------- |
| rowHeight               | number            |     ✓      | Fixed row height     |
| onScroll                | function          |            | Callback invoked whenever the scroll offset changes |
| scrollTop               | function          |            | Vertical offset      |
| className               | string            |            | CSS class name       |


## Example

```jsx
import ReactDOM from 'react-dom';
import { List } from "monolieta-virtual-scroll";

const Example = () => {
    const rows = new Array(50000).fill(0).map((_, i) => (
        <div key={i} syle={{ width: "100%", height: "100%" }}>
            {i}
        </div>
    ));

    return (
        <div style={{ width: "400px", height: "300px" }}>
            <List rowHeight={100}>
                {rows}
            </Grid>
        </div>
    );
};

ReactDOM.render(<Example />, document.getElementById('root'));
```
