export default function Footer() {
    return (
        <footer className="bg-[#1D3557] text-white py-4 mt-auto">
        <div className="container mx-auto text-center">
            <p className="text-sm">
            &copy; {new Date().getFullYear()} FerreMax. Todos los derechos reservados.
            </p>
        </div>
        </footer>
    );
}