import Header from "./components/Header";

export default function Home() {
  return (
    <>
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen p-8">
        <h1 className="text-4xl font-bold">¡FerreMax!</h1>
        <p className="text-lg text-gray-600 mt-4">
          Sistema gestor de inventario
        </p>
      </main>
    </>
  );
}
