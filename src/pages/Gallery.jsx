import { useState } from "react";
import { useCmsData } from "@/hooks/useCmsData";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { X, Award, Users, Building, Calendar } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ScrollFloat } from "@/components/ScrollFloat";
const categories = ["All", "Awards", "Events", "Team", "Projects"];

const galleryItems = [
  {
    id: 1,
    category: "Awards",
    title: "1st in ICCC Infrastructure",
    description: "Ranked 1st in ICCC Infrastructure (IMAF Audit) mentored by Mr. Prasad Patil, Director of MIPL",
    image: "/awards/ICCC Awards3.png",
    date: "2025"
  },
  {
    id: 2,
    category: "Events",
    title: "Annual Security Summit",
    description: "Industry leaders gathering at MIPL hosted summit",
    image: "/awards/summit.jpg",
    date: "2023"
  },
  {
    id: 3,
    category: "Team",
    title: "Team Building Workshop",
    description: "MIPL team collaboration and training session",
    image: "/placeholder-team.jpg",
    date: "2023"
  },
  {
    id: 4,
    category: "Projects",
    title: "Smart City Project Launch",
    description: "Inauguration of major smart city security project",
    image: "/placeholder-project.jpg",
    date: "2022"
  },
  {
    id: 5,
    category: "Awards",
    title: "Best IT Consultancy Award",
    description: "Awarded for excellence in IT consulting services",
    image: "/placeholder-award2.jpg",
    date: "2022"
  },
  {
    id: 6,
    category: "Events",
    title: "Cricket League",
    description: "MIPL Cricket Tournament",
    image: "/events/cricket-match.jpg",
    date: "2025"
  },
];

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState(null);
  const { data: cmsItems } = useCmsData("Gallery", galleryItems);

  const allItems = cmsItems.map((item) => {
    let imageUrl = item.image || "";
    // Convert Google Drive share link to direct image link if needed
    const driveMatch = imageUrl.match(/https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\/view.*/);
    if (driveMatch) {
      const fileId = driveMatch[1];
      imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
    return {
      id: item.id || item.title,
      category: item.category || "Events",
      title: item.title || "",
      description: item.description || "",
      image: imageUrl,
      date: item.date || "",
    };
  });

  const filteredItems = selectedCategory === "All"
    ? allItems
    : allItems.filter(item => item.category === selectedCategory);

  return (
    <Layout>
      <PageHero
        eyebrow="Our Journey in Pictures"
        title="Gallery"
        description="Awards, events, teams, and project milestones."
        image="/awards/summit.jpg"
      />

      {/* Category Filter */}
      <section className="py-8 border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-slate-50 border border-gray-200 hover:bg-slate-100 text-slate-900"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            layout
            className="card-grid-equal grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <ScrollFloat key={item.id} strength={34 + (index % 3) * 6} className="h-full min-h-0">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    className="card-fill overflow-hidden group cursor-pointer bg-slate-50 border border-gray-200 rounded-xl hover:border-primary/50"
                    onClick={() => setSelectedImage(item)}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] relative overflow-hidden bg-white/5 flex items-center justify-center">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      <div className="absolute inset-0 bg-white/5 items-center justify-center hidden">
                        {item.category === "Awards" && <Award className="w-16 h-16 text-primary/40" />}
                        {item.category === "Events" && <Calendar className="w-16 h-16 text-primary/40" />}
                        {item.category === "Team" && <Users className="w-16 h-16 text-primary/40" />}
                        {item.category === "Projects" && <Building className="w-16 h-16 text-primary/40" />}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {item.category}
                        </span>
                        <span className="text-xs text-slate-600">{item.date}</span>
                      </div>
                      <h3 className="font-bold text-lg mb-2 line-clamp-1 text-slate-900">{item.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{item.description}</p>
                    </div>
                  </motion.div>
                </ScrollFloat>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-600">No images found in this category</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-40 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-6 h-6" />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-4xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              <div className="max-h-[70vh] rounded-lg overflow-hidden bg-white/5 flex items-center justify-center">
                <img 
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextElementSibling.style.display = 'flex';
                  }}
                />
                <div className="aspect-[4/3] bg-white/5 rounded-lg items-center justify-center hidden">
                  {selectedImage.category === "Awards" && <Award className="w-32 h-32 text-primary/40" />}
                  {selectedImage.category === "Events" && <Calendar className="w-32 h-32 text-primary/40" />}
                  {selectedImage.category === "Team" && <Users className="w-32 h-32 text-primary/40" />}
                  {selectedImage.category === "Projects" && <Building className="w-32 h-32 text-primary/40" />}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload Instructions */}
      {/* <section className="py-16 border-t border-border relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 max-w-3xl mx-auto text-center"
          >
            <h3 className="text-2xl font-bold mb-4">Add Your Photos</h3>
            <p className="text-muted-foreground mb-6">
              To add photos to the gallery, place your images in the <code className="px-2 py-1 bg-primary/10 rounded text-sm">public</code> folder 
              and update the gallery data in <code className="px-2 py-1 bg-primary/10 rounded text-sm">src/pages/Gallery.jsx</code>
            </p>
            <p className="text-sm text-muted-foreground">
              Recommended image size: 1200x900px (4:3 aspect ratio)
            </p>
          </motion.div>
        </div>
      </section> */}
    </Layout>
  );
};

export default Gallery;
