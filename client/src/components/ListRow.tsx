import * as React from "react";

interface ListRowProps {
  onClick: () => void;
  data: any;
  style: any;
}

export default function ListRow({ onClick, data, style }: ListRowProps) {
  return (
    <p onClick={onClick} style={style}>
      {data}
    </p>
  );
}
