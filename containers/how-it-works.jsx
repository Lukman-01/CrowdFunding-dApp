import StartAProject from "@/components/start-project";
import Image from "next/image";

const steps = [
  "Explore projects on the platform",
  "Select any project of your choice and view project details",
  "Donate any amount of your choice to the chosen project",
];

function HowItWorksContainer() {
  return (
    <div className="bg-white px-[5vw] py-[100px]">
      <h1 className="text-primaryText font-bold text-center text-4xl">
        How Crowd Funding dApp Works
      </h1>

      <div className="flex justify-center w-full mt-8">
        <p className="text-primaryText text-center text-lg max-w-[850px]">
          Crowd Funding dApp is the best place to fundraise, whether you are an
          individual, group, or organization.
        </p>
      </div>

      <div className="flex flex-col items-center gap-y-4 h-full justify-center bg-secondaryLight rounded-3xl mt-10 p-5">
        <div>
          <Image
            src="/assets/working.png"
            width={850}
            height={360}
            alt="how it works"
          />
        </div>
        <div className="flex flex-col gap-y-[40px] my-10">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-row gap-x-6 items-center text-primaryText text-[18px] max-w-sm">
              <div className="flex justify-center items-center h-14 w-14 rounded-full bg-primaryText text-secondary font-bold mb-2.5 flex-none">
                <p>{index+1}</p>
              </div>
              <p>{step}</p>
            </div>
          ))}
          <StartAProject />
        </div>
      </div>
    </div>
  );
}

export default HowItWorksContainer;
