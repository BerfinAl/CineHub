
import React from "react";

const CurvedText = ({isLoggedIn}) => {
  const newRadius = 38; // Set your desired radius here

  return (
    <svg  viewBox="0 0 100 100" width="125" height="125">
      <defs>
        <path
          id="circle"
          d={`
            M 50, 50
            m -${newRadius}, 0
            a ${newRadius},${newRadius} 0 1,1 ${newRadius * 2},0
            a ${newRadius},${newRadius} 0 1,1 -${newRadius * 2},0`}
        />
      </defs>
      <text fontSize="16" fontWeight="700" fill="#fff">
        <textPath xlinkHref="#circle">{isLoggedIn ? "Discover.Discover.Discover.Discover" : "Join CineHub. Join Cinehub. Join Cinehub."}</textPath>
      </text>
    </svg>
  );
};

export default CurvedText;
