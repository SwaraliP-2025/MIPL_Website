import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'icon', label: 'Icon', type: 'text' },
  { key: 'features', label: 'Features', type: 'textarea', hint: 'comma-separated' },
];

const ServicesSection = () => (
  <SheetEditor sheetName="Services" title="Services" description="Manage service offerings displayed on the Services page." columns={columns} />
);

export default ServicesSection;
