import { Input, Textarea, Indicator } from "@mantine/core";
import { ImProfile } from "react-icons/im";
import { DatePicker } from "@mantine/dates";
import { useState } from "react";
import { checkIfImage } from "@/lib";
import { useGlobalContext } from "@/contexts/global-context";
import { useRouter } from "next/router";
import { ethers } from "ethers";

export default function CreateProjectContainer() {
  const [form, setForm] = useState({
    name: "",
    title: "",
    desc: "",
    target: "",
    deadline: "",
    image: "",
  });
  const router = useRouter();

  const { address, setLoading, createProject, setAlertMsg, setShowAlert } =
    useGlobalContext();

  function reset() {
    setForm({
      ...form,
      name: "",
      title: "",
      desc: "",
      target: "",
      deadline: "",
      image: "",
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!address) {
      setAlertMsg(
        (prev) =>
          "Please connect to a wallet"
      );
      setShowAlert((prev) => true);
    }

    checkIfImage(form.image, async (exists) => {
      try {
        if (exists) {
          setLoading(true);
          await createProject({
            ...form,
            target: ethers.utils.parseUnits(form.target, 18),
          });
          alert("Project create successfully");
          reset();
          setLoading(false);
        } else {
          setAlertMsg((prev) => "Provide valid image URL");
          setShowAlert((prev) => true);
          setForm({ ...form, image: "" });
        }
      } catch (error) {
        setAlertMsg((prev) => `Error: ${error.message}`);
        setShowAlert((prev) => true);
      }
    });
  }

  function handleInputChange(name, e) {
    setForm({ ...form, [name]: e.target.value });
  }

  return (
    <div className="w-full px-[4vw] sm:px-[8vw] py-20 flex flex-row items-center justify-center">
      <div className="flex flex-col items-center w-full bg-white py-10 px-2 sm:px-20 rounded-lg max-w-screen-xl">
        <div className="bg-secondaryLight p-5 w-full rounded-lg">
          <p className="text-primaryText font-bold text-xl text-center">
            Start a Project
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-2 sm:p-5 mt-6 w-full flex flex-col gap-4"
        >
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-[10px]">
            <div className="flex w-full flex-1 flex-col">
              <Input.Label required>Full Name</Input.Label>
              <Input
                size="md"
                icon={<ImProfile />}
                placeholder="Your Name"
                className="sm:min-w-[300px] w-full text-primaryText"
                value={form.name}
                onChange={(e) => handleInputChange("name", e)}
              />
            </div>
            <div className="flex w-full flex-1 flex-col">
              <Input.Label required>Project Title</Input.Label>
              <Input
                size="md"
                placeholder="Title of project"
                className="sm:min-w-[300px] text-primaryText"
                value={form.title}
                onChange={(e) => handleInputChange("title", e)}
              />
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col">
            <Input.Label required>Project Description</Input.Label>
            <Textarea
              placeholder="Write project description here..."
              withAsterisk
              className="sm:min-w-[300px] text-primaryText"
              autosize
              minRows={8}
              value={form.desc}
              onChange={(e) => handleInputChange("desc", e)}
            />
          </div>
          <div className="flex w-full flex-1 flex-col">
            <Input.Label required>Project Banner URL</Input.Label>
            <Input
              size="md"
              placeholder="Enter the image url of your project"
              className="sm:min-w-[300px] text-primaryText"
              value={form.image}
              onChange={(e) => handleInputChange("image", e)}
            />
          </div>
          <div className="w-full flex flex-col sm:flex-row flex-wrap gap-[10px]">
            <div className="flex w-full flex-1 flex-col">
              <Input.Label required>Target</Input.Label>
              <Input
                size="md"
                placeholder="7.5ETH"
                className="sm:min-w-[300px] text-primaryText"
                value={form.target}
                onChange={(e) => handleInputChange("target", e)}
              />
            </div>
            <div className="flex w-full flex-1 flex-col">
              <Input.Label required>Deadline</Input.Label>
              <DatePicker
                placeholder="Pick date"
                renderDay={(date) => {
                  const day = date.getDate();
                  return (
                    <Indicator
                      size={6}
                      color="red"
                      offset={8}
                      disabled={day !== 16}
                    >
                      <div>{day}</div>
                    </Indicator>
                  );
                }}
                size="md"
                className="sm:min-w-[300px] text-primaryText"
                value={form.deadline}
                onChange={(val) => setForm({ ...form, deadline: val })}
              />
            </div>
          </div>
          <div className="mt-5">
            <button
              type="submit"
              className="bg-secondary text-[18px] text-primaryText py-5 px-8 w-full rounded-lg font-exo font-bold"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}