import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { useNavLinks } from "@/context/NavContext";
import { useMemo } from "react";

export const Breadcrumbs = () => {
  const location = useLocation();
  const { navLinks } = useNavLinks();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  // Memoize breadcrumb name map to prevent unnecessary rebuilds
  const breadcrumbNameMap = useMemo(() => {
    const map = {};
    
    navLinks.forEach((link) => {
      // Add main link
      const href = link.href.replace(/^\//, "");
      if (href) {
        map[href] = link.name;
      }
      
      // Add dropdown items
      if (link.dropdown && Array.isArray(link.dropdown)) {
        link.dropdown.forEach((item) => {
          const itemHref = item.href.replace(/^\//, "");
          if (itemHref) {
            map[itemHref] = item.name;
          }
        });
      }
    });
    
    return map;
  }, [navLinks]);

  return (
    <nav aria-label="Breadcrumb" className="py-3 bg-white border-b border-gray-200 notranslate" translate="no">
      <div className="container mx-auto px-4 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-500 hover:text-[#E9863C] transition-colors"
              aria-label="Home"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </li>

          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const breadcrumbName = breadcrumbNameMap[pathname] || pathname;

            return (
              <li key={pathname} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4 text-gray-400" />
                {isLast ? (
                  <span className="text-gray-800 font-medium" aria-current="page">
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-gray-500 hover:text-[#E9863C] transition-colors"
                  >
                    {breadcrumbName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};
