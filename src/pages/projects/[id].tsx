import { Result, Spin } from "antd";
import type { NextPage } from "next";
import { useRouter } from "next/router";

import { trpc } from "../../utils/trpc";

const NoProjectFound: React.FC = () => {
  return (
    <Result
      status="404"
      title="Project Not Found"
      subTitle="The project you are looking for doesn't exist"
    />
  );
};

const Project: NextPage = () => {
  const { id } = useRouter().query;

  const project = trpc.project.byId.useQuery(String(id));

  if (project.isLoading) {
    return <Spin />;
  }

  if (project.error) {
    return <NoProjectFound />;
  }

  return <p>{JSON.stringify(project.data)}</p>;
};

export default Project;
