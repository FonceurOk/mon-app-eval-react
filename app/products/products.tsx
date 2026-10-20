import { useSearchParams } from "react-router";
import productsData from "./products.json";

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // Récupère la catégorie sélectionnée (?category=Nom) ou "Tous" par défaut
  const selectedCategory = searchParams.get("category") || "Tous";

  // Extrait automatiquement les catégories uniques du nouveau JSON
  const categories = ["Tous", ...new Set(productsData.map((p) => p.category))];

  // Filtre les produits selon le choix de l'utilisateur
  const filteredProducts = selectedCategory === "Tous"
    ? productsData
    : productsData.filter((p) => p.category === selectedCategory);

  return (
    <main className="flex items-center justify-center pt-16 pb-4 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors">
      <div className="flex-1 flex flex-col items-center gap-12 min-h-0 max-w-6xl w-full px-4">
        
        {/* Header conservant l'alignement et le style exact du template */}
        <header className="flex flex-col items-center gap-4">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-50 tracking-tight">
            Notre Boutique E-Commerce
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            Découvrez nos articles triés par catégories
          </p>
        </header>

        {/* Barre de navigation / Filtres calquée fidèlement sur le panneau "What's next?" */}
        <div className="max-w-[500px] w-full px-4">
          <nav className="rounded-3xl border border-gray-200 p-6 bg-white dark:bg-gray-800 dark:border-gray-700 space-y-4 shadow-sm">
            <p className="leading-6 text-gray-700 dark:text-gray-200 text-center font-medium">
              Filtrer par catégorie
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <li key={cat}>
                    <button
                      onClick={() => setSearchParams(cat === "Tous" ? {} : { category: cat })}
                      className={`px-4 py-2 text-xs font-semibold rounded-full transition-all border ${
                        isActive
                          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                          : "bg-gray-100 text-gray-700 border-transparent hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      }`}
                    >
                      {cat}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Liste des produits (Grille) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between rounded-3xl border border-gray-200 p-5 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-sm hover:shadow-md transition-all"
            >
              <div>
                {/* Zone Image du Produit */}
                <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-700 mb-4 border border-gray-100 dark:border-gray-600 flex items-center justify-center">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Badge de catégorie */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400">
                    {product.category}
                  </span>
                  {/* Indicateur de stock restant */}
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    product.stock <= 10 
                      ? "bg-red-50 text-red-600 dark:bg-red-950/30 dark:text-red-400" 
                      : "bg-green-50 text-green-600 dark:bg-green-950/30 dark:text-green-400"
                  }`}>
                    {product.stock} disponibles
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50 mt-1 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Pied de carte avec prix et bouton d'action */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <span className="text-lg font-black text-gray-900 dark:text-gray-50">
                  {product.price.toFixed(2)} €
                </span>
                <button className="group flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-xl shadow-sm transition-colors">
                  <svg
                    xmlns="http://w3.org"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="stroke-current"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="8" cy="21" r="1" />
                    <circle cx="19" cy="21" r="1" />
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                  </svg>
                  Ajouter
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}