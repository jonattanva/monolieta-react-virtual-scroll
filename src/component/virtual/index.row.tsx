import { getPaddingStyle } from "../../style";

type PropTypes = {
    children: React.ReactNode;
    padding: number;
};

const Row = (props: PropTypes) => (
    <div
        className="monolieta-virtual-scroll__row"
        style={getPaddingStyle(props.padding)}
    >
        {props.children}
    </div>
);

export default Row;
