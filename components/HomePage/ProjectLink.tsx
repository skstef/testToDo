import styles from "../../styles/ProjectLink.module.css";
import Link from "next/link";
import { IProject } from "../../models/IProject";

interface IProjectProps {
  project: IProject;
}

const ProjectLink: React.FC<IProjectProps> = ({ project }) => {
  return (
    <Link href={`/project/${project.id}`}>
      <div className={styles.container}>
        <span className={styles.title}>{project.title}</span>
      </div>
    </Link>
  );
};

export default ProjectLink;
