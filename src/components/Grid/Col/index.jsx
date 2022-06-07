import React from "react";
import PropTypes from "prop-types";

// xs = mobile
// sm = small tablet
// md = tablet
// lg = web

const Col = (props) => {
  const {
    cellSpacing, // from row
    rowSpacing, // from row
    direction,
    horizontalAlign,
    verticalAlign,
    className,
    children,
    show,
    xs,
    sm,
    md,
    lg,
    ...rest
  } = props;

  if (show) {
    return (
      <div
        className={`grid-col-xs-${xs} grid-col-sm-${sm} grid-col-md-${md} grid-col-lg-${lg} ${className}`}
        style={{
          padding: `${rowSpacing}px ${cellSpacing}px`,
          flexDirection: direction,
          justifyContent: horizontalAlign,
          alignContent: verticalAlign,
          alignItems: verticalAlign,
        }}
        {...rest}
      >
        {children}
      </div>
    );
  }

  return <React.Fragment />;
};

Col.propTypes = {
  className: PropTypes.string,
  cellSpacing: PropTypes.number,
  rowSpacing: PropTypes.number,
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
  horizontalAlign: PropTypes.string,
  verticalAlign: PropTypes.string,
  show: PropTypes.bool,
  xs: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
  lg: PropTypes.number,
};

Col.defaultProps = {
  xs: 12,
  md: 6,
  sm: 4,
  lg: 3,
  show: true,
  className: "",
  cellSpacing: 0,
  rowSpacing: 0,
  direction: "row",
  horizontalAlign: "flex-start",
  verticalAlign: "flex-start",
};

export default Col;
