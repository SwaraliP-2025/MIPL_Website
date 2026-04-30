import SheetEditor from "../SheetEditor";

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'authors', label: 'Authors', type: 'text' },
  { key: 'journal', label: 'Journal', type: 'text' },
  { key: 'year', label: 'Year', type: 'text' },
  { key: 'category', label: 'Category', type: 'text' },
  { key: 'abstract', label: 'Abstract', type: 'textarea' },
  { key: 'link', label: 'Link', type: 'text' },
];

const PublicationsSection = () => (
  <SheetEditor sheetName="Publications" title="Publications" description="Manage research publications." columns={columns} />
);

export default PublicationsSection;
