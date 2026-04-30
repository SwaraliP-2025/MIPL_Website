import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'title',       label: 'Title',        type: 'text' },
  { key: 'description', label: 'Description',  type: 'textarea' },
  { key: 'image',       label: 'Activity Image', type: 'image',
    hint: 'Upload activity photo' },
  { key: 'category',    label: 'Role / Category', type: 'text',
    hint: 'e.g. Founder Trustee, Member Secretary' },
];

const SocialActivitiesSection = () => (
  <SheetEditor
    sheetName="SocialActivities"
    title="Social Activities"
    description="Community initiatives and social responsibility activities shown on the Social Activities page."
    columns={columns}
  />
);

export default SocialActivitiesSection;
