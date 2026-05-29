# Navbar & Breadcrumb Consistency - Quick Reference

## What Was Fixed

✅ **Navbar inconsistency** - Options no longer change after CMS loads  
✅ **Breadcrumb misalignment** - Breadcrumbs now sync with navbar automatically  
✅ **Single source of truth** - All nav config in one place (NavContext)  

## How It Works Now

```
User visits page
    ↓
NavProvider initializes with DEFAULT_NAV_LINKS
    ↓
Navbar renders with consistent options
Breadcrumbs render with matching names
    ↓
CMS config loads (if available)
    ↓
NavContext updates navLinks
    ↓
Both Navbar and Breadcrumbs automatically update
```

## Key Files

| File | Purpose |
|------|---------|
| `src/context/NavContext.jsx` | Central nav config management |
| `src/components/layout/Navbar.jsx` | Uses `useNavLinks()` from context |
| `src/components/Breadcrumbs.jsx` | Dynamically builds from nav links |
| `src/App.jsx` | Wraps app with `<NavProvider>` |

## Adding New Navbar Items

### Option 1: Update Default Links (Immediate)
Edit `src/context/NavContext.jsx`:
```javascript
const DEFAULT_NAV_LINKS = [
  // ... existing items
  { name: "New Item", href: "/new-item" },
];
```

### Option 2: Update CMS Config (Dynamic)
The CMS config will automatically override defaults when loaded.

## Breadcrumb Names

Breadcrumbs automatically derive names from:
1. Main navbar links (e.g., "About" → `/about`)
2. Dropdown items (e.g., "Our Achievements" → `/achievements`)

No manual mapping needed - it's all automatic!

## Testing

1. **At page load**: Navbar options should be consistent (no flash)
2. **Navigate pages**: Breadcrumbs should show correct names
3. **Check dropdown items**: Breadcrumbs should work for all dropdown pages
4. **CMS update**: Both navbar and breadcrumbs should update together

## Common Tasks

### Change navbar link name
Edit `DEFAULT_NAV_LINKS` in `NavContext.jsx` or update CMS config

### Add dropdown to existing link
Add `dropdown` array to link object in `DEFAULT_NAV_LINKS`

### Remove navbar item
Remove from `DEFAULT_NAV_LINKS` or filter in CMS config

### Update breadcrumb styling
Edit `Breadcrumbs.jsx` (styling only - names are automatic)

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Breadcrumb shows wrong name | Check if link exists in `DEFAULT_NAV_LINKS` or CMS config |
| Navbar flashes on load | Verify `NavProvider` wraps entire app in `App.jsx` |
| Breadcrumb not appearing | Check if path matches any navbar link href |
| CMS changes not showing | Verify CMS config is being loaded correctly |

## Prevention Rules

1. ✅ Always use `useNavLinks()` for nav configuration
2. ✅ Never hardcode breadcrumb names
3. ✅ Never duplicate nav link definitions
4. ✅ Always test breadcrumbs after navbar changes
5. ✅ Always verify consistency at page load

## Related Documentation

- `NAVBAR_BREADCRUMB_CONSISTENCY_FIX.md` - Detailed technical explanation
- `navbar-dropdown-persistence.md` - Dropdown persistence fix (separate)
