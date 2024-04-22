import ProjectCard from "@/components/card/project";
import { UInput, UButton } from "@/components/utils";
import { BsArrowRight } from "react-icons/bs";
import { useGlobalContext } from "@/contexts/global-context";
import { useEffect, useState } from "react";

export default function MyProjectContainer() {
  const [projects, setProjects] = useState([]);

  const { address, contract, getUserProjects, setLoading } = useGlobalContext();

  const fetchProjects = async () => {
    setLoading((prev) => true);
    const data = await getUserProjects();
    setProjects(data);
    setLoading((prev) => false);
  };

  useEffect(() => {
    if (contract) fetchProjects();
  }, [address, contract]);

  return (
    <div className=" py-20 px-[8vw]">
      <div className="flex flex-col justify-center items-center gap-5 fixed top-[120px] right-0 left-0 z-[99] backdrop-filter backdrop-blur-xl p-4">
        <div>
          <p className="text-primaryText font-bold text-[24px]">My Projects</p>
        </div>
        <div className="flex flex-row items-center pr-[16px] gap-x-[16px] border border-[#485E5F] rounded-[5px] h-[60px] w-full max-w-[616px] bg-white clip">
          <UInput type="text" placeholder="Search for a project" />
          <UButton
            type="submit"
            className="bg-secondary rounded-[5px] px-4"
            onClick={() => console.log("Searching")}
          >
            <BsArrowRight color="303c3d" size="24px" />
          </UButton>
        </div>
      </div>
      <div className="flex flex-wrap mt-[100px] gap-[26px] ">
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

      {/* <div className="flex justify-center w-full mt-8 py-10">
        <Pagination total={10} color="cyan.3" variant="light" size="lg" />
      </div> */}
    </div>
  );
}
