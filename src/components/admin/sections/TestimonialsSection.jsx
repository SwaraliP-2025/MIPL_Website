import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id',      label: 'ID',      type: 'text' },
  { key: 'quote',   label: 'Quote',   type: 'textarea' },
  { key: 'author',  label: 'Author',  type: 'text', hint: 'e.g. Senior Manager' },
  { key: 'company', label: 'Company', type: 'text' },
  { key: 'role',    label: 'Role',    type: 'text', hint: 'e.g. Operations & Security' },
];

const TestimonialsSection = () => (
  <SheetEditor
    sheetName="Testimonials"
    title="Testimonials"
    description="Client testimonials shown in the 'What Our Clients Say' section on the Home page."
    columns={columns}
  />
);

export default TestimonialsSection;
