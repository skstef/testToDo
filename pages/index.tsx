import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { getProjects } from "../utils/projects/getProjects";
import AddSvg from "../assets/add.svg";
import React, { useState } from "react";
import { createProject } from "../utils/projects/createProject";
import ProjectLink from "../components/HomePage/ProjectLink";
import { useEffect } from "react";
import { IProject } from "../models/IProject";

const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const handleNameCange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSubmitProjectCreation = () => {
    if (name.trim().length > 0) {
      createProject(name);
      setName("");
      setProjects(getProjects());
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Projects list:</h1>
      <div className={styles.newProject}>
        <input
          onChange={handleNameCange}
          value={name}
          type="text"
          className={styles.newProjectTitle}
          placeholder="Type project title here"
        />

        <button onClick={handleSubmitProjectCreation} className={styles.button}>
          <AddSvg viewBox="0 0 21 21" />
          <span>Add project</span>
        </button>
      </div>

      {typeof window !== "undefined" &&
        projects.map((project) => (
          <ProjectLink key={project.id} project={project} />
        ))}
    </div>
  );
};

export default Home;
