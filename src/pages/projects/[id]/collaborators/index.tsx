import React from "react";

import {
  Button,
  List,
  Modal,
  notification,
  PageHeader,
  Select,
  Avatar,
} from "antd";
import { useRouter } from "next/router";

import { trpc } from "../../../../utils/trpc";

const AddColllaboratorModal: React.FC<{
  open: boolean;
  isLoading: boolean;
  onCancel: () => void;
  onSelect: (id: string) => void;
}> = ({ open, isLoading, onCancel, onSelect }) => {
  const users = trpc.users.all.useQuery();

  const [selectedCollaborator, setSelectedCollaborator] = React.useState("");

  const options = React.useMemo(() => {
    return users.data?.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
  }, [users.data]);

  const handleSelect = (selectedId: string) => {
    setSelectedCollaborator(selectedId);
  };

  return (
    <Modal
      title="Add collaborator"
      open={open}
      confirmLoading={isLoading}
      onCancel={onCancel}
      onOk={() => onSelect(selectedCollaborator)}
    >
      <Select
        className="w-full"
        showSearch
        options={options}
        placeholder="Select a collaborator"
        onSelect={handleSelect}
        filterOption={(input, option) =>
          (option?.label ?? "")
            .toLocaleLowerCase()
            .includes(input.toLocaleLowerCase())
        }
      />
    </Modal>
  );
};

const setMutationOptions = (onSuccess: string) => {
  const utils = trpc.useContext();

  return {
    onError: (e: { message: string }) => {
      notification["error"]({
        message: "Something went wrong",
        description: e.message,
      });
    },
    onSuccess: () => {
      utils.project.collaborators.invalidate();

      notification["success"]({
        message: "Success",
        description: onSuccess,
      });
    },
  };
};

const Collaborators: React.FC = () => {
  const [createProjectModalOpen, setCreateProjectModalOpen] =
    React.useState(false);

  const router = useRouter();
  const { id } = router.query;

  const project = trpc.project.collaborators.useQuery(String(id));

  const addCollaboratorMutation = trpc.project.addCollaborator.useMutation(
    setMutationOptions("Project collaborator succesfully added")
  );

  const removeCollaboratorMutation =
    trpc.project.removeCollaborator.useMutation(
      setMutationOptions("Project collaborator succesfully removed")
    );

  const handleCollaboratorAdd = (collaboratorId: string) => {
    addCollaboratorMutation.mutate({
      projectId: String(id),
      collaboratorId,
    });

    // close modal
    setCreateProjectModalOpen(false);
  };

  const handleCollaboratorRemove = (collaboratorId: string) => {
    removeCollaboratorMutation.mutate({
      projectId: String(id),
      collaboratorId,
    });
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <PageHeader title={project.data?.name} onBack={() => router.back()} />
        <Button type="primary" onClick={() => setCreateProjectModalOpen(true)}>
          Add Collaborator
        </Button>
      </div>
      <hr />
      <List
        itemLayout="horizontal"
        dataSource={project.data?.collaborators}
        renderItem={({ user }) => (
          <List.Item
            actions={[
              <a key="remove" onClick={() => handleCollaboratorRemove(user.id)}>
                remove
              </a>,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={user.image} />}
              title={user.name}
              description={user.email}
            />
          </List.Item>
        )}
      />
      <AddColllaboratorModal
        open={createProjectModalOpen}
        onCancel={() => setCreateProjectModalOpen(false)}
        onSelect={handleCollaboratorAdd}
        isLoading={false}
      />
    </div>
  );
};

export default Collaborators;
