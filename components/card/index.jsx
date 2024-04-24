import { Card, Image, Text } from "@mantine/core";

function CardNormal({ src, alt, title, desc }) {
  return (
    <Card shadow="sm" p="xl" component="div">
      <Card.Section>
        <Image src={src} height={260} alt="No way!" fit="objectFit" />
      </Card.Section>

      <Text
        weight={700}
        size="xl"
        mt="md"
        className="text-primaryText font-exo"
      >
        {title}
      </Text>

      <Text mt="xs" color="dimmed" size="lg" className="font-exo">
        {desc}
      </Text>
    </Card>
  );
}

export default CardNormal;
