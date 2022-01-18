import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { Body, Title, Row, Item } from "./index.style";
import { List, Grid } from "./virtual";

const children = new Array(50000).fill(0).map((_, i) => <Row key={i}>{i}</Row>);

const Main = () => (
    <Body>
        <div>
            <Item>
                <Title>Grid (Vertical)</Title>
                <div style={{ width: "200px", height: "400px" }}>
                    <Grid columnCount="auto" columnWidth={100} rowHeight={100}>
                        {children}
                    </Grid>
                </div>
            </Item>
            <Item>
                <Title>Grid</Title>
            </Item>
        </div>
        <div>
            <Item>
                <Title>List (Vertical)</Title>
                <div style={{ width: "200px", height: "400px" }}>
                    <List rowHeight={50}>{children}</List>
                </div>
            </Item>
            <Item>
                <Title>List (Horizontal)</Title>
                <div style={{ width: "400px", height: "200px" }}>
                    <List columnWidth={100} direction="horizontal">
                        {children}
                    </List>
                </div>
            </Item>
        </div>
    </Body>
);

ReactDOM.render(
    <StrictMode>
        <Main />
    </StrictMode>,
    document.getElementById("root")
);
