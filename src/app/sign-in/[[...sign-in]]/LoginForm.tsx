import { Button, Form, Input, message, Typography } from "antd";
import { useManualLogin } from "@/hooks";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAsyncFn } from "shared-core";
import { useRouter } from "next/navigation";
import { IMAGE_LOGO, IMAGE_LOGO_NAME } from "@/dummy";
import { UIText } from "@/components/UIText";

export default function LoginForm() {
  const { signIn } = useManualLogin();
  const { push } = useRouter();

  const [{ loading }, onFinish] = useAsyncFn(
    async (data: { email: string; password: string }) => {
      await signIn(data);

      message.success("Login successfully");
      push("/home");
    },
    []
  );

  return (
    <div className="sign-page relative h-screen w-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 100, scale: 1 }}
        transition={{ delay: 0.5, duration: 2 }}
        className="sign-page-background absolute top-0 left-0 w-full h-full"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 100, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex border-4 border-white/30 dark:border-gray-800/50 "
        style={{ borderRadius: `calc(0.375rem + 4px)` }}
      >
        <div className="bg-white/95 dark:bg-gray-900/90 backdrop-blur-md p-8 rounded-md">
          <div className="gap-y-14px">
            <img src={IMAGE_LOGO} className="w-[323px] h-[193px] m-auto" />
            <img src={IMAGE_LOGO_NAME} className="w-[422px] h-[149px]" />
            {/*<h2 className="text-xl sm:text-xl font-bold text-white">Sign in</h2>*/}
            {/*<h2 className="text-xl sm:text-2xl font-bold text-white bg-black">*/}
            {/*  Sign in*/}
            {/*</h2>*/}
          </div>
          <Form
            name="basic"
            layout="vertical"
            className="w-[400px] mt-6"
            wrapperCol={{ span: 24 }}
            initialValues={{ email: "", password: "" }}
            onFinish={onFinish}
          >
            <Form.Item
              label={
                <UIText.BodyMedium500 className="text-gray-50">
                  Email
                </UIText.BodyMedium500>
              }
              name="email"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label={
                <UIText.BodyMedium500 className="text-gray-50">
                  Password
                </UIText.BodyMedium500>
              }
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" type="password" />
            </Form.Item>
            <Form.Item className="mt-10">
              <Button
                // type="dashed"
                htmlType="submit"
                className="w-full px-14 py-16px"
                loading={loading}
                style={{
                  background:
                    "linear-gradient(88.86deg, #FEC600 4.05%, #FEF253 99.92%)",
                }}
              >
                <Typography className="font-inter text-base font-medium leading-6 text-left">
                  Login
                </Typography>
              </Button>
            </Form.Item>
          </Form>
          <div className="mt-6 text-sm text-center text-gray-400">
            {`Don't have any account ? `}
            <Link className="text-indigo-600 hover:underline" href={"/sign-up"}>
              Register
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
