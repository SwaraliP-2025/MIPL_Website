import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'title',       label: 'Title',        type: 'text' },
  { key: 'description', label: 'Description',  type: 'textarea' },
  { key: 'year',        label: 'Year',         type: 'text', hint: 'e.g. 2017' },
  { key: 'image',       label: 'Achievement Image', type: 'image', hint: 'Upload achievement photo' },
  { key: 'icon',        label: 'Icon',         type: 'select',
    options: ['Trophy', 'Award', 'Star', 'Target', 'CheckCircle'] },
];

const AchievementsSection = () => (
  <SheetEditor
    sheetName="Achievements"
    title="Achievements"
    description="Awards and milestones shown on the Achievements page."
    columns={columns}
  />
);

export default AchievementsSection;
