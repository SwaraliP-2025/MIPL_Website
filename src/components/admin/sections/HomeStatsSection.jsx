import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',     label: 'ID',     type: 'text' },
  { key: 'value',  label: 'Number', type: 'text', hint: 'e.g. 25' },
  { key: 'suffix', label: 'Suffix', type: 'text', hint: 'e.g. + or %' },
  { key: 'label',  label: 'Label',  type: 'text', hint: 'e.g. Years Experience' },
];

const HomeStatsSection = () => (
  <SheetEditor
    sheetName="HomeStats"
    title="Home Page Statistics"
    description="Animated numbers shown in the 'Our Impact in Numbers' section on the Home page."
    columns={columns}
  />
);

export default HomeStatsSection;
