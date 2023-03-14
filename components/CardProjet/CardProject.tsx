import React from "react";
import Image from 'next/image'
import classes from './CardProject.module.css';
//import { useRouter } from "next/router";
import Link from "next/link";



interface CardProjectProps {
  id: number;
  title: string;
  urlImage: string;
  description: string;
  client: string;
  annee: number;
}

function CardProject({ id, title, urlImage, description, annee }: CardProjectProps) {
  let imageUrl = "";

  if (urlImage) {
    imageUrl = urlImage.replace("dl=0", "raw=1");
  }
  //variable
 // const router = useRouter();
  
  // const cardCliquedHandler = () => {
  //   router.push({
  //     pathname: "/projets/[slug]",
  //     query: {
  //       slug: "test"
  //     }
  //   })
  // }     //onClick={cardCliquedHandler}


  return (
    <Link legacyBehavior href={{
      pathname: `/projets/${title}`,
      }}>
    <a className={classes.CardProject}>
      <article>
      <Image src={imageUrl} alt={title} />
      <h3>{title}</h3>
      <p>{description}</p>
      </article>
    </a>
    </Link>
  );
}

export default CardProject;
