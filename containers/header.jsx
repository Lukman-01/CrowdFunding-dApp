import Navigation from "@/components/navigation";
import { useRouter } from "next/router";
import Image from "next/image";
import { UButton } from "@/components/utils";
import { useGlobalContext } from "@/contexts/global-context";
import { GrOverview } from "react-icons/gr";
import { VscChromeClose } from "react-icons/vsc";
import { TbWorld } from "react-icons/tb";
import { GrProjects } from "react-icons/gr";
import { CgMenuRight } from "react-icons/cg";
import { Drawer } from "@mantine/core";
import { useState } from "react";
import StartAProject from "@/components/start-project";

function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { connectWallet, address } = useGlobalContext();

  async function handleConnect() {
    if (address) {
      router.push("/project/create");
    } else {
      connectWallet();
    }
  }

  async function copyAddr() {
    navigator.clipboard.writeText(address);
  }

  return (
    <Navigation className="px-12 h-[120px] backdrop-filter backdrop-blur-xl border-b">
      <div
        className="flex flex-row items-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <Image
          src="/assets/brand_logo.png"
          alt="Brand logo"
          width={60}
          height={60}
        />
        <p className="text-primaryText font-bold text-[28px] lg:text-[54px] font-exo">
          CrowdFunding
        </p>
      </div>

      <>
        {/* Mobile menu */}
        <div>
          <Drawer
            opened={open}
            onClose={() => setOpen(false)}
            position="left"
            padding="xl"
            size="full"
          >
            <div className="flex flex-col items-start gap-[52px] h-screen px-2 pb-3 space-y-1 sm:px-3 pt-[120px] font-ProductSans">
              <Navigation.Link
                href="/"
                active={router.pathname == "/"}
                onClick={() => setOpen((prev) => false)}
                className="flex flex-row gap-2"
              >
                <GrOverview
                  color="#303c3d"
                  size="30"
                  className="cursor-pointer"
                />
                Overview
              </Navigation.Link>
              <Navigation.Link
                href="/explore"
                onClick={() => setOpen((prev) => false)}
                active={router.pathname == "/explore"}
                className="flex flex-row gap-2"
              >
                <TbWorld color="#303c3d" size="30" className="cursor-pointer" />
                Explore
              </Navigation.Link>

              <div className="flex flex-col gap-[30px] items-center mt-[80px]">
                {address ? (
                  <div className="flex flex-col gap-8 items">
                    <Navigation.Link
                      href="/project/account"
                      onClick={() => setOpen((prev) => false)}
                      active={router.pathname == "/explore"}
                      className="flex flex-row gap-2"
                    >
                      <GrProjects
                        color="#303c3d"
                        size="30"
                        className="cursor-pointer"
                      />
                      My Projects
                    </Navigation.Link>
                    <StartAProject
                      sx="mt-0"
                      callback={() => setOpen((prev) => false)}
                    />
                  </div>
                ) : (
                  <UButton
                    className="flex items-center bg-secondary px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
                    onClick={handleConnect}
                  >
                    Connect Wallet
                  </UButton>
                )}
              </div>
            </div>
          </Drawer>
        </div>

        <div className="hidden md:flex flex-row gap-x-[30px]">
          <Navigation.Link href="/" active={router.pathname == "/"}>
            Overview
          </Navigation.Link>
          <Navigation.Link
            href="/explore"
            active={router.pathname == "/explore"}
          >
            Explore
          </Navigation.Link>
          <Navigation.Link
            href="/how-it-works"
            active={router.pathname == "/how-it-works"}
          >
            How it works
          </Navigation.Link>
        </div>
        <div className="flex flex-row gap-x-[30px] items-center">
          {address ? (
            <div className="hidden md:flex flex-row gap-4 items-center">
              {router.pathname !== "/project/create" && (
                <StartAProject sx="mt-0" />
              )}
              <GrProjects
                color="#303c3d"
                size="30"
                className="cursor-pointer"
                title="My projects"
                onClick={() => router.push("/project/account")}
              />
            </div>
          ) : (
            <UButton
              className="hidden md:flex items-center bg-secondary px-5 py-6 text-primaryText font-bold shadow-lg rounded-lg"
              onClick={handleConnect}
            >
              Connect Wallet
            </UButton>
          )}
          {open ? (
            <div onClick={() => setOpen((prev) => false)} className="md:hidden">
              <VscChromeClose
                color="#000"
                size={28}
                className="cursor-pointer"
              />
            </div>
          ) : (
            <div onClick={() => setOpen((prev) => true)} className="md:hidden">
              <CgMenuRight color="#000" size={28} className="cursor-pointer" />
            </div>
          )}
        </div>
      </>
    </Navigation>
  );
}

export default Header;
