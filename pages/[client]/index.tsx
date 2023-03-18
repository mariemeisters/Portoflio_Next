import { useRouter } from "next/router";
import Link from "next/link";
import CardProject from "../../components/CardProjet/CardProject";
import FiltreAnnee from "../../components/FiltreAnnee/FiltreAnnee";
import { GetStaticProps } from "next";
import pool from "../../lib/db";

interface Projets {
  id: number;
  title: string;
  description: string;
  client: string;
  annee: number;
}

export const getStaticProps: GetStaticProps<{ projects: Projets[] }> = async ({ params }) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT id, title, description, client, annee FROM test WHERE client = $1",
      [params?.client]
    );
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

export async function getStaticPaths() {
  return {
    paths: [
      { params: { client: 'formation' } },
      { params: { client: 'perso' } }
    ],
    fallback: false
  }
}


export default function ProjetDuClient({ projects }: ProjectsProps) {
  const router = useRouter();
  const client = router.query.client as string;
  const nomDuClient = client === "perso" ? "Projets personnels" : `Projets de ${client}`;
  
  return (
    <section>
      <h1>{nomDuClient}</h1>
      <FiltreAnnee client={client} />

      <div className="projects-list">
        {projects.map((project) => (
          <CardProject
            key={project.id}
            id={project.id}
            title={project.title}
            description={project.description}
            client={project.client}
            annee={project.annee}
          />
        ))}
      </div>
    </section>
  );
}
