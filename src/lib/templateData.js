import kerala from "../assets/kerala.jpg";
import goa from "../assets/goa_beach.jpg"; 
import manaliImg from "../assets/manali.jpg";
import rajasthan from "../assets/rajasthan.jpg";
import tirupati from "../assets/tirupati.jpg";
import temple1 from "../assets/temple1.jpg";
import temple2 from "../assets/temple2.jpg";
import ladakh from "../assets/ladakh.jpg";
import andaman from "../assets/andman.jpg";
import kashmir from "../assets/kashmir.jpg";
import kashmir1 from "../assets/kashmir1.jpg";

const ACCENT = "#FF7A00";

export const KASHMIR_V5 = {
  id: "kashmir-v5-premium",
  x: 100,
  y: 200,
  name: "Kashmir Luxury Escape",
  category: "mountains",
  version: "v5",
  config: {
    canvas: {
      width: 800,
      height: 1000,
      background: {
        image: kashmir1,
        overlay:
          "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.85))"
      }
    },
    elements: [

      // Top Tagline
      {
        type: "text",
        content: "EXCLUSIVE WINTER OFFER",
        position: { x: 200, y: 80 },
        style: {
          color: "#ffffff",
          fontSize: 20,
          letterSpacing: "4px",
          fontWeight: "600",
          textAlign: "center"
        }
      },

      // Big Title
      {
        type: "text",
        content: "KASHMIR",
        position: { x: 140, y: 120 },
        style: {
          color: ACCENT,
          fontSize: 110,
          fontWeight: "900",
          textAlign: "center"
        }
      },

      // Subtitle
      {
        type: "text",
        content: "Heaven on Earth",
        position: { x: 260, y: 240 },
        style: {
          color: "#ffffff",
          fontSize: 30,
          fontStyle: "italic"
        }
      },

      // Glass Info Card
      {
        type: "text",
        content:
          "✔ 4 Nights / 5 Days\n✔ Gulmarg Snow Experience\n✔ Dal Lake Shikara Ride\n✔ Premium Stay & Meals Included",
        position: { x: 100, y: 350 },
        size: { width: 600, height: 200 },
        style: {
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
          color: "#ffffff",
          fontSize: 22,
          fontWeight: "500",
          borderRadius: "20px",
          textAlign: "left",
          padding: "30px"
        }
      },

      // Price Label
      {
        type: "text",
        content: "STARTING AT",
        position: { x: 300, y: 600 },
        style: {
          fontSize: 18,
          letterSpacing: "3px",
          color: "#cccccc"
        }
      },

      // Price
      {
        type: "text",
        content: "₹21,499 / PERSON",
        position: { x: 200, y: 630 },
        style: {
          fontSize: 48,
          fontWeight: "bold",
          color: ACCENT
        }
      },

      // CTA Button (Gradient for Premium Feel)
      {
        type: "button",
        content: "BOOK YOUR DREAM TRIP",
        position: { x: 200, y: 750 },
        size: { width: 400, height: 75 },
        style: {
          background:
            "linear-gradient(135deg, #00B894, #019875)",
          color: "#ffffff",
          borderRadius: "50px",
          fontSize: 22,
          fontWeight: "bold",
          boxShadow: "0 8px 25px rgba(0,184,148,0.4)"
        }
      },

      // Footer Website
      {
        type: "text",
        content: "www.yourtravelagency.com",
        position: { x: 230, y: 880 },
        style: {
          fontSize: 18,
          color: "#ffffff",
          letterSpacing: "2px",
          opacity: 0.8
        }
      }

    ]
  }
};

