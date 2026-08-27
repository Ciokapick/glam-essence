param(
  [string]$SheetOne = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-8c06c3f0-4a97-4a91-96ba-49f794b957c9.png',
  [string]$SheetTwo = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-1fa4309b-ce70-4342-8e86-6de21c576614.png',
  [string]$SheetThree = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-9c4c0de3-eed2-4275-86d7-c87ab48e0a36.png',
  [string]$SheetFour = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-fd30b9ac-5b7e-49f3-ae1c-80e50ac2f2c8.png'
)

$outputDirectory = Join-Path $PSScriptRoot '..\public\products\skincare\rituals'
$outputDirectory = [System.IO.Path]::GetFullPath($outputDirectory)
[System.IO.Directory]::CreateDirectory($outputDirectory) | Out-Null

Add-Type -AssemblyName System.Drawing

$cropOrigins = @(0, 422, 846)
$cropSize = 408
$jpegEncoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
  Where-Object { $_.MimeType -eq 'image/jpeg' } |
  Select-Object -First 1
$encoderParameters = [System.Drawing.Imaging.EncoderParameters]::new(1)
$encoderParameters.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
  [System.Drawing.Imaging.Encoder]::Quality,
  [long]92
)

function Export-CollageTiles {
  param(
    [string]$Source,
    [string[]]$Names
  )

  $sourceImage = [System.Drawing.Bitmap]::new($Source)
  try {
    for ($index = 0; $index -lt $Names.Count; $index++) {
      if ([string]::IsNullOrWhiteSpace($Names[$index])) {
        continue
      }

      $row = [Math]::Floor($index / 3)
      $column = $index % 3
      $rectangle = [System.Drawing.Rectangle]::new(
        $cropOrigins[$column],
        $cropOrigins[$row],
        $cropSize,
        $cropSize
      )
      $tile = $sourceImage.Clone($rectangle, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
      try {
        $destination = Join-Path $outputDirectory ($Names[$index] + '.jpg')
        $tile.Save($destination, $jpegEncoder, $encoderParameters)
      }
      finally {
        $tile.Dispose()
      }
    }
  }
  finally {
    $sourceImage.Dispose()
  }
}

Export-CollageTiles -Source $SheetOne -Names @(
  'luxury-face-cream-formula',
  'luxury-face-cream-effect',
  'luxury-face-cream-ritual',
  'eye-cream-formula',
  'eye-cream-effect',
  'eye-cream-ritual',
  'hand-cream-formula',
  'hand-cream-effect',
  'hand-cream-ritual'
)

Export-CollageTiles -Source $SheetTwo -Names @(
  'body-cream-formula',
  'body-cream-effect',
  'body-cream-ritual',
  'night-cream-formula',
  'night-cream-effect',
  'night-cream-ritual',
  'anti-cellulite-formula',
  'anti-cellulite-effect',
  'anti-cellulite-ritual'
)

Export-CollageTiles -Source $SheetThree -Names @(
  'face-serum-formula',
  'face-serum-effect',
  'face-serum-ritual',
  'detox-mask-formula',
  'detox-mask-effect',
  'detox-mask-ritual',
  'cleansing-foam-formula',
  'cleansing-foam-effect',
  'cleansing-foam-ritual'
)

Export-CollageTiles -Source $SheetFour -Names @(
  'toner-formula',
  'toner-effect',
  'toner-ritual',
  'face-oil-formula',
  'face-oil-effect',
  'face-oil-ritual',
  '',
  '',
  ''
)

Write-Output "Exported 33 skincare ritual images to $outputDirectory"
