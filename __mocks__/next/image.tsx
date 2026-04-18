// src/__mocks__/next/image.tsx
import React from 'react';

export default function NextImageMock(props: any) {
  const src = typeof props.src === 'string' ? props.src : props?.src?.src ?? '';
  const { alt, width, height, style, className } = props;
  return <img src={src} alt={alt} width={width} height={height} style={style} className={className} data-next-image-mock />;
}