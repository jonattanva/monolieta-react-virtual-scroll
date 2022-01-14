type VirtualScroll = {
    translate: {
        x: number;
        y: number;
    };
    offset: {
        x: number;
        y: number;
    };
    width: number;
    height: number;
};

export default (
    virtualScroll: VirtualScroll,
    direction: "horizontal" | "vertical"
) => {
    if (direction === "horizontal") {
        return {
            body: {
                transform: `translateX(${virtualScroll.translate.x}px)`,
            },
            viewport: {
                width: `${virtualScroll.width}px`,
            },
        };
    } else {
        return {
            body: {
                transform: `translateY(${virtualScroll.translate.y}px)`,
                width: `calc(100% - ${virtualScroll.offset.x}px)`,
            },
            viewport: {
                height: `${virtualScroll.height}px`,
            },
        };
    }
};
