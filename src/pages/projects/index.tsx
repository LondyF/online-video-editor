import React from "react";

import type { NextPage } from "next";

import { Button, Col, Empty, Modal, notification, PageHeader, Row } from "antd";

import { trpc } from "../../utils/trpc";
import Spacer from "../../components/spacer";
import { ProjectWithUser } from "../../models";
import ProjectCard from "../../components/project-card";
import CreateProjectModal from "../../components/create-project-modal";

const NoProjects: React.FC = () => (
  <Empty description="You have no projects yet. Create a new project to get started">
    <Button type="primary" onClick={() => null}>
      Create new Project
    </Button>
  </Empty>
);

const Projects: NextPage = () => {
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

  const deleteProjectMutation = trpc.project.delete.useMutation({
    onSuccess: () => {
      utils.project.invalidate();

      notification["success"]({
        message: "Success",
        description: "Project succesfully deleted",
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

  const handleProjectDelete = (id: string) => {
    Modal.confirm({
      title: "Be careful",
      content: `Are you sure you want to delete the project ${id}`,
      onOk: () => {
        deleteProjectMutation.mutate(id);
      },
    });
  };

  const renderProject = (project: ProjectWithUser) => (
    <Col key={project.id} span={6}>
      <ProjectCard {...project} onDeleteAction={handleProjectDelete} />
    </Col>
  );

  if (!projects.data?.length) return <NoProjects />;

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <PageHeader onBack={() => null} title="Your projects" />
        <Button onClick={() => setCreateProjectModalOpen(true)} type="primary">
          New Project
        </Button>
      </div>
      <hr />
      <Spacer vertical={25} />
      <Row gutter={[16, 16]}>{projects.data.map(renderProject)}</Row>
      <CreateProjectModal
        open={createProjectModalOpen}
        onCreate={handleProjectCreate}
        onCancel={() => setCreateProjectModalOpen(false)}
        isLoading={createProjectMutation.isLoading}
      />
    </div>
  );
};

export default Projects;
