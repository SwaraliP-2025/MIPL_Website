import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'page', label: 'Page', type: 'select', options: ['home', 'about', 'social'] },
  { key: 'label', label: 'Label', type: 'text' },
  { key: 'value', label: 'Value', type: 'text' },
  { key: 'icon', label: 'Icon', type: 'text' },
];

const StatsSection = () => (
  <SheetEditor sheetName="Stats" title="Statistics" description="Manage stats displayed across pages." columns={columns} />
);

export default StatsSection;
