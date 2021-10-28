import List from "..";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const dataset = new Array(6).fill(null).map((_, i) => {
    return <div key={i}>{`row ${i}`}</div>;
});

describe("<Grid/>", () => {
    beforeAll(() => {
        window.resizeTo = function resizeTo(width, height) {
            Object.assign(this, {
                innerWidth: width,
                innerHeight: height,
                outerWidth: width,
                outerHeight: height,
            }).dispatchEvent(new this.Event("resize"));
        };
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

    it("visible elements", async () => {
        window.resizeTo(500, 500);

        render(
            <div style={{ height: "200px", width: "400px" }}>
                <List rowHeight={100}>{dataset}</List>
            </div>
        );

        const items = await screen.findAllByText(/row [0-9]/);
        expect(items).toHaveLength(2);
    });
});