import { memo, useMemo } from "react";
import { UIText } from "@/components";
import { useUser } from "@/store/users";
import moment from "moment";
import { CheckCircleOutlined, EditOutlined } from "@ant-design/icons";
import {
  CheckmarkCircle02Icon,
  Delete02Icon,
  PencilEdit01Icon,
} from "hugeicons-react";
import { Button } from "antd";
import { isVerified } from "@/utils";

interface Props {
  data?: any;
  id: string;
  index: number;
}

const Name = memo(function Name({ id }: Props) {
  const user = useUser(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {"No name"}
    </UIText.BodyMedium400>
  );
});

const Email = memo(function Email({ id }: Props) {
  const user = useUser(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {user?.email || "No email"}
    </UIText.BodyMedium400>
  );
});

const CreatedDate = memo(function CreatedDate({ id }: Props) {
  const user = useUser(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {moment(user?.since || 0, "X").format("HH:mm - DD/MM/YYYY")}
    </UIText.BodyMedium400>
  );
});

const Status = memo(function Status({ id }: Props) {
  const user = useUser(id);

  return (
    <UIText.BodyMedium400
      style={{
        color: isVerified(user?.system_id) ? "rgba(6, 187, 57, 1)" : "white",
      }}
    >
      {isVerified(user?.system_id) ? "Đã kích hoạt" : "Chưa kích hoạt"}
    </UIText.BodyMedium400>
  );
});

const Action = memo(function Action({ id }: Props) {
  const user = useUser(id);
  return (
    <div className="flex gap-[8px]">
      <Button
        icon={<CheckmarkCircle02Icon size={16} style={{ color: "#fff" }} />}
        className="action-cell flex"
        disabled={isVerified(user?.system_id)}
      />
      <Button
        icon={<PencilEdit01Icon size={16} style={{ color: "#fff" }} />}
        className="action-cell flex"
      />
      <Button
        className="action-cell flex"
        icon={<Delete02Icon size={16} style={{ color: "#fff" }} />}
      />
    </div>
  );
});

export const Cell = {
  Name,
  Email,
  CreatedDate,
  Status,
  Action,
};
