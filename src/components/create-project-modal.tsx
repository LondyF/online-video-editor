import React from "react";

import { Modal, Input, Form } from "antd";
import { ProjectOutlined } from "@ant-design/icons";

type CreateProjectModalProps = {
  open: boolean;
  isLoading: boolean;
  onCreate: (name: string) => void;
  onCancel: () => void;
};

const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  open,
  isLoading,
  onCreate,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const handleOnOk = async () => {
    try {
      const values = await form.validateFields();
      const { projectName } = values;

      onCreate(projectName ?? "");
    } catch {
      console.log("validation failed");
    }
  };

  const reset = () => {
    form.resetFields();
  };

  return (
    <Modal
      confirmLoading={isLoading}
      onOk={handleOnOk}
      title="Create A New Project"
      open={open}
      onCancel={onCancel}
      afterClose={reset}
    >
      <Form form={form} layout="vertical" initialValues={{ projectName: "" }}>
        <Form.Item
          name="projectName"
          label="Project Name"
          rules={[{ required: true, message: "Please enter a project title" }]}
          style={{ marginBottom: 0 }}
        >
          <Input
            disabled={isLoading}
            placeholder="Enter a project name"
            size="middle"
            prefix={<ProjectOutlined />}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateProjectModal;
