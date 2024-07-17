import { memo, useCallback, useEffect, useMemo } from "react";
import { UIText } from "@/components";
import moment from "moment";
import {
  CancelCircleIcon,
  CheckmarkCircle02Icon,
  PencilEdit01Icon,
} from "hugeicons-react";
import { Button, message, Popconfirm, Spin } from "antd";
import { isVerified } from "@/utils";
import { useCredential } from "@/store/credentials";
import { useAutoToastErrors, useBoolean } from "@/hooks";
import { useAsyncFn } from "react-use";
import { requestVerifyUser } from "@/store/credentials/function";
import { EditUserModal } from "@/views/home/EditUserModal";
import { EUserRole } from "@/store/users/type";

interface Props {
  data?: any;
  id: string;
  index: number;
}

const Name = memo(function Name({ id }: Props) {
  const user = useCredential(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {user?.name || "No name"}
    </UIText.BodyMedium400>
  );
});

const Email = memo(function Email({ id }: Props) {
  const user = useCredential(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {user?.email || "No email"}
    </UIText.BodyMedium400>
  );
});

const Role = memo(function Email({ id }: Props) {
  const user = useCredential(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {user?.role === EUserRole.USER ? "User" : "Admin"}
    </UIText.BodyMedium400>
  );
});

const CreatedDate = memo(function CreatedDate({ id }: Props) {
  const user = useCredential(id);
  return (
    <UIText.BodyMedium400 className="text-white">
      {moment(user?.since || 0, "X").format("HH:mm - DD/MM/YYYY")}
    </UIText.BodyMedium400>
  );
});

const Status = memo(function Status({ id }: Props) {
  const user = useCredential(id);

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
  const user = useCredential(id);
  const [visible, show, hide] = useBoolean(false);
  let idleCallback: number | null = null;

  const [{ loading: verifying, error: errorVerify }, onVerify] =
    useAsyncFn(async () => {
      await requestVerifyUser(
        { email: id },
        isVerified(user?.system_id) ? "deactivate" : "activate"
      );

      message.success("Update successfully!");
    }, [user?.system_id, id]);

  const onConfirm = useCallback(() => {
    idleCallback = requestIdleCallback(async () => {
      await onVerify();
    });
  }, [onVerify]);

  useEffect(() => {
    return () => {
      idleCallback && cancelIdleCallback(idleCallback);
    };
  }, []);

  const ActiveIcon = useMemo(
    () =>
      isVerified(user?.system_id) ? CancelCircleIcon : CheckmarkCircle02Icon,
    [user?.system_id]
  );

  useAutoToastErrors([errorVerify]);

  return (
    <div className="flex gap-[8px] items-center justify-center">
      <Popconfirm
        title={`${
          isVerified(user?.system_id) ? "Deactivate" : "Activate"
        } this user`}
        description={`Are you sure to ${
          isVerified(user?.system_id) ? "deactivate" : "activate"
        } this user?`}
        onConfirm={onConfirm}
        okText="Yes"
        cancelText="No"
      >
        <Button
          icon={<ActiveIcon size={16} style={{ color: "#fff" }} />}
          className="action-cell flex"
          style={{
            background: isVerified(user?.system_id)
              ? "rgba(209, 50, 50, 1)"
              : "rgba(6, 109, 6, 1)",
          }}
        />
      </Popconfirm>
      <Button
        icon={<PencilEdit01Icon size={16} style={{ color: "#fff" }} />}
        className="action-cell flex"
        onClick={show}
      />
      <Spin fullscreen spinning={verifying} />
      <EditUserModal visible={visible} onClose={hide} email={id} />
    </div>
  );
});

export const Cell = {
  Name,
  Email,
  Role,
  CreatedDate,
  Status,
  Action,
};
