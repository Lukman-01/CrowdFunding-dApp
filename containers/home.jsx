import CardNormal from "@/components/card";
import { Image } from "@mantine/core";
import ProjectCard from "@/components/card/project";
import Link from "next/link";
import StartProjet from "@/components/start-project";
import { useGlobalContext } from "@/contexts/global-context";
import { useEffect, useState } from "react";

export default function HomeContanier() {
  const [projects, setProjects] = useState([]);

  const { address, contract, getProjects, setLoading, walletConnected } =
    useGlobalContext();

  const fetchProjects = async () => {
    setLoading((prev) => true);
    let data = await getProjects();

    data = data.filter((res, id) => id < 3);
    setProjects((prev) => data);
    setLoading((prev) => false);
  };

  useEffect(() => {
    if (contract) {
      fetchProjects();
    }
  }, [address, contract]);

  return (
    <div className="flex flex-col">
      <div className="bg-white px-[5vw] md:px-[15vw]">
        <div className="w-full  text-center text-[64px] font-bold text-secondary my-[120px]">
          <div>
            <h1 className="text-primaryText text-[32px] md:text-[54px] font-light">
              Global Access To Project Funding
            </h1>
            <h1 className="text-primaryText text-[32px] md:text-[54px] ">
              Just Got Faster and Easier
            </h1>
            <StartProjet />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-x-6 border bg-secondaryLight rounded-lg mb-[160px] clip shadow-md shadow-black/10">
          <div className="flex flex-col gap-y-6 p-8 w-full">
            <h2 className="text-primaryText text-[20px] md:text-[28px] font-bold max-w-sm">
              GET SUPPORT GLOBALLY
            </h2>
            <p className="max-w-lg text-[18px] text-primaryText">
              Do you have a project idea but no capital or funds to see the
              project to completion? Try out Crowd Funding dApp now, and see your project
              go live in no time. Get support from all over the world
            </p>
          </div>
          <div className="w-full">
            {/* <Image src="/assets/assets.png" width={1063} height={672} alt="assets" /> */}
            <Image src="/assets/connect.png" height={459} alt="Assets" />
          </div>
        </div>
      </div>

      {/* <div className="my-10 py-20 px-6">
        <h1 className="text-primaryText text-[48px] text-center font-bold">
          Crowd Funding dApp Fundraiser Analyzed
        </h1>
        <p className="text-[18px] text-primaryText text-center">
          There’s nothing to it, anyone can do it.
        </p>
      </div> */}

      {/* <div className="w-full px-[9.5vw] mb-[100px]">
        <div className="inline-grid grid-cols-3 gap-12 rounded-lg">
          <CardNormal
            src="/assets/opportuninty.png"
            alt="your opportunity"
            title="Opportunity"
            desc="At Platinum Investment we prepare your assets for the blockchain economy. Get ready to convert your real life assets for the blockchain ecosystem"
          />
          <CardNormal
            src="/assets/token.jpg"
            alt="Tokenization"
            title="Tokenization"
            desc="Tokenizing an asset converts its value into digital tokens or securities where ownership of the tokens are recorded on the blockchain. This gives asset owners the flexibility of capital and  various options with their asset."
          />
          <CardNormal
            src="/assets/capital.png"
            alt="Capital flexibility"
            title="Capital flexibility"
            desc="Tokenization brings value to your asset by creating an increase in the liquidity, speed through automation, reductions in costs, reduced disputes, and a decentralization of data."
          />
        </div>
      </div> */}

      <div className="bg-white my-10 py-20 px-[8vw]">
        {projects.length !== 0 && (
          <h1 className="text-primaryText text-[32px] md:text-[54px]  text-center font-bold">
            Latest Ongoing Projects
          </h1>
        )}
        <div className="flex flex-wrap mt-[20px] gap-[26px] justify-center">
          {projects.map((project, id) => (
            <ProjectCard
              key={id}
              pId={project.pId}
              expires={project.deadline}
              owner={project.owner}
              link={`/explore/${project.title}`}
              src={project.image}
              title={project.title}
              desc={project.desc}
              amountRequested={project.target}
              amountReceived={project.amountCollected}
              alt={project.title}
            />
          ))}
        </div>
        {projects.length !== 0 && (
          <div className="flex flex-row justify-end w-full mt-8">
            <Link href="/explore" legacyBehavior>
              <a className="text-[20px] text-primaryText text-right underline underline-offset-2 hover:text-secondary ease-in duration-300">
                {"See more >>"}
              </a>
            </Link>
          </div>
        )}

        <div className="w-full text-center text-[64px] font-bold text-secondary my-[120px]">
          <div>
            <h1 className="text-primaryText text-[32px] md:text-[54px] ">
              Need Support Or Funding?
            </h1>
            <StartProjet />
          </div>
        </div>
      </div>
    </div>
  );
}
