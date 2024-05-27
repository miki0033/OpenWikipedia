import { Avatar } from "@nextui-org/react";

const Logo = () => {
  return (
    <div className="flex justify-center rounded-full overflow-hidden w-full">
      <Avatar name="logo" src="OWiki.png" size="lg" />
      {/*<Avatar alt="logo" src="./logo-only.png" sx={{ width: 56, height: 56 }} />*/}
      <div className="flex p-2 text-2xl text-center items-center im-sc-regular ">
        Open Wikipedia
      </div>
    </div>
  );
};

export default Logo;
