import React from "react";
import { ConfigProvider } from "antd";

export default function RootLayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider>
      <div className={"root-container"}>{children}</div>
    </ConfigProvider>
  );
}