export const KASHMIR_POSTER = {
  id: "kashmir-008",
  name: "Kashmir Winter Escape",
  category: "mountains",
  version: "v2", // IMPORTANT: Must be v2
  thumbnail: kashmir,
  config: {
    background: kashmir,
    size: { width: 1080, height: 1080 },
    elements: [

      // Dark overlay for readability
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(0,0,0,0.5)",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080
      },

      // Top small tagline
      {
        type: "text",
        content: "HEAVEN ON EARTH",
        color: "#ffffff",
        fontSize: 30,
        x: 80,
        y: 90
      },

      // Main Title
      {
        type: "text",
        content: "KASHMIR",
        color: "#4dd0e1",
        fontSize: 120,
        bold: true,
        x: 80,
        y: 140
      },

      // Subtitle
      {
        type: "text",
        content: "4 Nights / 5 Days Scenic Escape",
        color: "#ffffff",
        fontSize: 30,
        bold: true,
        x: 80,
        y: 280
      },

      // Feature Box
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: "25px",
        x: 80,
        y: 420,
        width: 800,
        height: 250
      },

      {
        type: "text",
        content:
          "• Srinagar Houseboat Stay\n" +
          "• Gulmarg Snow Adventure\n" +
          "• Pahalgam Valley Visit\n" +
          "• Shikara Ride Included\n" +
          "• Breakfast & Dinner",
        color: "#ffffff",
        fontSize: 26,
        x: 110,
        y: 450,
        width: 750,
        height: 220
      },

      // Price Section
      {
        type: "text",
        content: "Starting From",
        color: "#ffffff",
        fontSize: 26,
        x: 80,
        y: 780
      },

      {
        type: "text",
        content: "₹21,499/-",
        color: "#4dd0e1",
        fontSize: 75,
        bold: true,
        x: 80,
        y: 810
      },

      // Book Now Button
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#4dd0e1",
        borderRadius: "40px",
        x: 650,
        y: 840,
        width: 300,
        height: 90
      },

      {
        type: "text",
        content: "BOOK NOW",
        color: "#000000",
        fontSize: 32,
        bold: true,
        x: 650,
        y: 865,
        width: 300,
        height: 90,
        textAlign: "center"
      }

    ]
  }
};

export const ANDAMAN_POSTER = {
  id: "andaman-007",
  name: "Andaman Island Escape",
  category: "beach",
  version: "v2",
  thumbnail: andaman,
  config: {
    background: andaman,
    size: { width: 1080, height: 1080 },
    elements: [

      // Soft Dark Overlay
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(0,0,0,0.45)",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080
      },

      // Top Tagline
      {
        type: "text",
        content: "DISCOVER PARADISE",
        color: "#ffffff",
        fontSize: 30,
        x: 80,
        y: 90
      },

      // Main Title
      {
        type: "text",
        content: "ANDAMAN",
        color: "#00fff7",
        fontSize: 110,
        bold: true,
        x: 80,
        y: 130
      },

      {
        type: "text",
        content: "Tropical Island Escape",
        color: "#ffffff",
        fontSize: 32,
        bold: true,
        x: 80,
        y: 260
      },

      // Offer Badge
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#00fff7",
        borderRadius: "50px",
        x: 780,
        y: 100,
        width: 220,
        height: 70
      },

      {
        type: "text",
        content: "FLAT 25% OFF",
        color: "#000000",
        fontSize: 24,
        bold: true,
        x: 780,
        y: 100,
        width: 220,
        height: 70,
        textAlign: "center"
      },

      // Glass Info Card
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(255,255,255,0.15)",
        borderRadius: "25px",
        x: 80,
        y: 420,
        width: 750,
        height: 300
      },

      {
        type: "text",
        content:
          "• Port Blair Sightseeing\n" +
          "• Havelock Island Stay\n" +
          "• Radhanagar Beach Visit\n" +
          "• Water Sports Activities\n" +
          "• 3★ Resort + Breakfast",
        color: "#ffffff",
        fontSize: 26,
        x: 110,
        y: 460,
        width: 700,
        height: 250
      },

      // Price Label
      {
        type: "text",
        content: "Starting From",
        color: "#ffffff",
        fontSize: 28,
        x: 80,
        y: 800
      },

      {
        type: "text",
        content: "₹24,999/-",
        color: "#00fff7",
        fontSize: 80,
        bold: true,
        x: 80,
        y: 830
      },

      // Book Now Button
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#00fff7",
        borderRadius: "30px",
        x: 650,
        y: 870,
        width: 330,
        height: 90
      },

      {
        type: "text",
        content: "🌊 BOOK NOW",
        color: "#000000",
        fontSize: 30,
        bold: true,
        x: 670,
        y: 870,
        width: 300,
        height: 90,
        textAlign: "center"
      },

      // Bottom Contact Strip
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#000000",
        x: 0,
        y: 980,
        width: 1080,
        height: 100
      },

      {
        type: "text",
        content: "travelagency@gmail.com  |  www.travelagency.com",
        color: "#ffffff",
        fontSize: 20,
        x: 80,
        y: 1015
      }

    ]
  }
};

