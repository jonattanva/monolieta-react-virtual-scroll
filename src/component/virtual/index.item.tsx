type PropTypes = {
  children: React.ReactNode;
  height: number;
  padding: number;
  width: number;
};

const Item = (props: PropTypes) => (
  <div
    style={{
      height: `${props.height}px`,
      padding: `${props.padding}px`,
      width: `${props.width}px`,
    }}
  >
    {props.children}
  </div>
);

export default Item;
