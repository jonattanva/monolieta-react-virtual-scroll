import { getSizeStyle } from "../../style";

type PropTypes = {
    children: React.ReactNode;
    height: number;
    width: number;
};

const Item = (props: PropTypes) => (
    <div style={getSizeStyle(props.height, props.width)}>{props.children}</div>
);

export default Item;
