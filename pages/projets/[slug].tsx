import { useRouter } from "next/router";
import Link from "next/link";


export default function Projet() {
    //variables
    const router = useRouter();

    return (
        <>
        <h1>{router.query.slug}</h1>
        <h2>
            <Link legacyBehavior href={`/formation`}>
                <a style={{color: '#2a6e6b', textDecoration: "none"}}>Projet de formation</a>
            </Link></h2>
        </>
    )
}