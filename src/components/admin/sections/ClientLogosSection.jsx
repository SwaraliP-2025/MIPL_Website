import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',   label: 'ID',          type: 'text' },
  { key: 'name', label: 'Client Name', type: 'text' },
  { key: 'logo', label: 'Logo',        type: 'image', hint: 'Upload client logo' },
];

const ClientLogosSection = () => (
  <SheetEditor
    sheetName="ClientLogos"
    title="Client Logos (Trusted Partners)"
    description="Logos shown in the 'Trusted by Leading Organizations' section on the Home page."
    columns={columns}
  />
);

export default ClientLogosSection;
