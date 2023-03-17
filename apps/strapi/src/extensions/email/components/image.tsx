import React, { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

let styles = {
  boxSizing: 'border-box',
  display: 'inline-block',
  width: '100%',
} as const;

export const Image = (
  props: DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >,
) => {
  return <img {...props} style={{ ...styles, ...props.style }} />;
};
