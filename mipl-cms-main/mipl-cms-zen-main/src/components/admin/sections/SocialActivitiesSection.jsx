import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'image', label: 'Image URL', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
];

const SocialActivitiesSection = () => (
  <SheetEditor sheetName="SocialActivities" title="Social Activities" description="Manage social responsibility activities." columns={columns} />
);

export default SocialActivitiesSection;
