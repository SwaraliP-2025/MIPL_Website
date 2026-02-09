# Gallery Configuration Examples

## Folder Structure Created

```
public/
├── team/              ← Team member photos
├── awards/            ← Award ceremony photos
├── events/            ← Event and conference photos
├── projects/          ← Project implementation photos
└── social-activities/ ← CSR and community photos
```

Each folder contains a README.md with detailed instructions.

## Example 1: Using Existing Images as Placeholders

Until you add real photos, you can use existing images from the `public` folder as examples:

### In `src/pages/Gallery.jsx`:

```javascript
const galleryItems = [
  // Awards
  {
    id: 1,
    category: "Awards",
    title: "Security Excellence Award",
    description: "Recognized for outstanding contribution to security consulting",
    image: "/secaudit.png",  // Using existing image as placeholder
    date: "2023"
  },
  {
    id: 2,
    category: "Awards",
    title: "Best IT Consultancy Award",
    description: "Awarded for excellence in IT consulting services",
    image: "/sectrain.png",  // Using existing image as placeholder
    date: "2022"
  },
  
  // Events
  {
    id: 3,
    category: "Events",
    title: "Annual Security Summit",
    description: "Industry leaders gathering at MIPL hosted summit",
    image: "/sec_cons.png",  // Using existing image as placeholder
    date: "2023"
  },
  
  // Projects
  {
    id: 4,
    category: "Projects",
    title: "Smart City Implementation",
    description: "Inauguration of major smart city security project",
    image: "/smartcity.png",  // Using existing image
    date: "2022"
  },
  {
    id: 5,
    category: "Projects",
    title: "Safe City Project",
    description: "Award-winning safe city implementation",
    image: "/safecity.png",  // Using existing image
    date: "2021"
  },
  {
    id: 6,
    category: "Projects",
    title: "Smart Safe City Solution",
    description: "Integrated smart and safe city project",
    image: "/smartsafecity.png",  // Using existing image
    date: "2023"
  },
  
  // Team
  {
    id: 7,
    category: "Team",
    title: "Leadership Team",
    description: "MIPL directors and senior management",
    image: "/prasadsir.png",  // Using existing image
    date: "2023"
  },
  {
    id: 8,
    category: "Team",
    title: "Team Building Workshop",
    description: "MIPL team collaboration and training session",
    image: "/sudhir_sir-removebg-preview.png",  // Using existing image
    date: "2023"
  },
];
```

## Example 2: Team Section in About Page

### In `src/pages/About.jsx`:

Replace the placeholder team member cards with:

```jsx
{/* Team Member 1 */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="glass-card p-6 text-center hover:glow-border group"
>
  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all mx-auto mb-4">
    <img 
      src="/prasadsir.png"
      alt="Team Member"
      className="w-full h-full object-cover"
    />
  </div>
  <h3 className="font-bold text-lg mb-1">Senior Consultant</h3>
  <p className="text-sm text-primary mb-2">Security Expert</p>
  <p className="text-xs text-muted-foreground">Specialized in security management and smart city solutions</p>
</motion.div>

{/* Team Member 2 */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ delay: 0.2 }}
  className="glass-card p-6 text-center hover:glow-border group"
>
  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20 group-hover:border-primary/50 transition-all mx-auto mb-4">
    <img 
      src="/sudhir_sir-removebg-preview.png"
      alt="Team Member"
      className="w-full h-full object-cover"
    />
  </div>
  <h3 className="font-bold text-lg mb-1">Technical Lead</h3>
  <p className="text-sm text-primary mb-2">IT Consultant</p>
  <p className="text-xs text-muted-foreground">Expert in CCTV systems and access control technologies</p>
</motion.div>

{/* Add more team members as needed */}
```

## Example 3: Social Activities Gallery

### In `src/pages/SocialActivities.jsx`:

Update the gallery section (around line 200):

```jsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="glass-card overflow-hidden group hover:glow-border"
  >
    <div className="aspect-[4/3] relative overflow-hidden">
      <img 
        src="/smartcity.png"
        alt="Social Activity"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
    <div className="p-4">
      <h3 className="font-semibold mb-1">Community Engagement</h3>
      <p className="text-sm text-muted-foreground">Smart city awareness program</p>
    </div>
  </motion.div>
  
  {/* Add more cards with different images */}
</div>
```

## Quick Start Steps

1. **For immediate testing:** Use the examples above with existing images
2. **For production:** 
   - Add your real photos to the respective folders
   - Update the image paths in the code
   - Follow the naming conventions in each folder's README

## Image Optimization Tips

- Compress images before uploading (use tools like TinyPNG)
- Keep file sizes under 500KB for faster loading
- Use descriptive file names for better organization
- Maintain consistent aspect ratios within each category

## Need Help?

Check the README.md file in each folder for detailed instructions and examples!
