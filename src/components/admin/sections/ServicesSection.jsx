import SheetEditor from "../SheetEditor";

// Comprehensive list of available icons from lucide-react
const availableIcons = [
  'Users', 'Globe', 'Shield', 'Award', 'Target', 'Zap', 'CheckCircle2', 'BarChart3',
  'Search', 'CheckCircle', 'Briefcase', 'TrendingUp', 'Star', 'Heart', 'Rocket',
  'Lock', 'Eye', 'Layers', 'Network', 'Cpu', 'Database', 'Cloud', 'Code',
  'Settings', 'Gauge', 'Lightbulb', 'Compass', 'Map', 'Navigation', 'AlertCircle',
  'CheckSquare', 'Wifi', 'Radio', 'Smartphone', 'Monitor', 'Headphones', 'Volume2',
  'Music', 'Camera', 'Video', 'Image', 'FileText', 'Download', 'Upload', 'Share2',
  'Link', 'ExternalLink', 'Copy', 'Trash2', 'Edit', 'Plus', 'Minus', 'X', 'Check',
  'ChevronRight', 'ChevronDown', 'Menu', 'Home', 'Building2', 'Factory', 'Landmark',
  'CreditCard', 'DollarSign', 'TrendingDown', 'PieChart', 'LineChart', 'AreaChart',
  'BarChart', 'Activity', 'AlertTriangle', 'Info', 'HelpCircle', 'MessageSquare',
  'Mail', 'Phone', 'MapPin', 'Clock', 'Calendar', 'Clock3', 'Watch', 'Timer',
  'Hourglass', 'Battery', 'Power', 'Sun', 'Moon', 'CloudRain', 'Wind', 'Droplets',
  'Thermometer', 'Umbrella', 'Coffee', 'Beer', 'Wine', 'Utensils', 'Truck', 'Car',
  'Plane', 'Ship', 'Anchor', 'Flag', 'Bookmark', 'Tag', 'Tags', 'Package', 'Gift',
  'Inbox', 'Send', 'Archive', 'Trash', 'XCircle', 'HelpCircle', 'InfoCircle', 'Smile',
  'Frown', 'Meh', 'Thumbs', 'Hand', 'Handshake', 'Finger', 'Fist', 'Wand2',
  'Sparkles', 'Flame', 'Droplet', 'Leaf', 'Flower', 'Feather', 'Trophy'
];

const columns = [
  { key: 'id', label: 'ID', type: 'text' },
  { key: 'title', label: 'Title', type: 'text' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'image', label: 'Service Image', type: 'image', hint: 'Upload service illustration/photo' },
  { key: 'icon', label: 'Icon', type: 'select', options: availableIcons, hint: 'Select an icon from the list' },
  { key: 'features', label: 'Features', type: 'textarea', hint: 'comma-separated' },
];

const ServicesSection = () => (
  <SheetEditor sheetName="Services" title="Services" description="Manage service offerings displayed on the Services page." columns={columns} />
);

export default ServicesSection;
