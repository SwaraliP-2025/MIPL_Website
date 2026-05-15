import SheetEditor from "../SheetEditor";

// Comprehensive list of available icons from lucide-react
const availableIcons = [
  'Trophy', 'Award', 'Star', 'Target', 'CheckCircle', 'Users', 'Globe', 'Shield',
  'Zap', 'CheckCircle2', 'BarChart3', 'Search', 'Briefcase', 'TrendingUp', 'Heart',
  'Rocket', 'Lock', 'Eye', 'Layers', 'Network', 'Cpu', 'Database', 'Cloud', 'Code',
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
  'Inbox', 'Send', 'Archive', 'Trash', 'XCircle', 'Smile', 'Frown', 'Meh', 'Thumbs',
  'Hand', 'Handshake', 'Finger', 'Fist', 'Wand2', 'Sparkles', 'Flame', 'Droplet',
  'Leaf', 'Flower', 'Feather'
];

const columns = [
  { key: 'id',          label: 'ID',          type: 'text' },
  { key: 'title',       label: 'Title',        type: 'text' },
  { key: 'description', label: 'Description',  type: 'textarea' },
  { key: 'year',        label: 'Year',         type: 'text', hint: 'e.g. 2017' },
  { key: 'image',       label: 'Achievement Image', type: 'image', hint: 'Upload achievement photo' },
  { key: 'icon',        label: 'Icon',         type: 'select', options: availableIcons, hint: 'Select an icon from the list' },
];

const AchievementsSection = () => (
  <SheetEditor
    sheetName="Achievements"
    title="Achievements"
    description="Awards and milestones shown on the Achievements page."
    columns={columns}
  />
);

export default AchievementsSection;
