# 📸 Simple Guide: How to Add Photos to Your Website

## 🎯 Quick Overview

There are 3 places where you need to add photos:
1. **Gallery Page** - Main photo gallery with categories
2. **Social Activities Page** - Photos from community work
3. **About Page (Team Section)** - Team member photos

---

## 📁 STEP 1: Put Your Photos in the Right Folders

### Where to put photos:

```
public/
├── team/              👥 Put team member photos here
├── awards/            🏆 Put award ceremony photos here
├── events/            🎉 Put event photos here
├── projects/          🏗️ Put project photos here
└── social-activities/ ❤️ Put social work photos here
```

### Example:
If you have a photo of an award ceremony, save it as:
```
public/awards/security-award-2023.jpg
```

---

## 🖼️ STEP 2: Add Photos to Gallery Page

### Open this file: `src/pages/Gallery.jsx`

### Find this section (around line 10):

```javascript
const galleryItems = [
  {
    id: 1,
    category: "Awards",
    title: "Excellence in Security Award 2023",
    description: "Recognized for outstanding contribution to security consulting",
    image: "/placeholder-award.jpg",  // ← CHANGE THIS
    date: "2023"
  },
```

### Change it to:

```javascript
const galleryItems = [
  {
    id: 1,
    category: "Awards",
    title: "Excellence in Security Award 2023",
    description: "Recognized for outstanding contribution to security consulting",
    image: "/awards/security-award-2023.jpg",  // ← YOUR PHOTO PATH
    date: "2023"
  },
```

### 📝 Full Example with Multiple Photos:

```javascript
const galleryItems = [
  // AWARDS
  {
    id: 1,
    category: "Awards",
    title: "Security Excellence Award 2023",
    description: "Recognized for outstanding contribution",
    image: "/awards/award1.jpg",  // Your photo in public/awards/
    date: "2023"
  },
  {
    id: 2,
    category: "Awards",
    title: "Best Consultancy Award 2022",
    description: "Awarded for excellence in consulting",
    image: "/awards/award2.jpg",  // Your photo in public/awards/
    date: "2022"
  },
  
  // EVENTS
  {
    id: 3,
    category: "Events",
    title: "Annual Security Summit",
    description: "Industry leaders gathering",
    image: "/events/summit2023.jpg",  // Your photo in public/events/
    date: "2023"
  },
  
  // PROJECTS
  {
    id: 4,
    category: "Projects",
    title: "Kolhapur Safe City",
    description: "Smart city implementation",
    image: "/projects/kolhapur.jpg",  // Your photo in public/projects/
    date: "2022"
  },
  
  // TEAM
  {
    id: 5,
    category: "Team",
    title: "Team Building Event",
    description: "MIPL team workshop",
    image: "/team/team-event.jpg",  // Your photo in public/team/
    date: "2023"
  },
];
```

**Important:** 
- The path starts with `/` (like `/awards/photo.jpg`)
- Match the folder name exactly
- Use the exact filename you saved

---

## ❤️ STEP 3: Add Photos to Social Activities Page

### Open this file: `src/pages/SocialActivities.jsx`

### Find this section (around line 200):

```javascript
{[1, 2, 3, 4, 5, 6].map((item, index) => (
  <motion.div>
    <div className="aspect-[4/3] bg-gradient-to-br from-primary/20...">
      <Heart className="w-16 h-16 text-primary/40" />  // ← This is placeholder
    </div>
  </motion.div>
))}
```

### Replace with real photos:

