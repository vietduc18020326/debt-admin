import React, { memo, PropsWithChildren } from "react";
import { Typography } from "antd";
import { TypographyProps } from "antd/es/typography";

const BodyMedium400 = memo(function BodyMedium400({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { className, style, ...props } = rest;
  return (
    <Typography
      className={`text-sm font-normal ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Typography>
  );
});

const BodyMedium500 = memo(function BodyMedium500({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { className, style, ...props } = rest;
  return (
    <Typography
      className={`text-sm font-semibold ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Typography>
  );
});

const HeaderLarge = memo(function HeaderLarge({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { className, style, ...props } = rest;
  return (
    <Typography
      className={`text-lg font-bold ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Typography>
  );
});

export const UIText = {
  BodyMedium400,
  BodyMedium500,
  HeaderLarge,
};
