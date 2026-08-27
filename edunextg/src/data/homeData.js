import {
  FaGraduationCap,
  FaBuilding,
  FaBriefcase,
  FaHeadset,
  FaDesktop,
  FaServer,
  FaGlobe,
  FaVideo,
  FaNetworkWired,
  FaLaptop,
} from "react-icons/fa";

import { MdTv } from "react-icons/md";

import completeSolutions from "../assets/completeSolutions.jpeg";
import customizedApproach from "../assets/customizedApproach.jpeg";
import experiencedTeam from "../assets/experiencedTeam.jpeg";
import reliableSupport from "../assets/reliableSupport.jpeg";

import insta from "../assets/insta.jpeg";
import linkedin from "../assets/linkedin.jpeg";
import twitter from "../assets/twitter.jpeg";
import whatsapp from "../assets/whatsapp.jpeg";
import youtube from "../assets/youtube.jpeg";


/* =========================================================
   STATS
========================================================= */

export const stats = [
  {
    value: "10+",
    label: "Years of Experience",
    icon: FaGraduationCap,
  },
  {
    value: "500+",
    label: "Institutions Served",
    icon: FaBuilding,
  },
  {
    value: "1000+",
    label: "Projects Delivered",
    icon: FaBriefcase,
  },
  {
    value: "24/7",
    label: "Support & AMC",
    icon: FaHeadset,
  },
];


/* =========================================================
   SOLUTIONS
========================================================= */

export const solutions = [
  {
    title: "Software Solutions",
    description:
      "School ERP, College ERP, Website Development and Custom Software solutions.",
    icon: FaDesktop,
  },
  {
    title: "Hardware Solutions",
    description:
      "Interactive Panels, Digital Kiosks, CCTV, Networking, Computer Labs and more.",
    icon: FaServer,
  },
  {
    title: "IT Services & Support",
    description:
      "AMC, Installation, Maintenance and technical support for IT infrastructure.",
    icon: FaHeadset,
  },
];


/* =========================================================
   CORE SERVICES
========================================================= */

export const coreServices = [
  {
    title: "School & College ERP",
    description: "Complete ERP solution for institutions.",
    icon: FaLaptop,
  },
  {
    title: "Website Development",
    description: "Modern, responsive and SEO-friendly websites.",
    icon: FaGlobe,
  },
  {
    title: "Interactive Panel",
    description: "Smart classroom displays for engaging learning.",
    icon: MdTv,
  },
  {
    title: "CCTV & Surveillance",
    description: "Advanced security solutions for a safe environment.",
    icon: FaVideo,
  },
  {
    title: "Networking Solutions",
    description: "Reliable networking and IT infrastructure setup.",
    icon: FaNetworkWired,
  },
  {
    title: "AMC & IT Support",
    description: "Preventive maintenance and technical support.",
    icon: FaHeadset,
  },
];


/* =========================================================
   WHY CHOOSE US
========================================================= */

export const whyChooseUs = [
  {
    title: "Complete Solutions",
    description:
      "From software to hardware and support, everything under one roof.",
    image: completeSolutions,
  },
  {
    title: "Customized Approach",
    description:
      "Tailored solutions based on the unique needs of every institution.",
    image: customizedApproach,
  },
  {
    title: "Reliable Support",
    description:
      "Installation, training and ongoing support you can always count on.",
    image: reliableSupport,
  },
  {
    title: "Experienced Team",
    description:
      "Skilled professionals with years of experience in the education sector.",
    image: experiencedTeam,
  },
];


/* =========================================================
   SOCIAL LINKS
========================================================= */

export const socialLinks = [
  {
    name: "Twitter",
    image: twitter,
    url: "#twitter",
  },
  {
    name: "YouTube",
    image: youtube,
    url: "#youtube",
  },
  {
    name: "LinkedIn",
    image: linkedin,
    url: "#linkedin",
  },
  {
    name: "WhatsApp",
    image: whatsapp,
    url: "#whatsapp",
  },
  {
    name: "Instagram",
    image: insta,
    url: "#instagram",
  },
];