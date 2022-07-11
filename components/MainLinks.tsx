import { Group, Text, UnstyledButton } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { LayoutDashboard, ListCheck } from "tabler-icons-react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  href: string;
}

function MainLink({ icon, color, label, href }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: "block",
        width: "100%",
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color:
          theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

        "&:hover": {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
        },
      })}
    >
      <Link href={href} passHref>
        <Group>
          {/* <ThemeIcon color={color} variant="light"> */}
          {icon}
          {/* </ThemeIcon> */}
          <Text size="sm">{label}</Text>
        </Group>
      </Link>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <LayoutDashboard size={16} />,
    color: "blue",
    label: "Leaderboard",
    href: "/",
  },
  {
    icon: <ListCheck size={16} />,
    color: "teal",
    label: "Sets",
    href: "/sets",
  },
  {
    icon: <ListCheck size={16} />,
    color: "teal",
    label: "Players",
    href: "/players",
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
