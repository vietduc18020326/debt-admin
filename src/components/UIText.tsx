import React, { memo, PropsWithChildren } from "react";
import { Typography } from "antd";
import { TypographyProps } from "antd/es/typography";

const BodyLarge400 = memo(function BodyMedium400({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { className, style, ...props } = rest;
  return (
    <Typography
      className={`text-base font-normal leading-6 ${className}`}
      style={style}
      {...props}
    >
      {children}
    </Typography>
  );
});

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

const CaptionMedium500 = memo(function CaptionMedium500({
  children,
  ...rest
}: PropsWithChildren<React.HTMLAttributes<HTMLParagraphElement>>) {
  const { className, style, ...props } = rest;
  return (
    <Typography
      className={`text-xs font-medium ${className}`}
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

  BodyLarge400,

  HeaderLarge,

  CaptionMedium500,
};
