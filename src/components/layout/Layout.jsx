import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ScrollToTopButton } from "../ScrollToTopButton";
import { Breadcrumbs } from "../Breadcrumbs";
import { SimpleChatbot } from "../SimpleChatbot";

export const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16 md:pt-18">
        <Breadcrumbs />
        <main id="main-content" role="main" tabIndex="-1">
          {children}
        </main>
      </div>
      <Footer />
      <SimpleChatbot />
      <ScrollToTopButton />
    </div>
  );
};
