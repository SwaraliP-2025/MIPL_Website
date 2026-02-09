# Social Activities Photos Folder

Place photos from social initiatives, community engagement, and CSR activities here.

## Recommended Specifications:
- **Size:** 1200x900px (4:3 aspect ratio)
- **Format:** JPG or PNG
- **File naming:** Use descriptive names (e.g., `aatman-academy-event-2023.jpg`)

## Example:
```
social-activities/
├── aatman-academy-event-2023.jpg
├── community-outreach-2023.jpg
├── educational-support-2022.jpg
└── secona-meeting-2022.jpg
```

## Usage in Code:
In `src/pages/SocialActivities.jsx`, update the gallery section:

```jsx
<img 
  src="/social-activities/aatman-academy-event-2023.jpg"
  alt="Aatman Academy Event"
  className="w-full h-full object-cover"
/>
```

Also update in `src/pages/Gallery.jsx` for the main gallery page.
