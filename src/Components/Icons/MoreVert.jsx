function MoreVert({ color }) {
    return (
      <svg
        width="4"
        height="16"
        viewBox="0 0 4 16"
        xmlns="http://www.w3.org/2000/svg"
        fill={color} // This sets the default fill color for all shapes.
      >
        <path
          d="M2.00521 8.99219C2.46545 8.99219 2.83854 8.61909 2.83854 8.15885C2.83854 7.69862 2.46545 7.32552 2.00521 7.32552C1.54497 7.32552 1.17188 7.69862 1.17188 8.15885C1.17188 8.61909 1.54497 8.99219 2.00521 8.99219Z"
          fill={color} // Ensures the shape respects the `color` prop.
          stroke={color} // Makes stroke color dynamic as well.
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.00521 3.15885C2.46545 3.15885 2.83854 2.78576 2.83854 2.32552C2.83854 1.86528 2.46545 1.49219 2.00521 1.49219C1.54497 1.49219 1.17188 1.86528 1.17188 2.32552C1.17188 2.78576 1.54497 3.15885 2.00521 3.15885Z"
          fill={color}
          stroke={color}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.00521 14.8255C2.46545 14.8255 2.83854 14.4524 2.83854 13.9922C2.83854 13.5319 2.46545 13.1589 2.00521 13.1589C1.54497 13.1589 1.17188 13.5319 1.17188 13.9922C1.17188 14.4524 1.54497 14.8255 2.00521 14.8255Z"
          fill={color}
          stroke={color}
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  
  export default MoreVert;
  