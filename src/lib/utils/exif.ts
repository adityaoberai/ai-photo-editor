import exifr from 'exifr';
const { parse } = exifr;

export type ExifData = {
  Make?: string;
  Model?: string;
  DateTimeOriginal?: string;
  ModifyDate?: string;
  ImageWidth?: number;
  ImageHeight?: number;
  Orientation?: number;
  ISO?: number;
  ExposureTime?: number;
  FNumber?: number;
  FocalLength?: number;
  LensModel?: string;
  GPSLatitude?: number;
  GPSLongitude?: number;
};

export async function extractExif(file: File): Promise<ExifData> {
  try {
    // Parse EXIF data using exifr
    const exif = await parse(file, {
      // Select specific tags we're interested in
      pick: [
        'Make',
        'Model',
        'DateTimeOriginal',
        'ModifyDate',
        'ImageWidth',
        'ImageHeight',
        'Orientation',
        'ISO',
        'ExposureTime',
        'FNumber',
        'FocalLength',
        'LensModel',
        'GPSLatitude',
        'GPSLongitude'
      ]
    });

    // Format exposure time to a fraction if needed
    if (exif?.ExposureTime && exif.ExposureTime < 1) {
      const fraction = `1/${Math.round(1 / exif.ExposureTime)}`;
      exif.ExposureTime = fraction;
    }

    // Format focal length to remove decimal points
    if (exif?.FocalLength) {
      exif.FocalLength = Math.round(exif.FocalLength);
    }

    // Format f-number to one decimal place
    if (exif?.FNumber) {
      exif.FNumber = Math.round(exif.FNumber * 10) / 10;
    }

    return exif || {};
  } catch (error) {
    console.warn('Error extracting EXIF data:', error);
    return {};
  }
}
