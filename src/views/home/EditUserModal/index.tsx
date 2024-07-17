import { memo, useCallback } from "react";
import { Button, Form, Input, message, Modal, Select } from "antd";
import "./style.css";
import { UIText } from "@/components";
import { useAsyncFn } from "react-use";
import { EUserRole } from "@/store/users/type";
import { useCredential } from "@/store/credentials";
import { requestEditCredential } from "@/store/credentials/function";
import { useAutoToastErrors } from "@/hooks";

interface Props {
  visible: boolean;
  onClose: () => void;
  email: string;
}

export const EditUserModal = memo(function EditUserModal({
  visible,
  onClose,
  email,
}: Props) {
  const [form] = Form.useForm();
  const credential = useCredential(email);
  const [{ loading, error }, onSubmit] = useAsyncFn(async () => {
    await requestEditCredential({
      email,
      role: form.getFieldValue("role"),
      name: form.getFieldValue("name"),
    });
    message.success("Updated successfully");

    form.resetFields();
    onClose();
  }, [form, email]);

  const onCancel = useCallback(() => {
    form.resetFields();
    onClose();
  }, []);

  useAutoToastErrors([error]);

  return (
    <Modal
      title={
        <UIText.HeaderLarge className="text-white flex items-center justify-center">
          Chỉnh sửa thông tin
        </UIText.HeaderLarge>
      }
      open={visible}
      onCancel={onCancel}
      centered
      wrapClassName="edit-modal"
      footer={() => (
        <div className="flex px-[70px]">
          <Button
            htmlType="submit"
            className="edit-btn-modal w-full"
            loading={loading}
            onClick={onSubmit}
          >
            <UIText.BodyMedium500>Xác nhận</UIText.BodyMedium500>
          </Button>
        </div>
      )}
    >
      <Form
        name="basic"
        form={form}
        layout="vertical"
        wrapperCol={{ span: 24 }}
        initialValues={{
          role: credential?.role || EUserRole.USER,
          name: credential?.name || "",
        }}
      >
        <div className="flex flex-col px-[70px] gap-[16px]">
          <Form.Item
            label={
              <UIText.BodyMedium500 className="text-gray-50">
                Name
              </UIText.BodyMedium500>
            }
            className="w-full mb-0"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            label={
              <UIText.BodyMedium500 className="text-gray-50">
                Role
              </UIText.BodyMedium500>
            }
            className="w-full mb-0"
            name="role"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Select defaultValue={credential?.role || EUserRole.USER}>
              <Select.Option value={EUserRole.USER}>User</Select.Option>
              <Select.Option value={EUserRole.ADMIN}>Admin</Select.Option>
            </Select>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
});
