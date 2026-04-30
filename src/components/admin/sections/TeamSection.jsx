import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',    label: 'ID',       type: 'text' },
  { key: 'name',  label: 'Name',     type: 'text' },
  { key: 'role',  label: 'Role',     type: 'text' },
  { key: 'bio',   label: 'Bio',      type: 'textarea' },
  { key: 'image', label: 'Photo',    type: 'image', hint: 'Upload team member photo' },
];

const TeamSection = () => (
  <SheetEditor
    sheetName="Team"
    title="Team Members"
    description="Team members shown on the About page."
    columns={columns}
  />
);

export default TeamSection;
