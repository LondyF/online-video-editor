import Image from "next/image";
import { useRouter } from "next/router";
import { Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { Project } from "../models";

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

const ProjectCard: React.FC<Project> = ({ id, name }) => {
  const router = useRouter();

  const handleEditClick = () => {
    router.push(`/projects/${id}`);
  };

  const ACTIONS = [
    <EditOutlined onClick={handleEditClick} key="edit" />,
    <DeleteOutlined key="delete" />,
  ];

  return (
    <Card actions={ACTIONS} cover={ProjectCover}>
      <Meta title={name} />
    </Card>
  );
};

export default ProjectCard;