```javascript
{/* Photo 1 */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  className="glass-card overflow-hidden group hover:glow-border"
>
  <div className="aspect-[4/3] relative overflow-hidden">
    <img 
      src="/social-activities/aatman-event.jpg" 
      alt="Aatman Academy Event"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
  <div className="p-4">
    <h3 className="font-semibold mb-1">Aatman Academy Event</h3>
    <p className="text-sm text-muted-foreground">Educational support program</p>
  </div>
</motion.div>

{/* Photo 2 */}
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ delay: 0.1 }}
  className="glass-card overflow-hidden group hover:glow-border"
>
  <div className="aspect-[4/3] relative overflow-hidden">
    <img 
      src="/social-activities/community-work.jpg"  // ← YOUR PHOTO
      alt="Community Work"
      className="w-full h-full object-cover"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
  </div>
  <div className="p-4">
    <h3 className="font-semibold mb-1">Community Outreach</h3>
    <p className="text-sm text-muted-foreground">Helping local communities</p>
  </div>
</motion.div>

{/* Add more photos like this... */}
```

---

## 👥 STEP 4: Add Team Member Photos

### Open this file: `src/pages/About.jsx`

### Find the "Our Team Section" (around line 475):

```javascript
{/* Team Member 1 */}
<motion.div className="glass-card p-6 text-center hover:glow-border group">
  <div className="w-24 h-24 rounded-full bg-gradient-to-br...">
    <Users className="w-12 h-12 text-primary/60" />  // ← This is placeholder
  </div>
  <h3 className="font-bold text-lg mb-1">Team Member</h3>
  <p className="text-sm text-primary mb-2">Position Title</p>
</motion.div>
```

### Replace with real team member:

```javascript
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
      src="/team/john-doe.jpg"  // ← YOUR TEAM PHOTO
      alt="John Doe"
      className="w-full h-full object-cover"
    />
  </div>
  <h3 className="font-bold text-lg mb-1">John Doe</h3>
  <p className="text-sm text-primary mb-2">Senior Consultant</p>
  <p className="text-xs text-muted-foreground">Expert in security management with 10+ years experience</p>
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
      src="/team/jane-smith.jpg"  // ← YOUR TEAM PHOTO
      alt="Jane Smith"
      className="w-full h-full object-cover"
    />
  </div>
  <h3 className="font-bold text-lg mb-1">Jane Smith</h3>
  <p className="text-sm text-primary mb-2">IT Consultant</p>
  <p className="text-xs text-muted-foreground">Specialized in smart city solutions</p>
</motion.div>

{/* Add more team members... */}
```

---

## ✅ CHECKLIST

### Before you start:
- [ ] I have my photos ready
- [ ] Photos are in JPG or PNG format
- [ ] Photos are compressed (not too large)

### For each photo:
1. [ ] Save photo in correct folder (team/awards/events/projects/social-activities)
2. [ ] Give it a simple name (like `award1.jpg`, no spaces)
3. [ ] Open the correct file (Gallery.jsx, SocialActivities.jsx, or About.jsx)
4. [ ] Find the placeholder code
5. [ ] Replace with your photo path
6. [ ] Add title and description
7. [ ] Save the file

---

## 🆘 COMMON MISTAKES

❌ **Wrong:** `image: "awards/photo.jpg"` (missing `/` at start)
✅ **Right:** `image: "/awards/photo.jpg"`

❌ **Wrong:** `image: "/Awards/photo.jpg"` (capital A)
✅ **Right:** `image: "/awards/photo.jpg"` (lowercase)

❌ **Wrong:** `image: "/awards/my photo.jpg"` (space in filename)
✅ **Right:** `image: "/awards/my-photo.jpg"` (use dash)

---

## 🎬 QUICK START EXAMPLE

Let's say you have one award photo called `award2023.jpg`:

1. **Save it:** Put `award2023.jpg` in `public/awards/` folder

2. **Open:** `src/pages/Gallery.jsx`

3. **Find:** Line 10 where it says `const galleryItems = [`

4. **Change the first item:**
```javascript
{
  id: 1,
  category: "Awards",
  title: "Security Excellence Award 2023",
  description: "Our latest achievement",
  image: "/awards/award2023.jpg",  // ← Changed this line
  date: "2023"
}
```

5. **Save the file** and refresh your website!

---

## 💡 NEED HELP?

If you're still confused, just tell me:
1. What type of photo you want to add (award/event/team/social)
2. What the filename is
3. I'll give you the exact code to copy-paste!
