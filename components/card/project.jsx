import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Divider,
  Progress,
} from "@mantine/core";
import { useRouter } from "next/router";
import { Loader } from "@mantine/core";
import { daysRemaining, shortened } from "@/lib";

export default function ProjectCard({
  src,
  pId,
  isLoading,
  expires,
  alt,
  title,
  desc,
  amountRequested,
  amountReceived,
  link,
  owner,
}) {
  const router = useRouter();
  const progress = (amountReceived / amountRequested) * 100;

  const viewDetailsHandle = () => {
    sessionStorage.removeItem("project");
    const data = {
      pId,
      src,
      expires,
      title,
      desc,
      amountRequested,
      amountReceived,
      owner,
    };

    sessionStorage.setItem("project", JSON.stringify(data));

    router.push({ pathname: link });
  };

  return (
    <Card shadow="sm" p="lg" radius="md" withBorder className="sm:w-[288px] md:w-[350px]">
      <Card.Section>
        {isLoading ? (
          <Loader color="Cyan.3" />
        ) : (
          <Image src={src} height={260} alt={alt} />
        )}
      </Card.Section>

      <Group position="apart" mt="md" mb="xs">
        <Text weight={700} size="xl" className="font-exo">
          {title}
        </Text>
        <Badge
          color={expires && daysRemaining(expires) !== 0 ? "green" : "pink"}
          variant="light"
          p="md"
          className="font-exo"
        >
          {expires && daysRemaining(expires) !== 0 ? "Live" : "Close"}
        </Badge>
      </Group>

      <Text size="md" color="dimmed" className="font-exo">
        {desc.substring(0, 80) + "...."}
      </Text>

      <Divider my="md" />

      <div className="mb-2">
        <Text size="sm" color="dimmed" className="font-exo">
          {`by ${owner && shortened(owner)}`}
        </Text>
      </div>
      <Text size="md" color="dimmed" className="font-exo">
        <span className="font-bold">{`${amountReceived}ETH`}</span>
        {` raised of `}
        <span className="font-bold">{`${amountRequested}ETH`}</span>
      </Text>
      <Text size="md" color="dimmed" className="font-exo">
        <span className="font-bold">{`${
          expires && daysRemaining(expires)
        }`}</span>
        {` days left`}
      </Text>

      <Progress
        color="#3bd4e1"
        value={progress}
        label={`${progress}%`}
        size="xl"
        radius="xl"
      />

      <Button
        variant="light"
        size="md"
        fullWidth
        mt="md"
        radius="md"
        className="text-secondary font-exo ease-in duration-300"
        onClick={viewDetailsHandle}
      >
        View details
      </Button>
    </Card>
  );
}