export const LADAKH_POSTER = {
  id: "ladakh-006",
  name: "Ladakh Extreme Adventure",
  category: "mountains",
  version: "v2",
  thumbnail: ladakh,
  config: {
    background: ladakh,
    size: { width: 1080, height: 1080 },
    elements: [

      // Dark Gradient Overlay
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(0,0,0,0.55)",
        x: 0,
        y: 0,
        width: 1080,
        height: 1080
      },

      // Top Small Tag
      {
        type: "text",
        content: "EXPERIENCE THE THRILL",
        color: "#ffffff",
        fontSize: 28,
        bold: false,
        x: 80,
        y: 90
      },

      // Main Title
      {
        type: "text",
        content: "LADAKH",
        color: "#00eaff",
        fontSize: 120,
        bold: true,
        x: 80,
        y: 140
      },

      {
        type: "text",
        content: "ULTIMATE BIKE & MOUNTAIN TOUR",
        color: "#ffffff",
        fontSize: 32,
        bold: true,
        x: 80,
        y: 280
      },

      // Discount Badge
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#00eaff",
        borderRadius: "50px",
        x: 760,
        y: 90,
        width: 240,
        height: 80
      },

      {
        type: "text",
        content: "FLAT 30% OFF",
        color: "#000000",
        fontSize: 26,
        bold: true,
        x: 760,
        y: 95,
        width: 240,
        height: 80,
        textAlign: "center"
      },

      // Info Box
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "rgba(0,0,0,0.65)",
        borderRadius: "25px",
        x: 80,
        y: 420,
        width: 650,
        height: 330
      },

      {
        type: "text",
        content:
          "• Leh City Exploration\n" +
          "• Pangong Lake Visit\n" +
          "• Nubra Valley Safari\n" +
          "• Khardung La Pass\n" +
          "• 3★ Hotel Stay\n" +
          "• Breakfast & Dinner Included",
        color: "#ffffff",
        fontSize: 24,
        bold: false,
        x: 110,
        y: 460,
        width: 600,
        height: 260
      },

      // Price Section
      {
        type: "text",
        content: "Starting From",
        color: "#ffffff",
        fontSize: 28,
        bold: false,
        x: 80,
        y: 820
      },

      {
        type: "text",
        content: "₹28,999/-",
        color: "#00eaff",
        fontSize: 80,
        bold: true,
        x: 80,
        y: 850
      },

      // Book Now Button
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#00eaff",
        borderRadius: "25px",
        x: 700,
        y: 870,
        width: 300,
        height: 90
      },

      {
        type: "text",
        content: "📞 BOOK NOW",
        color: "#000000",
        fontSize: 30,
        bold: true,
        x: 690,
        y: 870,
        width: 300,
        height: 90,
        textAlign: "center"
      },

      // Bottom Strip
      {
        type: "shape",
        shape: "rectangle",
        backgroundColor: "#000000",
        x: 0,
        y: 980,
        width: 1080,
        height: 100
      },

      {
        type: "text",
        content: "travelagency@gmail.com  |  www.travelagency.com",
        color: "#ffffff",
        fontSize: 20,
        bold: false,
        x: 80,
        y: 1015
      }
    ]
  }
};
export const TEMPLE_POSTER = {
  id: "temple-005",
  name: "South Indian Temple Tour",
  category: "religious",
  version: "v4", 
  thumbnail: tirupati,
  config: {
    poster: {
      size: { width: "800px", height: "950px" },
      background: { image: tirupati, overlayColor: "rgba(0,0,0,0.55)" },
      content: {
        exclusive: { 
          text: "EXCLUSIVE", 
          color: "#ffd700", 
          fontSize: "26px", 
          letterSpacing: "3px", 
          fontWeight: "700" 
        },
        title: { 
          text: "South Indian Temple Tour", 
          fontFamily: "Great Vibes", 
          fontSize: "70px", 
          fontWeight: "700", 
          color: "white" 
        },
        subtitle: { 
          text: "Tirupati Balaji & Divine Temple Experience", 
          fontSize: "22px", 
          fontWeight: "700" 
        },
        circleImages: [
          { src: temple1, size: "200px", border: "5px solid white", shape: "circle" },
          { src: temple2, size: "200px", border: "5px solid white", shape: "circle" }
        ],
        packages: {
          background: "rgba(255,255,255,0.15)",
          blurEffect: "6px",
          borderRadius: "15px",
          fontSize: "18px",
          fontWeight: "700",
          items: [
            "VIP Darshan & Special Seva",
            "Accommodation & Meals Included",
            "Local Temple & Cultural Visit"
          ]
        },
        contactInfo: { phone: "+91 98765 43210", email: "info@templetours.com" },
        bookButton: { 
          text: "BOOK NOW", 
          backgroundColor: "#ff5722", 
          fontSize: "20px", 
          fontWeight: "700", 
          borderRadius: "12px" 
        },
        website: { 
          text: "www.templetours.com", 
          fontSize: "17px", 
          fontWeight: "700" 
        }
      }
    }
  }
};

