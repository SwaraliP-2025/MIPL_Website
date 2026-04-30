import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'year',        label: 'Year',        type: 'text', hint: 'e.g. 2000' },
  { key: 'title',       label: 'Title',       type: 'text', hint: 'e.g. Company Founded' },
  { key: 'description', label: 'Description', type: 'textarea', hint: 'Briefly describe the milestone' },
];

const JourneySection = () => (
  <SheetEditor
    sheetName="Journey"
    title="Our Journey"
    description="Key milestones in our 25+ year journey shown on the About page."
    columns={columns}
  />
);

export default JourneySection;
