const main = {
    alignItems: "stretch",
    background: "transparent",
    display: "flex",
    height: "100%",
    margin: 0,
    overflow: "auto",
    position: "relative",
    transform: "translateZ(0)",
    width: "100%",
    willChange: "scroll-position",
} as React.CSSProperties;

const viewport = {
    minHeight: "100%",
    overflow: "hidden",
    position: "absolute",
    transform: "translateZ(0)",
    width: "100%",
    willChange: "transform",
} as React.CSSProperties;

const body = (offsetX: number, offsetY: number): React.CSSProperties => ({
    alignContent: "flex-start",
    alignItems: "flex-start",
    contain: "content",
    display: "flex",
    flexWrap: "wrap",
    height: "100%",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: "0",
    transform: `translateY(${offsetY}px)`,
    width: `calc(100% - ${offsetX}px)`,
    willChange: "transform",
});

export default { main, viewport, body };
