"""
Image Compression Script for Rosina Street Closeup
Compresses to 85% quality (virtually no visible loss)
Original backed up with _ORIGINAL suffix
"""

from PIL import Image
import os
import shutil

def compress_image(input_path, quality=85):
    """
    Compress a JPG image to specified quality
    
    Args:
        input_path: Path to image file
        quality: JPG quality (1-100), 85 is sweet spot
    """
    # Check if file exists
    if not os.path.exists(input_path):
        print(f"❌ Error: File not found: {input_path}")
        return
    
    # Get file info
    original_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
    print(f"📸 Original file: {original_size:.2f} MB")
    
    # Create proper backup filename
    base_name = os.path.splitext(input_path)[0]
    extension = os.path.splitext(input_path)[1]
    backup_path = f"{base_name}_ORIGINAL{extension}"
    
    if not os.path.exists(backup_path):
        shutil.copy2(input_path, backup_path)
        print(f"💾 Backup created: {backup_path}")
    else:
        print(f"ℹ️  Backup already exists: {backup_path}")
    
    # Open and compress
    try:
        img = Image.open(input_path)
        
        # Get image dimensions
        width, height = img.size
        print(f"📐 Dimensions: {width}x{height} pixels")
        
        # Save compressed version (overwrites original)
        img.save(input_path, "JPEG", quality=quality, optimize=True)
        
        # Get new file info
        new_size = os.path.getsize(input_path) / (1024 * 1024)  # MB
        reduction = ((original_size - new_size) / original_size) * 100
        
        print(f"✅ Compressed file: {new_size:.2f} MB")
        print(f"📉 Size reduction: {reduction:.1f}%")
        print(f"💪 Quality: {quality}%")
        
    except Exception as e:
        print(f"❌ Error during compression: {e}")

if __name__ == "__main__":
    # Target file
    image_path = r"images\band-photos\Rosina Street Closeup.jpg"
    
    print("=" * 50)
    print("IMAGE COMPRESSION UTILITY")
    print("=" * 50)
    
    compress_image(image_path, quality=85)
    
    print("=" * 50)
    print("✅ DONE! Original backed up as _ORIGINAL")
    print("=" * 50)