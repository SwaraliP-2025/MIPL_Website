import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'page',  label: 'Page',  type: 'select',
    options: ['home', 'about', 'social'],
    hint: 'which page this stat appears on' },
  { key: 'value', label: 'Value', type: 'text',   hint: 'e.g. 25+' },
  { key: 'label', label: 'Label', type: 'text',   hint: 'e.g. Years of Experience' },
  { key: 'icon',  label: 'Icon',  type: 'text',   hint: 'lucide icon name e.g. Users, Globe, Award' },
];

const StatsSection = () => (
  <SheetEditor
    sheetName="Stats"
    title="Statistics"
    description="Numbers shown on the About page and Social Activities page. Each row is one stat card."
    columns={columns}
  />
);

export default StatsSection;
