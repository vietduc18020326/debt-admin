import { Button, Form, Input, message, Typography } from "antd";
import { motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useManualLogin } from "@/hooks";
import { useAsyncFn } from "react-use";
import { UIText } from "@/components";

export default function SignupForm() {
  const [success, setSuccess] = useState(false);
  const { signUp } = useManualLogin();

  const [{ loading }, onFinish] = useAsyncFn(
    async (data: { email: string; password: string }) => {
      await signUp(data);
      setSuccess(true);
    },
    [signUp]
  );

  return (
    <div className="sign-page relative h-screen w-screen flex items-center justify-center ">
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
        <div
          className={`w-[350px] sm:w-[400px] text-center p-8 rounded-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-md ${
            success ? "" : "hidden"
          }`}
        >
          <img src="/email.svg" className="m-auto pb-6 w-[200px]" />
          <h2 className="text-xl sm:text-2xl font-bold mt-3">
            Successfully Registration
          </h2>
          <p className="text-gray-400 text-sm mt-3">
            We have sent an activation link to your email to continue with the
            registration process
          </p>
          <p className="mt-4">
            <Link
              className="text-sm text-indigo-600 hover:underline"
              href={"/home"}
            >
              Go to home
            </Link>
          </p>
        </div>

        <Form
          name="basic"
          layout="vertical"
          className={`${
            success ? "hidden" : ""
          } bg-white/90 dark:bg-gray-900/95 backdrop-blur-md p-8 w-[350px] sm:w-[400px] rounded-md`}
          wrapperCol={{ span: 24 }}
          initialValues={{ email: "", password: "" }}
          onFinish={onFinish}
        >
          <div className="flex gap-2 items-center">
            {/*<Logo />*/}
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Sign up now
            </h2>
          </div>
          <p className="text-gray-400 text-sm mt-3 mb-3">
            Our registration process is quick and easy, taking no more than 5
            minutes to complete.
          </p>
          <Form.Item
            label={
              <UIText.BodyMedium500 className="text-gray-50">
                Email
              </UIText.BodyMedium500>
            }
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            label={
              <UIText.BodyMedium500 className="text-gray-50">
                Password
              </UIText.BodyMedium500>
            }
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password placeholder="Password" type="password" />
          </Form.Item>
          <Form.Item className="mt-10">
            <Button
              htmlType="submit"
              className=" w-full"
              loading={loading}
              style={{
                background:
                  "linear-gradient(88.86deg, #FEC600 4.05%, #FEF253 99.92%)",
              }}
            >
              Sign up
            </Button>
          </Form.Item>
          <div className="mt-6 text-center text-gray-400 text-sm">
            Have a account ?{" "}
            <Link className="text-indigo-600 hover:underline" href={"/sign-in"}>
              Login
            </Link>
          </div>
        </Form>
      </motion.div>

      {/* <SignUp /> */}
    </div>
  );
}