export const MANALI_POSTER = {
  id: "manali-003",
  name: "Manali Adventure Escape",
  category: "mountains",
  version: "v3", 
  thumbnail: manaliImg,
  config: {
    canvas: {
      width: 1080,
      height: 1080,
      background: {
        type: "image",
        value: manaliImg,
        position: "center",
        size: "cover",
        repeat: "no-repeat"
      },
      fontFamily: "Arial, sans-serif"
    },
    elements: [
      {
        type: "overlay",
        position: { left: 0, top: 0 },
        size: { width: 1080, height: 1080 },
        style: { background: "rgba(0,0,10,0.10)" }
      },
      {
        type: "text",
        content: "EXPERIENCE",
        position: { left: 80, top: 90 },
        style: { color: "#ffffff", fontSize: 34 }
      },
      {
        type: "text",
        content: "MANALI ADVENTURE",
        position: { left: 80, top: 140 },
        style: { color: "#00d4ff", fontSize: 88, fontWeight: "bold" }
      },
      {
        type: "text",
        content: "5 Days & 4 Nights Mountain Escape",
        position: { left: 80, top: 260 },
        style: { color: "#ffffff", fontSize: 30, fontWeight: "bold" }
      },
      {
        type: "shape",
        position: { right: 80, top: 90 },
        size: { width: 260, height: 100 },
        style: { background: "rgba(0,212,255,0.95)", borderRadius: 60 }
      },
      {
        type: "text",
        content: "FLAT 30% OFF",
        position: { right: 80, top: 120 },
        size: { width: 260 },
        style: { color: "#000000", fontSize: 26, fontWeight: "bold", textAlign: "center" }
      },
      {
        type: "shape",
        position: { left: 80, top: 400 },
        size: { width: 620, height: 330 },
        style: { background: "rgba(0,0,0,0.65)", borderRadius: 25 }
      },
      {
        type: "text",
        content: "Adventure Highlights:",
        position: { left: 110, top: 430 },
        style: { color: "#00d4ff", fontSize: 28, fontWeight: "bold" }
      },
      {
        type: "text",
        content: "• Solang Valley Snow Activities\n• Rohtang Pass Excursion\n• River Rafting in Beas\n• Mall Road Local Shopping\n• 3-Star Mountain View Hotel\n• Daily Breakfast & Dinner",
        position: { left: 110, top: 490 },
        size: { width: 580 },
        style: { color: "#ffffff", fontSize: 22, whiteSpace: "pre-line" }
      },
      {
        type: "text",
        content: "Starting From",
        position: { left: 80, top: 770 },
        style: { color: "#ffffff", fontSize: 26 }
      },
      {
        type: "text",
        content: "₹18,499/-",
        position: { left: 80, top: 810 },
        style: { color: "#00d4ff", fontSize: 72, fontWeight: "bold" }
      },
      {
        type: "shape",
        position: { right: 80, top: 830 },
        size: { width: 320, height: 90 },
        style: { background: "#00d4ff", borderRadius: 25 }
      },
      {
        type: "text",
        content: "📞 BOOK NOW",
        position: { right: 80, top: 860 },
        size: { width: 320 },
        style: { color: "#000000", fontSize: 30, fontWeight: "bold", textAlign: "center" }
      },
      {
        type: "shape",
        position: { bottom: 0 },
        size: { width: 1080, height: 110 },
        style: { background: "#000000" }
      },
      {
        type: "text",
        content: "📧 travelagency@gmail.com  |  🌐 www.travelagency.com",
        position: { left: 80, bottom: 40 },
        style: { color: "#ffffff", fontSize: 20 }
      }
    ]
  }
};

