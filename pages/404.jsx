import Link from "next/link";

export default function Custom404() {
    return (
        <div>
            <h1>404 - Página no encontrada...</h1>
            <Link  href="/">Ir a casa</Link>
        </div>
    )
}