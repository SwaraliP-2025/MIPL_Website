import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'title',       label: 'Title',       type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'location',    label: 'Location',    type: 'text' },
  { key: 'experience',  label: 'Experience',  type: 'text' },
  { key: 'education',   label: 'Education',   type: 'text' },
  { key: 'key skills',  label: 'Key Skills',  type: 'textarea' },
];

const JobsSection = () => (
  <SheetEditor
    sheetName="Jobs"
    title="Jobs / Careers"
    description="Manage job listings on the Careers page."
    columns={columns}
  />
);

export default JobsSection;
