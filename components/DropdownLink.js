import Link from 'next/link';
import React from 'react'

const DropdownLink = (props) => {

    let {href , children, ...rest} = props;
  return (
    <Link  href={href}>
        <spam {...rest}> {children}</spam>
    </Link>
  )
}

export default DropdownLink