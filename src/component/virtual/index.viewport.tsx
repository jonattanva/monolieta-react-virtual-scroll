type PropTypes = {
    children: React.ReactNode;
    height: number;
    width: number;
};

const Viewport = (props: PropTypes) => (
    <div
        className="monolieta-virtual-scroll__viewport"
        style={{
            height: `${props.height}px`,
            width: `${props.width}px`,
        }}
    >
        {props.children}
    </div>
);

export default Viewport;
