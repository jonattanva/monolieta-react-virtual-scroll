type PropTypes = {
    children: React.ReactNode;
};

const Row = (props: PropTypes) => (
    <div className="monolieta-virtual-scroll__row">{props.children}</div>
);

export default Row;
