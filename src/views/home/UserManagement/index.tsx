import { memo, useEffect } from "react";
import { UIText } from "@/components";
import { Empty, Table, TableProps } from "antd";
import "./style.css";
import { Cell } from "./Cell";
import { useAsyncFn } from "react-use";
import { useCredentialByQuery } from "@/store/credentials";
import { requestAllCredentials } from "@/store/credentials/function";
import { useAutoToastErrors } from "@/hooks";

const columns: TableProps<string>["columns"] = [
  {
    title: "STT",
    dataIndex: "key",
    width: 56,
    render: (text, item, index) => {
      return (
        <UIText.BodyMedium400 className="text-white text-center">
          {index + 1}
        </UIText.BodyMedium400>
      );
    },
  },
  {
    title: "Tên tài khoản",
    dataIndex: "name",
    width: "30%",
    render: (data, id, index) => <Cell.Name id={id} index={index} />,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: "30%",
    render: (data, id, index) => <Cell.Email id={id} index={index} />,
  },
  {
    title: "Vai trò",
    dataIndex: "role",
    render: (data, id, index) => <Cell.Role id={id} index={index} />,
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_date",
    render: (data, id, index) => <Cell.CreatedDate id={id} index={index} />,
  },
  {
    title: "Trạng thái",
    dataIndex: "created_date",
    render: (data, id, index) => <Cell.Status id={id} index={index} />,
  },
  {
    title: "Hành động",
    dataIndex: "created_date",
    width: 132,
    render: (data, id, index) => <Cell.Action id={id} index={index} />,
  },
];

const rowKey = (item: any, index?: number) => (index || 0).toString();

export const UserManagement = memo(function UserManagement() {
  const ids = useCredentialByQuery("all");

  const [{ loading, error }, firstLoad] = useAsyncFn(requestAllCredentials);

  useEffect(() => {
    firstLoad().then();
  }, []);

  useAutoToastErrors([error]);

  return (
    <div className="h-full w-full bg-black py-2 px-6 flex gap-[20px] rounded-[40px] flex-col overflow-auto">
      {error ? (
        <div className="flex items-center justify-center mt-[100px]">
          <Empty />
        </div>
      ) : (
        <>
          <UIText.HeaderLarge className="text-white sticky top-0 left-0">
            Quản lý người dùng
          </UIText.HeaderLarge>
          <div className="min-w-[985px] overflow-scroll ">
            <Table
              columns={columns as any}
              dataSource={ids as any}
              loading={loading}
              rowClassName="table-row"
              rowKey={rowKey}
            />
          </div>
        </>
      )}
    </div>
  );
});
