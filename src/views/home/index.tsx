import { memo, useCallback } from "react";
import { useManualLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useMe } from "@/store/users";
import { IMAGE_LOGO } from "@/dummy";
import { UIText } from "@/components";
import { UserManagement } from "@/views/home/UserManagement";
import {
  Logout03Icon,
  PencilEdit01Icon,
  UserCircle02Icon,
} from "hugeicons-react";

const HomeView = memo(function HomeView() {
  const { onLogout } = useManualLogin();
  const { push } = useRouter();
  const me = useMe();

  const onClick = useCallback(() => {
    onLogout();
    push("/sign-in");
  }, []);

  return (
    <div className="home-page bg-gray-900 h-screen w-screen p-8 flex gap-[24px]">
      <div className="h-full w-[331px] bg-black p-4 flex gap-[48px] rounded-[40px] flex-col">
        <div className="w-full  items-center flex justify-center gap-[24px] flex-col">
          <img src={IMAGE_LOGO} className="h-[120px]" />
          <div className="flex items-center flex-col gap-[16px]">
            <div className="flex items-center flex-col gap-[4px]">
              <UIText.HeaderLarge className="text-white">
                {"No name"}
              </UIText.HeaderLarge>
              <UIText.BodyMedium400 className="text-gray-400">
                {me?.email || "No email"}
              </UIText.BodyMedium400>
            </div>
            <div
              className="rounded-[400px] px-[8px] py-[12px]"
              style={{
                background:
                  "linear-gradient(88.86deg, #FEC600 4.05%, #FEF253 99.92%)",
              }}
            >
              <UIText.CaptionMedium500 color={"rgba(41, 41, 51, 1)"}>
                Tài khoản mặc định
              </UIText.CaptionMedium500>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          <Button className="justify-between p-0 bg-transparent border-0">
            <UIText.BodyLarge400 className={"text-white"}>
              Đổi mật khẩu
            </UIText.BodyLarge400>
            <UserCircle02Icon size={24} style={{ color: "#fff" }} />
          </Button>
          <Button
            onClick={onClick}
            className="justify-between p-0 bg-transparent border-0"
          >
            <UIText.BodyLarge400 className={"text-white"}>
              Đăng xuất
            </UIText.BodyLarge400>
            <Logout03Icon size={24} style={{ color: "#fff" }} />
          </Button>
        </div>
      </div>
      <UserManagement />
    </div>
  );
});

export default HomeView;
