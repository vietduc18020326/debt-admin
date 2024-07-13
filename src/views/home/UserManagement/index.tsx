import { memo } from "react";
import { UIText } from "@/components";
import { Table, TableProps } from "antd";
import "./style.css";

interface DataType {
  key: string;
  name: string;
  email: string;
  created_date: number;
}

const columns: TableProps<DataType>["columns"] = [
  {
    title: "Stt",
    dataIndex: "key",
    rowScope: "row",
    width: 56,
    className: "bg-red",
  },
  {
    title: "Tên tài khoản",
    dataIndex: "name",
    render: (text) => (
      <UIText.BodyMedium400 className="text-white">{text}</UIText.BodyMedium400>
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    render: (text) => (
      <UIText.BodyMedium400 className="text-white bg-amber-700">
        {text}
      </UIText.BodyMedium400>
    ),
  },
  {
    title: "Thời gian tạo",
    dataIndex: "created_date",
    render: (text) => (
      <UIText.BodyMedium400 className="text-white">{text}</UIText.BodyMedium400>
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "John Brown",
    email: "huytom@gmail.com",
    created_date: 18889898989,
  },
  {
    key: "2",
    name: "Jim Green",
    email: "0571-22098333",
    created_date: 18889898888,
  },
  {
    key: "3",
    name: "Joe Black",
    created_date: 18900010002,
    email: "Sydney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    created_date: 18900010002,
    email: "London No. 2 Lake Park",
  },
  {
    key: "5",
    name: "Jake White",
    created_date: 18900010002,
    email: "Dublin No. 2 Lake Park",
  },
];

export const UserManagement = memo(function UserManagement() {
  return (
    <div className="h-full w-full bg-black py-2 px-6 flex gap-[20px] rounded-[40px] flex-col">
      <UIText.HeaderLarge className="text-white">
        Quản lý người dùng
      </UIText.HeaderLarge>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        className="highlight-border"
        rowClassName="bg-black "
      />
    </div>
  );
});
