import { Title } from "@mantine/core";

type Props = {
  title: String;
};

export const PageTitle = ({ title }: Props) => {
  return (
    <>
      <Title order={1}>{title}</Title>
    </>
  );
};
