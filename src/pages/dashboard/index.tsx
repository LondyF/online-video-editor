import React from "react";

import type { NextPage, NextPageContext } from "next";
import { Button, notification } from "antd";

import { trpc } from "../../utils/trpc";
import requireAuth from "../../utils/requireAuth";
import CreateProjectModal from "../../components/create-project-modal";

const Home: NextPage = () => {
  const utils = trpc.useContext();
  const projects = trpc.project.all.useQuery();
  const createProjectMutation = trpc.project.create.useMutation({
    onSuccess: () => {
      utils.project.invalidate();

      notification["success"]({
        message: "Success",
        description: "Project succesfully created",
      });
    },
  });

  const [createProjectModalOpen, setCreateProjectModalOpen] =
    React.useState(false);

  const handleProjectCreate = (name: string) => {
    createProjectMutation.mutate({ name });

    // close modal
    setCreateProjectModalOpen(false);
  };

  return (
    <div>
      Welcome op het dashboard
      <Button onClick={() => setCreateProjectModalOpen(true)} type="primary">
        Create new projects
      </Button>
      <Button type="default">View All your projects</Button>
      {projects.data?.map(({ name, id }) => (
        <div key={id}>{name}</div>
      ))}
      <CreateProjectModal
        open={createProjectModalOpen}
        onCreate={handleProjectCreate}
        onCancel={() => null}
        isLoading={createProjectMutation.isLoading}
      />
    </div>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return requireAuth(ctx);
};

export default Home;
