import { useRouter } from "next/router";
import { Image, CopyButton, ActionIcon, Tooltip } from "@mantine/core";
import { useState, useEffect } from "react";
import { useGlobalContext } from "@/contexts/global-context";
import { calculateBarPercentage, daysRemaining } from "@/lib";
import CountBox from "@/components/countBox";
import { TbCopy, TbCheck } from "react-icons/tb";

export default function ProjectDetails() {
  const router = useRouter();
  const [project, setProject] = useState(null);
  const [donators, setDonators] = useState([]);
  const [amount, setAmount] = useState("");
  const { setLoading, donate, getDonations, address, contract } =
    useGlobalContext();

  const countDown = daysRemaining(project?.expires);

  const fetchDonators = async () => {
    const details = JSON.parse(sessionStorage.getItem("project"));
    const data = await getDonations(details?.pId);

    setDonators(data);
  };

  const donateHandler = async () => {
    setLoading(true);

    await donate(project?.pId, amount);

    router.push("/");
    setLoading(false);
  };

  useEffect(() => {
    const data = JSON.parse(sessionStorage.getItem("project"));
    if (!data) router.push("/explore");

    setProject(data);

    if (contract) fetchDonators();
  }, [address, contract]);

  return (
    <div className="flex flex-row bg-white w-full px-[5vw] py-[8vh] text-primaryText">
      <div className="w-full">
        <p className="text-primaryText text-[24px] font-bold">
          {project?.title}
        </p>
        <div className="w-full flex md:flex-row flex-col mt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <Image
              src={project?.src}
              height={412}
              radius="md"
              alt={project?.title}
              fit="objectFit"
              className="w-full h-auto object-cover rounded-xl"
            />
            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    project?.amountRequested,
                    project?.amountReceived
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex flex-row md:flex-col flex-1 md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox title="Days Left" value={countDown} />
            <CountBox
              title={`Raised of ${project?.amountRequested}ETH`}
              value={`${project?.amountReceived}ETH`}
            />
            <CountBox title="Total Donators" value={donators.length} />
          </div>
        </div>

        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-exo font-semibold text-[18px] text-primaryText uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                  <h4 className="font-exo font-semibold text-[14px] text-primaryText break-all">
                    {project?.owner}
                    <CopyButton value={project?.owner} timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied" : "Copy"}
                          withArrow
                          position="right"
                        >
                          <ActionIcon
                            color={copied ? "teal" : "gray"}
                            onClick={copy}
                          >
                            {copied ? (
                              <TbCheck size={16} />
                            ) : (
                              <TbCopy size={16} />
                            )}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>
                  </h4>
              </div>
            </div>

            <div>
              <h4 className="font-exo font-semibold text-[18px] text-primaryText uppercase">
                Project Details
              </h4>

              <div className="mt-[20px]">
                <p className="font-exo font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {project?.desc}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-exo font-semibold text-[18px] text-primaryText uppercase">
                Donators
              </h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? (
                  donators.map((item, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between items-center gap-4 px-2 sm:px-0"
                    >
                      <p className="font-exo font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-all">
                        {index + 1}. {item.donator}
                      </p>
                      <p className="font-exo font-normal text-[16px] text-[#808191] leading-[26px] break-all">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-exo font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="mt-[20px] flex flex-col p-4 bg-[#1c1c24] rounded-[10px] max-w-sm">
              <p className="font-exo fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the project
              </p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-exo text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.toString())}
                />

                <button
                  type="submit"
                  className="bg-secondary rounded-lg p-4 mt-4 w-full"
                  onClick={donateHandler}
                >
                  Donate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
