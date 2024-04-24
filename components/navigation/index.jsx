import { Container, NavLink } from "./styles";
import React from "react";
import Link from "next/link";

function Navigation({ children, ...props }) {
  return <Container {...props}>{children}</Container>;
}

// eslint-disable-next-line react/display-name
// Navigation.Link = React.forwardRef(({ children, href, ...props }, ref) => {
//   return (
//     <Link href={href} passHref legacyBehavior>
//       <NavLink ref={ref} {...props}>
//         {children}
//       </NavLink>
//     </Link>
//   );
// });

Navigation.Link = function NavigationLink({ children, href, ...props }) {
    return (
        <Link href={href} passHref legacyBehavior>
          <NavLink  {...props}>
            {children}
          </NavLink>
        </Link>
      );
}

export default Navigation;
