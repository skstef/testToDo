import React from "react";
import styles from "../../styles/ProjectTitle.module.css";
import { updateProjectTitle } from "../../utils/projects/updateProjectTitle";

interface IProjectTitleProps {
  projectId: string;
  title: string;
  reloadProject: () => void;
}

const ProjectTitle: React.FC<IProjectTitleProps> = ({
  projectId,
  title,
  reloadProject,
}) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateProjectTitle(projectId, e.target.value);
    reloadProject();
  };

  return (
    <input
      onChange={handleTitleChange}
      value={title}
      className={styles.title}
    />
  );
};

export default ProjectTitle;
