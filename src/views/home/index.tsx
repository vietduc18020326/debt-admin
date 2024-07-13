import { memo, useCallback } from "react";
import { useManualLogin } from "@/hooks";
import { useRouter } from "next/navigation";
import { Button } from "antd";
import { useMe } from "@/store/users";
import { IMAGE_LOGO } from "@/dummy";
import { UIText } from "@/components";
import { UserManagement } from "@/views/home/UserManagement";

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
          <div className="flex items-center flex-col gap-[4px]">
            <UIText.HeaderLarge className="text-white">
              {"No name"}
            </UIText.HeaderLarge>
            <UIText.BodyMedium400 className="text-gray-400">
              {me?.email || ""}
            </UIText.BodyMedium400>
          </div>
        </div>
        <div className="flex flex-col gap-[24px]">
          {/*<Button onClick={onClick}>Logout</Button>*/}
          <Button onClick={onClick}>Logout</Button>
        </div>
      </div>
      <UserManagement />
    </div>
  );
});

export default HomeView;
