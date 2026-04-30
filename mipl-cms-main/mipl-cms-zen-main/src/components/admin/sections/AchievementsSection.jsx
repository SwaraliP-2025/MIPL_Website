import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'year', label: 'Year', type: 'text' },
  { key: 'icon', label: 'Icon', type: 'text' },
];

const AchievementsSection = () => (
  <SheetEditor sheetName="Achievements" title="Achievements" description="Manage company achievements and milestones." columns={columns} />
);

export default AchievementsSection;
