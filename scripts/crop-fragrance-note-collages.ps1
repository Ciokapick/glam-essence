param(
  [string]$FirstSheet = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-65090e58-22fb-487d-90f4-5dd325868107.png',
  [string]$SecondSheet = 'C:\Users\Calculator\.codex\generated_images\019ffa29-3f73-7583-8dc5-69368fbedc56\exec-2bf75275-85b3-4899-8f4a-bb5a18276107.png'
)

$outputDirectory = Join-Path $PSScriptRoot '..\public\products\perfumes\notes'
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

$firstNames = @(
  'pepper-nutmeg',
  'cinnamon-clove',
  'vanilla-oud-tobacco',
  'rose-jasmine',
  'iris-ylang-ylang',
  'bergamot-cardamom',
  'lemon-lime-grapefruit',
  'marine-lavender',
  ''
)

$secondNames = @(
  'musk-amber-vanilla',
  'mint-basil',
  'cedar-musk',
  'bergamot-black-pepper',
  'cedar-sandalwood',
  'vetiver-patchouli-amber',
  'citrus-mint',
  'musk-amber',
  'rose-jasmine-alternate'
)

Export-CollageTiles -Source $FirstSheet -Names $firstNames
Export-CollageTiles -Source $SecondSheet -Names $secondNames

Write-Output "Exported $($firstNames.Count + $secondNames.Count) fragrance-note images to $outputDirectory"
