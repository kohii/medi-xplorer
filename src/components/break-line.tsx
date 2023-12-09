import React from "react";

type BreakLineProps = {
	value: string;
};

export function BreakLine({ value }: BreakLineProps) {
  const lines = value.split("\n");
  return (
    <>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </>
  );
}