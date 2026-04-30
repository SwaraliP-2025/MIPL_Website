import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'name',        label: 'Name',        type: 'text' },
  { key: 'designation', label: 'Designation', type: 'text', hint: 'e.g. Director, MIPL' },
  { key: 'education',   label: 'Education',   type: 'text' },
  { key: 'vision',      label: 'Vision / Message', type: 'textarea', hint: 'A paragraph about their thoughts or professional vision' },
  { key: 'image',       label: 'Photo',       type: 'image', hint: 'Upload profile photo' },
];

const LeadershipSection = () => (
  <SheetEditor
    sheetName="Leadership"
    title="Leadership"
    description="Directors and leadership team shown on the About page."
    columns={columns}
  />
);

export default LeadershipSection;
