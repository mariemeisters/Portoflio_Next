import { useRouter } from "next/router";
import Link from "next/link";
import CardProject from "../../components/CardProjet/CardProject";
import FiltreAnnee from "../../components/FiltreAnnee/FiltreAnnee";


export default function ProjetDuClient() {
    //variables
    const projects = [
        {
          id: 1,
          title: "Booki",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
        {
          id: 2,
          title: "OhMyFood",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
        {
          id: 3,
          title: "LaPanthère",
          urlImage: "",
          description: "Projet réalisé dans le cadre de ma formation.",
        },
      ];

    const router = useRouter();
    let nomDuClient = router.query.client

    if(nomDuClient ==="perso") {
        nomDuClient = "Projets personnels"
    }
    else {
        nomDuClient = `Projets de ${nomDuClient}`;
    }
    return (
        <section>
        <h1>{nomDuClient}</h1>
        <FiltreAnnee client={router.query.client as string} />

        <div className="projects-list">
          {projects.map((project) => (
            <CardProject
              key={project.id}
              id={project.id}
              title={project.title}
              urlImage={project.urlImage}
              description={project.description}
          
            />
          ))}
        </div>
      </section>
    )
}