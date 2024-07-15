import { memo } from "react";
import { UIText } from "@/components";
import { Table, TableProps } from "antd";
import "./style.css";
import { useUserByQuery } from "@/store/users";
import { Cell } from "./Cell";

interface DataType {
  key: string;
  name: string;
  email: string;
  created_date: number;
}

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

const data: DataType[] = [
  {
    key: "01",
    name: "John Brown",
    email: "huytom@gmail.com",
    created_date: 18889898989,
  },
  {
    key: "02",
    name: "Jim Green",
    email: "0571-22098333",
    created_date: 18889898888,
  },
  {
    key: "03",
    name: "Joe Black",
    created_date: 18900010002,
    email: "Sydney No. 1 Lake Park",
  },
  {
    key: "04",
    name: "Jim Red",
    created_date: 18900010002,
    email: "London No. 2 Lake Park",
  },
  {
    key: "05",
    name: "Jake White",
    created_date: 18900010002,
    email: "Dublin No. 2 Lake Park",
  },
];

export const UserManagement = memo(function UserManagement() {
  const userIds = useUserByQuery("all");

  return (
    <div className="h-full w-full bg-black py-2 px-6 flex gap-[20px] rounded-[40px] flex-col overflow-auto">
      <UIText.HeaderLarge className="text-white sticky top-0 left-0">
        Quản lý người dùng
      </UIText.HeaderLarge>
      <div className="min-w-[985px] overflow-scroll ">
        <Table
          columns={columns as any}
          dataSource={userIds as any}
          rowClassName="table-row"
          rowKey={(item, index) => {
            return (index || 0).toString();
          }}
        />
      </div>
    </div>
  );
});
