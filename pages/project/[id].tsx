import type { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../../styles/Project.module.css";
import Task from "../../components/ProjectPage/Task";
import { getProject } from "../../utils/projects/getProject";
import { IProject } from "../../models/IProject";
import React, { useEffect, useState, useCallback } from "react";
import CreateTask from "../../components/ProjectPage/CreateTask";
import ProjectTitle from "../../components/ProjectPage/ProjectTitle";
import { setStorageTasksTextFilter } from "../../utils/projects/setTaskTextFilter";

const Project: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [project, setProject] = useState<IProject>();
  const [taskTextFilter, setTaskTextFilter] = useState("");

  useEffect(() => {
    const savedProject = getProject(id);

    if (!savedProject) {
      router.push("/");
    }
    setProject(savedProject);
    setTaskTextFilter(savedProject?.taskTextFilter || "");
  }, []);

  const reloadProject = useCallback(() => {
    const savedProject = getProject(id);
    setProject(savedProject);
  }, [id]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (project) setStorageTasksTextFilter(project.id, e.target.value);
    setTaskTextFilter(e.target.value);
  };

  return (
    <>
      {project && (
        <div className={styles.container}>
          <ProjectTitle
            projectId={project.id}
            title={project.title}
            reloadProject={reloadProject}
          />

          <input
            onChange={handleSearchTextChange}
            value={taskTextFilter}
            type="text"
            className={styles.searchTaskTitle}
            placeholder={`Type task text here for finding it.`}
          />

          <h3 className={styles.title}>Tasks</h3>
          {project.tasks
            .filter(({ text }) =>
              text.toLowerCase().includes(taskTextFilter.toLowerCase())
            )
            .map((task) => (
              <Task
                projectId={project.id}
                reloadTasks={reloadProject}
                key={task.id}
                task={task}
              />
            ))}

          <CreateTask projectId={project.id} reloadTasks={reloadProject} />
        </div>
      )}
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: { params: context.params },
  };
};

export default Project;
