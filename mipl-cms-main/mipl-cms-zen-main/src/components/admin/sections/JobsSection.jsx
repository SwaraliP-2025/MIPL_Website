import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'department', label: 'Department', type: 'text' },
  { key: 'location', label: 'Location', type: 'text' },
  { key: 'type', label: 'Type', type: 'select', options: ['Full-time', 'Part-time', 'Contract'] },
  { key: 'experience', label: 'Experience', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'requirements', label: 'Requirements', type: 'textarea', hint: 'comma-separated' },
];

const JobsSection = () => (
  <SheetEditor sheetName="Jobs" title="Jobs / Careers" description="Manage job listings on the Careers page." columns={columns} />
);

export default JobsSection;
