import React from "react";
import PropTypes from "prop-types";

const Row = (props) => {
  const {
    children,
    direction,
    horizontalAlign,
    verticalAlign,
    cellSpacing,
    rowSpacing,
    className,
    ...rest
  } = props;

  function childrenWithProps(item, ...restProps) {
    return React.Children.map(item, (child) =>
      React.cloneElement(child, ...restProps)
    );
  }

  return (
    <div
      className={`grid-row ${className}`}
      style={{
        flexDirection: direction,
        justifyContent: horizontalAlign,
        alignContent: verticalAlign,
        alignItems: verticalAlign,
        width: `calc(100% + (${cellSpacing * 2}px))`,
        marginRight: `-${cellSpacing}px`,
        marginLeft: `-${cellSpacing}px`,
        marginTop: `-${rowSpacing}px`,
      }}
      {...rest}
    >
      {childrenWithProps(children, { rowSpacing, cellSpacing })}
    </div>
  );
};

Row.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
  horizontalAlign: PropTypes.string,
  verticalAlign: PropTypes.string,
  cellSpacing: PropTypes.number,
  rowSpacing: PropTypes.number,
};

Row.defaultProps = {
  className: "",
  direction: "row",
  horizontalAlign: "flex-start",
  verticalAlign: "flex-start",
  cellSpacing: 0,
  rowSpacing: 0,
};

export default Row;
