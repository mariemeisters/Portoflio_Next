import React from "react";
import CardProject from "../../components/CardProjet/CardProject";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import pool from "../../lib/db";

interface Projets {
  id: number;
  title: string;
  description: string;
  client: string;
  annee: number;
  urlImage: string;
}

export const getStaticProps: GetStaticProps<{ projects: Projets[] }> = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query("SELECT * FROM test");
    const projects = result.rows;
    client.release();
    return {
      props: {
        projects: projects || [],
      },
    };
  } catch (error) {
    console.error("Failed to fetch projects", error);
    return {
      notFound: true,
    };
  }
};

interface ProjectsProps {
  projects: Projets[];
}

export default function Projets({ projects }: ProjectsProps) {
  return (
    <section>
      <h1>Projets</h1>
      <div className="projects-list" style={{display:"flex"}}>
        {projects.map((project) => (
          <CardProject
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            urlImage={project.urlImage}
            client={project.client}
            annee={project.annee}
          />
        ))}
      </div>
    </section>
  );
}
