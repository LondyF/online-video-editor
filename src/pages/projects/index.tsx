import React from "react";

import type { NextPage } from "next";

import { Button, Col, Empty, PageHeader, Row } from "antd";

import { trpc } from "../../utils/trpc";
import Spacer from "../../components/spacer";
import { Project } from "../../models";
import ProjectCard from "../../components/project-card";

const NoProjects: React.FC = () => (
  <Empty description="You have no projects yet. Create a new project to get started">
    <Button type="primary" onClick={() => null}>
      Create new Project
    </Button>
  </Empty>
);

const Projects: NextPage = () => {
  const projects = trpc.project.all.useQuery();

  const renderProject = (project: Project) => (
    <Col key={project.id} span={6}>
      <ProjectCard {...project} />
    </Col>
  );

  if (!projects.data?.length) return <NoProjects />;

  return (
    <div>
      <PageHeader onBack={() => null} title="Your projects" />
      <hr />
      <Spacer vertical={25} />
      <Row gutter={[16, 16]}>{projects.data.map(renderProject)}</Row>
    </div>
  );
};

export default Projects;
