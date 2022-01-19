import List from "..";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";

const dataset = new Array(100).fill(null).map((_, i) => {
    return <div key={i}>{`row ${i}`}</div>;
});

describe("<List/>", () => {
    beforeAll(() => {
        window.resizeTo = function resizeTo(width, height) {
            Object.assign(this, {
                innerHeight: height,
                innerWidth: width,
                offsetHeight: height,
                offsetWidth: width,
                outerHeight: height,
                outerWidth: width,
            }).dispatchEvent(new this.Event("resize"));
        };
    });

    it("custom style", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ height: "200px", width: "400px" }}>
                <List rowHeight={100} scrollTop={100} className="test-class">
                    {dataset}
                </List>
            </div>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass(
            "monolieta-virtual-scroll__main test-class"
        );
    });

    it("vertical offset", async () => {
        window.resizeTo(500, 500);

        const onScroll = jest.fn();
        render(
            <div style={{ height: "200px", width: "400px" }}>
                <List onScroll={onScroll} rowHeight={100} scrollTop={100}>
                    {dataset}
                </List>
            </div>
        );

        expect(onScroll).toHaveBeenCalledTimes(1);
    });

    it("horizontal offset", async () => {
        window.resizeTo(500, 500);

        const onScroll = jest.fn();
        render(
            <div style={{ width: "400px", height: "200px" }}>
                <List
                    columnWidth={100}
                    direction="horizontal"
                    onScroll={onScroll}
                    scrollLeft={100}
                >
                    {dataset}
                </List>
            </div>
        );

        expect(onScroll).toHaveBeenCalledTimes(1);
    });

    it("visible elements (horizontal)", async () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "400px", height: "200px" }}>
                <List columnWidth={100} direction="horizontal">
                    {dataset}
                </List>
            </div>
        );

        waitFor(
            () => {
                const items = screen.getAllByText(/row [0-9]/);
                expect(items).toHaveLength(4);
            },
            { timeout: 500 }
        );
    });

    it("visible elements (vertical)", async () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ width: "400px", height: "300px" }}>
                <List rowHeight={100} direction="vertical">
                    {dataset}
                </List>
            </div>
        );

        waitFor(
            () => {
                const items = screen.getAllByText(/row [0-9]/);
                expect(items).toHaveLength(3);
            },
            { timeout: 500 }
        );
    });

    it("general style", () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ height: "200px", width: "400px" }}>
                <List rowHeight={100}>{dataset}</List>
            </div>
        );

        const container = screen.getByRole("list");
        expect(container).toHaveClass("monolieta-virtual-scroll__main");
    });
});
