import React from "react";

type Props = {
  horizontal?: number;
  vertical?: number;
};

const Spacer: React.FC<Props> = ({ horizontal, vertical }) => {
  const height = vertical ? vertical : 0;
  const width = horizontal ? horizontal : 0;

  return <div style={{ width, height }} />;
};

export default Spacer;
