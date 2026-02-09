// 📸 SIMPLE GALLERY CONFIGURATION
// Just add your image filenames here - no paths needed!

// ============================================
// GALLERY PAGE PHOTOS
// ============================================
// Put your photos in the folders, then just write the filename here

export const galleryPhotos = {
  // 🏆 AWARDS - Put photos in: public/awards/
  awards: [
    { filename: "award1.jpg", title: "Security Excellence Award 2023", description: "Recognized for outstanding contribution", date: "2023" },
    { filename: "award2.jpg", title: "Best Consultancy Award 2022", description: "Excellence in IT consulting", date: "2022" },
    // Add more awards here - just copy the line above and change the details
  ],

  // 🎉 EVENTS - Put photos in: public/events/
  events: [
    { filename: "event1.jpg", title: "Annual Security Summit", description: "Industry leaders gathering", date: "2023" },
    { filename: "event2.jpg", title: "Client Appreciation Event", description: "Celebrating partnerships", date: "2023" },
    // Add more events here
  ],

  // 👥 TEAM - Put photos in: public/team/
  team: [
    { filename: "team1.jpg", title: "Team Building Workshop", description: "MIPL team collaboration", date: "2023" },
    { filename: "team2.jpg", title: "Team Outing", description: "Annual team event", date: "2023" },
    // Add more team photos here
  ],

  // 🏗️ PROJECTS - Put photos in: public/projects/
  projects: [
    { filename: "project1.jpg", title: "Smart City Project Launch", description: "Major smart city implementation", date: "2022" },
    { filename: "project2.jpg", title: "Safe City Implementation", description: "Award-winning safe city project", date: "2021" },
    // Add more projects here
  ],
};

// ============================================
// SOCIAL ACTIVITIES PAGE PHOTOS
// ============================================
// Put photos in: public/social-activities/

export const socialPhotos = [
  { filename: "social1.jpg", title: "Aatman Academy Event", description: "Educational support program" },
  { filename: "social2.jpg", title: "Community Outreach", description: "Helping local communities" },
  { filename: "social3.jpg", title: "SECONA Meeting", description: "Industry association gathering" },
  { filename: "social4.jpg", title: "Educational Workshop", description: "Training and development" },
  { filename: "social5.jpg", title: "Community Service", description: "Social welfare initiative" },
  { filename: "social6.jpg", title: "Awareness Program", description: "Security awareness campaign" },
  // Add more social activity photos here
];

// ============================================
// TEAM MEMBERS (About Page)
// ============================================
// Put photos in: public/team/

export const teamMembers = [
  { 
    filename: "member1.jpg", 
    name: "Team Member 1", 
    position: "Senior Consultant", 
    description: "Expert in security management with 10+ years experience" 
  },
  { 
    filename: "member2.jpg", 
    name: "Team Member 2", 
    position: "IT Consultant", 
    description: "Specialized in smart city solutions" 
  },
  { 
    filename: "member3.jpg", 
    name: "Team Member 3", 
    position: "Project Manager", 
    description: "Leading major infrastructure projects" 
  },
  { 
    filename: "member4.jpg", 
    name: "Team Member 4", 
    position: "Technical Lead", 
    description: "Expert in CCTV and surveillance systems" 
  },
  // Add more team members here
];

// ============================================
// HOW TO USE:
// ============================================
// 1. Put your photo in the correct folder (awards/events/team/projects/social-activities)
// 2. Come to this file
// 3. Add a new line with just the filename and details
// 4. Save - that's it!
//
// Example:
// { filename: "my-photo.jpg", title: "My Title", description: "My description", date: "2024" },
