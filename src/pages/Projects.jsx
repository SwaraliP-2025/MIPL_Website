import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { ProfessionalNetworkBackground, SubtleNetworkBackground } from "@/components/ProfessionalNetworkBackground";
import { ArrowUpRight, Building2, Landmark, Factory, CreditCard } from "lucide-react";

const categories = [
  { id: "all", label: "All Projects", icon: null },
  { id: "smart-city", label: "Smart & Safe City", icon: Building2 },
  { id: "industrial", label: "Industrial & Energy", icon: Factory },
  { id: "government", label: "Government & Institutional", icon: Landmark },
  { id: "enterprise", label: "Enterprise & Banking", icon: CreditCard },
];

const projects = [
  {
    id: 1,
    title: "Aurangabad Smart City",
    category: "smart-city",
    client: "Aurangabad Smart City Development Corporation Limited",
    challenge: "Comprehensive smart city infrastructure with integrated security, traffic management, and citizen services.",
    solution: "End-to-end smart city solution with command & control center, city-wide surveillance, and integrated services.",
    result: "Successfully deployed smart city infrastructure enhancing urban management and citizen services.",
    image: "public/projects/0148.png",
  },
  {
    id: 2,
    title: "Integrated Security Management System",
    category: "industrial",
    client: "Nayara Energy (formerly Essar Oil), Jamanagar",
    challenge: "Comprehensive security management for one of India's largest refineries with complex infrastructure.",
    solution: "Integrated security solution with CCTV, access control, perimeter security, and command & control systems.",
    result: "Enhanced security posture with real-time monitoring and incident management capabilities.",
    image: "projects/Nayara.jpg",
  },
  {
    id: 3,
    title: "Surveillance at all district and tehsil courts of Madhya Pradesh",
    category: "government",
    client: "Hon High Court of Madhya Pradesh, Jabalpur",
    challenge: "Surveillance systems for all district courts across Madhya Pradesh as per Supreme Court mandate.",
    solution: "Centralized surveillance architecture with video management systems deployed across multiple court locations.",
    result: "Comprehensive security coverage for judicial infrastructure with centralized monitoring.",
    image: "projects/MP_HIGH_COURT_JABALPUR_-_panoramio.jpg",
  },
  {
    id: 4,
    title: "Integrated security & surveillance system",
    category: "industrial",
    client: "MRPL, Mangalore Refinery",
    challenge: "Securing a large-scale refinery with high-risk operational zones and critical assets.",
    solution: "End-to-end integrated security and surveillance system covering perimeter protection, access control, and centralized monitoring.",
    result: "Improved operational safety, threat detection, and centralized security management.",
    image: "projects/Hydrocracker_Units.jpg",
  },
  {
    id: 5,
    title: "Integrated security & surveillance system",
    category: "industrial",
    client: "HPCL — Mumbai Refinery",
    challenge: "Modernization of security infrastructure for critical petroleum facility.",
    solution: "Integrated security management system with advanced CCTV, access control, and analytics.",
    result: "Enhanced security with improved incident response and compliance with safety regulations.",
    image: "projects/hpclmum.jpg",
  },
  {
    id: 6,
    title: "Security consultancy for physical & electronic security",
    category: "enterprise",
    client: "Surat Diamond Bourse",
    challenge: "High-security infrastructure for world's largest diamond trading center.",
    solution: "Multi-layered security with biometric access, CCTV surveillance, and intrusion detection systems.",
    result: "World-class security infrastructure protecting high-value assets and ensuring business continuity.",
    image: "projects/suratdiam.jpg",
  },
  {
    id: 7,
    title: "Security consultancy for ELV & Communication",
    category: "industrial",
    client: "IOCL Bio-refinery (Through Praj)",
    challenge: "Designing ELV and communication systems for a next-generation bio-refinery.",
    solution: "Security consultancy for ELV systems including surveillance, networking, and communication infrastructure.",
    result: "Reliable and scalable security architecture aligned with refinery operations.",
    image: "projects/iocl.jpg",
  },
  {
    id: 8,
    title: "Access Control & Security Systems",
    category: "enterprise",
    client: "BNP Paribas",
    challenge: "Ensuring secure access and compliance for a global banking environment.",
    solution: "Advanced access control and integrated security systems across facilities.",
    result: "Enhanced physical security and regulatory compliance.",
    image: "projects/bnppari.jpg",
  },
  {
    id: 9,
    title: "Integrated Security Management System with C4I",
    category: "industrial",
    client: "Privi Organics",
    challenge: "Managing security across a chemical manufacturing facility.",
    solution: "Integrated Security Management System with C4I-based command and control.",
    result: "Centralized security operations and improved situational awareness.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&auto=format",
  },
  {
    id: 10,
    title: "Integrated Video Surveillance System (IVSS) for LPG Bottling Divisions",
    category: "industrial",
    client: "HPCL — LPG SBU",
    challenge: "Monitoring multiple LPG bottling plants with consistent security standards.",
    solution: "Integrated Video Surveillance System (IVSS) across HPCL LPG divisions.",
    result: "Uniform surveillance and improved safety compliance.",
    image: "https://images.unsplash.com/photo-1581091012184-5c3dca6a2a07?w=800&auto=format",
  },
  {
    id: 11,
    title: "Integrated Security Management Project",
    category: "enterprise",
    client: "Ganjam Jewellers",
    challenge: "Protecting high-value retail assets against theft and intrusion.",
    solution: "Integrated security with video surveillance, access control, and intrusion detection.",
    result: "Secure retail operations with enhanced customer confidence.",
    image: "projects/ganjam.jpg",
  },
  {
    id: 12,
    title: "City Surveillance System, Bharuch",
    category: "smart-city",
    client: "Gujarat Police",
    challenge: "Improving public safety through city-wide surveillance.",
    solution: "City surveillance system with centralized monitoring and analytics.",
    result: "Enhanced law enforcement capabilities and public safety.",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&auto=format",
  },
  {
    id: 13,
    title: "Integrated Port Management & Security System",
    category: "industrial",
    client: "Gujarat Maritime Board",
    challenge: "Securing port infrastructure and maritime operations.",
    solution: "Integrated Port Management and Security System.",
    result: "Improved port safety, monitoring, and operational efficiency.",
    image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&auto=format",
  },
  {
    id: 14,
    title: "Security Consultancy Services",
    category: "enterprise",
    client: "Hiranandani Group",
    challenge: "Comprehensive security planning for large real estate developments.",
    solution: "End-to-end security consultancy services.",
    result: "Well-planned, scalable, and future-ready security infrastructure.",
    image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format",
  },
  {
    id: 15,
    title: "Security Consultancy Services",
    category: "industrial",
    client: "Adani Power",
    challenge: "Securing large-scale power generation facilities.",
    solution: "Security consultancy covering risk assessment and system design.",
    result: "Improved asset protection and operational resilience.",
    image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format",
  },
  {
    id: 16,
    title: "IP-based Biometric Access Control System (iBACS)",
    category: "industrial",
    client: "HPCL",
    challenge: "Standardizing access control across nationwide facilities including refineries, LPG plants, pipelines, terminals, offices & lube depots.",
    solution: "Centralized biometric authentication system with integration to existing security infrastructure.",
    result: "Standardized access control across all HPCL locations with enhanced security and audit trails.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format",
  },
  {
    id: 17,
    title: "Pipeline Perimeter Intrusion Detection System",
    category: "industrial",
    client: "HPCL",
    challenge: "Protecting long-distance pipelines from intrusion and sabotage.",
    solution: "Advanced perimeter intrusion detection systems.",
    result: "Early threat detection and reduced operational risk.",
    image: "https://images.unsplash.com/photo-1581092580497-4c5a2f1f6c5a?w=800&auto=format",
  },
  {
    id: 18,
    title: "Video Surveillance System",
    category: "smart-city",
    client: "Navi Mumbai Municipal Corporation",
    challenge: "Enhancing urban safety through technology.",
    solution: "City-wide video surveillance system.",
    result: "Improved monitoring and faster response to incidents.",
    image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&auto=format",
  },
  {
    id: 19,
    title: "Nanded Safe City Project",
    category: "smart-city",
    client: "Nanded Municipal Corporation, Maharashtra",
    challenge: "Strengthening city security infrastructure.",
    solution: "Integrated safe city surveillance and command center.",
    result: "Improved public safety and crime monitoring.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format",
  },
  {
    id: 20,
    title: "Electronic Locking Systems for Fuel Trucks",
    category: "industrial",
    client: "HPCL",
    challenge: "Preventing fuel theft during transportation.",
    solution: "Electronic locking systems for fuel trucks.",
    result: "Reduced pilferage and improved logistics security.",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format",
  },
  {
    id: 21,
    title: "CCTV Upgradation of O&D terminals",
    category: "industrial",
    client: "HPCL",
    challenge: "Upgrading legacy surveillance infrastructure.",
    solution: "Modern IP-based CCTV systems across terminals.",
    result: "Improved video quality and centralized monitoring.",
    image: "https://images.unsplash.com/photo-1581090700227-5a1f87f8c6dd?w=800&auto=format",
  },
  {
    id: 22,
    title: "Kolhapur Safe City Project",
    category: "smart-city",
    client: "Kolhapur Municipal Corporation, Maharashtra",
    challenge: "Enhancing safety across urban public spaces.",
    solution: "Integrated safe city surveillance infrastructure.",
    result: "Improved city security and crime prevention.",
    image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format",
  },
  {
    id: 23,
    title: "Amravati Safe City",
    category: "smart-city",
    client: "Amravati Municipal Corporation, Maharashtra",
    challenge: "City-wide public safety enhancement.",
    solution: "Safe city surveillance and monitoring system.",
    result: "Strengthened law enforcement and citizen safety.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format",
  },
  {
    id: 24,
    title: "Upgrading security at Vidhan Bhavan, Mumbai & Nagpur",
    category: "government",
    client: "Maharashtra Legislative Secretariat Maharashtra",
    challenge: "Securing critical government infrastructure.",
    solution: "Upgradation of security systems at Vidhan Bhavan, Mumbai and Nagpur.",
    result: "Enhanced protection for legislative premises.",
    image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&auto=format",
  },
  {
    id: 25,
    title: "Video Surveillance",
    category: "industrial",
    client: "Jawaharlal Nehru Port Trust (JNPT)",
    challenge: "Comprehensive security for India's largest container port with critical infrastructure.",
    solution: "Integrated port security solution with perimeter protection, access control, and surveillance.",
    result: "Enhanced port security meeting international standards with improved operational efficiency.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format",
  },
  {
    id: 26,
    title: "Gurgaon CCTV Project",
    category: "smart-city",
    client: "Gurgaon Municipal Corporation",
    challenge: "Urban surveillance for crime prevention.",
    solution: "City-wide CCTV surveillance system.",
    result: "Improved public safety and monitoring.",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&auto=format",
  },
  {
    id: 27,
    title: "Security & Fire Risk Analysis",
    category: "government",
    client: "Indian Institute of Management, Bangalore",
    challenge: "Assessing security and fire risks in a large academic campus.",
    solution: "Comprehensive security and fire risk analysis.",
    result: "Improved campus safety and compliance.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format",
  },
  {
    id: 28,
    title: "Godhra Safe City Project",
    category: "smart-city",
    client: "Gujarat Police",
    challenge: "State-wide safe city infrastructure with integrated security management.",
    solution: "Comprehensive safe city solution with surveillance, analytics, and emergency management systems.",
    result: "Enhanced public safety infrastructure in Godhra.",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&auto=format",
  },
  {
    id: 29,
    title: "Thane City Surveillance Control Room",
    category: "smart-city",
    client: "Thane Police, Maharashtra",
    challenge: "City-wide surveillance and emergency response system for public safety.",
    solution: "Integrated safe city platform with video surveillance, analytics, and command & control center.",
    result: "Improved public safety with real-time monitoring and faster emergency response times.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&auto=format",
  },
  {
    id: 30,
    title: "Aurangabad Safe City Project",
    category: "smart-city",
    client: "Aurangabad Municipal Corporation",
    challenge: "Implementing smart surveillance across the city.",
    solution: "Integrated safe city solution with centralized command center.",
    result: "Enhanced urban safety and surveillance efficiency.",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format",
  },
]
// const projects = [
//   {
//     id: 1,
//     title: "Aurangabad Smart City Development",
//     category: "smart-city",
//     client: "Aurangabad Smart City Development Corporation Limited",
//     challenge: "Comprehensive smart city infrastructure with integrated security, traffic management, and citizen services.",
//     solution: "End-to-end smart city solution with command & control center, city-wide surveillance, and integrated services.",
//     result: "Successfully deployed smart city infrastructure enhancing urban management and citizen services.",
//     image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format",
//   },
//   {
//     id: 2,
//     title: "Nayara Energy Refinery Security",
//     category: "industrial",
//     client: "Nayara Energy (formerly Essar Oil), Jamnagar",
//     challenge: "Comprehensive security management for one of India's largest refineries with complex infrastructure.",
//     solution: "Integrated security solution with CCTV, access control, perimeter security, and command & control systems.",
//     result: "Enhanced security posture with real-time monitoring and incident management capabilities.",
//     image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format",
//   },
//   {
//     id: 3,
//     title: "High Court of Madhya Pradesh - Court Surveillance",
//     category: "government",
//     client: "High Court of Madhya Pradesh, Jabalpur",
//     challenge: "Surveillance systems for all district courts across Madhya Pradesh as per Supreme Court mandate.",
//     solution: "Centralized surveillance architecture with video management systems deployed across multiple court locations.",
//     result: "Comprehensive security coverage for judicial infrastructure with centralized monitoring.",
//     image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format",
//   },
//   {
//     id: 4,
//     title: "HPCL Mumbai Refinery Security",
//     category: "industrial",
//     client: "HPCL Mumbai Refinery",
//     challenge: "Modernization of security infrastructure for critical petroleum facility.",
//     solution: "Integrated security management system with advanced CCTV, access control, and analytics.",
//     result: "Enhanced security with improved incident response and compliance with safety regulations.",
//     image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&auto=format",
//   },
//   {
//     id: 5,
//     title: "HPCL iBACS Biometric Project",
//     category: "industrial",
//     client: "HPCL - Pan India",
//     challenge: "Biometric access control system deployment across HPCL facilities nationwide.",
//     solution: "Centralized biometric authentication system with integration to existing security infrastructure.",
//     result: "Standardized access control across all HPCL locations with enhanced security and audit trails.",
//     image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&auto=format",
//   },
//   {
//     id: 6,
//     title: "Surat Diamond Bourse Security",
//     category: "industrial",
//     client: "Surat Diamond Bourse",
//     challenge: "High-security infrastructure for world's largest diamond trading center.",
//     solution: "Multi-layered security with biometric access, CCTV surveillance, and intrusion detection systems.",
//     result: "World-class security infrastructure protecting high-value assets and ensuring business continuity.",
//     image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format",
//   },
//   {
//     id: 7,
//     title: "JNPT Port Security",
//     category: "industrial",
//     client: "Jawaharlal Nehru Port Trust (JNPT)",
//     challenge: "Comprehensive security for India's largest container port with critical infrastructure.",
//     solution: "Integrated port security solution with perimeter protection, access control, and surveillance.",
//     result: "Enhanced port security meeting international standards with improved operational efficiency.",
//     image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&auto=format",
//   },
//   {
//     id: 8,
//     title: "Thane Safe City Project",
//     category: "smart-city",
//     client: "Thane Police",
//     challenge: "City-wide surveillance and emergency response system for public safety.",
//     solution: "Integrated safe city platform with video surveillance, analytics, and command & control center.",
//     result: "Improved public safety with real-time monitoring and faster emergency response times.",
//     image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format",
//   },
//   {
//     id: 9,
//     title: "Gujarat Safe City Initiative",
//     category: "smart-city",
//     client: "Gujarat Police",
//     challenge: "State-wide safe city infrastructure with integrated security management.",
//     solution: "Comprehensive safe city solution with surveillance, analytics, and emergency management systems.",
//     result: "Enhanced public safety infrastructure across multiple cities in Gujarat.",
//     image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format",
//   },
//   {
//     id: 10,
//     title: "Integrated Refinery Security System – MRPL",
//   category: "industrial-security",
//   client: "Mangalore Refinery and Petrochemicals Limited (MRPL)",
//   challenge: "Securing a large-scale refinery with high-risk operational zones and critical assets.",
//   solution: "End-to-end integrated security and surveillance system covering perimeter protection, access control, and centralized monitoring.",
//   result: "Improved operational safety, threat detection, and centralized security management.",
//   image: "https://images.unsplash.com/photo-1581091215367-59ab6c45cdbd?w=800&auto=format",
//   },
//   {
//     id: 11,
//     title: "IOCL Bio-Refinery ELV & Communication Consultancy",
//     category: "industrial-security",
//     client: "Indian Oil Corporation Limited (IOCL)",
//     challenge: "Designing ELV and communication systems for a next-generation bio-refinery.",
//     solution: "Security consultancy for ELV systems including surveillance, networking, and communication infrastructure.",
//     result: "Reliable and scalable security architecture aligned with refinery operations.",
//     image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format",
//   },
//   {
//     id: 12,
//     title: "BNP Paribas Access Control & Security Systems",
// category: "enterprise-security",
// client: "BNP Paribas",
// challenge: "Ensuring secure access and compliance for a global banking environment.",
// solution: "Advanced access control and integrated security systems across facilities.",
// result: "Enhanced physical security and regulatory compliance.",
// image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format",
//   },
//   {
//     id: 13,
//     title: "Privi Organics Integrated Security Management System",
// category: "industrial-security",
// client: "Privi Organics",
// challenge: "Managing security across a chemical manufacturing facility.",
// solution: "Integrated Security Management System with C4I-based command and control.",
// result: "Centralized security operations and improved situational awareness.",
// image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=800&auto=format",
//   },
//   {
//     id: 14,
//     title: "HPCL LPG Bottling Plants IVSS",
// category: "industrial-security",
// client: "Hindustan Petroleum Corporation Limited (HPCL)",
// challenge: "Monitoring multiple LPG bottling plants with consistent security standards.",
// solution: "Integrated Video Surveillance System (IVSS) across HPCL LPG divisions.",
// result: "Uniform surveillance and improved safety compliance.",
// image: "https://images.unsplash.com/photo-1581091012184-5c3dca6a2a07?w=800&auto=format",
//   },
//   {
//     id: 15,
//    title: "Ganjam Jewellers Integrated Security Project",
// category: "retail-security",
// client: "Ganjam Jewellers",
// challenge: "Protecting high-value retail assets against theft and intrusion.",
// solution: "Integrated security with video surveillance, access control, and intrusion detection.",
// result: "Secure retail operations with enhanced customer confidence.",
// image: "https://images.unsplash.com/photo-1602526219049-9e3df1c9c04c?w=800&auto=format",
//   },
//   {
//     id: 16,
//     title: "Bharuch City Surveillance System",
// category: "smart-city",
// client: "Gujarat Police",
// challenge: "Improving public safety through city-wide surveillance.",
// solution: "City surveillance system with centralized monitoring and analytics.",
// result: "Enhanced law enforcement capabilities and public safety.",
// image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=800&auto=format",
//   },
//   {
//     id: 17,
//     title: "Gujarat Port Security & Management System",
// category: "port-security",
// client: "Gujarat Maritime Board",
// challenge: "Securing port infrastructure and maritime operations.",
// solution: "Integrated Port Management and Security System.",
// result: "Improved port safety, monitoring, and operational efficiency.",
// image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&auto=format",
//   },
//   {
//     id: 18,
//     title: "Hiranandani Group Security Consultancy",
// category: "real-estate-security",
// client: "Hiranandani Group",
// challenge: "Comprehensive security planning for large real estate developments.",
// solution: "End-to-end security consultancy services.",
// result: "Well-planned, scalable, and future-ready security infrastructure.",
// image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&auto=format",
//   },
//   {
//     id: 19,
//     title: "Adani Power Security Consultancy",
// category: "industrial-security",
// client: "Adani Power",
// challenge: "Securing large-scale power generation facilities.",
// solution: "Security consultancy covering risk assessment and system design.",
// result: "Improved asset protection and operational resilience.",
// image: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?w=800&auto=format",
//   },
//   {
//     id: 20,
//     title: "HPCL Pan-India Biometric Access Control System",
// category: "enterprise-security",
// client: "Hindustan Petroleum Corporation Limited (HPCL)",
// challenge: "Standardizing access control across nationwide facilities.",
// solution: "IP-based Biometric Access Control System (iBACS) across all HPCL locations.",
// result: "Centralized identity management and enhanced security.",
// image: "https://images.unsplash.com/photo-1581091218777-7e5f0b02c5c3?w=800&auto=format",
//   },
//   {
//     id: 21,
//     title: "HPCL Pipeline Perimeter Intrusion Detection",
// category: "critical-infrastructure",
// client: "Hindustan Petroleum Corporation Limited (HPCL)",
// challenge: "Protecting long-distance pipelines from intrusion and sabotage.",
// solution: "Advanced perimeter intrusion detection systems.",
// result: "Early threat detection and reduced operational risk.",
// image: "https://images.unsplash.com/photo-1581092580497-4c5a2f1f6c5a?w=800&auto=format",
//   },
//   {
//     id: 22,
//     title: "Navi Mumbai City Surveillance System",
// category: "smart-city",
// client: "Navi Mumbai Municipal Corporation",
// challenge: "Enhancing urban safety through technology.",
// solution: "City-wide video surveillance system.",
// result: "Improved monitoring and faster response to incidents.",
// image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&auto=format",
//   },
//   {
//     id: 23,
//     title: "Nanded Safe City Project",
// category: "smart-city",
// client: "Nanded Municipal Corporation",
// challenge: "Strengthening city security infrastructure.",
// solution: "Integrated safe city surveillance and command center.",
// result: "Improved public safety and crime monitoring.",
// image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format",
//   },
//   {
//     id: 24,
//     title: "HPCL Electronic Locking for Fuel Trucks",
// category: "logistics-security",
// client: "Hindustan Petroleum Corporation Limited (HPCL)",
// challenge: "Preventing fuel theft during transportation.",
// solution: "Electronic locking systems for fuel trucks.",
// result: "Reduced pilferage and improved logistics security.",
// image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&auto=format",
//   },
//   {
//     id: 25,
//     title: "HPCL CCTV Upgradation for Terminals",
// category: "industrial-security",
// client: "Hindustan Petroleum Corporation Limited (HPCL)",
// challenge: "Upgrading legacy surveillance infrastructure.",
// solution: "Modern IP-based CCTV systems across terminals.",
// result: "Improved video quality and centralized monitoring.",
// image: "https://images.unsplash.com/photo-1581090700227-5a1f87f8c6dd?w=800&auto=format",
//   },
//   {
//     id: 26,
//     title: "Kolhapur Safe City Project",
// category: "smart-city",
// client: "Kolhapur Municipal Corporation",
// challenge: "Enhancing safety across urban public spaces.",
// solution: "Integrated safe city surveillance infrastructure.",
// result: "Improved city security and crime prevention.",
// image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&auto=format",
//   },
//   {
//     id: 27,
//     title: "Amravati Safe City Project",
// category: "smart-city",
// client: "Amravati Municipal Corporation",
// challenge: "City-wide public safety enhancement.",
// solution: "Safe city surveillance and monitoring system.",
// result: "Strengthened law enforcement and citizen safety.",
// image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format",
//   },
//   {
//     id: 28,
//     title: "Vidhan Bhavan Security Upgradation",
// category: "government-security",
// client: "Maharashtra Legislative Secretariat",
// challenge: "Securing critical government infrastructure.",
// solution: "Upgradation of security systems at Vidhan Bhavan, Mumbai and Nagpur.",
// result: "Enhanced protection for legislative premises.",
// image: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?w=800&auto=format",
//   },
//   {
//     id: 29,
//     title: "JNPT Port Surveillance System",
// category: "port-security",
// client: "Jawaharlal Nehru Port Trust (JNPT)",
// challenge: "Monitoring high-traffic port operations.",
// solution: "Comprehensive video surveillance system.",
// result: "Improved port security and operational visibility.",
// image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?w=800&auto=format",
//   },
//   {
//     id: 30,
//     title: "Gurgaon CCTV Surveillance Project",
// category: "smart-city",
// client: "Gurgaon Municipal Corporation",
// challenge: "Urban surveillance for crime prevention.",
// solution: "City-wide CCTV surveillance system.",
// result: "Improved public safety and monitoring.",
// image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800&auto=format",
//   },
//   {
//     id: 31,
//     title: "Aurangabad Safe City Project",
// category: "smart-city",
// client: "Aurangabad Municipal Corporation",
// challenge: "Implementing smart surveillance across the city.",
// solution: "Integrated safe city solution with centralized command center.",
// result: "Enhanced urban safety and surveillance efficiency.",
// image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&auto=format",
//   },
//   {
//     id: 32,
// title: "IIM Bangalore Security & Fire Risk Analysis",
// category: "institutional-security",
// client: "Indian Institute of Management Bangalore (IIMB)",
// challenge: "Assessing security and fire risks in a large academic campus.",
// solution: "Comprehensive security and fire risk analysis.",
// result: "Improved campus safety and compliance.",
// image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format",
//   },
// ];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === "all"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <ProfessionalNetworkBackground density="high" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-primary font-medium mb-4 block">Our Work</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Our Clients
            </h1>
            <p className="text-xl text-muted-foreground">
              MIPL can design and deliver security projects in a wide variety of domains including 
              safe cities, shopping malls, commercial establishments, petroleum establishments, ports, 
              airports and industrial environments. Each of these segments needs a unique approach to 
              security, which the MIPL team is able to offer through the significant risk experience 
              of our team members.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industry Domains */}
      <section className="py-24 relative overflow-hidden bg-card/30">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Industries We Serve
            </h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              We serve a variety of businesses & industries with tailored security solutions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                iconImage: "pet.png",  
                title: "Petroleum Establishments",
                description: "Oil & gas refineries, pipelines, distribution terminals and retail outlets have long been under the radar of miscreants as high visibility targets. The MIPL team has been involved with some of the most innovative security projects in this sector, which have tackled security threats in some of the most volatile environments in the world.",
              },
              {
                iconImage: "smartsafecity.png",  
                title: "Smart and Safe City Projects",
                description: "Safe City projects are a culmination of integrated security design that is based on several security technologies such as video surveillance & analytics, traffic management, emergency response, vehicle tracking and command & control. MIPL can work with city councils to design and implement Safe City Projects that are take into consideration local risks and security needs.",
              },
              {
                iconImage: "bankatm.png", 
                title: "Banks & ATMs",
                description: "Incidents of theft and robberies at Banks and ATMs are on the rise – resulting in grievous injuries to the victims. MIPL can provide uniquely tailored security solutions that are able to offer real-time and actionable analytics for efficient and speedy incident response. ATMs are vulnerable and need to be protected through application of security technology, complemented by manpower.",
              },
              {
                iconImage: "large.png",  
                title: "Large Premises",
                description: "Large premises such as courts, educational institutes, government buildings and commercial parks are areas of mass congregations and for the very reason, become attractive targets for miscreants and anti-social elements. Security has to be built into design in such places since it should be not only effective but also unobtrusive. MIPL can work out solutions that are sustainable and yet do not compromise the aesthetics of shopping malls.",
              },
              {
                iconImage: "naval.png",  
                title: "Naval Ports",
                description: "Critical infrastructure such as ports and airports are national symbols of enterprise and innovation. Not only are they high value, an act of destruction in such places can have disastrous consequences for the national economy. Hence, security considerations in such important locations play a major role in attracting traffic and tourism.",
              },
              {
                iconImage: "air.png",  
                title: "Airports",
                description: "Critical infrastructure such as ports and airports are national symbols of enterprise and innovation. Not only are they high value, an act of destruction in such places can have disastrous consequences for the national economy. Hence, security considerations in such important locations play a major role in attracting traffic and tourism.",
              },
            ].map((industry, index) => (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:glow-border transition-all"
              >
                {/* Icon Image */}
                <div className="mb-4 flex justify-center">
                  <div className="p-4 rounded-xl bg-white/5">
                    <img 
                      src={industry.iconImage} 
                      alt={`${industry.title} icon`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 text-primary text-center">{industry.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  {industry.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="py-8 border-b border-white/10 glass relative overflow-hidden">
        <div className="absolute inset-0 animated-grid opacity-20" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all flex items-center gap-2 ${
                  activeCategory === category.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-white/5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4" />}
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 relative overflow-hidden">
        <SubtleNetworkBackground />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -8 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="glass-card overflow-hidden">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                          {categories.find(c => c.id === project.category)?.label}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {project.client}
                      </p>
                      <div className="flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                        View Case Study
                        <ArrowUpRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            >
              <div className="relative h-64">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-8">
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary border border-primary/30">
                  {categories.find(c => c.id === selectedProject.category)?.label}
                </span>
                <h2 className="text-2xl font-bold mt-4 mb-2">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6">{selectedProject.client}</p>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Challenge</h4>
                    <p className="text-muted-foreground">{selectedProject.challenge}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Solution</h4>
                    <p className="text-muted-foreground">{selectedProject.solution}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">Result</h4>
                    <p className="text-muted-foreground">{selectedProject.result}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-8 w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
};

export default Projects;
