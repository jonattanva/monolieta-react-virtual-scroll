import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { Body, Title, Row } from "./index.style";
import { List, Grid } from "monolieta-virtual-scroll";

const children = new Array(50000).fill(0).map((_, i) => <Row key={i}>{i}</Row>);

const Main = () => (
    <Body>
        <div>
            <Title>Grid</Title>
            <div style={{ width: "200px", height: "400px" }}>
                <Grid columnCount="auto" columnWidth={100} rowHeight={100}>
                    {children}
                </Grid>
            </div>
        </div>
        <div>
            <Title>List</Title>
            <div style={{ width: "200px", height: "400px" }}>
                <List rowHeight={50}>{children}</List>
            </div>
            <div style={{ width: "200px", height: "400px" }}>
                <List columnWidth={50} direction="horizontal">
                    {children}
                </List>
            </div>
        </div>
    </Body>
);

ReactDOM.render(
    <StrictMode>
        <Main />
    </StrictMode>,
    document.getElementById("root")
);
