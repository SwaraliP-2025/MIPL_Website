# Downloads official images from aatmanacademy.org and secona.org into public/social-activities/
$ErrorActionPreference = "Stop"
$aatmanDir = Join-Path $PSScriptRoot "..\public\social-activities\aatman"
$seconaDir = Join-Path $PSScriptRoot "..\public\social-activities\secona"
New-Item -ItemType Directory -Force -Path $aatmanDir, $seconaDir | Out-Null

function Save-Image($url, $outPath) {
  if (Test-Path $outPath) { Remove-Item $outPath -Force -ErrorAction SilentlyContinue }
  Invoke-WebRequest -Uri $url -OutFile $outPath -UseBasicParsing -TimeoutSec 120
  $kb = [math]::Round((Get-Item $outPath).Length / 1KB, 1)
  Write-Host "OK $([IO.Path]::GetFileName($outPath)) ($kb KB)"
}

$aatman = @{
  "campus-community.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2015/12/WhatsApp-Image-2022-03-08-at-3.16.38-PM.jpeg"
  "learning-program.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/Aatman-Learning-program.jpeg"
  "aava-program.jpg" = "https://aatmanacademy.org/wp-content/uploads/2025/04/AAVA-Program-2025-27_page-0001.jpg"
  "aadi-poster.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/AADI-Poster-.jpeg"
  "child-poster-1.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/CHILD-Poster-1.jpeg"
  "child-poster.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/CHILD-poster-.jpeg"
  "isead-poster-1.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/iSEAD-poster-1.jpeg"
  "isead-poster.jpeg" = "https://aatmanacademy.org/wp-content/uploads/2026/02/iSEAD-poster-.jpeg"
  "child-program.png" = "https://aatmanacademy.org/wp-content/uploads/2023/06/CHILD-replace-the-previous-photo-with-this-photo-PAGE-2.png"
  "education-rankings.png" = "https://aatmanacademy.org/wp-content/uploads/2026/03/Education-world-rankings-to-be-posted-on-home-page-first-slider-.png"
  "gptw-poster.jpg" = "https://aatmanacademy.org/wp-content/uploads/2026/03/GPTW-poster-to-be-posted-on-the-home-page-first-slider-.jpg"
  "aatman-logo.png" = "https://aatmanacademy.org/wp-content/uploads/2020/01/aatman-logo.png"
  "gallery-students-01.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/85153839_2834668133259369_6932937141211103232_o.jpg"
  "gallery-students-02.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/84579093_2834668909925958_3781783519479463936_o.jpg"
  "gallery-students-03.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/84720139_2834668253259357_5131397397913534464_o.jpg"
  "gallery-students-04.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/84887340_2834668429926006_7881781148739698688_o.jpg"
  "gallery-students-05.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/85006236_2834668829925966_8847496475001749504_o.jpg"
  "gallery-students-06.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/85044846_2834668336592682_3059670272865992704_o.jpg"
  "gallery-students-07.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/85176251_2834668736592642_9008357049074974720_o.jpg"
  "gallery-students-08.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/86230009_2834668646592651_5253467867478753280_o.jpg"
  "gallery-classroom-01.jpg" = "https://aatmanacademy.org/wp-content/uploads/2021/10/Screen-Shot-1-780x550.jpg"
  "gallery-classroom-02.jpg" = "https://aatmanacademy.org/wp-content/uploads/2021/12/Screen-Shot-2021-11-13-at-4.56-780x550.jpg"
  "gallery-activities-01.jpg" = "https://aatmanacademy.org/wp-content/uploads/2021/10/Screen-Shot-10.jpg"
  "gallery-activities-02.jpg" = "https://aatmanacademy.org/wp-content/uploads/2021/12/Screen-1-780x550.jpg"
  "philosophy-underpinnings.jpg" = "https://aatmanacademy.org/wp-content/uploads/2020/02/6-underpinings.jpg"
}

$secona = @{
  "about-feature.png" = "https://www.secona.org/gallery_gen/9a363736c05e210ae957fc2868d4f80f.png"
  "initiative-1.jpg" = "https://www.secona.org/gallery_gen/45a7230f8ecf1d7372de193bfb12ead2_310x128.27586206897.jpg"
  "initiative-2.jpg" = "https://www.secona.org/gallery_gen/b8917e53f51d4000a616c54b130e6f2d_310x128.jpg"
  "initiative-3.jpg" = "https://www.secona.org/gallery_gen/bfe68a5ca408d24830aa14d4f4d4179e_310x128.13333333333.jpg"
  "secona-logo.png" = "https://www.secona.org/gallery_gen/cff2e46d07f1d731ee35143fe95c800b_250x72.png"
  "shield-awards-banner.jpg" = "https://www.secona.org/gallery_gen/ce9a5bc74d8a94c3ebc0a0b9d46bcad1.jpg"
}

Write-Host "`n=== Aatman Academy ===" -ForegroundColor Cyan
foreach ($kv in $aatman.GetEnumerator() | Sort-Object Name) {
  try { Save-Image $kv.Value (Join-Path $aatmanDir $kv.Key) }
  catch { Write-Host "FAIL $($kv.Key): $_" -ForegroundColor Red }
}

Write-Host "`n=== SECONA ===" -ForegroundColor Cyan
foreach ($kv in $secona.GetEnumerator() | Sort-Object Name) {
  try { Save-Image $kv.Value (Join-Path $seconaDir $kv.Key) }
  catch { Write-Host "FAIL $($kv.Key): $_" -ForegroundColor Red }
}

Write-Host "`nDone." -ForegroundColor Green
