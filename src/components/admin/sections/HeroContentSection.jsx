import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'page', label: 'Page', type: 'select', options: ['home', 'about', 'services', 'projects', 'gallery', 'careers', 'contact', 'publications', 'social-activities'] },
  { key: 'heading', label: 'Heading', type: 'text' },
  { key: 'subheading', label: 'Subheading', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'backgroundImage', label: 'Background Image', type: 'image', hint: 'Upload hero background image' },
];

const HeroContentSection = () => (
  <SheetEditor sheetName="HeroContent" title="Hero Content" description="Manage hero sections for each page." columns={columns} />
);

export default HeroContentSection;
