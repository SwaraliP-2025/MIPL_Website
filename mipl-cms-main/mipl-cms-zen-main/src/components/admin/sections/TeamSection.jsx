import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'name', label: 'Name', type: 'text' },
  { key: 'role', label: 'Role', type: 'text' },
  { key: 'bio', label: 'Bio', type: 'textarea' },
  { key: 'image', label: 'Image URL', type: 'text' },
];

const TeamSection = () => (
  <SheetEditor sheetName="Team" title="Team Members" description="Manage team members on the About page." columns={columns} />
);

export default TeamSection;
