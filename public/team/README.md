# Team Photos Folder

Place team member photos here.

## Careers page header

Add your team group photo as:

```
team/careers-header.jpg
```

Used on the `/careers` page hero. Use a wide landscape photo (roughly 1600×900 or similar) so it fills the header nicely.

## Recommended Specifications:
- **Size:** 400x400px (square)
- **Format:** JPG or PNG
- **File naming:** Use lowercase with hyphens (e.g., `john-doe.jpg`)

## Example:
```
team/
├── john-doe.jpg
├── jane-smith.jpg
├── mike-johnson.jpg
└── sarah-williams.jpg
```

## Usage in Code:
In `src/pages/About.jsx`, update the team member cards:

```jsx
<img 
  src="/team/john-doe.jpg"
  alt="John Doe"
  className="w-full h-full object-cover"
/>
```

## Current Examples:
You can reference the existing leadership photos:
- `/prasadsir.png` - Prasad Patil
- `/sudhir_sir-removebg-preview.png` - Sudhir Deshpande
