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
            headerBg: "#23201C",
            headerColor: "rgba(197, 199, 209, 1)",
            rowHoverBg: "rgba(255, 255, 255, 0.2)",
          },
          Button: {
            defaultHoverBg: "rgba(255, 255, 255, 0.4)",
          },
          Spin: {
            colorBgMask: "rgba(0, 0, 0, 0.2)",
          },
        },
      }}
    >
      <div className={"root-container"}>{children}</div>
    </ConfigProvider>
  );
}
