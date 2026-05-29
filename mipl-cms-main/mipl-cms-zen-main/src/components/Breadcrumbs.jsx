import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  const breadcrumbNameMap = {
    about: "About Us",
    services: "Services",
    projects: "Projects",
    achievements: "Achievements",
    publications: "Publications",
    "social-activities": "Social Activities",
    careers: "Careers",
    contact: "Contact Us",
    "coffee-table-book": "Coffee Table Book",
    "ctb-feedback": "CTB Feedback"
  };

  return (
    <nav aria-label="Breadcrumb" className="py-3 bg-card/80 backdrop-blur-md border-b border-white/5 notranslate" translate="no">
      <div className="container mx-auto px-4 lg:px-8">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
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
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                {isLast ? (
                  <span className="text-foreground font-medium" aria-current="page">
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-primary transition-colors"
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
