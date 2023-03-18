import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';

interface Projet {
  id: number;
  title: string;
  slug: string;
  description: string;
  client: string;
  annee: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, title, slug, description, client, annee } = req.body as Projet;

  switch (req.method) {
    case 'PUT':
      // Vérifier si l'identifiant est présent dans la requête
      if (!id) {
        res.status(422).json({
          message: "L'identifiant est requis.",
        });
        return;
      }

      // Exécuter la mise à jour du projet dans la base de données
      try {
        const clientBdd = await pool.connect();
        await clientBdd.query(
          `UPDATE test SET title=$1, slug=$2, description=$3, client=$4, annee=$5 WHERE id=$6`,
          [title, slug, description, client, annee, id]
        );
        clientBdd.release();
        res.status(200).json({ message: 'Projet mis à jour avec succès.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Impossible d'effectuer la requête.",
        });
      }
      break;

    case 'POST':
      // Ajouter un nouveau projet à la base de données
      if (!title || !slug || !description || !client || !annee) {
        res.status(422).json({
          message: 'Champs du formulaire manquant.',
        });
        return;
      }
      const nouveauProjet: Projet = {
        id, 
        title,
        slug,
        description,
        client,
        annee,
      };
      try {
        const clientBdd = await pool.connect();
        await clientBdd.query(
          `INSERT INTO test (title, slug, description, client, annee)
           VALUES ($1, $2, $3, $4, $5)`,
          [
            nouveauProjet.title,
            nouveauProjet.slug,
            nouveauProjet.description,
            nouveauProjet.client,
            nouveauProjet.annee,
          ]
        );
        clientBdd.release();
        res.status(200).json({ message: 'Projet ajouté avec succès.' });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          message: "Impossible d'effectuer la requête.",
        });
      }
      break;

    default:
      // Gérer les autres méthodes HTTP
      res.status(405).json({
        message: 'Méthode HTTP non autorisée.',
      });
  }
}
