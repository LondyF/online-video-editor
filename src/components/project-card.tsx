import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useSession } from "next-auth/react";

import { ProjectWithUser } from "../models";

const { Meta } = Card;

const TEMP_COVER_SRC =
  "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png";

const ProjectCover = (
  <Image
    alt="temp"
    width="100%"
    objectFit="cover"
    layout="responsive"
    height={50}
    src={TEMP_COVER_SRC}
  />
);

type Props = {
  onDeleteAction: (id: string) => void;
};

const ProjectCard: React.FC<ProjectWithUser & Props> = ({
  id,
  name,
  userId: projectOwnerUserId,
  onDeleteAction,
  user,
}) => {
  const router = useRouter();
  const session = useSession();

  const isUserOwnedProject = session.data?.user?.id === projectOwnerUserId;

  const handleEditClick = () => {
    router.push(`/projects/${id}`);
  };

  const ACTIONS = [
    <EditOutlined onClick={handleEditClick} key="edit" />,
    isUserOwnedProject && (
      <DeleteOutlined
        onClick={() => onDeleteAction(id)}
        key="delete"
        style={{ color: "red" }}
      />
    ),
  ].filter(Boolean);

  return (
    <Card actions={ACTIONS} cover={ProjectCover}>
      <Meta
        title={name}
        description={
          <span>
            Project owned by{" "}
            <strong>{isUserOwnedProject ? "you" : user.name}</strong>
          </span>
        }
      />
    </Card>
  );
};

export default ProjectCard;
