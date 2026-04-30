import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['Awards', 'Events', 'Team', 'Projects'] },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'image', label: 'Image URL', type: 'text' },
  { key: 'date', label: 'Date', type: 'text' },
];

const GallerySection = () => (
  <SheetEditor sheetName="Gallery" title="Gallery" description="Manage gallery images and events." columns={columns} />
);

export default GallerySection;
