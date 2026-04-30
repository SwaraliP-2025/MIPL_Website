import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'category', label: 'Category', type: 'select', options: ['smart-city', 'industrial', 'government', 'enterprise'] },
  { key: 'client', label: 'Client', type: 'text' },
  { key: 'challenge', label: 'Challenge', type: 'textarea' },
  { key: 'solution', label: 'Solution', type: 'textarea' },
  { key: 'result', label: 'Result', type: 'textarea' },
  { key: 'image', label: 'Project Image', type: 'image', hint: 'Upload project image' },
];

const ProjectsSection = () => (
  <SheetEditor sheetName="Projects" title="Projects" description="Manage project case studies." columns={columns} />
);

export default ProjectsSection;
