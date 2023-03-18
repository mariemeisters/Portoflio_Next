import React, { useState, useEffect } from "react";
import Head from "next/head";
import { MyNextApiRequest } from "../types/next";
import { NextApiResponse } from "next";
import { serverSideAuthenticate } from "../lib/middleware/tokenAnalyse";


export default function Home() {
  const [competence, setCompetence] = useState(["MERN stack", "Javascript", "Typescript", "Node.js", "React", "Next.js", "Express", "MongoDB"]);
  const [competenceActuelle, setcompetenceActuelle] = useState(0);
  const [affichageCompetence, setaffichageCompetence] = useState("");

  useEffect(() => {
    const maCompetence = competence[competenceActuelle];
    let i = 0;
    const intervalId = setInterval(() => {
      setaffichageCompetence(maCompetence.substring(0, i + 1));
      i++;
      if (i === maCompetence.length) {
        clearInterval(intervalId);
        setTimeout(() => {
          setcompetenceActuelle((competenceActuelle + 1) % competence.length);
        }, 1000);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [competenceActuelle, competence]);

  const phrase = `Je suis Développeur ${affichageCompetence}`;
  return (
    <>
      <Head>
        <title>Développeur MERN Stack</title>
      </Head>

      <div className="container">
        <div className="content">
          <h1>Bienvenue sur mon site !</h1>
          <h2>{phrase} !</h2>
      
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async (ctx: { req: MyNextApiRequest; res: NextApiResponse<any>; }) => {
  // Vérifier l'authentification de l'utilisateur
  await serverSideAuthenticate(ctx.req, ctx.res, () => {});

  // Return empty object to prevent "did not return an object" error
  return { props: {} };
};

// export async function getStaticProps() {
//   let bitcoinEnEuro;
//   await fetch('https://blockchain.info/ticker')
//   .then(response => response.json())
//   .then(data => bitcoinEnEuro = data.EUR.last);
//   return {
//     props: {
//       prixBitcoin: bitcoinEnEuro
//     }
//   }
// }