export const KERALA_POSTER = {
  id: "kerala-001",
  name: "Kerala Backwaters Luxury",
  category: "poster",
  version: "v1",
  thumbnail: kerala,
  config: {
    poster: {
      size: { width: 800, height: 950 }, // Portrait height to fix black bar
      background: { 
        image: kerala, 
        overlayColor: "rgba(0,0,0,0.3)" 
      },
      content: {
        title: { 
          text: "Kerala", 
          fontFamily: "Great Vibes", 
          fontSize: "120px", 
          fontWeight: "400", 
          color: "white" 
        },
        subtitle: { 
          text: "THIS AUGUST", 
          letterSpacing: "8px", 
          fontWeight: "600",
          fontSize: "24px"
        },
        tagline: { 
          text: "Experience mesmerizing backwater of Kerala", 
          fontSize: "22px" 
        },
        priceSection: { 
          label: "PRICES STARTED FROM",
          amount: "20,000", 
          perText: "per person",
          amountFontSize: "90px"
        },
        location: {
          name: "KUMARAKOM",
          description: "3 Days / 2 Nights luxury backwater getaway with houseboat stay and all meals included."
        },
        footer: { 
          website: "WWW.WEBSITE.COM" 
        }
      }
    }
  }
};

export const GOA_POSTER = {
  id: "goa-002",
  name: "Goa Beach Escape",
  category: "beach",
  version: "v2",
  thumbnail: goa,
  config: {
    background: goa,
    size: { width: 1080, height: 1080 },
    elements: [
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(0,0,0,0.15)", x: 0, y: 0, width: 1080, height: 1080 },
      { type: "text", content: "EXPLORE", color: "#ffffff", fontSize: 34, bold: false, x: 80, y: 80 },
      { type: "text", content: "GOA BEACH ESCAPE", color: "#00e5ff", fontSize: 90, bold: true, x: 80, y: 130 },
      { type: "text", content: "4 Days & 3 Nights Coastal Getaway", color: "#ffffff", fontSize: 30, bold: true, x: 80, y: 260 },
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(0,229,255,0.95)", borderRadius: "60px", x: 740, y: 80, width: 260, height: 100 },
      { type: "text", content: "SAVE 25%", color: "#000000", fontSize: 26, bold: true, x: 740, y: 110, width: 260, height: 100, textAlign: "center" },
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(0,0,0,0.6)", borderRadius: "25px", x: 80, y: 400, width: 600, height: 320 },
      { type: "text", content: "Package Includes:", color: "#00e5ff", fontSize: 28, bold: true, x: 110, y: 430 },
      { type: "text", content: "• Calangute & Baga Beach Tour\n• Sunset Cruise Experience\n• Water Sports Activities\n• 3-Star Beach Resort Stay\n• Daily Breakfast Included\n• Free Airport Pickup & Drop", color: "#ffffff", fontSize: 22, bold: false, x: 110, y: 490, width: 550, height: 220 },
      { type: "text", content: "Starting From", color: "#ffffff", fontSize: 26, bold: false, x: 80, y: 770 },
      { type: "text", content: "₹14,999/-", color: "#00e5ff", fontSize: 70, bold: true, x: 80, y: 810 },
      { type: "shape", shape: "rectangle", backgroundColor: "#00e5ff", borderRadius: "25px", x: 680, y: 820, width: 320, height: 90 },
      { type: "text", content: "📞 BOOK NOW", color: "#000000", fontSize: 30, bold: true, x: 680, y: 850, width: 320, height: 90, textAlign: "center" },
      { type: "shape", shape: "rectangle", backgroundColor: "#000000", x: 0, y: 970, width: 1080, height: 110 },
      { type: "text", content: "📧 travelagency@gmail.com  |  🌐 www.travelagency.com", color: "#ffffff", fontSize: 20, bold: false, x: 80, y: 1010 }
    ]
  }
};
export const RAJASTHAN_POSTER = {
  id: "rajasthan-004",
  name: "Royal Rajasthan Heritage",
  category: "heritage",
  version: "v2", // Matches the Goa absolute positioning structure
  thumbnail: rajasthan,
  config: {
    background: rajasthan,
    size: { width: 1080, height: 1080 },
    elements: [
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(0,0,0,0.15)", x: 0, y: 0, width: 1080, height: 1080 },
      { type: "text", content: "DISCOVER", color: "#ffffff", fontSize: 32, bold: false, x: 80, y: 80 },
      { type: "text", content: "ROYAL RAJASTHAN", color: "#ffc107", fontSize: 90, bold: true, x: 80, y: 130 },
      { type: "text", content: "7 Days & 6 Nights Heritage Experience", color: "#ffffff", fontSize: 30, bold: true, x: 80, y: 250 },
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(255,193,7,0.95)", borderRadius: "60px", x: 740, y: 80, width: 260, height: 100 },
      { type: "text", content: "FLAT 20% OFF", color: "#000000", fontSize: 26, bold: true, x: 740, y: 110, width: 260, height: 100, textAlign: "center" },
      { type: "shape", shape: "rectangle", backgroundColor: "rgba(0,0,0,0.65)", borderRadius: "25px", x: 80, y: 380, width: 550, height: 300 },
      { type: "text", content: "Package Highlights:", color: "#ffc107", fontSize: 26, bold: true, x: 110, y: 410 },
      { type: "text", content: "• Jaipur Amber Fort & City Palace\n• Jaisalmer Desert Safari\n• Udaipur Lake Palace\n• Jodhpur Blue City Tour\n• Luxury 4-Star Hotel Stay\n• Complimentary Cultural Night", color: "#ffffff", fontSize: 22, bold: false, x: 110, y: 460, width: 500, height: 220 },
      { type: "text", content: "Starting From", color: "#ffffff", fontSize: 26, bold: false, x: 80, y: 720 },
      { type: "text", content: "₹39,999/-", color: "#ffc107", fontSize: 70, bold: true, x: 80, y: 760 },
      { type: "shape", shape: "rectangle", backgroundColor: "#ffc107", borderRadius: "20px", x: 700, y: 760, width: 300, height: 80 },
      { type: "text", content: "📞 BOOK NOW", color: "#000000", fontSize: 28, bold: true, x: 700, y: 785, width: 300, height: 80, textAlign: "center" },
      { type: "shape", shape: "rectangle", backgroundColor: "#000000", x: 0, y: 980, width: 1080, height: 100 },
      { type: "text", content: "📧 travelagency@gmail.com  |  🌐 www.travelagency.com", color: "#ffffff", fontSize: 20, bold: false, x: 80, y: 1015 }
    ]
  }
};

export const ALL_TEMPLATES = [
  KERALA_POSTER,
  GOA_POSTER,
  MANALI_POSTER,
  RAJASTHAN_POSTER,
  TEMPLE_POSTER,
  LADAKH_POSTER,
  ANDAMAN_POSTER,
  KASHMIR_POSTER,
  KASHMIR_V5
];