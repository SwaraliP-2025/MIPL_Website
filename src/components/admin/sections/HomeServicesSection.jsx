import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'title',       label: 'Title',        type: 'text' },
  { key: 'description', label: 'Description',  type: 'textarea' },
  { key: 'icon',        label: 'Icon Image',   type: 'image', hint: 'Upload service icon/image' },
];

const HomeServicesSection = () => (
  <SheetEditor
    sheetName="HomeServices"
    title="Home Page Service Cards"
    description="The 6 service cards shown on the Home page (Security Consultancy, Security Audits, etc.)."
    columns={columns}
  />
);

export default HomeServicesSection;
