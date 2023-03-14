import React, { useState, useEffect } from "react";

interface HomeProps {
  prixBitcoin: number;
}

export default function Home(props: HomeProps) {
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
      <h1>Bienvenue sur mon site ! <br /> {phrase}</h1>
      <p>Prix du Bitcoin : {props.prixBitcoin} €</p>
    </>
  );
}

export async function getStaticProps() {
  let bitcoinEnEuro;
  await fetch('https://blockchain.info/ticker')
  .then(response => response.json())
  .then(data => bitcoinEnEuro = data.EUR.last);
  return {
    props: {
      prixBitcoin: bitcoinEnEuro
    }
  }
}
