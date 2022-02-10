type PropTypes = {
    children: React.ReactNode;
    height: number;
    width: number;
};

const Item = (props: PropTypes) => (
    <div
        className="monolieta-virtual-scroll__item"
        style={{
            height: `${props.height}px`,
            width: `${props.width}px`,
        }}
    >
        {props.children}
    </div>
);

export default Item;
