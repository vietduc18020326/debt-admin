import React from "react";
import { ConfigProvider } from "antd";

export default function RootLayoutComp({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Table: {
            headerBg: "rgba(35, 32, 28, 1)",
            headerColor: "rgba(197, 199, 209, 1)",
          },
        },
      }}
    >
      <div className={"root-container"}>{children}</div>
    </ConfigProvider>
  );
}
