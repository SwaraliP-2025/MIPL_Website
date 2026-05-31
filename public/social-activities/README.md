# Social Activities Images

Official images downloaded from [aatmanacademy.org](https://aatmanacademy.org/) and [secona.org](https://www.secona.org/).

## Refresh all images

From repo root:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/download-social-images.ps1
```

## Aatman (`aatman/`)

| Files | Source |
|-------|--------|
| `gallery-students-*.jpg` | [Official gallery](https://aatmanacademy.org/programs/aatman-academy/gallery/) |
| `gallery-classroom-*.jpg`, `gallery-activities-*.jpg` | Gallery & homepage |
| `campus-community.jpeg`, program posters | Homepage |
| `learning-program.jpeg`, `education-rankings.png`, etc. | aatmanacademy.org |

## SECONA (`secona/`)

| Files | Source |
|-------|--------|
| `shield-awards-banner.jpg` | [Shield Awards](https://www.secona.org/Shield-Awards/) |
| `initiative-*.jpg`, `about-feature.png` | secona.org |

Referenced in `src/data/aatmanAcademy.js` and `src/data/secona.js`.
