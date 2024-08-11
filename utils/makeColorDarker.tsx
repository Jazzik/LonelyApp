export default function (color: any, darkenBy = 50) {
    // Helper function to clamp values between 0 and 255
    const clamp = (value: number) => Math.max(0, Math.min(255, value));
  
    // Convert HEX to RGB
    const hexToRgb = (hex: string | any[]) => {
      let r = 0, g = 0, b = 0;
      // 3 digits
      if (hex.length === 4) {
        r = parseInt(hex[1] + hex[1], 16);
        g = parseInt(hex[2] + hex[2], 16);
        b = parseInt(hex[3] + hex[3], 16);
      }
      // 6 digits
      else if (hex.length === 7) {
        r = parseInt(hex[1] + hex[2], 16);
        g = parseInt(hex[3] + hex[4], 16);
        b = parseInt(hex[5] + hex[6], 16);
      }
      return [r, g, b];
    };
  
    // Darken RGB
    const darkenRgb = (r: number, g: number, b: number, amount: number) => {
      return [
        clamp(r - (r * amount) / 100),
        clamp(g - (g * amount) / 100),
        clamp(b - (b * amount) / 100),
      ];
    };
  
    // Convert RGB to HEX
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + [r, g, b].map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join("");
    };
  
    // Check if color is HEX or RGB and parse it
    let r, g, b;
    if (color.startsWith("#")) {
      [r, g, b] = hexToRgb(color);
    } else if (color.startsWith("rgb")) {
      [r, g, b] = color.match(/\d+/g).map(Number);
    } else {
      throw new Error("Unsupported color format");
    }
  
    // Darken color
    [r, g, b] = darkenRgb(r, g, b, darkenBy);
  
    // Return color in the same format as input
    if (color.startsWith("#")) {
      return rgbToHex(r, g, b);
    } else if (color.startsWith("rgb")) {
      return `rgb(${r}, ${g}, ${b})`;
    }
  }