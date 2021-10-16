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
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { swapTasks } from "../../utils/tasks/swapTasks";
import { saveFilter } from "../../utils/filters/saveFilter";
import { getFilters } from "../../utils/filters/getFilters";

const Project: NextPage = () => {
  const router = useRouter();
  const id = router.query.id as string;

  const [project, setProject] = useState<IProject>();
  const [taskTextFilter, setTaskTextFilter] = useState("");
  const [filters, setFilters] = useState<string[]>([]);

  useEffect(() => {
    const savedProject = getProject(id);

    if (!savedProject) {
      router.push("/");
    }
    setProject(savedProject);
    setTaskTextFilter(savedProject?.taskTextFilter || "");
    setFilters(getFilters());
  }, []);

  const reloadProject = useCallback(() => {
    const savedProject = getProject(id);
    setProject(savedProject);
  }, [id]);

  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (project) setStorageTasksTextFilter(project.id, e.target.value);
    setTaskTextFilter(e.target.value);
  };

  const handleOnDragEnd = (result: DropResult) => {
    if (project && result.destination) {
      swapTasks(project.id, result.source.index, result.destination.index);
      reloadProject();
    }
  };

  const handleSaveFilter = (): void => {
    if (taskTextFilter.trim().length > 0) {
      saveFilter(taskTextFilter);
      setFilters(getFilters());
    }
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
          <div className={styles.savedFilters}>
            <button onClick={handleSaveFilter} className={styles.saveFilter}>
              Save filter
            </button>

            {filters.map((filter) => (
              <button
                onClick={() => {
                  setStorageTasksTextFilter(project.id, filter);
                  setTaskTextFilter(filter);
                }}
                key={filter}
                className={styles.savedFilter}
              >
                {filter}
              </button>
            ))}
          </div>

          <h3 className={styles.title}>Tasks</h3>

          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="tasks">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {project.tasks
                    .filter(({ text }) =>
                      text.toLowerCase().includes(taskTextFilter.toLowerCase())
                    )
                    .map((task, index) => (
                      <Draggable
                        isDragDisabled={taskTextFilter.length > 0}
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <Task
                              projectId={project.id}
                              reloadTasks={reloadProject}
                              task={task}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

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
