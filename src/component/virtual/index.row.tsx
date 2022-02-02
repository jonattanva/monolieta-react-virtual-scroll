type PropTypes = {
    children: React.ReactNode;
    padding: number;
};

const Row = (props: PropTypes) => (
    <div
        className="monolieta-virtual-scroll__row"
        style={{ gap: `${props.padding}px` }}
    >
        {props.children}
    </div>
);

export default Row;
